'use client'
import { useState } from 'react'
import { agents } from '@/data/dummy'
import { useApp } from '@/lib/context'
import { Headphones, Shield, Plus, Phone, MoreVertical, TrendingUp } from 'lucide-react'
import clsx from 'clsx'

const roleColors: Record<string, string> = {
  admin: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  supervisor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  agent: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
}

const statusColors: Record<string, string> = {
  online: 'bg-brand-500',
  busy: 'bg-red-500',
  away: 'bg-amber-500',
  offline: 'bg-slate-600',
}

export default function AgentsView() {
  const { role } = useApp()
  const [agentList, setAgentList] = useState(agents)

  if (role === 'agent') {
    return (
      <div className="flex items-center justify-center h-64 animate-in">
        <div className="text-center">
          <Shield className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">Access Restricted</p>
          <p className="text-slate-500 text-sm">You don't have permission to view agent management.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">Agent Management</h2>
          <p className="text-xs text-slate-500">{agentList.filter(a => a.status === 'online').length} of {agentList.length} agents online</p>
        </div>
        {role === 'admin' && (
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Agent
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Online', count: agentList.filter(a => a.status === 'online').length, color: 'text-brand-400', bg: 'bg-brand-500/10' },
          { label: 'Busy', count: agentList.filter(a => a.status === 'busy').length, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Away', count: agentList.filter(a => a.status === 'away').length, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Offline', count: agentList.filter(a => a.status === 'offline').length, color: 'text-slate-400', bg: 'bg-slate-500/10' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className={`card text-center ${bg}`}>
            <p className={`text-3xl font-bold font-mono ${color}`}>{count}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {agentList.map(agent => (
          <div key={agent.id} className="card hover:border-white/20 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-base">
                    {agent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${statusColors[agent.status]}`} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{agent.name}</p>
                  <span className={`badge border text-[10px] ${roleColors[agent.role]}`}>{agent.role}</span>
                </div>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/3 rounded-xl p-3 text-center">
                <p className="text-lg font-bold font-mono text-white">{agent.calls}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Calls Today</p>
              </div>
              <div className="bg-white/3 rounded-xl p-3 text-center">
                <p className="text-lg font-bold font-mono text-white">{agent.avgDuration}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Avg Duration</p>
              </div>
            </div>

            {/* Progress bar for calls */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                <span>Call load</span>
                <span>{Math.round((agent.calls / 25) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${Math.min((agent.calls / 25) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-ghost text-xs flex items-center justify-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
              {role === 'admin' && (
                <button className="flex-1 btn-ghost text-xs flex items-center justify-center gap-1.5 text-amber-400 border-amber-500/30">
                  <Shield className="w-3.5 h-3.5" /> Manage
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
