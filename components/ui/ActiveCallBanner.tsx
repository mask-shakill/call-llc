'use client'
import { useApp } from '@/lib/context'
import { useEffect, useState } from 'react'
import { PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react'

export default function ActiveCallBanner() {
  const { activeCall, setActiveCall } = useApp()
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!activeCall) { setSeconds(0); return }
    const t = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [activeCall])

  if (!activeCall) return null

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-4 glass border border-brand-500/30 glow-green rounded-2xl px-5 py-3 shadow-2xl mx-4">
        <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        <div>
          <p className="text-xs text-slate-400">Active Call · Rahima Begum</p>
          <p className="text-lg font-mono font-bold text-white">{fmt(seconds)}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button onClick={() => setMuted(!muted)} className={`p-2 rounded-xl border transition-all ${muted ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
            {muted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Volume2 className="w-4 h-4" />
          </button>
          <button onClick={() => setActiveCall(false)} className="p-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all">
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
