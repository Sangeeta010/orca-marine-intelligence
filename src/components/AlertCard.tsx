import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import type { MarineAlert } from '@/types';

const severityConfig: Record<
  MarineAlert['severity'],
  { bg: string; text: string; border: string; label: string }
> = {
  low: { bg: 'bg-emerald-400/10', text: 'text-emerald-400', border: 'border-emerald-400/30', label: 'LOW' },
  medium: { bg: 'bg-amber-400/10', text: 'text-amber-400', border: 'border-amber-400/30', label: 'MEDIUM' },
  high: { bg: 'bg-red-400/10', text: 'text-red-400', border: 'border-red-400/30', label: 'HIGH' },
  extreme: { bg: 'bg-red-500/20', text: 'text-red-500', border: 'border-red-500/40', label: 'EXTREME' },
};

export default function AlertCard({ alert }: { alert: MarineAlert }) {
  const navigate = useNavigate();
  const s = severityConfig[alert.severity];

  return (
    <div className={`glass overflow-hidden border-l-4 p-5 ${s.border}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.text}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-white">{alert.title}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-cyan-200/60">
              <MapPin className="h-3 w-3" /> {alert.location}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${s.bg} ${s.text} ${s.border} border`}>
          {s.label}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-cyan-100/70">{alert.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="label">Time</p>
          <p className="mt-0.5 flex items-center gap-1 text-cyan-100/80">
            <Clock className="h-3 w-3" /> {alert.timestamp}
          </p>
        </div>
        <div>
          <p className="label">Expected Duration</p>
          <p className="mt-0.5 text-cyan-100/80">{alert.duration}</p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3">
        <p className="label">Recommended Action</p>
        <p className="mt-1 text-xs text-cyan-100/70">{alert.action}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => navigate('/map')}
          className="btn-ghost flex-1 !py-2 text-xs"
        >
          <MapPin className="h-3.5 w-3.5" /> View on Map
        </button>
        <button
          onClick={() => navigate('/chat')}
          className="btn-primary flex-1 !py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" /> Generate Advisory
        </button>
      </div>
    </div>
  );
}
