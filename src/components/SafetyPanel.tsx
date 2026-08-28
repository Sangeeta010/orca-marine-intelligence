import { Waves, Wind, Zap, Cloud, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { Severity } from '@/types';

interface SafetyPanelProps {
  data: {
    waveRisk: Severity;
    waveHeight: number;
    windRisk: Severity;
    windSpeed: number;
    lightning: Severity;
    cyclone: Severity;
    overall: string;
  };
  emergency?: boolean;
}

const sevConfig: Record<Severity, { text: string; bg: string; dot: string; label: string }> = {
  low: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', dot: 'bg-emerald-400', label: 'Low' },
  medium: { text: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-400', label: 'Moderate' },
  high: { text: 'text-red-400', bg: 'bg-red-400/10', dot: 'bg-red-400', label: 'High' },
  extreme: { text: 'text-red-500', bg: 'bg-red-500/20', dot: 'bg-red-500', label: 'Extreme' },
};

export default function SafetyPanel({ data, emergency }: SafetyPanelProps) {
  const cards = [
    { icon: Waves, label: 'Wave Risk', risk: data.waveRisk, value: `${data.waveHeight} m`, unit: 'Wave Height' },
    { icon: Wind, label: 'Wind Risk', risk: data.windRisk, value: `${data.windSpeed} km/h`, unit: 'Wind Speed' },
    { icon: Zap, label: 'Lightning', risk: data.lightning, value: sevConfig[data.lightning].label, unit: 'Risk Level' },
    { icon: Cloud, label: 'Cyclone Risk', risk: data.cyclone, value: sevConfig[data.cyclone].label, unit: 'Risk Level' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => {
          const s = sevConfig[c.risk];
          return (
            <div key={c.label} className="glass p-4">
              <div className="flex items-center gap-2">
                <c.icon className={`h-4 w-4 ${s.text}`} />
                <span className="label">{c.label}</span>
              </div>
              <p className={`mt-2 font-display text-lg font-bold ${s.text}`}>{s.label}</p>
              <p className="mt-1 text-xs text-cyan-100/60">
                {c.unit}: <span className="font-medium text-cyan-100/80">{c.value}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`glass relative overflow-hidden p-5 ${
          emergency ? 'border-red-400/40 shadow-[0_0_24px_rgba(239,68,68,0.2)]' : 'border-emerald-400/30'
        }`}
      >
        {emergency && (
          <div className="absolute inset-0 animate-pulse bg-red-500/5" />
        )}
        <div className="relative flex items-center gap-3">
          {emergency ? (
            <AlertTriangle className="h-8 w-8 text-red-400" />
          ) : (
            <ShieldCheck className="h-8 w-8 text-emerald-400" />
          )}
          <div>
            <p className="label">{emergency ? 'Emergency Status' : 'Overall Safety'}</p>
            <p
              className={`font-display text-lg font-bold ${
                emergency ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {data.overall}
            </p>
            {emergency && (
              <p className="mt-1 text-xs text-red-200/70">
                Strong winds and high waves expected within the next 6 hours.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
