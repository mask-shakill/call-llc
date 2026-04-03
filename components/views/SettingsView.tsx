"use client";
import { useState } from "react";
import { useApp } from "@/lib/context";
import { currentUser } from "@/data/dummy";
import {
  Shield,
  Bell,
  Phone,
  MessageSquare,
  Palette,
  Globe,
  Lock,
  ChevronRight,
  Check,
} from "lucide-react";
import clsx from "clsx";

type Tab =
  | "profile"
  | "notifications"
  | "telephony"
  | "messaging"
  | "rbac"
  | "security";

const tabs: {
  id: Tab;
  icon: React.FC<{ className?: string }>;
  label: string;
}[] = [
  { id: "profile", icon: Globe, label: "Profile" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "telephony", icon: Phone, label: "Telephony" },
  { id: "messaging", icon: MessageSquare, label: "Messaging" },
  { id: "rbac", icon: Shield, label: "Access Control" },
  { id: "security", icon: Lock, label: "Security" },
];

function Toggle({
  label,
  desc,
  defaultOn = true,
}: {
  label: string;
  desc?: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm text-slate-300">{label}</p>
        {desc && <p className="text-xs text-slate-600 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={clsx(
          "w-10 h-5 rounded-full transition-all relative shrink-0",
          on ? "bg-brand-500" : "bg-white/10",
        )}
      >
        <div
          className={clsx(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
            on ? "left-5" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { role, setRole } = useApp();

  return (
    <div className="flex gap-4 animate-in">
      {/* Tabs sidebar */}
      <div className="card !p-3 h-fit w-52 shrink-0 hidden sm:block">
        <div className="space-y-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                activeTab === id
                  ? "bg-brand-500/15 text-brand-400 border border-brand-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/8",
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="sm:hidden w-full">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as Tab)}
          className="w-full mb-4 bg-white/5 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-sm outline-none"
        >
          {tabs.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="flex-1 card min-h-[400px]">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="font-semibold text-white">Profile Settings</h3>
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xl">
                {currentUser.avatar}
              </div>
              <div>
                <p className="font-semibold text-white">{currentUser.name}</p>
                <p className="text-sm text-slate-500">{currentUser.email}</p>
                <button className="text-xs text-brand-400 hover:text-brand-300 mt-1 transition-all">
                  Change photo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: currentUser.name },
                { label: "Email", value: currentUser.email },
                { label: "Phone", value: "+8801711000000" },
                { label: "Extension", value: "101" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="text-xs text-slate-500 block mb-1.5 uppercase tracking-wide">
                    {label}
                  </label>
                  <input
                    defaultValue={value}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-brand-500/50 transition-all"
                  />
                </div>
              ))}
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-2">
            <h3 className="font-semibold text-white mb-4">
              Notification Preferences
            </h3>
            <Toggle
              label="Incoming call alerts"
              desc="Popup notification for new calls"
            />
            <Toggle label="Missed call alerts" />
            <Toggle label="SMS delivery receipts" />
            <Toggle label="WhatsApp message alerts" />
            <Toggle
              label="Agent status changes"
              desc="When agents go online/offline"
              defaultOn={false}
            />
            <Toggle label="Daily summary email" defaultOn={false} />
            <Toggle label="Browser push notifications" />
          </div>
        )}

        {activeTab === "telephony" && (
          <div className="space-y-5">
            <h3 className="font-semibold text-white mb-4">
              Telephony Settings
            </h3>
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <p className="text-sm text-brand-400">
                WebRTC connected · Asterisk/VICIdial ready
              </p>
            </div>
            {[
              { label: "SIP Server", value: "sip.asterisk.local" },
              { label: "SIP Port", value: "5060" },
              { label: "VICIdial URL", value: "http://vici.local/vicidial" },
              { label: "Dial Prefix", value: "9" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-xs text-slate-500 block mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  defaultValue={value}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-brand-500/50 font-mono transition-all"
                />
              </div>
            ))}
            <Toggle label="Auto-answer incoming calls" defaultOn={false} />
            <Toggle label="Record all calls" />
          </div>
        )}

        {activeTab === "messaging" && (
          <div className="space-y-5">
            <h3 className="font-semibold text-white mb-4">
              Messaging Configuration
            </h3>
            {[
              { label: "SMS API Key", value: "••••••••••••••••" },
              { label: "SMS Sender ID", value: "CommPro" },
              { label: "WhatsApp Business Number", value: "+880 17XX XXXXXX" },
              { label: "WhatsApp API Token", value: "••••••••••••••••" },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="text-xs text-slate-500 block mb-1.5 uppercase tracking-wide">
                  {label}
                </label>
                <input
                  defaultValue={value}
                  type={value.includes("•") ? "password" : "text"}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-brand-500/50 font-mono transition-all"
                />
              </div>
            ))}
            <Toggle label="Enable SMS" />
            <Toggle label="Enable WhatsApp" />
          </div>
        )}

        {activeTab === "rbac" && (
          <div className="space-y-5">
            <h3 className="font-semibold text-white mb-1">
              Role Based Access Control
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Switch role to preview permissions
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {(["admin", "supervisor", "agent"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={clsx(
                    "p-4 rounded-2xl border text-left transition-all relative",
                    role === r
                      ? "border-brand-500/40 bg-brand-500/10"
                      : "border-white/10 bg-white/3 hover:bg-white/6",
                  )}
                >
                  {role === r && (
                    <Check className="w-4 h-4 text-brand-400 absolute top-3 right-3" />
                  )}
                  <Shield
                    className={clsx(
                      "w-6 h-6 mb-2",
                      role === r ? "text-brand-400" : "text-slate-600",
                    )}
                  />
                  <p className="font-semibold text-white capitalize text-sm">
                    {r}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {r === "admin"
                      ? "Full access"
                      : r === "supervisor"
                        ? "Team management"
                        : "Call & message only"}
                  </p>
                </button>
              ))}
            </div>

            {/* Permission matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-xs text-slate-500 font-medium">
                      Permission
                    </th>
                    {["Admin", "Supervisor", "Agent"].map((r) => (
                      <th
                        key={r}
                        className="text-center py-2 text-xs text-slate-500 font-medium w-24"
                      >
                        {r}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { perm: "View Dashboard", a: true, s: true, ag: true },
                    { perm: "Make Calls", a: true, s: true, ag: true },
                    { perm: "Send Messages", a: true, s: true, ag: true },
                    { perm: "View Analytics", a: true, s: true, ag: false },
                    { perm: "Manage Agents", a: true, s: false, ag: false },
                    { perm: "System Settings", a: true, s: false, ag: false },
                    { perm: "RBAC Management", a: true, s: false, ag: false },
                  ].map(({ perm, a, s, ag }) => (
                    <tr key={perm}>
                      <td className="py-2.5 text-slate-400 text-xs">{perm}</td>
                      {[a, s, ag].map((v, i) => (
                        <td key={i} className="py-2.5 text-center">
                          <span
                            className={clsx(
                              "inline-block w-5 h-5 rounded-full text-[10px]  items-center justify-center mx-auto",
                              v
                                ? "bg-brand-500/20 text-brand-400"
                                : "bg-white/5 text-slate-600",
                            )}
                          >
                            {v ? "✓" : "✗"}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-5">
            <h3 className="font-semibold text-white mb-4">Security Settings</h3>
            <Toggle
              label="Two-factor authentication"
              desc="Use authenticator app for 2FA"
              defaultOn={false}
            />
            <Toggle label="Session timeout (30 min)" />
            <Toggle label="IP whitelist" defaultOn={false} />
            <Toggle label="Audit logging" />
            <div className="pt-4 border-t border-white/10">
              <button className="btn-ghost text-red-400 border-red-500/30 hover:bg-red-500/10 text-sm">
                Change Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
