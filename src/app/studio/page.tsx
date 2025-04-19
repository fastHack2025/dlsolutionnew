// src/app/studio/page.tsx
'use client';

import React, { useState } from 'react';
import { generateUUID } from '@/utils/uuid';

export default function StudioPage() {
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const handleGenerate = () => {
    const id = generateUUID();
    setGeneratedId(id);
    console.log("🧠 ID généré :", id);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎨 Studio IA – Génération de Template</h1>
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Générer un Template IA
      </button>

      {generatedId && (
        <div className="mt-4 text-green-600">
          <p>ID généré : <code>{generatedId}</code></p>
        </div>
      )}
    </main>
  );
}
