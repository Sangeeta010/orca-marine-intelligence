import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe2,
  Satellite,
  AlertTriangle,
  Fish,
  Brain,
  Map as MapIcon,
  Sparkles,
  Send,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import MarineMap from '@/components/MarineMap';
import AIChat from '@/components/AIChat';
import PfzCard from '@/components/PfzCard';
import SafetyPanel from '@/components/SafetyPanel';
import { stats, nearestPfz, safetyData, recentQueries } from '@/data/mockData';
import type { MapMarker } from '@/types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [highlightPfz, setHighlightPfz] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Marine Intelligence Dashboard"
        subtitle="Real-time oceanographic, satellite, and safety intelligence for the Indian Ocean region."
        icon={<Globe2 className="h-5 w-5" />}
        action={
          <button onClick={() => navigate('/chat')} className="btn-primary">
            <Sparkles className="h-4 w-4" /> Ask ORCA AI
          </button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Areas Monitored" value={stats.areasMonitored} icon={<Globe2 className="h-5 w-5" />} trend="Stable" trendUp />
        <StatCard label="Satellite Observations" value={stats.satelliteObservations} icon={<Satellite className="h-5 w-5" />} trend="+312 today" trendUp />
        <StatCard label="Active Alerts" value={stats.activeAlerts} icon={<AlertTriangle className="h-5 w-5" />} trend="+2 today" trendUp={false} />
        <StatCard label="Fishing Zones" value={stats.potentialFishingZones} icon={<Fish className="h-5 w-5" />} trend="+8 today" trendUp />
        <StatCard label="AI Confidence" value={stats.aiConfidence} icon={<Brain className="h-5 w-5" />} trend="+0.6%" trendUp />
      </div>

      {/* Main two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Map + safety */}
        <div className="space-y-6 lg:col-span-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="section-title">Marine Map</h2>
              <button onClick={() => navigate('/map')} className="btn-ghost !py-1.5 text-xs">
                <MapIcon className="h-3.5 w-3.5" /> Full Map Explorer
              </button>
            </div>
            <MarineMap
              height="440px"
              highlightPfz={highlightPfz}
              onMarkerClick={(m) => setSelectedMarker(m)}
            />
            {selectedMarker && (
              <div className="mt-3 glass animate-fade-in p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-heading text-sm font-semibold text-white">{selectedMarker.name}</p>
                    <p className="text-xs text-cyan-200/50">
                      {selectedMarker.lat.toFixed(3)}°N, {selectedMarker.lng.toFixed(3)}°E
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/chat')}
                    className="btn-primary !py-1.5 text-xs"
                  >
                    Ask ORCA
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Safety */}
          <div>
            <h2 className="section-title mb-3">Marine Safety Intelligence</h2>
            <SafetyPanel data={safetyData} />
          </div>
        </div>

        {/* Right: AI + PFZ */}
        <div className="space-y-6">
          <div className="glass p-5">
            <h2 className="mb-1 font-heading text-base font-semibold text-white">Ask ORCA About the Ocean</h2>
            <p className="mb-3 text-xs text-cyan-200/50">
              Ask anything — the collaborative AI agents will analyze satellite, ocean, weather, and GIS data.
            </p>
            <AIChat compact />
          </div>

          <PfzCard pfz={nearestPfz} onNavigate={() => setHighlightPfz(true)} />

          {/* Recent queries */}
          <div className="glass p-5">
            <h3 className="mb-3 font-heading text-sm font-semibold text-white">Recent Queries</h3>
            <div className="space-y-1.5">
              {recentQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => navigate('/chat')}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-cyan-100/60 transition hover:bg-ocean-800/40 hover:text-cyan-200"
                >
                  <Send className="h-3 w-3 text-cyan-300/50" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
