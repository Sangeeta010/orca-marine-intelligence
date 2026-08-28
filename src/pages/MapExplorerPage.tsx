import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map as MapIcon, Navigation, X, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import MarineMap from '@/components/MarineMap';
import { locationInfo } from '@/data/mockData';
import type { MapMarker } from '@/types';

export default function MapExplorerPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MapMarker | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Marine Map Explorer"
        subtitle="Interactive ocean intelligence map with satellite, oceanographic, weather, and hazard layers."
        icon={<MapIcon className="h-5 w-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <MarineMap
            height="640px"
            onMarkerClick={(m) => setSelected(m)}
            highlightPfz
          />
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          {selected ? (
            <div className="glass animate-fade-in p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-base font-semibold text-white">{selected.name}</h3>
                  <p className="mt-0.5 text-xs text-cyan-200/50">
                    {selected.lat.toFixed(3)}°N, {selected.lng.toFixed(3)}°E
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-1 text-cyan-200/40 transition hover:text-cyan-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                <DataRow label="SST" value={`${locationInfo.sst}°C`} />
                <DataRow label="Chlorophyll" value={`${locationInfo.chlorophyll} mg/m³`} />
                <DataRow label="Wave Height" value={`${locationInfo.waveHeight} m`} />
                <DataRow label="Wind Speed" value={`${locationInfo.windSpeed} km/h`} />
                <DataRow label="Weather" value="Partly cloudy" />
                <div className="flex items-center justify-between rounded-lg border border-cyan-400/10 bg-ocean-800/30 px-3 py-2">
                  <span className="text-xs text-cyan-200/60">Fishing Potential</span>
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-bold text-emerald-400">
                    HIGH
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-cyan-400/10 bg-ocean-800/30 px-3 py-2">
                  <span className="text-xs text-cyan-200/60">Safety</span>
                  <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-xs font-bold text-amber-400">
                    MODERATE
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/chat')}
                className="btn-primary mt-4 w-full !py-2 text-xs"
              >
                <Sparkles className="h-3.5 w-3.5" /> Ask ORCA About This Location
              </button>
            </div>
          ) : (
            <div className="glass p-5">
              <h3 className="font-heading text-sm font-semibold text-white">Location Details</h3>
              <p className="mt-2 text-xs text-cyan-200/50">
                Click any marker on the map to see detailed oceanographic, weather, and safety data
                for that location.
              </p>
            </div>
          )}

          {/* Legend */}
          <div className="glass p-5">
            <h3 className="mb-3 font-heading text-sm font-semibold text-white">Map Legend</h3>
            <div className="space-y-2">
              <LegendItem color="#22d3ee" label="Potential Fishing Zone" />
              <LegendItem color="#ef4444" label="Active Alert" />
              <LegendItem color="#2dd4bf" label="Marine Protected Area" />
              <LegendItem color="#67e8f9" label="City / Port" />
            </div>
          </div>

          {/* Quick nav */}
          <div className="glass p-5">
            <h3 className="mb-3 font-heading text-sm font-semibold text-white">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/chat')}
                className="btn-ghost w-full !py-2 text-xs"
              >
                <Navigation className="h-3.5 w-3.5" /> Navigate to Nearest PFZ
              </button>
              <button
                onClick={() => navigate('/alerts')}
                className="btn-ghost w-full !py-2 text-xs"
              >
                View Active Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-cyan-400/10 bg-ocean-800/30 px-3 py-2">
      <span className="text-xs text-cyan-200/60">{label}</span>
      <span className="font-display text-sm font-bold text-white">{value}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-xs text-cyan-100/70">{label}</span>
    </div>
  );
}
