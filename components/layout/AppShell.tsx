'use client'
import { useApp } from '@/lib/context'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import IncomingCallPopup from '@/components/ui/IncomingCallPopup'
import ActiveCallBanner from '@/components/ui/ActiveCallBanner'
import DashboardView from '@/components/views/DashboardView'
import DialerView from '@/components/views/DialerView'
import ContactsView from '@/components/views/ContactsView'
import MessagingView from '@/components/views/MessagingView'
import AnalyticsView from '@/components/views/AnalyticsView'
import AgentsView from '@/components/views/AgentsView'
import SettingsView from '@/components/views/SettingsView'

function PageContent() {
  const { activePage } = useApp()
  const pages: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    dialer: <DialerView />,
    contacts: <ContactsView />,
    messaging: <MessagingView />,
    analytics: <AnalyticsView />,
    agents: <AgentsView />,
    settings: <SettingsView />,
  }
  return <>{pages[activePage]}</>
}

export default function AppShell() {
  const { activeCall } = useApp()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        {activeCall && <ActiveCallBanner />}
        <main className={`flex-1 overflow-auto p-4 sm:p-6 ${activeCall ? 'mt-0' : ''}`}>
          <PageContent />
        </main>
      </div>
      <IncomingCallPopup />
    </div>
  )
}
