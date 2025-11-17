import { useState } from 'react'
import { Send, Mic } from 'lucide-react'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onSend(v)
    setValue('')
  }

  return (
    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={e=>setValue(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); submit() } }}
          rows={1}
          placeholder="Send a message..."
          className="flex-1 resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button onClick={submit} disabled={disabled} className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 text-white grid place-items-center disabled:opacity-50">
          <Send size={18} />
        </button>
        <button title="Mic (optional)" className="h-10 w-10 rounded-xl border border-zinc-200 dark:border-zinc-800 grid place-items-center text-zinc-600 dark:text-zinc-300">
          <Mic size={18} />
        </button>
      </div>
      <p className="text-xs text-zinc-500 mt-2">Press Enter to send, Shift+Enter for new line</p>
    </div>
  )
}
