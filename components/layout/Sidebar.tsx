"use client";
import { useApp } from "@/lib/context";
import { currentUser } from "@/data/dummy";
import {
  LayoutDashboard,
  Phone,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  X,
  PhoneCall,
  Headphones,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";

type Page =
  | "dashboard"
  | "dialer"
  | "contacts"
  | "messaging"
  | "analytics"
  | "settings"
  | "agents";

const navItems: {
  page: Page;
  icon: React.FC<{ className?: string }>;
  label: string;
  badge?: number;
  adminOnly?: boolean;
}[] = [
  { page: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { page: "dialer", icon: Phone, label: "Dialer", badge: 3 },
  { page: "contacts", icon: Users, label: "Contacts" },
  { page: "messaging", icon: MessageSquare, label: "Messaging", badge: 5 },
  { page: "analytics", icon: BarChart3, label: "Analytics" },
  { page: "agents", icon: Headphones, label: "Agents", adminOnly: true },
  { page: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const { activePage, setActivePage, sidebarOpen, setSidebarOpen, role } =
    useApp();

  const handleNav = (page: Page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out",
          "w-64 border-r border-white/10 bg-slate-950/95 backdrop-blur-xl",
          "lg:relative lg:translate-x-0 lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 glow-green flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm tracking-wide">
                Call LLC
              </p>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                Platform
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Role badge */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
            <Shield className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-xs text-slate-400">Role:</span>
            <span className="text-xs font-semibold text-brand-400 capitalize">
              {role}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
          {navItems.map(({ page, icon: Icon, label, badge, adminOnly }) => {
            if (adminOnly && role === "agent") return null;
            const isActive = activePage === page;
            return (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-brand-500/20 text-brand-400 border border-brand-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/8",
                )}
              >
                <Icon
                  className={clsx(
                    "w-4 h-4",
                    isActive
                      ? "text-brand-400"
                      : "text-slate-500 group-hover:text-slate-300",
                  )}
                />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="badge bg-brand-500/20 text-brand-400 border border-brand-500/30">
                    {badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-3 h-3 text-brand-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/8 cursor-pointer transition-all group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm">
                {currentUser.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-500 border-2 border-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {currentUser.email}
              </p>
            </div>
            <LogOut className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
