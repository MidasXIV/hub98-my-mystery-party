import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));

function loadModule(relativePath, imports, env = {}) {
  const filename = path.resolve(root, relativePath);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  });
  const compiledModule = { exports: {} };
  const errors = [];
  const execute = new Script(
    `(function(require, module, exports, process, console) { ${outputText}\n})`,
    { filename },
  ).runInThisContext();
  execute(
    (id) => {
      assert.ok(Object.hasOwn(imports, id), `Unexpected import: ${id}`);
      return imports[id];
    },
    compiledModule,
    compiledModule.exports,
    { env },
    { log() {}, error: (...args) => errors.push(args) },
  );
  return { ...compiledModule.exports, errors };
}

const model = loadModule(path.join("src", "lib", "player-progress.ts"), {});
const caseSlug = "the-final-bench-off";
const otherCaseSlug = "the-final-rehearsal";
const board = {
  items: [
    { id: "initial", type: "document" },
    { id: "first-unlock", type: "document", unlockOnObjectiveId: "obj_01" },
    { id: "second-unlock", type: "document", unlockOnObjectiveId: "obj_02" },
    { id: "badge", type: "objectives-cleared-badge" },
  ],
  connections: [
    { from: "initial", to: "first-unlock" },
    { from: "first-unlock", to: "second-unlock" },
    { from: "initial", to: "missing" },
    { from: "initial", to: "badge" },
  ],
  objectives: [
    { id: "obj_01", description: "First objective", solution: "Private first answer" },
    { id: "obj_02", description: "Second objective", solution: "Private second answer" },
  ],
};

function savedCase(slug, ids) {
  return {
    caseSlug: slug,
    objectives: ids.map((objectiveId) => ({ objectiveId })),
  };
}

function setup({
  userId = "test-user",
  metadata = { cases: [savedCase(caseSlug, ["obj_01"])] },
  failRead = false,
  env = { API_KEY: "test-placeholder" },
} = {}) {
  const userReads = [];
  const progress = loadModule(path.join("src", "lib", "api", "board", "player-progress.ts"), {
    "next/server": { NextResponse: Response },
    "@clerk/nextjs/server": {
      auth: async () => ({ userId }),
      clerkClient: async () => ({
        users: {
          getUser: async (id) => {
            userReads.push(id);
            if (failRead) throw new Error("Mock progress store unavailable");
            return { publicMetadata: { playerProgress: metadata } };
          },
        },
      }),
    },
    "@/lib/player-progress": model,
  });
  const generate = loadModule(path.join("src", "lib", "api", "board", "generate.ts"), {
    "next/server": { NextResponse: Response },
    "@/data/coldCases.server": {
      getCaseBySlug: (slug) => {
        if (slug === "legacy-case") return {};
        return [caseSlug, otherCaseSlug].includes(slug) ? { evidence: board } : undefined;
      },
    },
    "@/lib/api/board/player-progress": progress,
  }, env);
  const route = loadModule(path.join("src", "app", "api", "board", "route.ts"), {
    "next/server": { NextResponse: Response },
    "@/lib/api/board/generate": generate,
    "@/lib/api/board/player-progress": progress,
    "@/lib/api/board/objective": {},
    "@/lib/api/board/badge": {},
  });
  return {
    userReads,
    errors: generate.errors,
    async generate(extraBody = {}) {
      const response = await route.POST(new Request("http://localhost/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", caseSlug, ...extraBody }),
      }));
      return { status: response.status, body: await response.json() };
    },
    async progress(query = "") {
      const response = await route.GET(new Request(
        `http://localhost/api/board?action=player-progress&caseSlug=${caseSlug}${query}`,
      ));
      return { status: response.status, body: await response.json() };
    },
  };
}

function assertBoard(body, itemIds, objectiveIds) {
  assert.deepEqual(body.items.map((item) => item.id), itemIds);
  assert.deepEqual(body.completedObjectiveIds, objectiveIds);
  const ids = new Set(itemIds);
  assert.ok(body.connections.every((connection) =>
    ids.has(connection.from) && ids.has(connection.to)));
}

test("resuming restores solved evidence and its connections in the same response", async () => {
  const app = setup();
  const { status, body } = await app.generate();
  assert.equal(status, 200);
  assertBoard(body, ["initial", "first-unlock"], ["obj_01"]);
  assert.deepEqual(body.connections, [{ from: "initial", to: "first-unlock" }]);
  assert.equal(body.items[1].unlockOnObjectiveId, "obj_01");
  assert.deepEqual(app.userReads, ["test-user"]);
});

test("generation returns only public objective fields without mutating server answers", async () => {
  for (const options of [{ userId: null }, {}]) {
    const { status, body } = await setup(options).generate();
    assert.equal(status, 200);
    assert.deepEqual(body.objectives, [
      { id: "obj_01", description: "First objective" },
      { id: "obj_02", description: "Second objective" },
    ]);
    assert.ok(!JSON.stringify(body).includes("Private first answer"));
    assert.equal(board.objectives[0].solution, "Private first answer");
  }
});

