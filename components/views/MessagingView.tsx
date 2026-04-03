'use client'
import { useState } from 'react'
import { messages, conversation } from '@/data/dummy'
import { MessageSquare, Send, Smile, Paperclip, Search, X, Phone, MoreVertical } from 'lucide-react'
import clsx from 'clsx'

type Message = typeof messages[number]

export default function MessagingView() {
  const [selected, setSelected] = useState<Message | null>(null)
  const [input, setInput] = useState('')
  const [chat, setChat] = useState(conversation)
  const [channel, setChannel] = useState<'all' | 'sms' | 'whatsapp'>('all')

  const filtered = messages.filter(m => channel === 'all' || m.channel === channel)

  const send = () => {
    if (!input.trim()) return
    setChat(c => [...c, { id: `msg${Date.now()}`, from: 'agent', text: input, time: 'Just now' }])
    setInput('')
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)] animate-in">
      {/* Inbox */}
      <div className={clsx('flex flex-col gap-3', selected ? 'hidden lg:flex lg:w-80' : 'w-full')}>
        {/* Channel filter */}
        <div className="card !p-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input placeholder="Search messages..." className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full" />
          </div>
          <div className="flex gap-2">
            {(['all', 'sms', 'whatsapp'] as const).map(ch => (
              <button key={ch} onClick={() => setChannel(ch)}
                className={clsx('flex-1 text-xs py-1.5 rounded-xl border transition-all capitalize font-medium',
                  channel === ch
                    ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/8'
                )}>
                {ch === 'whatsapp' ? '📱 WA' : ch === 'sms' ? '💬 SMS' : '🌐 All'}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="card !p-0 flex-1 overflow-y-auto">
          {filtered.map(m => (
            <button key={m.id} onClick={() => setSelected(m)}
              className={clsx('w-full flex items-start gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-all text-left',
                selected?.id === m.id && 'bg-white/8'
              )}>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-xs">
                  {m.contact.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${m.channel === 'whatsapp' ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {m.channel === 'whatsapp' ? '📱' : '💬'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white truncate">{m.contact}</p>
                  <span className="text-[10px] text-slate-600 shrink-0 ml-2">{m.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{m.preview}</p>
              </div>
              {m.unread > 0 && (
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {m.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {selected ? (
        <div className="flex-1 card !p-0 flex flex-col overflow-hidden animate-in">
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <button onClick={() => setSelected(null)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold text-sm">
              {selected.contact.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">{selected.contact}</p>
              <p className="text-xs text-slate-500">{selected.number} · via {selected.channel.toUpperCase()}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.map(msg => (
              <div key={msg.id} className={clsx('flex', msg.from === 'agent' ? 'justify-end' : 'justify-start')}>
                <div className={clsx(
                  'max-w-[80%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl text-sm',
                  msg.from === 'agent'
                    ? 'bg-brand-500/20 text-white rounded-br-sm border border-brand-500/20'
                    : 'bg-white/8 text-slate-200 rounded-bl-sm border border-white/10'
                )}>
                  <p>{msg.text}</p>
                  <p className="text-[10px] text-slate-500 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none"
                />
                <div className="flex gap-2">
                  <button className="text-slate-500 hover:text-slate-300"><Paperclip className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-slate-300"><Smile className="w-4 h-4" /></button>
                </div>
              </div>
              <button onClick={send} className="w-11 h-11 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center transition-all glow-green">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 card items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  )
}
