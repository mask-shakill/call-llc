'use client'
import { weeklyData, hourlyCallData, sentimentData, callHistory } from '@/data/dummy'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts'
import { TrendingUp, Phone, MessageSquare, Clock } from 'lucide-react'

const COLORS = ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b']

export default function AnalyticsView() {
  const successCount = callHistory.filter(c => c.status === 'answered').length
  const missedCount = callHistory.filter(c => c.status === 'missed').length
  const failedCount = callHistory.filter(c => c.status === 'failed').length
  const total = callHistory.length

  const statusData = [
    { name: 'Answered', value: successCount, color: '#22c55e' },
    { name: 'Missed', value: missedCount, color: '#f59e0b' },
    { name: 'Failed', value: failedCount, color: '#ef4444' },
  ]

  return (
    <div className="space-y-6 animate-in">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total This Week', value: '1,590', icon: Phone, color: 'text-brand-400', bg: 'bg-brand-500/15' },
          { label: 'Avg Handle Time', value: '4:32', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/15' },
          { label: 'Resolution Rate', value: '87%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
          { label: 'Messages Sent', value: '1,850', icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-500/15' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold font-mono text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Weekly calls + messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-white mb-1">Weekly Overview</h3>
          <p className="text-xs text-slate-500 mb-5">Calls vs Messages by day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0', fontSize: 12 }} />
              <Bar dataKey="calls" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.9} />
              <Bar dataKey="sms" fill="#3b82f6" radius={[4, 4, 0, 0]} opacity={0.9} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-brand-500 inline-block"/>Calls</span>
            <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block"/>SMS</span>
          </div>
        </div>

        {/* Call status breakdown */}
        <div className="card">
          <h3 className="font-semibold text-white mb-1">Call Status Breakdown</h3>
          <p className="text-xs text-slate-500 mb-4">Today's result distribution</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                  {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {statusData.map(d => (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{d.name}</span>
                    <span className="font-mono font-semibold text-white">{d.value}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(d.value / total) * 100}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly trend */}
      <div className="card">
        <h3 className="font-semibold text-white mb-1">Hourly Call Trend</h3>
        <p className="text-xs text-slate-500 mb-5">Inbound traffic today</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={hourlyCallData}>
            <defs>
              <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#e2e8f0', fontSize: 12 }} />
            <Area type="monotone" dataKey="inbound" stroke="#22c55e" strokeWidth={2} fill="url(#ag1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
