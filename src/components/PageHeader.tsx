import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, icon, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            {icon}
          </div>
        )}
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          {subtitle && <p className="mt-1 text-sm text-cyan-200/60">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
