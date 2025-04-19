'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useUser } from '@clerk/nextjs'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface FileIA {
  id: string
  filename: string
  user_id: string
  created_at: string
}

export default function DevStudioPage() {
  const { user } = useUser()
  const [files, setFiles] = useState<FileIA[]>([])

  const fetchFiles = useCallback(async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from('ia_studio')
      .select('*')
      .eq('user_id', user.id)

    if (!error && data) setFiles(data)
  }, [user])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">🧠 Studio IA</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white rounded shadow p-4 flex items-center gap-3"
          >
            <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            <div>
              <p className="font-medium">{file.filename}</p>
              <p className="text-xs text-gray-500">
                {new Date(file.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
