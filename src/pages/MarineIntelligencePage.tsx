import { useNavigate } from 'react-router-dom';
import { Waves, Droplets, Thermometer, Wind, Navigation, Fish, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ChartCard from '@/components/ChartCard';
import TrendChart from '@/components/TrendChart';
import PfzCard from '@/components/PfzCard';
import MarineMap from '@/components/MarineMap';
import {
  sstTrend,
  chlorophyllTrend,
  waveTrend,
  windTrend,
  sstChlorophyllCompare,
  nearestPfz,
} from '@/data/mockData';

export default function MarineIntelligencePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Marine Intelligence"
        subtitle="Transforming complex marine data into actionable intelligence."
        icon={<Waves className="h-5 w-5" />}
      />

      {/* Sea Surface Temperature */}
      <section className="mb-8">
        <SectionHeader icon={<Thermometer className="h-5 w-5" />} title="Sea Surface Temperature" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard
              title="SST — 7-Day Trend"
              subtitle="Sea Surface Temperature near Mumbai Offshore"
              current="27.4°C"
              change="+0.6°C vs 7d avg"
              changeUp
              source="NOAA SST"
            >
              <TrendChart data={sstTrend} color="#f97316" unit="°C" />
            </ChartCard>
          </div>
          <div className="glass p-5">
            <h3 className="font-heading text-sm font-semibold text-white">Current SST</h3>
            <p className="mt-2 font-display text-4xl font-bold text-orange-400">27.4°C</p>
            <div className="mt-4 space-y-2 text-xs">
              <Row label="7-day average" value="27.1°C" />
              <Row label="7-day max" value="27.5°C" />
              <Row label="7-day min" value="26.8°C" />
              <Row label="Anomaly" value="+0.3°C" />
            </div>
            <p className="mt-4 text-[10px] text-cyan-200/40">Source: NOAA SST · 26 Aug 2026</p>
          </div>
        </div>
      </section>

      {/* Chlorophyll */}
      <section className="mb-8">
        <SectionHeader icon={<Droplets className="h-5 w-5" />} title="Chlorophyll Concentration" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard
              title="Chlorophyll — 7-Day Trend"
              subtitle="Chlorophyll-a concentration near Mumbai Offshore"
              current="1.82 mg/m³"
              change="+30% vs 7d avg"
              changeUp
              source="MODIS Aqua"
            >
              <TrendChart data={chlorophyllTrend} color="#22c55e" unit=" mg/m³" />
            </ChartCard>
          </div>
          <div className="glass p-5">
            <h3 className="font-heading text-sm font-semibold text-white">High-Productivity Areas</h3>
            <div className="mt-3 space-y-2">
              {[
                { name: 'Mumbai Offshore', value: '1.82 mg/m³', level: 'High' },
                { name: 'Goa Deep Sea', value: '1.65 mg/m³', level: 'High' },
                { name: 'Kochi Shelf', value: '1.42 mg/m³', level: 'Medium' },
                { name: 'Chennai Coast', value: '1.28 mg/m³', level: 'Medium' },
              ].map((a) => (
                <div
                  key={a.name}
                  className="flex items-center justify-between rounded-lg border border-cyan-400/10 bg-ocean-800/30 px-3 py-2"
                >
                  <div>
                    <p className="text-xs font-medium text-white">{a.name}</p>
                    <p className="text-[10px] text-cyan-200/50">{a.value}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      a.level === 'High'
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'bg-amber-400/10 text-amber-400'
                    }`}
                  >
                    {a.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compare SST vs Chlorophyll */}
      <section className="mb-8">
        <ChartCard
          title="SST vs Chlorophyll — 7-Day Comparison"
          subtitle="Correlated trend of sea surface temperature and chlorophyll concentration"
          source="NOAA + MODIS Aqua"
        >
          <TrendChart data={sstChlorophyllCompare} color="#f97316" color2="#22c55e" dual unit="°C" height={200} />
        </ChartCard>
      </section>

      {/* Ocean Conditions */}
      <section className="mb-8">
        <SectionHeader icon={<Waves className="h-5 w-5" />} title="Ocean Conditions" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Wave Height — 24 Hours" current="1.8 m" change="Peak 1.9 m" source="INCOIS Wave Watch">
            <TrendChart data={waveTrend} color="#a78bfa" unit=" m" />
          </ChartCard>
          <ChartCard title="Wind Speed — 24 Hours" current="18 km/h" change="Peak 20 km/h" source="IMD">
            <TrendChart data={windTrend} color="#60a5fa" unit=" km/h" />
          </ChartCard>
        </div>
      </section>

      {/* PFZ */}
      <section className="mb-8">
        <SectionHeader
          icon={<Fish className="h-5 w-5" />}
          title="Potential Fishing Zones"
          action={
            <button onClick={() => navigate('/map')} className="btn-ghost !py-1.5 text-xs">
              <MapPin className="h-3.5 w-3.5" /> View on Map
            </button>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          <PfzCard pfz={nearestPfz} onNavigate={() => navigate('/map')} />
          <div className="lg:col-span-2">
            <MarineMap height="320px" highlightPfz />
          </div>
        </div>
      </section>

      {/* Ocean current visualization */}
      <section>
        <SectionHeader icon={<Navigation className="h-5 w-5" />} title="Ocean Current" />
        <div className="glass p-5">
          <p className="text-sm text-cyan-100/70">
            Surface currents near Mumbai Offshore are flowing WSW at approximately 0.4 m/s, reinforcing
            productivity toward the identified PFZ.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3 text-center">
              <p className="label">Direction</p>
              <p className="mt-1 font-display text-lg font-bold text-white">WSW</p>
            </div>
            <div className="rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3 text-center">
              <p className="label">Speed</p>
              <p className="mt-1 font-display text-lg font-bold text-white">0.4 m/s</p>
            </div>
            <div className="rounded-lg border border-cyan-400/10 bg-ocean-800/30 p-3 text-center">
              <p className="label">Trend</p>
              <p className="mt-1 font-display text-lg font-bold text-emerald-400">Stable</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-cyan-300">{icon}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-cyan-400/10 bg-ocean-800/30 px-3 py-2">
      <span className="text-cyan-200/60">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
