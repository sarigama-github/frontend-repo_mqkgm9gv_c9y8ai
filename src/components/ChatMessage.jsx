import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function ChatMessage({ message, isLast }) {
  const ref = useRef(null)
  useEffect(() => {
    if (isLast && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [isLast])

  const isAssistant = message.role === 'assistant'

  return (
    <div ref={ref} className={`w-full flex ${isAssistant ? 'justify-start' : 'justify-end'} py-2`}>
      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow ${isAssistant ? 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800' : 'bg-gradient-to-tr from-purple-500 to-blue-500 text-white'}`}>
        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
