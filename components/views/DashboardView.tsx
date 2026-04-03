'use client'
import { stats, hourlyCallData, callHistory, recentActivity, sentimentData, agents } from '@/data/dummy'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Phone, MessageSquare, TrendingUp, TrendingDown, Users, Clock, CheckCircle, XCircle, PhoneIncoming, PhoneMissed, AlertCircle } from 'lucide-react'
import clsx from 'clsx'

function StatCard({ title, value, sub, change, icon: Icon, color }: {
  title: string; value: string | number; sub?: string; change: number; icon: React.FC<{className?:string}>; color: string
}) {
  const up = change >= 0
  return (
    <div className="card animate-in hover:border-white/20 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${up ? 'bg-brand-500/10 text-brand-400' : 'bg-red-500/10 text-red-400'}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white font-mono">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      <p className="text-xs text-slate-400 mt-2">{title}</p>
    </div>
  )
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    answered: 'bg-brand-500/15 text-brand-400',
    missed: 'bg-amber-500/15 text-amber-400',
    failed: 'bg-red-500/15 text-red-400',
  }
  return map[status] || 'bg-slate-500/15 text-slate-400'
}

function callIcon(type: string, status: string) {
  if (status === 'missed') return <PhoneMissed className="w-4 h-4 text-amber-400" />
  if (type === 'inbound') return <PhoneIncoming className="w-4 h-4 text-brand-400" />
  return <Phone className="w-4 h-4 text-blue-400" />
}

export default function DashboardView() {
  return (
    <div className="space-y-6 animate-in">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Calls Today" value={stats.totalCalls.toLocaleString()} change={stats.callsChange} icon={Phone} color="bg-brand-500/20 text-brand-400" />
        <StatCard title="Avg. Duration" value={stats.avgDuration} sub="min:sec" change={stats.durationChange} icon={Clock} color="bg-blue-500/20 text-blue-400" />
        <StatCard title="Success Rate" value={`${stats.successRate}%`} change={stats.successChange} icon={CheckCircle} color="bg-emerald-500/20 text-emerald-400" />
        <StatCard title="SMS Delivered" value={stats.smsDelivered.toLocaleString()} change={stats.smsChange} icon={MessageSquare} color="bg-purple-500/20 text-purple-400" />
      </div>

      {/* Chart + Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hourly calls chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Call Volume — Today</h3>
              <p className="text-xs text-slate-500">Hourly inbound & outbound</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />Inbound</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Outbound</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Missed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyCallData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="inbound" stroke="#22c55e" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="outbound" stroke="#3b82f6" strokeWidth={2} fill="url(#g2)" />
              <Area type="monotone" dataKey="missed" stroke="#ef4444" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment pie */}
        <div className="card">
          <h3 className="font-semibold text-white mb-1">Call Sentiment</h3>
          <p className="text-xs text-slate-500 mb-4">AI-analyzed conversations</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {sentimentData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sentimentData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-slate-400">{d.name}</span>
                </div>
                <span className="text-xs font-mono font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Recent calls + Agents */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent calls */}
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Calls</h3>
            <span className="text-xs text-slate-500">Last 2 hours</span>
          </div>
          <div className="space-y-2">
            {callHistory.slice(0, 6).map(call => (
              <div key={call.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 hover:bg-white/6 transition-all group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  {callIcon(call.type, call.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{call.name}</p>
                  <p className="text-xs text-slate-500 font-mono truncate">{call.number}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className={`badge ${statusBadge(call.status)}`}>{call.status}</span>
                  <p className="text-xs text-slate-600 mt-1">{call.time}</p>
                </div>
                <p className="text-xs font-mono text-slate-500 w-10 text-right">{call.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent status */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Agents</h3>
            <span className="badge bg-brand-500/15 text-brand-400">{agents.filter(a => a.status === 'online').length} online</span>
          </div>
          <div className="space-y-3">
            {agents.map(a => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold">
                    {a.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 status-${a.status}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{a.name}</p>
                  <p className="text-[10px] text-slate-500 capitalize">{a.status} · {a.calls} calls</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
