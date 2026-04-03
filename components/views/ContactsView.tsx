'use client'
import { useState } from 'react'
import { contacts, callHistory } from '@/data/dummy'
import { Search, Plus, Phone, MessageSquare, Mail, Building2, Tag, Clock, ChevronRight, X } from 'lucide-react'
import clsx from 'clsx'

type Contact = typeof contacts[number]

const tagColors: Record<string, string> = {
  VIP: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Customer: 'bg-brand-500/15 text-brand-400 border-brand-500/30',
  Lead: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
}

export default function ContactsView() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)
  const [filterTag, setFilterTag] = useState<string | null>(null)

  const filtered = contacts.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
     c.phone.includes(search) ||
     c.company.toLowerCase().includes(search.toLowerCase())) &&
    (!filterTag || c.tag === filterTag)
  )

  return (
    <div className="flex gap-4 h-full animate-in">
      {/* List panel */}
      <div className={clsx('flex flex-col gap-4 transition-all', selected ? 'hidden lg:flex lg:w-96' : 'w-full')}>
        {/* Search + filters */}
        <div className="card !p-3 flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search contacts..."
              className="bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[null, 'VIP', 'Customer', 'Lead'].map(tag => (
              <button
                key={tag ?? 'All'}
                onClick={() => setFilterTag(tag)}
                className={clsx('text-xs px-3 py-1 rounded-full border transition-all', 
                  filterTag === tag
                    ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                )}
              >
                {tag ?? 'All'}
              </button>
            ))}
            <button className="ml-auto btn-primary !py-1 flex items-center gap-1 text-xs">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        {/* Contact list */}
        <div className="card !p-0 overflow-hidden flex-1">
          <div className="overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-slate-600 text-sm">No contacts found</div>
            ) : filtered.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={clsx(
                  'w-full flex items-center gap-3 p-4 border-b border-white/5 hover:bg-white/5 transition-all text-left',
                  selected?.id === c.id && 'bg-white/8 border-l-2 border-l-brand-500'
                )}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{c.name}</p>
                    <span className={`badge border text-[9px] ${tagColors[c.tag]}`}>{c.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{c.company}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="flex-1 card animate-in">
          {/* Back on mobile */}
          <button onClick={() => setSelected(null)} className="lg:hidden flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition-all">
            <X className="w-4 h-4" /> Back
          </button>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white font-bold text-xl shrink-0">
              {selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                <span className={`badge border ${tagColors[selected.tag]}`}>{selected.tag}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                <Building2 className="w-3.5 h-3.5" />
                <span>{selected.company}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <button className="btn-primary flex items-center gap-1.5 !py-1.5 text-xs">
                  <Phone className="w-3.5 h-3.5" /> Call
                </button>
                <button className="btn-ghost flex items-center gap-1.5 !py-1.5 text-xs">
                  <MessageSquare className="w-3.5 h-3.5" /> SMS
                </button>
                <button className="btn-ghost flex items-center gap-1.5 !py-1.5 text-xs">
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { icon: Phone, label: 'Phone', value: selected.phone },
              { icon: Mail, label: 'Email', value: selected.email },
              { icon: Clock, label: 'Last Contact', value: selected.lastContact },
              { icon: Tag, label: 'Tag', value: selected.tag },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-white/3 rounded-xl p-3">
                <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-slate-300">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/3 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-mono text-white">{selected.calls}</p>
              <p className="text-xs text-slate-500 mt-1">Total Calls</p>
            </div>
            <div className="bg-white/3 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-mono text-white">{selected.messages}</p>
              <p className="text-xs text-slate-500 mt-1">Messages</p>
            </div>
          </div>

          {/* History */}
          <h3 className="font-semibold text-white mb-3 text-sm">Call History</h3>
          <div className="space-y-2">
            {callHistory.slice(0, 3).map(call => (
              <div key={call.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="flex-1 text-xs">
                  <span className="text-slate-300 capitalize">{call.type}</span>
                  <span className="text-slate-600 mx-2">·</span>
                  <span className="text-slate-400">{call.duration}</span>
                </div>
                <span className="text-xs text-slate-600">{call.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selected && (
        <div className="hidden lg:flex flex-1 card items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-slate-600" />
            </div>
            <p className="text-slate-500 text-sm">Select a contact to view details</p>
          </div>
        </div>
      )}
    </div>
  )
}
