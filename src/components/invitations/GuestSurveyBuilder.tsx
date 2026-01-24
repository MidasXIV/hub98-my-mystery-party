"use client";
import React from "react";

type QuestionKind = "open" | "multi" | "checkbox";
export interface Question {
  id: string;
  kind: QuestionKind;
  prompt: string;
  options?: string[]; // for multi/checkbox
}

export function GuestSurveyBuilder({ value, onChange }: { value: Question[]; onChange: (q: Question[]) => void }) {
  const add = (kind: QuestionKind) => {
    const id = `${kind}-${Date.now()}`;
    onChange([...value, { id, kind, prompt: "", options: kind === "open" ? undefined : [""] }]);
  };
  const update = (id: string, next: Partial<Question>) => {
    onChange(value.map((q) => (q.id === id ? { ...q, ...next } : q)));
  };
  const remove = (id: string) => onChange(value.filter((q) => q.id !== id));

  const updateOption = (id: string, idx: number, text: string) => {
    onChange(value.map((q) => (q.id === id ? { ...q, options: (q.options || []).map((o, i) => (i === idx ? text : o)) } : q)));
  };
  const addOption = (id: string) => {
    onChange(value.map((q) => (q.id === id ? { ...q, options: [...(q.options || []), ""] } : q)));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => add("open")}>Add Open-ended</button>
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => add("multi")}>Add Multiple-choice</button>
        <button className="px-3 py-2 rounded-lg bg-muted" onClick={() => add("checkbox")}>Add Checkbox Survey</button>
      </div>
      {value.map((q) => (
        <div key={q.id} className="rounded-xl border border-border p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold capitalize">{q.kind}</span>
            <button className="text-xs text-primary" onClick={() => remove(q.id)}>Remove</button>
          </div>
          <input
            className="mt-2 w-full rounded-lg border border-border bg-background p-2 text-sm"
            placeholder="Question prompt"
            value={q.prompt}
            onChange={(e) => update(q.id, { prompt: e.target.value })}
          />
          {q.kind !== "open" && (
            <div className="mt-2 space-y-2">
              {(q.options || []).map((opt, i) => (
                <input
                  key={i}
                  className="w-full rounded-lg border border-border bg-background p-2 text-sm"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(q.id, i, e.target.value)}
                />
              ))}
              <button className="text-xs text-primary" onClick={() => addOption(q.id)}>Add option</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default GuestSurveyBuilder;
