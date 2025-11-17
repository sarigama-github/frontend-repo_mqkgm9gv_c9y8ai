import { useEffect, useState } from 'react'
import { Bot, Code2, Search, Palette, Workflow } from 'lucide-react'

const ICONS = {
  general: Bot,
  code: Code2,
  automation: Workflow,
  research: Search,
  design: Palette,
}

export default function AgentSelector({ value, onChange }) {
  const [agents, setAgents] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/agents`)
        const data = await res.json()
        setAgents(data.agents || [])
      } catch (e) {
        // ignore
      }
    }
    load()
  }, [])

  const ActiveIcon = ICONS[value] || Bot

  return (
    <div className="relative">
      <button onClick={() => setOpen(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur hover:bg-white/80 dark:hover:bg-zinc-900/80">
        <ActiveIcon size={16} />
        <span className="text-sm font-medium capitalize">{value} agent</span>
      </button>
      {open && (
        <div className="absolute mt-2 w-72 z-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
          {agents.map(a => {
            const Ico = ICONS[a.id] || Bot
            return (
              <button key={a.id} onClick={() => { onChange(a.id); setOpen(false) }} className={`w-full text-left px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-start gap-3`}>
                <Ico size={18} className="mt-0.5" />
                <div>
                  <div className="text-sm font-semibold">{a.name}</div>
                  <div className="text-xs text-zinc-500">{a.description}</div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
