import { useNavigate } from 'react-router-dom';
import { Navigation, Fish, Thermometer, Droplets, Clock, Target, MapPin } from 'lucide-react';
import type { Pfz } from '@/types';

interface PfzCardProps {
  pfz: Pfz;
  onNavigate?: () => void;
}

export default function PfzCard({ pfz, onNavigate }: PfzCardProps) {
  const navigate = useNavigate();

  return (
    <div className="glass relative overflow-hidden p-5">
      {/* Pulsing marker accent */}
      <div className="absolute right-4 top-4 flex items-center gap-1.5">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-glow" />
        </span>
        <span className="text-[10px] font-medium text-cyan-300/70">LIVE</span>
      </div>

      <p className="label">Nearest Potential Fishing Zone</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-white">{pfz.distanceKm}</span>
        <span className="text-lg font-semibold text-cyan-300">km {pfz.direction}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Metric icon={<Thermometer className="h-4 w-4" />} label="SST" value={`${pfz.sst}°C`} />
        <Metric icon={<Droplets className="h-4 w-4" />} label="Chlorophyll" value={`${pfz.chlorophyll} mg/m³`} />
        <Metric icon={<Target className="h-4 w-4" />} label="Confidence" value={`${pfz.confidence}%`} />
        <Metric icon={<Fish className="h-4 w-4" />} label="Fish Availability" value={pfz.fishAvailability} />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-400/15 bg-ocean-800/30 px-3 py-2">
        <Clock className="h-4 w-4 text-cyan-300" />
        <span className="text-xs text-cyan-200/70">Fishing window:</span>
        <span className="text-xs font-semibold text-cyan-200">{pfz.fishingWindow}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => (onNavigate ? onNavigate() : navigate('/map'))}
          className="btn-primary flex-1 !py-2 text-xs"
        >
          <Navigation className="h-3.5 w-3.5" /> Navigate to PFZ
        </button>
        <button
          onClick={() => navigate('/marine-intelligence')}
          className="btn-ghost !py-2 text-xs"
        >
          <MapPin className="h-3.5 w-3.5" /> Details
        </button>
      </div>
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3">
      <div className="flex items-center gap-1.5 text-cyan-300/70">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1 font-display text-sm font-bold text-white">{value}</p>
    </div>
  );
}
