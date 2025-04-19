'use client'

import { useState } from 'react'

interface File {
  name: string
  content: string
}

export default function DevStudioPage() {
  const [code, setCode] = useState('// Commencez votre script ici...')
  const [output, setOutput] = useState('')
  const [files, setFiles] = useState<File[]>([
    { name: 'main.ts', content: '// Script principal TypeScript' },
    { name: 'api.js', content: '// Exemple API JavaScript' },
  ])

  const runCode = () => {
    setOutput('⏳ L’IA analyse et exécute le script... (simulation)')
    setTimeout(() => {
      setOutput('✅ Résultat : script exécuté avec succès. Aucune erreur détectée.')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">💻 NovaCore DevStudio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fichiers */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">📁 Fichiers</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                onClick={() => setCode(file.content)}
                className="cursor-pointer text-blue-600 hover:underline"
              >
                {file.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Editeur */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">🧠 Editeur IA</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 border rounded font-mono text-sm"
          />
          <button
            onClick={runCode}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Exécuter
          </button>

          <div className="mt-6 bg-gray-100 p-4 rounded min-h-[80px]">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">🧪 Résultat</h3>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
