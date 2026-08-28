import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  trendUp?: boolean;
  accent?: string;
}

export default function StatCard({ label, value, icon, trend, trendUp, accent = 'cyan' }: StatCardProps) {
  return (
    <div className="glass flex items-center gap-4 p-4 transition hover:border-cyan-400/30">
      {icon && (
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, rgba(34,211,238,0.15), rgba(14,116,144,0.1))`,
            color: `var(--tw-${accent})`,
          }}
        >
          <span className="text-cyan-300">{icon}</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="label truncate">{label}</p>
        <p className="mt-0.5 font-display text-xl font-bold text-white">{value}</p>
        {trend && (
          <p
            className={`mt-0.5 flex items-center gap-1 text-xs ${
              trendUp ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