function loadCaseRegistries() {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename);
    const source = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext },
    }).outputText;
    const imports = { "server-only": {} };
    for (const { fileName: id } of ts.preProcessFile(source).importedFiles) {
      if (id === "server-only") continue;
      const target = id.startsWith("@/")
        ? path.join(root, "src", id.slice(2))
        : path.resolve(path.dirname(filename), id);
      imports[id] = load(`${target}.ts`);
    }
    const exports = loadModule(filename, imports);
    cache.set(filename, exports);
    return exports;
  }
  return {
    publicCases: load(path.join(root, "src", "data", "coldCases.ts")),
    serverCases: load(path.join(root, "src", "data", "coldCases.server.ts")),
    discovery: load(path.join(root, "src", "lib", "case-discovery.ts")),
  };
}

test("public metadata has no evidence, while server scoring and print retain all datasets", () => {
  const { publicCases, serverCases, discovery } = loadCaseRegistries();
  assert.deepEqual(
    publicCases.coldCases.map((entry) => entry.slug),
    serverCases.coldCases.map((entry) => entry.slug),
  );
  assert.equal(publicCases.getCaseBySlug("not-a-case"), undefined);
  assert.equal(serverCases.getCaseBySlug("not-a-case"), undefined);
  for (const entry of publicCases.coldCases) {
    assert.ok(!Object.hasOwn(entry, "evidence"));
    const evidence = serverCases.getCaseBySlug(entry.slug).evidence;
    assert.ok(evidence.items.length > 0);
    const badge = evidence.items.find((item) => item.type === "objectives-cleared-badge");
    const badgeUrl = badge
      ? badge.imageUrl ?? JSON.parse(badge.content).imageUrl
      : undefined;
    assert.equal(entry.badgeImageUrl, badgeUrl, `Badge changed for ${entry.slug}`);
  }
  assert.ok(serverCases.getCaseBySlug("station-zero").evidence.objectives
    .every((objective) => typeof objective.solution === "string" && objective.solution.length > 0));
  const catalog = discovery.getCatalogCases().map((entry) => ({
    ...entry,
    objectiveCount: serverCases.getCaseBySlug(entry.slug).evidence.objectives?.length,
  }));
  assert.ok(catalog.every((entry) => !Object.hasOwn(entry, "evidence")));
  const playable = catalog.find((entry) => entry.status === "playable");
  const summary = discovery.buildBadgeSummary(catalog, [{
    case_id: playable.slug,
    status: "in_progress",
    objectives_solved: playable.objectiveCount,
  }]);
  assert.ok(summary.earned > 0, "Objective-count-based badge progress must still work");
});

test("analytics preserves server objective counts and labels without returning answers", () => {
  const { serverCases } = loadCaseRegistries();
  const { buildCaseAnalytics } = loadModule(path.join("src", "lib", "case-analytics.ts"), {});
  const result = buildCaseAnalytics(serverCases.coldCases, []);
  for (const entry of serverCases.coldCases) {
    const row = result.rows.find((candidate) => candidate.caseSlug === entry.slug);
    const objectives = entry.evidence.objectives ?? [];
    assert.equal(row.objectiveCount, objectives.length);
    assert.deepEqual(row.objectiveCompletionDistribution.map((objective) => ({
      id: objective.objectiveId,
      label: objective.objectiveLabel,
    })), objectives.map((objective) => ({
      id: objective.id,
      label: objective.description,
    })));
    assert.ok(row.objectiveCompletionDistribution.every((objective) =>
      !Object.hasOwn(objective, "solution")));
    assert.ok(!Object.hasOwn(row, "evidence"));
  }
});

test("no client component can import the server case registry or evidence datasets", () => {
  const src = path.join(root, "src");
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const parsed = new Map();
  function read(filename) {
    if (!parsed.has(filename)) {
      parsed.set(filename, ts.createSourceFile(
        filename, readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true,
      ));
    }
    return parsed.get(filename);
  }
  function allSources(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const filename = path.join(directory, entry.name);
      return entry.isDirectory() ? allSources(filename) : /\.tsx?$/.test(filename) ? [filename] : [];
    });
  }
  const visited = new Set();
  function visit(filename, chain) {
    if (visited.has(filename)) return;
    visited.add(filename);
    const source = read(filename);
    const imports = [];
    function inspect(node) {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          !node.isTypeOnly && !node.importClause?.isTypeOnly &&
          node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const bindings = node.importClause?.namedBindings;
        if (bindings && ts.isNamedImports(bindings) && bindings.elements.length > 0 &&
            bindings.elements.every((element) => element.isTypeOnly)) return;
        imports.push(node.moduleSpecifier.text);
      }
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword &&
          ts.isStringLiteral(node.arguments[0])) {
        imports.push(node.arguments[0].text);
      }
      ts.forEachChild(node, inspect);
    }
    inspect(source);
    assert.ok(!imports.includes("server-only"), `Server-only code in client graph: ${chain.join(" -> ")}`);
    for (const id of imports) {
      const resolved = ts.resolveModuleName(id, filename, options, ts.sys).resolvedModule;
      if (resolved && !resolved.isExternalLibraryImport) {
        visit(resolved.resolvedFileName, [...chain, id]);
      }
    }
  }
  for (const filename of allSources(src)) {
    const first = read(filename).statements[0];
    if (first && ts.isExpressionStatement(first) &&
        ts.isStringLiteral(first.expression) && first.expression.text === "use client") {
      visit(filename, [path.relative(root, filename)]);
    }
  }
  assert.ok(!visited.has(path.join(src, "data", "coldCases.server.ts")));
  const registry = read(path.join(src, "data", "coldCases.server.ts"));
  for (const statement of registry.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) &&
        statement.moduleSpecifier.text !== "./coldCases" &&
        statement.moduleSpecifier.text !== "server-only") {
      const dataset = ts.resolveModuleName(
        statement.moduleSpecifier.text, registry.fileName, options, ts.sys,
      ).resolvedModule.resolvedFileName;
      assert.ok(!visited.has(dataset), `Evidence dataset reachable from a client: ${dataset}`);
    }
  }
});

