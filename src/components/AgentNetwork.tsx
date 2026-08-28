import { useEffect, useState } from 'react';
import AgentCard from './AgentCard';
import type { Agent, AgentStatus } from '@/types';
import { agents as agentDefs } from '@/data/mockData';

interface AgentNetworkProps {
  /** When true, animate the full pipeline progression automatically. */
  autoRun?: boolean;
  /** Called when the autoRun pipeline completes. */
  onComplete?: () => void;
  /** External trigger to restart the run. */
  runKey?: number;
}

const FLOW_ORDER = ['intent', 'satellite', 'ocean', 'weather', 'gis', 'safety', 'advisory'];
const STEP_DELAY = 650;

export default function AgentNetwork({ autoRun, onComplete, runKey }: AgentNetworkProps) {
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>(() =>
    Object.fromEntries(agentDefs.map((a) => [a.id, 'idle']))
  );

  useEffect(() => {
    if (!autoRun) return;
    let cancelled = false;

    const reset: Record<string, AgentStatus> = Object.fromEntries(
      agentDefs.map((a) => [a.id, 'idle'])
    );
    setStatuses(reset);

    const timers: ReturnType<typeof setTimeout>[] = [];
    FLOW_ORDER.forEach((id, idx) => {
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setStatuses((prev) => ({ ...prev, [id]: 'processing' }));
        }, idx * STEP_DELAY)
      );
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setStatuses((prev) => ({ ...prev, [id]: 'completed' }));
          if (id === 'advisory') onComplete?.();
        }, idx * STEP_DELAY + STEP_DELAY * 0.6)
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [autoRun, runKey, onComplete]);

  const agentsWithStatus: Agent[] = agentDefs.map((a) => ({
    ...a,
    status: statuses[a.id] ?? 'idle',
  }));

  const intent = agentsWithStatus.find((a) => a.id === 'intent')!;
  const parallel = agentsWithStatus.filter((a) =>
    ['satellite', 'ocean', 'weather'].includes(a.id)
  );
  const gis = agentsWithStatus.find((a) => a.id === 'gis')!;
  const safety = agentsWithStatus.find((a) => a.id === 'safety')!;
  const advisory = agentsWithStatus.find((a) => a.id === 'advisory')!;

  const isActive = (s: AgentStatus) => s === 'processing' || s === 'completed';
  const lineActive = (from: AgentStatus, to: AgentStatus) =>
    isActive(from) && isActive(to) ? 'text-cyan-glow' : 'text-cyan-400/15';

  return (
    <div className="space-y-3">
      {/* User query node */}
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-ocean-900/60 px-4 py-1.5 text-xs font-medium text-cyan-200">
        <span className="h-2 w-2 rounded-full bg-cyan-glow shadow-glow-sm" />
        User Query
      </div>
      <FlowLine active={isActive(intent.status)} />

      <AgentCard agent={intent} compact />
      <FlowLine active={isActive(intent.status)} />

      {/* Parallel agents */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {parallel.map((a) => (
          <AgentCard key={a.id} agent={a} compact />
        ))}
      </div>

      <FlowLine active={isActive(parallel[0].status)} />
      <AgentCard agent={gis} compact />
      <FlowLine active={isActive(gis.status)} />
      <AgentCard agent={safety} compact />
      <FlowLine active={isActive(safety.status)} />
      <AgentCard agent={advisory} />

      <FlowLine active={isActive(advisory.status)} />
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Final Recommendation
      </div>
    </div>
  );
}

function FlowLine({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center py-0.5">
      <svg width="20" height="24" viewBox="0 0 20 24">
        <line
          x1="10"
          y1="0"
          x2="10"
          y2="20"
          stroke={active ? '#22d3ee' : 'rgba(34,211,238,0.15)'}
          strokeWidth="2"
          strokeDasharray="4 3"
          className={active ? 'animate-dash-flow' : ''}
        />
        <path
          d="M 5 18 L 10 24 L 15 18"
          fill="none"
          stroke={active ? '#22d3ee' : 'rgba(34,211,238,0.15)'}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
