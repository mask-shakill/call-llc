'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { currentUser } from '@/data/dummy'

type Page = 'dashboard' | 'dialer' | 'contacts' | 'messaging' | 'analytics' | 'settings' | 'agents'
type Role = 'admin' | 'supervisor' | 'agent'

interface AppContextType {
  activePage: Page
  setActivePage: (p: Page) => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  incomingCall: boolean
  setIncomingCall: (v: boolean) => void
  activeCall: boolean
  setActiveCall: (v: boolean) => void
  role: Role
  setRole: (r: Role) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<Page>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [incomingCall, setIncomingCall] = useState(false)
  const [activeCall, setActiveCall] = useState(false)
  const [role, setRole] = useState<Role>(currentUser.role)

  return (
    <AppContext.Provider value={{
      activePage, setActivePage,
      sidebarOpen, setSidebarOpen,
      incomingCall, setIncomingCall,
      activeCall, setActiveCall,
      role, setRole,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
