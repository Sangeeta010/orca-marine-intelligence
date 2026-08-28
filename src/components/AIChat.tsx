import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mic, Map as MapIcon, ListTree, FileSearch, Sparkles } from 'lucide-react';
import type { ChatMessage } from '@/types';
import {
  nearestPfz,
  reasoningSteps,
  evidenceItems,
  safetyData,
  exampleQueries,
} from '@/data/mockData';
import AgentNetwork from './AgentNetwork';

interface AIChatProps {
  compact?: boolean;
  initialQuery?: string;
}

export default function AIChat({ compact, initialQuery }: AIChatProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReasoning, setShowReasoning] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState<string | null>(null);
  const [runKey, setRunKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  const sendQuery = (text: string) => {
    if (!text.trim() || isProcessing) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);
    setRunKey((k) => k + 1);
  };

  const handleComplete = () => {
    const lastUser = messages[messages.length - 1];
    const queryText = lastUser?.text ?? '';
    const isSafetyQuery = /safe|safety|travel|risk|hazard/i.test(queryText);

    const aiMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'ai',
      text: isSafetyQuery
        ? 'The nearest high-potential fishing zone is approximately 42 km southwest. Chlorophyll is high and SST is favorable. Current weather conditions indicate moderate risk. Fishing is recommended only during the suggested time window (06:00 – 11:00). Exercise caution while travelling to the zone.'
        : 'Based on the latest available oceanographic and satellite indicators, a potential fishing zone has been identified approximately 42 km southwest of your selected location. The zone shows favorable chlorophyll (1.82 mg/m³) and SST (27.4°C) conditions with an 87% confidence score.',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      reasoning: reasoningSteps,
      pfz: nearestPfz,
      safety: safetyData,
      confidence: 87,
      evidence: evidenceItems,
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsProcessing(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className={`flex-1 space-y-4 overflow-y-auto p-1 ${compact ? 'max-h-[420px]' : ''}`}
      >
        {messages.length === 0 && !isProcessing && (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-ocean-600/20">
              <Sparkles className="h-7 w-7 text-cyan-300" />
            </div>
            <p className="font-heading text-base font-semibold text-white">Ask ORCA about the ocean</p>
            <p className="mt-1 max-w-xs text-xs text-cyan-200/50">
              Try one of the example questions below to see the collaborative AI agents in action.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-cyan-400/20 to-ocean-600/15 text-cyan-50'
                  : 'glass text-cyan-50'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className="mt-1.5 text-[10px] text-cyan-200/40">{msg.timestamp}</p>

              {/* AI response details */}
              {msg.role === 'ai' && msg.pfz && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2 rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3 sm:grid-cols-4">
                    <Detail label="Distance" value={`${msg.pfz.distanceKm} km ${msg.pfz.direction}`} />
                    <Detail label="Chlorophyll" value={`${msg.pfz.chlorophyll} mg/m³`} />
                    <Detail label="SST" value={`${msg.pfz.sst}°C`} />
                    <Detail label="Confidence" value={`${msg.confidence}%`} />
                  </div>

                  {msg.safety && (
                    <div className="flex flex-wrap gap-2">
                      <span className="chip">Wave: {msg.safety.waveHeight}m</span>
                      <span className="chip">Wind: {msg.safety.windSpeed} km/h</span>
                      <span className="chip">Cyclone: {msg.safety.cyclone}</span>
                      <span className="chip border-amber-400/30 text-amber-300">
                        Safety: Moderate
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate('/map')}
                      className="btn-ghost !py-1.5 text-xs"
                    >
                      <MapIcon className="h-3.5 w-3.5" /> Show on Map
                    </button>
                    <button
                      onClick={() =>
                        setShowReasoning(showReasoning === msg.id ? null : msg.id)
                      }
                      className="btn-ghost !py-1.5 text-xs"
                    >
                      <ListTree className="h-3.5 w-3.5" /> Explain Reasoning
                    </button>
                    <button
                      onClick={() =>
                        setShowEvidence(showEvidence === msg.id ? null : msg.id)
                      }
                      className="btn-ghost !py-1.5 text-xs"
                    >
                      <FileSearch className="h-3.5 w-3.5" /> View Evidence
                    </button>
                  </div>

                  {showReasoning === msg.id && msg.reasoning && (
                    <div className="rounded-lg border border-cyan-400/15 bg-ocean-800/40 p-3 animate-fade-in">
                      <p className="label mb-2">Why ORCA Recommended This</p>
                      <ol className="space-y-1.5">
                        {msg.reasoning.map((r) => (
                          <li key={r.step} className="flex gap-2 text-xs text-cyan-100/70">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-[10px] font-bold text-cyan-300">
                              {r.step}
                            </span>
                            {r.text}
                          </li>
                        ))}
                      </ol>
                      <p className="mt-2 text-xs font-semibold text-cyan-300">
                        {msg.confidence}% Confidence
                      </p>
                    </div>
                  )}

                  {showEvidence === msg.id && msg.evidence && (
                    <div className="rounded-lg border border-cyan-400/15 bg-ocean-800/40 p-3 animate-fade-in">
                      <p className="label mb-2">Evidence Sources</p>
                      <ul className="space-y-1">
                        {msg.evidence.map((e, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-cyan-100/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow" />
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Processing agent pipeline */}
        {isProcessing && (
          <div className="animate-fade-in">
            <p className="mb-2 flex items-center gap-2 text-xs font-medium text-cyan-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-glow" />
              ORCA agents are processing your request…
            </p>
            <AgentNetwork autoRun runKey={runKey} onComplete={handleComplete} />
          </div>
        )}
      </div>

      {/* Example queries */}
      {messages.length === 0 && !isProcessing && (
        <div className="mt-3 flex flex-wrap gap-2">
          {exampleQueries.slice(0, compact ? 3 : 5).map((q) => (
            <button
              key={q}
              onClick={() => sendQuery(q)}
              className="chip text-left transition hover:border-cyan-400/40 hover:text-cyan-100"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-ocean-900/50 p-2">
        <button className="rounded-lg p-2 text-cyan-300/60 transition hover:text-cyan-200">
          <Mic className="h-4 w-4" />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendQuery(input)}
          placeholder="Ask anything about the ocean..."
          className="flex-1 bg-transparent text-sm text-cyan-50 placeholder:text-cyan-200/40 focus:outline-none"
        />
        <button
          onClick={() => sendQuery(input)}
          disabled={isProcessing || !input.trim()}
          className="btn-primary !px-3 !py-2 disabled:opacity-40"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-200/50">{label}</p>
      <p className="mt-0.5 font-display text-sm font-bold text-white">{value}</p>
    </div>
  );
}
