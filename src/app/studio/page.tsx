'use client'

import { useState } from 'react'
import { generateUUID } from '@/utils/uuid'

export default function StudioPage() {
  const [templateId, setTemplateId] = useState('')

  const handleGenerate = () => {
    const id = generateUUID()
    setTemplateId(id)
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧠 Studio IA - Génération de Template</h1>

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Générer un ID de template
        </button>

        {templateId && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 border rounded">
            <p className="text-sm font-mono">🆔 ID généré :</p>
            <code className="text-blue-500">{templateId}</code>
          </div>
        )}
      </div>
    </div>
  )
}
