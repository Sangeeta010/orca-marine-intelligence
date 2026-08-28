import { CheckCircle2, RefreshCw, Database } from 'lucide-react';
import type { DataSource } from '@/types';

const statusConfig: Record<
  DataSource['status'],
  { color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Connected: { color: 'text-emerald-400', icon: CheckCircle2 },
  Syncing: { color: 'text-cyan-300', icon: RefreshCw },
  Degraded: { color: 'text-amber-400', icon: RefreshCw },
};

export default function DataSourceCard({ source }: { source: DataSource }) {
  const s = statusConfig[source.status];
  const StatusIcon = s.icon;

  return (
    <div className="glass p-5 transition hover:border-cyan-400/30">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-semibold text-white">{source.name}</h3>
            <p className="text-xs text-cyan-200/60">{source.dataType}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-medium ${s.color}`}>
          <StatusIcon className={`h-3.5 w-3.5 ${source.status === 'Syncing' ? 'animate-spin' : ''}`} />
          {source.status}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {source.categories.map((c) => (
          <span key={c} className="chip">
            {c}
          </span>
        ))}
      </div>

      <div className="mt-4 border-t border-cyan-400/10 pt-3">
        <p className="label">Last Updated</p>
        <p className="mt-0.5 text-xs text-cyan-100/70">{source.lastUpdated}</p>
      </div>
    </div>
  );
}