test("signed-out and new players receive only initially available evidence", async () => {
  for (const options of [{ userId: null }, { metadata: null }]) {
    const app = setup(options);
    const { status, body } = await app.generate();
    assert.equal(status, 200);
    assertBoard(body, ["initial"], []);
    assert.deepEqual(body.connections, []);
    if (options.userId === null) assert.deepEqual(app.userReads, []);
  }
});

test("progress from another case or the kits collection cannot unlock this case", async () => {
  const app = setup({
    metadata: {
      cases: [savedCase(otherCaseSlug, ["obj_01", "obj_02"])],
      kits: [savedCase(caseSlug, ["obj_01", "obj_02"])],
    },
  });
  const { body } = await app.generate();
  assertBoard(body, ["initial"], []);
});

test("generation ignores supplied user IDs and claimed completion IDs", async () => {
  const app = setup();
  const { body } = await app.generate({
    userId: "another-user",
    completedObjectiveIds: ["obj_01", "obj_02"],
  });
  assertBoard(body, ["initial", "first-unlock"], ["obj_01"]);
  assert.deepEqual(app.userReads, ["test-user"]);
});

test("duplicate and removed objective IDs do not inflate resumed completion", async () => {
  const app = setup({
    metadata: { cases: [savedCase(caseSlug, ["obj_01", "removed", "obj_01"])] },
  });
  const { body } = await app.generate();
  assertBoard(body, ["initial", "first-unlock"], ["obj_01"]);
});

test("all saved objectives restore all linked evidence but not the dynamic badge", async () => {
  const app = setup({
    metadata: { cases: [savedCase(caseSlug, ["obj_01", "obj_02"])] },
  });
  const { body } = await app.generate();
  assertBoard(body, ["initial", "first-unlock", "second-unlock"], ["obj_01", "obj_02"]);
  assert.equal(body.connections.length, 2);
});

test("legacy placeholder boards also return their saved completion IDs", async () => {
  const app = setup({
    metadata: { cases: [savedCase("legacy-case", ["obj_001"])] },
  });
  const { status, body } = await app.generate({ caseSlug: "legacy-case" });
  assert.equal(status, 200);
  assert.deepEqual(body.completedObjectiveIds, ["obj_001"]);
  assert.ok(body.warning);
  assert.ok(body.items.length > 0);
});

test("progress read failure fails generation explicitly instead of returning a fresh board", async () => {
  const app = setup({ failRead: true });
  const { status, body } = await app.generate();
  assert.equal(status, 500);
  assert.deepEqual(body, { error: "Failed to generate board" });
  assert.equal(app.errors.length, 1);
});

test("the existing progress GET contract still supports cases, kits, and signed-out users", async () => {
  const app = setup({
    metadata: {
      cases: [savedCase(caseSlug, ["obj_01"])],
      kits: [savedCase(caseSlug, ["obj_02"])],
    },
  });
  const cases = await app.progress();
  assert.equal(cases.status, 200);
  assert.equal(cases.body.ok, true);
  assert.equal(cases.body.authenticated, true);
  assert.equal(cases.body.caseProgress.caseSlug, caseSlug);
  assert.deepEqual(cases.body.completedObjectiveIds, ["obj_01"]);
  const kits = await app.progress("&isKit=true");
  assert.deepEqual(kits.body.completedObjectiveIds, ["obj_02"]);
  const signedOut = await setup({ userId: null }).progress();
  assert.deepEqual(signedOut.body, {
    ok: true, authenticated: false, caseProgress: null, completedObjectiveIds: [],
  });
});

test("missing configuration and unknown cases keep their existing error contracts", async () => {
  const missingKey = setup({ env: {} });
  assert.equal((await missingKey.generate()).status, 500);
  assert.deepEqual(missingKey.userReads, []);
  const unknownCase = setup();
  assert.equal((await unknownCase.generate({ caseSlug: "not-a-case" })).status, 404);
  assert.deepEqual(unknownCase.userReads, []);
});
