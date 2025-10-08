"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatFeed from "./components/ChatFeed";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { ArrowUp, Briefcase, TrendingUp, Users, Settings, Compass, Plus, Image } from "lucide-react";
import posthog from "posthog-js";

const quickActions = [
  { icon: Briefcase, label: "Sales" },
  { icon: TrendingUp, label: "Marketing" },
  { icon: Users, label: "People" },
  { icon: Settings, label: "Ops" },
  { icon: Compass, label: "Explore" },
];

const automationCards = [
  {
    title: "Lead Enrichment",
    description: "Agent auto-fills missing CRM data (emails, roles), and by scraping LinkedIn, Crunchbase, and public databases.",
  },
  {
    title: "Outbound Prospecting",
    description: "Agent personalizes and sends cold emails/LinkedIn messages, schedules follow-ups, logs everything in Salesforce.",
  },
  {
    title: "Customer Onboarding",
    description: "Agent sends welcome emails, schedules kickoff calls, provisions accounts, and tracks onboarding progress automatically.",
  },
  {
    title: "Renewals & Upsell Tracking",
    description: "Agent monitors contracts, alerts reps before expiry, drafts renewal offers, and updates CRM renewal schedules.",
  },
];

export default function Home() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const startChat = useCallback(
    (finalMessage: string) => {
      setInitialMessage(finalMessage);
      setIsChatVisible(true);

      try {
        posthog.capture("submit_message", {
          message: finalMessage,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [setInitialMessage, setIsChatVisible]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isChatVisible && (e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (inputValue.trim()) {
          startChat(inputValue.trim());
          setInputValue("");
        }
      }

      if (!isChatVisible && (e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const textarea = document.querySelector("textarea");
        if (textarea) {
          textarea.focus();
        }
      }

      if (isChatVisible && e.key === "Escape") {
        e.preventDefault();
        setIsChatVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isChatVisible, inputValue, startChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      startChat(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isChatVisible ? (
        <div className="flex h-screen relative z-10">
          <Sidebar />
          
          <div className="flex flex-col" style={{ width: 'calc(100vw - 13.5rem)', marginLeft: '13.5rem' }}>
            <TopBar />
            
            <main className="flex-1 flex flex-col items-center justify-center px-12 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto w-full"
              >
                <h1 className="text-3xl font-normal text-center mb-20 text-white leading-tight">
                  What should we automate today?
                </h1>

                <form onSubmit={handleSubmit} className="mb-16">
                  <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 shadow-2xl hover:border-white/[0.12] transition-all duration-300">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe the workflow you want to automate here.."
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none min-h-[120px] text-base leading-relaxed"
                      rows={4}
                      aria-label="Describe your automation workflow"
                    />
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="p-2 hover:bg-white/5 rounded-lg transition-all duration-200"
                          aria-label="Add attachment"
                        >
                          <Plus size={20} className="text-gray-400" />
                        </button>
                        <button
                          type="button"
                          className="p-2 hover:bg-white/5 rounded-lg transition-all duration-200"
                          aria-label="Upload image"
                        >
                          <Image size={20} className="text-gray-400" />
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="p-2.5 bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed rounded-full transition-all duration-200"
                        aria-label="Submit automation request"
                      >
                        <ArrowUp size={18} className="text-white" />
                      </button>
                    </div>
                  </div>
                </form>

                <div className="flex items-center gap-4 mb-16 justify-center flex-wrap">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => startChat(`Help me with ${action.label.toLowerCase()} automation`)}
                        className="flex items-center gap-3 px-6 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-full hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200"
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-200 font-medium">{action.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {automationCards.map((card, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      onClick={() => startChat(`Help me set up ${card.title}`)}
                      className="group p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 text-left shadow-xl"
                    >
                      <h3 className="text-white font-semibold mb-4 text-lg group-hover:text-gray-100 transition-colors">{card.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </main>
          </div>
        </div>
      ) : (
        <ChatFeed
          initialMessage={initialMessage}
          onClose={() => setIsChatVisible(false)}
        />
      )}
    </AnimatePresence>
  );
}
