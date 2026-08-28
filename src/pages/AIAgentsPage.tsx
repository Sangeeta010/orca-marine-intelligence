import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, RotateCcw, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AgentNetwork from '@/components/AgentNetwork';
import AgentCard from '@/components/AgentCard';
import { agents } from '@/data/mockData';

export default function AIAgentsPage() {
  const navigate = useNavigate();
  const [runKey, setRunKey] = useState(0);
  const [autoRun, setAutoRun] = useState(false);

  const restart = () => {
    setAutoRun(false);
    setTimeout(() => {
      setAutoRun(true);
      setRunKey((k) => k + 1);
    }, 50);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Collaborative AI Agents"
        subtitle="Multiple specialized AI agents collaborate to understand, analyze and reason over marine data."
        icon={<Brain className="h-5 w-5" />}
        action={
          <div className="flex gap-2">
            <button onClick={restart} className="btn-ghost !py-2 text-xs">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button
              onClick={() => {
                setAutoRun(true);
                setRunKey((k) => k + 1);
              }}
              className="btn-primary !py-2 text-xs"
            >
              <Play className="h-3.5 w-3.5" /> Demo Mode
            </button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Agent network flow */}
        <div className="lg:col-span-2">
          <div className="glass p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-white">Agent Workflow</h2>
              <button
                onClick={() => navigate('/chat')}
                className="btn-ghost !py-1.5 text-xs"
              >
                <Sparkles className="h-3.5 w-3.5" /> Try in Chat
              </button>
            </div>

            <AgentNetwork autoRun={autoRun} runKey={runKey} />
          </div>
        </div>

        {/* Agent descriptions */}
        <div className="space-y-3">
          <h2 className="section-title">Agent Roster</h2>
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={{ ...agent, status: 'idle' }} />
          ))}
        </div>
      </div>

      {/* Workflow explanation */}
      <div className="mt-8 glass p-6">
        <h3 className="font-heading text-base font-semibold text-white">How ORCA Agents Collaborate</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Step n={1} title="Understand" desc="The Intent Agent parses the user's natural-language query and determines what data and reasoning are needed." />
          <Step n={2} title="Analyze" desc="Satellite, Ocean, and Weather agents work in parallel to retrieve and analyze their respective data domains." />
          <Step n={3} title="Reason" desc="The GIS Agent performs spatial reasoning — distance, direction, route, and geographic filtering." />
          <Step n={4} title="Advise" desc="The Safety and Advisory agents evaluate hazards and generate the final actionable recommendation." />
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-cyan-400/10 bg-ocean-800/30 p-4">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/15 font-display text-sm font-bold text-cyan-300">
        {n}
      </div>
      <h4 className="font-heading text-sm font-semibold text-white">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-cyan-100/60">{desc}</p>
    </div>
  );
}
