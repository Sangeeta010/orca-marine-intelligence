import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, Globe, Menu, X, Waves } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navItems, notifications, languages } from '@/data/mockData';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-400/15 bg-ocean-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-ocean-600 shadow-glow-sm">
            <Waves className="h-5 w-5 text-ocean-950" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg font-bold tracking-tight text-white">ORCA</span>
            <p className="-mt-1 text-[10px] font-medium tracking-wide text-cyan-300/60">
              Marine Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'text-cyan-300 text-glow'
                    : 'text-cyan-100/70 hover:text-cyan-200 hover:bg-ocean-800/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-cyan-glow shadow-glow-sm" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-cyan-400/20 bg-ocean-900/50 px-2.5 py-2 text-sm text-cyan-100 transition hover:border-cyan-400/40"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-cyan-400/20 bg-ocean-900/95 p-2 shadow-card backdrop-blur-xl animate-fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code.toUpperCase());
                      setLangOpen(false);
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-cyan-100/80 transition hover:bg-ocean-800/60 hover:text-cyan-200"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative rounded-lg border border-cyan-400/20 bg-ocean-900/50 p-2 text-cyan-100 transition hover:border-cyan-400/40"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-severity-high text-[9px] font-bold text-white">
                {notifications.length}
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-cyan-400/20 bg-ocean-900/95 p-3 shadow-card backdrop-blur-xl animate-fade-in">
                <p className="mb-2 text-sm font-semibold text-white">Notifications</p>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="rounded-lg border border-cyan-400/10 bg-ocean-800/40 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-cyan-200">{n.title}</span>
                        <span className="text-[10px] text-cyan-200/50">{n.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-cyan-100/70">{n.body}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate('/alerts');
                  }}
                  className="mt-2 w-full rounded-lg bg-ocean-800/60 py-2 text-center text-sm font-medium text-cyan-200 transition hover:bg-ocean-700/60"
                >
                  View All Alerts
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/30 to-ocean-600/30 text-sm font-semibold text-cyan-100 transition hover:shadow-glow-sm sm:flex">
            FI
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg border border-cyan-400/20 bg-ocean-900/50 p-2 text-cyan-100 transition hover:border-cyan-400/40 lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-cyan-400/15 bg-ocean-950/95 px-4 py-3 lg:hidden animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? 'bg-ocean-800/60 text-cyan-300'
                      : 'text-cyan-100/70 hover:bg-ocean-800/40 hover:text-cyan-200'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-ocean-800/60 text-cyan-300'
                    : 'text-cyan-100/70 hover:bg-ocean-800/40 hover:text-cyan-200'
                }`
              }
            >
              ORCA AI
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
