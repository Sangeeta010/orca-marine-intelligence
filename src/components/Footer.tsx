import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

const links = [
  { label: 'Marine Intelligence', path: '/marine-intelligence' },
  { label: 'Map Explorer', path: '/map' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'Data Sources', path: '/data-sources' },
  { label: 'AI Agents', path: '/ai-agents' },
];

export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/15 bg-ocean-950/80">
      <div className="mx-auto max-w-[1600px] px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-ocean-600">
                <Waves className="h-5 w-5 text-ocean-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold text-white">ORCA</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cyan-100/60">
              Marine Ecosystem Reasoning with Collaborative Agents. An agentic AI-powered marine
              intelligence platform.
            </p>
            <p className="mt-2 text-xs text-cyan-300/50">
              "Ask the Ocean. Understand the Ocean. Act on the Ocean."
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="label mb-3">Platform</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.path}>
                    <Link
                      to={l.path}
                      className="text-sm text-cyan-100/60 transition hover:text-cyan-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-3">Quick Access</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-sm text-cyan-100/60 transition hover:text-cyan-200">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/chat" className="text-sm text-cyan-100/60 transition hover:text-cyan-200">
                    ORCA AI Assistant
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-sm text-cyan-100/60 transition hover:text-cyan-200">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-cyan-400/10 pt-6">
          <p className="text-center text-xs text-cyan-200/40">
            © 2026 ORCA — Marine Ecosystem Reasoning with Collaborative Agents. Prototype for SIH
            demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
