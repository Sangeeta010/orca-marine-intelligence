import { useNavigate } from 'react-router-dom';
import { Sparkles, Globe, Map as MapIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AIChat from '@/components/AIChat';
import { recentQueries } from '@/data/mockData';

export default function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
      <PageHeader
        title="ORCA AI Assistant"
        subtitle="Ask questions about marine ecosystems, weather, fishing zones and ocean safety."
        icon={<Sparkles className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-ocean-900/50 px-3 py-2 text-xs text-cyan-200/70">
            <Globe className="h-3.5 w-3.5" />
            <span>Detected: English</span>
            <span className="text-cyan-200/30">|</span>
            <span>Response: English</span>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Chat panel */}
        <div className="lg:col-span-3">
          <div className="glass flex h-[640px] flex-col p-5">
            <AIChat />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass p-5">
            <h3 className="mb-3 font-heading text-sm font-semibold text-white">Recent Queries</h3>
            <div className="space-y-1.5">
              {recentQueries.map((q) => (
                <button
                  key={q}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-cyan-100/60 transition hover:bg-ocean-800/40 hover:text-cyan-200"
                >
                  <Sparkles className="h-3 w-3 text-cyan-300/50" />
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="glass p-5">
            <h3 className="mb-2 font-heading text-sm font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/map')}
                className="btn-ghost w-full !py-2 text-xs"
              >
                <MapIcon className="h-3.5 w-3.5" /> Open Map Explorer
              </button>
              <button
                onClick={() => navigate('/alerts')}
                className="btn-ghost w-full !py-2 text-xs"
              >
                View Active Alerts
              </button>
              <button
                onClick={() => navigate('/ai-agents')}
                className="btn-ghost w-full !py-2 text-xs"
              >
                View AI Agents
              </button>
            </div>
          </div>

          <div className="glass p-5">
            <h3 className="mb-2 font-heading text-sm font-semibold text-white">Demo Flow</h3>
            <p className="text-xs leading-relaxed text-cyan-100/60">
              Ask: "Where is the nearest Potential Fishing Zone today and is it safe to travel there?"
              to see the full collaborative agent pipeline in action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
