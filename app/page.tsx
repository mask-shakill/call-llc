import { AppProvider } from '@/lib/context'
import AppShell from '@/components/layout/AppShell'

export default function Home() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
