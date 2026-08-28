import { Link, useNavigate } from 'react-router-dom';
import {
  Waves,
  Satellite,
  Brain,
  Map as MapIcon,
  ShieldAlert,
  Fish,
  LifeBuoy,
  ArrowRight,
  Sparkles,
  Activity,
  Globe2,
} from 'lucide-react';
import MarineMap from '@/components/MarineMap';

const capabilities = [
  { icon: Sparkles, title: 'Ask the Ocean', desc: 'Ask natural-language questions and get evidence-based answers with maps and data.' },
  { icon: Satellite, title: 'Analyze Satellite Data', desc: 'ORCA processes Earth Observation data — SST, chlorophyll, ocean color — in real time.' },
  { icon: Brain, title: 'Reason Across Sources', desc: 'Collaborative AI agents fuse satellite, ocean, weather, and GIS data into one answer.' },
  { icon: ShieldAlert, title: 'Detect Marine Hazards', desc: 'Cyclones, high waves, lightning, and strong wind alerts with safety recommendations.' },
  { icon: Fish, title: 'Identify Fishing Zones', desc: 'Potential Fishing Zones with distance, confidence, and recommended fishing windows.' },
  { icon: LifeBuoy, title: 'Generate Advisories', desc: 'Actionable safety and fishing advisories backed by transparent AI reasoning.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background grid + glow */}
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-40 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1600px] px-6 pt-16 pb-20 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-ocean-900/50 px-4 py-1.5 text-xs font-medium text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-glow" />
                AGENTIC AI MARINE INTELLIGENCE PLATFORM
              </div>

              <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                ORCA
              </h1>
              <p className="mt-3 font-heading text-xl font-semibold text-cyan-200 sm:text-2xl">
                Marine Intelligence, Powered by Collaborative AI
              </p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-cyan-100/60 sm:text-base">
                Ask complex questions about the ocean. ORCA coordinates AI agents, satellite
                observations, weather intelligence, and geospatial data to deliver actionable marine
                insights.
              </p>
              <p className="mt-3 text-sm italic text-cyan-300/70">
                "Ask the Ocean. Understand the Ocean. Act on the Ocean."
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/marine-intelligence')}
                  className="btn-primary"
                >
                  Explore Marine Intelligence <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => navigate('/chat')} className="btn-ghost">
                  Try ORCA AI <Sparkles className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-6">
                <Stat icon={Globe2} value="2.4M km²" label="Marine Areas Monitored" />
                <Stat icon={Satellite} value="18,492" label="Satellite Observations" />
                <Stat icon={Activity} value="91.4%" label="AI Confidence" />
              </div>
            </div>

            {/* Hero map visual */}
            <div className="relative animate-fade-in-slow">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/10 to-ocean-600/10 blur-2xl" />
              <div className="relative">
                <MarineMap height="420px" showControls={false} interactive={false} highlightPfz />
                <div className="absolute left-4 top-4 rounded-xl border border-cyan-400/20 bg-ocean-950/80 px-3 py-2 backdrop-blur">
                  <p className="text-[10px] font-medium text-cyan-300/70">ORCA LIVE VIEW</p>
                  <p className="text-xs font-semibold text-white">Indian Ocean Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative mx-auto max-w-[1600px] px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">What ORCA Can Do</h2>
          <p className="mt-2 text-sm text-cyan-200/60">
            Five pillars of marine intelligence, coordinated by collaborative AI agents.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className="glass group p-6 transition hover:border-cyan-400/40 hover:shadow-glow-sm animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-ocean-600/10 text-cyan-300 transition group-hover:scale-110 group-hover:shadow-glow-sm">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cyan-100/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Five concepts band */}
      <section className="relative mx-auto max-w-[1600px] px-6 py-12">
        <div className="glass-strong flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">A national marine intelligence command center</h3>
            <p className="mt-1 text-sm text-cyan-200/60">
              Built for fishermen, researchers, coastal authorities, and disaster management.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Concept icon={Waves} label="Marine Intelligence" />
            <Concept icon={Satellite} label="Satellite EO" />
            <Concept icon={Brain} label="Collaborative AI" />
            <Concept icon={MapIcon} label="Geospatial Reasoning" />
            <Concept icon={ShieldAlert} label="Marine Safety" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1600px] px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-ocean-800/40 to-ocean-950/60 p-10 text-center">
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-40 opacity-30" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />
          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to ask the ocean?
          </h2>
          <p className="relative mt-3 text-sm text-cyan-200/60">
            See ORCA's collaborative AI agents analyze satellite data, ocean conditions, and weather
            in real time.
          </p>
          <div className="relative mt-6 flex justify-center gap-3">
            <button onClick={() => navigate('/chat')} className="btn-primary">
              Try ORCA AI <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/dashboard" className="btn-ghost">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-cyan-300/70">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-0.5 font-display text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function Concept({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-ocean-900/50 px-4 py-2">
      <Icon className="h-4 w-4 text-cyan-300" />
      <span className="text-sm font-medium text-cyan-100">{label}</span>
    </div>
  );
}
