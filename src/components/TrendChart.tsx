import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartPoint } from '@/types';

interface TrendChartProps {
  data: ChartPoint[];
  color?: string;
  area?: boolean;
  unit?: string;
  height?: number;
  dual?: boolean;
  color2?: string;
}

export default function TrendChart({
  data,
  color = '#22d3ee',
  area = true,
  unit = '',
  height = 180,
  dual = false,
  color2 = '#22c55e',
}: TrendChartProps) {
  const id = color.replace('#', '');
  return (
    <ResponsiveContainer width="100%" height={height}>
      {area ? (
        <AreaChart data={data} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={48} />
          <Tooltip formatter={(v) => `${v}${unit}`} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#g-${id})`}
            dot={{ r: 2, fill: color }}
          />
          {dual && (
            <Area
              type="monotone"
              dataKey="value2"
              stroke={color2}
              strokeWidth={2}
              fill="none"
              strokeDasharray="4 3"
              dot={{ r: 2, fill: color2 }}
            />
          )}
        </AreaChart>
      ) : (
        <LineChart data={data} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} width={48} />
          <Tooltip formatter={(v) => `${v}${unit}`} />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 2, fill: color }} />
          {dual && (
            <Line
              type="monotone"
              dataKey="value2"
              stroke={color2}
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={{ r: 2, fill: color2 }}
            />
          )}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}
