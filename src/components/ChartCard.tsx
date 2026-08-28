import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  current?: string;
  change?: string;
  changeUp?: boolean;
  source?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function ChartCard({
  title,
  subtitle,
  current,
  change,
  changeUp,
  source,
  children,
  action,
}: ChartCardProps) {
  return (
    <div className="glass p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-semibold text-white">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-cyan-200/50">{subtitle}</p>}
        </div>
        <div className="text-right">
          {current && <p className="font-display text-lg font-bold text-cyan-300">{current}</p>}
          {change && (
            <p className={`text-xs ${changeUp ? 'text-emerald-400' : 'text-amber-400'}`}>{change}</p>
          )}
        </div>
      </div>
      <div className="h-44">{children}</div>
      {(source || action) && (
        <div className="mt-3 flex items-center justify-between border-t border-cyan-400/10 pt-3">
          {source && <p className="text-[10px] text-cyan-200/40">Source: {source}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
