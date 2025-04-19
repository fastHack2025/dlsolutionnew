'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface DevFile {
  id: string
  name: string
  content: string
  created_at: string
}

export default function DevStudioPage() {
  const { user } = useUser()
  const [files, setFiles] = useState<DevFile[]>([])

  useEffect(() => {
    if (user?.id) fetchFiles()
  }, [user])

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from('dev_files')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })

    if (!error && data) setFiles(data as DevFile[])
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">💻 DevStudio IA</h1>

      {files.length === 0 ? (
        <p className="text-gray-500">Aucun fichier IA enregistré pour l’instant.</p>
      ) : (
        <ul className="space-y-3">
          {files.map((file) => (
            <li key={file.id} className="border p-4 rounded bg-white dark:bg-gray-900 shadow-sm">
              <h2 className="font-semibold text-lg">{file.name}</h2>
              <pre className="mt-2 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {file.content}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                Créé le : {new Date(file.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
