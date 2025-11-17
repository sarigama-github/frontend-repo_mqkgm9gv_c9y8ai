import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'

export default function ChatWindow({ messages, loading }) {
  const containerRef = useRef(null)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, loading])

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((m, i) => (
        <ChatMessage key={i} message={m} isLast={i === messages.length - 1} />
      ))}
      {loading && (
        <div className="w-full flex justify-start py-2">
          <div className="px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-pulse text-sm text-zinc-500">
            Thinking...
          </div>
        </div>
      )}
    </div>
  )}
