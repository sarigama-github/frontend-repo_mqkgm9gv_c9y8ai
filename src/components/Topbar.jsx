import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import AgentSelector from './AgentSelector'

export default function Topbar({ agent, onAgentChange }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefers
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between bg-white/60 dark:bg-zinc-900/60 backdrop-blur sticky top-0">
      <AgentSelector value={agent} onChange={onAgentChange} />
      <button onClick={toggle} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
        {dark ? <Sun size={18}/> : <Moon size={18}/>}      
      </button>
    </div>
  )
}
