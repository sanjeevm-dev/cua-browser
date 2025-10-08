"use client";

import { Home, Users, Activity, Shield, User, Heart, Clock, FileText, Calendar, Phone } from "lucide-react";

const navigationItems = [
  {
    section: "Dashboard",
    items: [
      { icon: Home, label: "Home" },
      { icon: Users, label: "Agents" },
      { icon: Activity, label: "Activity" },
    ],
  },
  {
    section: "Track",
    items: [
      { icon: Shield, label: "Audit" },
      { icon: User, label: "User" },
      { icon: Heart, label: "Sentiments" },
      { icon: Clock, label: "Runtime" },
    ],
  },
  {
    section: "Support",
    items: [
      { icon: FileText, label: "Documentation" },
      { icon: Calendar, label: "Schedule Call" },
      { icon: Phone, label: "Get Support" },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 w-54 bg-black/60 backdrop-blur-xl border-r border-white/[0.08] h-screen flex flex-col z-10">
      <div className="p-8 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-bold rounded-lg">
            X
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 hide-scrollbar">
        {navigationItems.map((section, idx) => (
          <div key={idx} className="mb-8">
            <div className="px-8 mb-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {section.section}
              </h3>
            </div>
            <div className="space-y-1 px-4">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIdx}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200 rounded-xl group"
                  >
                    <Icon size={18} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-8 border-t border-white/[0.08]">
        <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/[0.08]">
          <span className="text-sm text-gray-300 font-medium">Credits</span>
          <span className="text-sm text-white font-semibold">45%</span>
        </div>
      </div>
    </div>
  );
}
