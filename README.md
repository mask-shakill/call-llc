# Call Lab LLC — Call Center Dashboard

A premium, full-featured communication platform dashboard built with **Next.js 14** and **Tailwind CSS**.

## Features

- **Dashboard** — Real-time stats, hourly call charts, agent status, sentiment analysis
- **Smart Dialer** — WebRTC-style dial pad with call history, Asterisk/VICIdial integration indicators
- **Contacts & CRM** — Search, filter by tag, view full contact detail with call history
- **Messaging** — SMS + WhatsApp unified inbox with live chat UI
- **Analytics** — Weekly call charts, status breakdown pie, hourly trends
- **Agent Management** — Online/busy/away status, call load tracking (Admin/Supervisor only)
- **Settings** — Profile, notifications, telephony config, RBAC role switcher, security
- **Incoming Call Popup** — Click "Test Call" in header to simulate
- **Active Call Banner** — Live call timer with mute/end controls
- **Role Switching** — Switch between Admin / Supervisor / Agent in Settings → Access Control
- **Mobile Responsive** — Full sidebar drawer, responsive grids throughout

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS (no UI library)
- Recharts (charts)
- Lucide React (icons)
- All data from `data/dummy.ts` (no backend required)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
commpro/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx      # Main layout wrapper
│   │   ├── Sidebar.tsx       # Responsive sidebar nav
│   │   └── Header.tsx        # Top header bar
│   ├── ui/
│   │   ├── IncomingCallPopup.tsx
│   │   └── ActiveCallBanner.tsx
│   └── views/
│       ├── DashboardView.tsx
│       ├── DialerView.tsx
│       ├── ContactsView.tsx
│       ├── MessagingView.tsx
│       ├── AnalyticsView.tsx
│       ├── AgentsView.tsx
│       └── SettingsView.tsx
├── data/
│   └── dummy.ts              # All mock JSON data
├── lib/
│   └── context.tsx           # Global app state (React Context)
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Simulating Features

| Feature | How to trigger |
|---|---|
| Incoming call | Click **"Test Call"** button in the header |
| Accept call | Click **Accept** on the popup → live timer appears |
| End call | Click red phone button in the active call banner |
| Switch role | Settings → Access Control → choose Admin/Supervisor/Agent |
| Agent page lock | Switch to "Agent" role → Agents page shows access denied |
