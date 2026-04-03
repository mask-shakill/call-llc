'use client'
import { useState } from 'react'
import { useApp } from '@/lib/context'
import { callHistory } from '@/data/dummy'
import { Phone, PhoneOff, Delete, PhoneIncoming, PhoneMissed, Clock } from 'lucide-react'
import clsx from 'clsx'

const dialPad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
]

export default function DialerView() {
  const [number, setNumber] = useState('')
  const [calling, setCalling] = useState(false)
  const [callTime, setCallTime] = useState(0)
  const { setActiveCall } = useApp()
  let timer: ReturnType<typeof setInterval>

  const press = (d: string) => setNumber(n => n.length < 15 ? n + d : n)
  const backspace = () => setNumber(n => n.slice(0, -1))

  const startCall = () => {
    if (!number) return
    setCalling(true)
    setActiveCall(true)
    let s = 0
    timer = setInterval(() => { s++; setCallTime(s) }, 1000)
    setTimeout(() => { clearInterval(timer) }, 300000)
  }

  const endCall = () => {
    setCalling(false)
    setActiveCall(false)
    setCallTime(0)
  }

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in">
      {/* Dialer pad */}
      <div className="card flex flex-col items-center">
        <div className="w-full text-center mb-6 min-h-[5rem] flex flex-col items-center justify-center">
          {calling ? (
            <>
              <div className="text-xs text-brand-400 font-mono uppercase tracking-widest mb-1 animate-pulse">Connected</div>
              <div className="text-4xl font-mono font-bold text-white">{fmt(callTime)}</div>
              <div className="text-slate-400 text-sm mt-1">{number}</div>
            </>
          ) : (
            <>
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-mono">Enter Number</div>
              <div className={clsx('text-3xl font-mono font-bold tracking-widest', number ? 'text-white' : 'text-slate-700')}>
                {number || '—'}
              </div>
            </>
          )}
        </div>

        {/* Dial pad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mb-6">
          {dialPad.flat().map(d => (
            <button
              key={d}
              onClick={() => !calling && press(d)}
              disabled={calling}
              className="h-14 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-white font-semibold text-xl transition-all disabled:opacity-30"
            >
              {d}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={backspace}
            disabled={calling || !number}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 flex items-center justify-center transition-all disabled:opacity-20"
          >
            <Delete className="w-5 h-5" />
          </button>

          {calling ? (
            <button
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all active:scale-95"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
          ) : (
            <button
              onClick={startCall}
              disabled={!number}
              className="w-16 h-16 rounded-full bg-brand-500 hover:bg-brand-400 glow-green text-white flex items-center justify-center shadow-lg transition-all active:scale-95 disabled:opacity-30"
            >
              <Phone className="w-7 h-7" />
            </button>
          )}

          <div className="w-12 h-12" />
        </div>

        {/* WebRTC indicator */}
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-600 bg-white/3 rounded-xl px-4 py-2">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          WebRTC · Asterisk/VICIdial Ready
        </div>
      </div>

      {/* Call history */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" /> Recent Calls
          </h3>
          <span className="text-xs text-slate-500">{callHistory.length} total</span>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
          {callHistory.map(call => {
            const Icon = call.status === 'missed' ? PhoneMissed : call.type === 'inbound' ? PhoneIncoming : Phone
            const color = call.status === 'missed' ? 'text-amber-400' : call.type === 'inbound' ? 'text-brand-400' : 'text-blue-400'
            return (
              <button
                key={call.id}
                onClick={() => { setNumber(call.number); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/8 transition-all text-left group"
              >
                <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{call.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{call.number}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-500">{call.time}</p>
                  <p className="text-xs font-mono text-slate-600">{call.duration}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
