'use client'
import { useApp } from '@/lib/context'
import { Menu, Bell, Search, Phone } from 'lucide-react'
import { stats } from '@/data/dummy'

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  dialer: 'Smart Dialer',
  contacts: 'Contacts & CRM',
  messaging: 'Messaging',
  analytics: 'Analytics',
  agents: 'Agent Management',
  settings: 'Settings',
}

export default function Header() {
  const { activePage, setSidebarOpen, setIncomingCall } = useApp()

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      {/* Mobile menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-bold text-white">{pageTitles[activePage]}</h1>
        <p className="text-xs text-slate-500 hidden sm:block">
          {stats.activeAgents} agents online · {stats.waitingCalls} calls waiting
        </p>
      </div>

      {/* Search - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-56">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          placeholder="Search..."
          className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full"
        />
      </div>

      {/* Simulate incoming call */}
      <button
        onClick={() => setIncomingCall(true)}
        className="hidden sm:flex items-center gap-2 btn-ghost text-brand-400 border-brand-500/30 text-xs"
        title="Simulate incoming call"
      >
        <Phone className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Test Call</span>
      </button>

      {/* Notifications */}
      <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
      </button>
    </header>
  )
}
