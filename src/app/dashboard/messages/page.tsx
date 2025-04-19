'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Simule des messages existants
    setMessages([
      {
        id: 1,
        sender: 'Client',
        content: 'Bonjour, j’aimerais en savoir plus sur l’offre Pro.',
        timestamp: 'Il y a 2h',
      },
      {
        id: 2,
        sender: 'Admin',
        content: 'Bonjour, je vous contacte pour une demande urgente.',
        timestamp: 'Il y a 10min',
      },
    ])
  }, [])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: 'Moi',
      content: newMessage,
      timestamp: 'Maintenant',
    }

    setMessages([message, ...messages])
    setNewMessage('')
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">📨 Boîte de messages</h1>

      <div className="mb-6">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un nouveau message..."
          className="w-full p-4 border rounded resize-none min-h-[100px]"
        />
        <button
          onClick={handleSend}
          className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Envoyer
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 bg-gray-100 rounded shadow-sm border"
          >
            <div className="text-sm font-medium text-gray-800">{msg.sender}</div>
            <div className="text-sm text-gray-600 mt-1">{msg.content}</div>
            <div className="text-xs text-gray-400 mt-2">{msg.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
