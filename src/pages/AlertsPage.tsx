import { ShieldAlert, Bell } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import AlertCard from '@/components/AlertCard';
import { alerts } from '@/data/mockData';

export default function AlertsPage() {
  const high = alerts.filter((a) => a.severity === 'high').length;
  const medium = alerts.filter((a) => a.severity === 'medium').length;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
      <PageHeader
        title="Marine Safety Alerts"
        subtitle="Real-time marine hazard monitoring across the Indian Ocean region."
        icon={<ShieldAlert className="h-5 w-5" />}
        action={
          <div className="flex gap-3">
            <div className="glass flex items-center gap-2 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              <span className="text-xs text-cyan-100/70">
                <span className="font-bold text-red-400">{high}</span> High
              </span>
            </div>
            <div className="glass flex items-center gap-2 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs text-cyan-100/70">
                <span className="font-bold text-amber-400">{medium}</span> Medium
              </span>
            </div>
          </div>
        }
      />

      {/* Alert banner */}
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
        <Bell className="h-5 w-5 animate-pulse text-red-400" />
        <p className="text-sm text-red-200/90">
          <span className="font-semibold">Active marine alerts in effect.</span> Fishermen and
          coastal operators are advised to review alerts before offshore operations.
        </p>
      </div>

      {/* Alert grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
