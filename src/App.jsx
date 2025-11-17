import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import Spline from '@splinetool/react-spline'

function App() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [agent, setAgent] = useState('general')
  const [loading, setLoading] = useState(false)

  const loadConversations = async () => {
    const res = await fetch(`${base}/api/conversations`)
    const data = await res.json()
    setConversations(data.conversations || [])
    if (!activeId && data.conversations?.[0]) {
      setActiveId(data.conversations[0].id)
    }
  }

  const loadConversation = async (id) => {
    const res = await fetch(`${base}/api/conversations/${id}`)
    const data = await res.json()
    setMessages(data.messages || [])
    setAgent(data.agent || 'general')
  }

  useEffect(() => { loadConversations() }, [])
  useEffect(() => { if(activeId) loadConversation(activeId) }, [activeId])

  const newChat = async () => {
    const res = await fetch(`${base}/api/conversations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ agent }) })
    const data = await res.json()
    await loadConversations()
    setActiveId(data.id)
    setMessages([])
  }

  const send = async (content) => {
    if (!activeId) {
      await newChat()
    }
    const id = activeId
    const optimistic = [...messages, { role: 'user', content }]
    setMessages(optimistic)
    setLoading(true)
    const res = await fetch(`${base}/api/conversations/${id}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, agent }) })
    const data = await res.json()
    setMessages([...optimistic, data.message])
    setLoading(false)
    loadConversations()
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-50 flex">
      <Sidebar conversations={conversations} activeId={activeId} onNew={newChat} onSelect={setActiveId} onSettings={()=>alert('Settings coming soon')} />
      <main className="flex-1 h-screen flex flex-col relative">
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">
          <Topbar agent={agent} onAgentChange={setAgent} />
          <ChatWindow messages={messages} loading={loading} />
          <ChatInput onSend={send} disabled={loading} />
        </div>
      </main>
    </div>
  )
}

export default App
