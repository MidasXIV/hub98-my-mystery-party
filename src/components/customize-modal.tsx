"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface CustomizationData {
  location: string;
  characters: string[]; // array of character names user defined
}

interface CustomizeModalProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: CustomizationData) => void;
  maxCharacters?: number;
}

// localStorage key pattern so multiple cases can store separate customization
const storageKey = (slug: string) => `coldcase_customization_${slug}`;

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  slug,
  isOpen,
  onClose,
  onSave,
  maxCharacters = 5,
}) => {
  const [location, setLocation] = useState("");
  const [characters, setCharacters] = useState<string[]>([""]);
  const [loaded, setLoaded] = useState(false);

  // Load stored customization
  useEffect(() => {
    if (!isOpen) return;
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) {
        const parsed: CustomizationData = JSON.parse(raw);
        setLocation(parsed.location || "");
        if (parsed.characters?.length) {
          setCharacters(parsed.characters.slice(0, maxCharacters));
        }
      }
    } catch {}
    setLoaded(true);
  }, [isOpen, slug, maxCharacters]);

  const updateCharacter = (index: number, value: string) => {
    setCharacters((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addCharacterField = () => {
    setCharacters((prev) => (prev.length < maxCharacters ? [...prev, ""] : prev));
  };

  const removeCharacterField = (index: number) => {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const data: CustomizationData = {
      location: location.trim(),
      characters: characters.map(c => c.trim()).filter(c => c.length > 0),
    };
    try {
      localStorage.setItem(storageKey(slug), JSON.stringify(data));
    } catch {}
    onSave?.(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-background border border-subtle-stroke rounded-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-bottom duration-300">
        <h2 className="text-2xl font-semibold mb-4">Personalize Your Case</h2>
        <p className="text-sm text-text-secondary mb-6">Set a custom location and rename characters to immerse players. These settings persist in your browser.</p>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Location / Setting</label>
            <input
              type="text"
              placeholder="e.g. Your Town Name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-subtle-stroke focus:border-blue-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Character Names</label>
            <div className="space-y-3">
              {characters.map((char, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Character ${idx + 1}`}
                    value={char}
                    onChange={(e) => updateCharacter(idx, e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-subtle-stroke focus:border-blue-500 outline-none text-sm"
                  />
                  {characters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCharacterField(idx)}
                      className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {characters.length < maxCharacters && (
                <button
                  type="button"
                  onClick={addCharacterField}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  + Add Character
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold shadow shadow-blue-600/30"
          >
            Save Customizations
          </button>
        </div>
        {!loaded && <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-2xl">Loading...</div>}
      </div>
    </div>
  );
};
