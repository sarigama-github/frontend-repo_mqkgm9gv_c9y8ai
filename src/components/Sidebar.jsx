import { useEffect, useState } from 'react'
import { Plus, Settings, MessageSquare } from 'lucide-react'

export default function Sidebar({ conversations, activeId, onNew, onSelect, onSettings }) {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const onResize = () => setIsOpen(window.innerWidth >= 1024)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <aside className={`${isOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-white/70 dark:bg-zinc-900/60 backdrop-blur border-r border-zinc-200 dark:border-zinc-800 h-screen flex-shrink-0 overflow-hidden`}> 
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          <button onClick={onNew} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-tr from-purple-500 to-blue-500 text-white text-sm font-semibold shadow hover:opacity-95">
            <Plus size={18}/> New Chat
          </button>
          <button onClick={onSettings} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Settings size={18} className="text-zinc-600 dark:text-zinc-300" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length === 0 && (
            <div className="text-sm text-zinc-500 p-4">No conversations yet</div>
          )}
          {conversations.map(c => (
            <button key={c.id} onClick={() => onSelect(c.id)} className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${activeId===c.id ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}>
              <MessageSquare size={16} className="text-zinc-500"/>
              <div className="truncate">
                <div className="text-sm font-medium truncate">{c.title}</div>
                <div className="text-xs text-zinc-500 truncate">{new Date(c.updated_at).toLocaleString()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
