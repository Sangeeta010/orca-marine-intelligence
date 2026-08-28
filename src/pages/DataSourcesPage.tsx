import { Database } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import DataSourceCard from '@/components/DataSourceCard';
import { dataSources } from '@/data/mockData';

export default function DataSourcesPage() {
  const connected = dataSources.filter((d) => d.status === 'Connected').length;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Marine Data Sources"
        subtitle="Trusted Earth Observation, meteorological and oceanographic data sources."
        icon={<Database className="h-5 w-5" />}
        action={
          <div className="glass flex items-center gap-2 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-cyan-100/70">
              <span className="font-bold text-emerald-400">{connected}</span> / {dataSources.length} Connected
            </span>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataSources.map((source) => (
          <DataSourceCard key={source.id} source={source} />
        ))}
      </div>

      {/* Info note */}
      <div className="mt-8 glass p-5">
        <h3 className="font-heading text-sm font-semibold text-white">About ORCA Data Integration</h3>
        <p className="mt-2 text-sm leading-relaxed text-cyan-100/60">
          ORCA integrates multiple national and international data sources to provide comprehensive
          marine intelligence. Data is retrieved, normalized, and fused by the collaborative AI agent
          pipeline. This prototype uses mock data — the service layer is structured so real APIs can
          be connected without changing the application.
        </p>
      </div>
    </div>
  );
}
