'use client'

import { useState } from 'react'

interface ChatMessage {
  sender: 'user' | 'ai'
  content: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', content: 'Bonjour ! Je suis votre assistant IA NovaCore. Posez-moi une question.' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = { sender: 'user', content: input }
    const aiResponse: ChatMessage = {
      sender: 'ai',
      content: 'Analyse en cours... (ceci est une réponse simulée de l’IA)',
    }

    setMessages((prev) => [userMessage, aiResponse, ...prev])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">🧠 Assistant IA NovaCore</h1>

      <div className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question ou décrivez un besoin..."
          className="w-full p-4 border rounded resize-none min-h-[100px]"
        />
        <button
          onClick={sendMessage}
          className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Envoyer
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded shadow-sm text-sm ${
              msg.sender === 'user'
                ? 'bg-gray-100 text-right'
                : 'bg-blue-50 text-left'
            }`}
          >
            <span className="block text-gray-700">{msg.content}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
