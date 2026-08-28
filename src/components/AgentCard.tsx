import {
  MessageSquare,
  Satellite,
  Waves,
  CloudLightning,
  Map,
  ShieldAlert,
  LifeBuoy,
  CheckCircle2,
  Loader2,
  Circle,
} from 'lucide-react';
import type { Agent, AgentStatus } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Satellite,
  Waves,
  CloudLightning,
  Map,
  ShieldAlert,
  LifeBuoy,
};

interface AgentCardProps {
  agent: Agent;
  compact?: boolean;
}

export function AgentStatusDot({ status }: { status: AgentStatus }) {
  if (status === 'completed')
    return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === 'processing')
    return <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />;
  if (status === 'waiting')
    return <Circle className="h-4 w-4 text-amber-400/70" />;
  return <Circle className="h-4 w-4 text-cyan-200/30" />;
}

export function statusLabel(status: AgentStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AgentCard({ agent, compact }: AgentCardProps) {
  const Icon = iconMap[agent.icon] ?? MessageSquare;
  const active = agent.status === 'processing' || agent.status === 'completed';
  return (
    <div
      className={`glass relative overflow-hidden p-4 transition ${
        active ? 'border-cyan-400/40 shadow-glow-sm' : ''
      }`}
    >
      {agent.status === 'processing' && (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent" style={{ backgroundSize: '200% 100%' }} />
      )}
      <div className="relative flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
            active ? 'bg-cyan-400/15 text-cyan-300' : 'bg-ocean-800/50 text-cyan-200/50'
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-heading text-sm font-semibold text-white">{agent.name}</h4>
            <AgentStatusDot status={agent.status} />
          </div>
          <p className="text-[11px] font-medium text-cyan-300/60">{agent.role}</p>
          {!compact && (
            <p className="mt-1.5 text-xs leading-relaxed text-cyan-100/55">{agent.description}</p>
          )}
          <p
            className={`mt-1.5 text-[10px] font-medium uppercase tracking-wider ${
              agent.status === 'completed'
                ? 'text-emerald-400'
                : agent.status === 'processing'
                  ? 'text-cyan-300'
                  : agent.status === 'waiting'
                    ? 'text-amber-400/70'
                    : 'text-cyan-200/30'
            }`}
          >
            {statusLabel(agent.status)}
          </p>
        </div>
      </div>
    </div>
  );
}
