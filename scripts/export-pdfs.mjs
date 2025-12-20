import fs from 'fs';
import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer';

// Simple wait for server readiness
async function waitForServer(url, { timeoutMs = 30000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          if (res.statusCode && res.statusCode < 500) resolve();
          else reject(new Error(`HTTP ${res.statusCode}`));
        });
        req.on('error', reject);
        req.setTimeout(3000, () => {
          req.destroy(new Error('timeout'));
        });
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 750));
    }
  }
  return false;
}

function getArgs() {
  const [, , ...rest] = process.argv;
  const args = { slugs: [], outDir: 'exported-pdfs', baseUrl: process.env.BASE_URL || 'http://localhost:3000' };
  for (const arg of rest) {
    if (arg.startsWith('--out=')) args.outDir = arg.slice('--out='.length);
    else if (arg.startsWith('--base=')) args.baseUrl = arg.slice('--base='.length);
    else args.slugs.push(arg);
  }
  if (args.slugs.length === 0) args.slugs = ['station-zero'];
  return args;
}

async function main() {
  const { slugs, outDir, baseUrl } = getArgs();
  const printPath = (slug) => `${baseUrl.replace(/\/$/, '')}/print/${slug}`;

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const ok = await waitForServer(baseUrl);
  if (!ok) {
    console.error(`Server not responding at ${baseUrl}. Start the app first (e.g., yarn dev).`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
  // Use print media so our @media print and @page rules apply
  await page.emulateMediaType('print');

    for (const slug of slugs) {
      const url = printPath(slug);
      console.log(`Exporting ${slug} from ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
      // Ensure fonts and images settled
      await page.waitForFunction('document?.fonts ? document.fonts.ready : true', { timeout: 20000 });

      const outFile = path.join(outDir, `${slug}.pdf`);
      await page.pdf({
        path: outFile,
        printBackground: true,
        preferCSSPageSize: true,
        format: 'A4',
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      console.log(`Saved -> ${outFile}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
