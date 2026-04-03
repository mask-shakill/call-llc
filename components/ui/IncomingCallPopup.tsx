'use client'
import { useApp } from '@/lib/context'
import { Phone, PhoneOff } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function IncomingCallPopup() {
  const { incomingCall, setIncomingCall, setActiveCall } = useApp()
  const [ring, setRing] = useState(0)

  useEffect(() => {
    if (!incomingCall) return
    const t = setInterval(() => setRing(r => r + 1), 1000)
    return () => clearInterval(t)
  }, [incomingCall])

  if (!incomingCall) return null

  const accept = () => { setIncomingCall(false); setActiveCall(true) }
  const decline = () => { setIncomingCall(false) }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in">
      <div className="glass rounded-2xl p-5 w-72 border border-brand-500/30 glow-green shadow-2xl">
        {/* Pulse rings */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute w-20 h-20 rounded-full bg-brand-500/10 animate-ping" />
          <div className="absolute w-16 h-16 rounded-full bg-brand-500/15 animate-pulse" />
          <div className="w-14 h-14 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center">
            <Phone className="w-6 h-6 text-brand-400 animate-[ring_1s_ease-in-out_infinite]" />
          </div>
        </div>

        <p className="text-center text-xs text-brand-400 font-mono uppercase tracking-widest mb-1">Incoming Call</p>
        <p className="text-center text-white font-bold text-lg">Rahima Begum</p>
        <p className="text-center text-slate-500 text-sm font-mono mb-5">+880 171 123 4567</p>

        <div className="flex gap-3">
          <button onClick={decline} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all font-semibold text-sm">
            <PhoneOff className="w-4 h-4" />
            Decline
          </button>
          <button onClick={accept} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-400 border border-brand-500/30 transition-all font-semibold text-sm">
            <Phone className="w-4 h-4" />
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
