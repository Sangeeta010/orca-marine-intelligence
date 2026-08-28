import { useMemo, useState } from 'react';
import { mapLayers, mapMarkers } from '@/data/mockData';
import type { MapMarker } from '@/types';

interface MarineMapProps {
  height?: string;
  showControls?: boolean;
  highlightPfz?: boolean;
  onMarkerClick?: (marker: MapMarker) => void;
  activeLayers?: string[];
  onLayerToggle?: (id: string) => void;
  interactive?: boolean;
}

// Stylized Indian Ocean region map — custom SVG, dark ocean theme.
// Coordinate projection: lat 5–24, lng 66–90 → svg viewBox 0..800 x 0..600
function project(lat: number, lng: number): [number, number] {
  const x = ((lng - 66) / (90 - 66)) * 800;
  const y = ((24 - lat) / (24 - 5)) * 600;
  return [x, y];
}

// Simplified Indian coastline path (approximate, stylized)
const COASTLINE =
  'M 70 380 L 120 350 L 160 320 L 200 280 L 250 240 L 300 210 L 340 180 L 380 150 L 420 130 L 460 110 L 500 95 L 540 80 L 580 70 L 620 60 L 650 55 L 680 60 L 700 75 L 710 100 L 705 130 L 690 160 L 670 190 L 645 220 L 620 250 L 600 280 L 590 310 L 585 340 L 580 370 L 575 400 L 565 430 L 545 460 L 520 485 L 490 500 L 460 510 L 430 515 L 400 510 L 370 495 L 340 470 L 310 440 L 280 410 L 250 385 L 220 365 L 190 350 L 160 345 L 130 350 L 100 360 L 70 380 Z';

const markerColor: Record<MapMarker['type'], string> = {
  pfz: '#22d3ee',
  alert: '#ef4444',
  port: '#94a3b8',
  city: '#67e8f9',
  mpa: '#2dd4bf',
};

export default function MarineMap({
  height = '500px',
  showControls = true,
  highlightPfz = false,
  onMarkerClick,
  activeLayers: controlledLayers,
  onLayerToggle,
  interactive = true,
}: MarineMapProps) {
  const [internalLayers, setInternalLayers] = useState<string[]>([
    'sst',
    'chlorophyll',
    'pfz',
    'cyclone',
    'mpa',
  ]);
  const layers = controlledLayers ?? internalLayers;
  const toggle = (id: string) => {
    if (onLayerToggle) {
      onLayerToggle(id);
    } else {
      setInternalLayers((prev) =>
        prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
      );
    }
  };

  const [hovered, setHovered] = useState<string | null>(null);

  const markers = useMemo(() => {
    let visible = mapMarkers;
    if (!layers.includes('pfz')) visible = visible.filter((m) => m.type !== 'pfz');
    if (!layers.includes('cyclone') && !layers.includes('lightning'))
      visible = visible.filter((m) => m.type !== 'alert');
    if (!layers.includes('mpa')) visible = visible.filter((m) => m.type !== 'mpa');
    return visible;
  }, [layers]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-ocean-950/60 shadow-card">
      <div className="relative" style={{ height }}>
        <svg
          viewBox="0 0 800 600"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#0e7490" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0b1220" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#050a14" stopOpacity="0.8" />
            </radialGradient>
            <radialGradient id="sstGrad" cx="55%" cy="55%" r="40%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="chlGrad" cx="40%" cy="50%" r="35%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cycGrad" cx="35%" cy="60%" r="25%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeOpacity="0.05" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Ocean base */}
          <rect width="800" height="600" fill="url(#oceanGrad)" />
          <rect width="800" height="600" fill="url(#grid)" />

          {/* Data overlays */}
          {layers.includes('sst') && <rect width="800" height="600" fill="url(#sstGrad)" />}
          {layers.includes('chlorophyll') && <rect width="800" height="600" fill="url(#chlGrad)" />}
          {layers.includes('cyclone') && <rect width="800" height="600" fill="url(#cycGrad)" />}
          {layers.includes('wave') && (
            <g opacity="0.4">
              {[100, 200, 300, 400, 500].map((y) => (
                <path
                  key={y}
                  d={`M 50 ${y} Q 150 ${y - 15}, 250 ${y} T 450 ${y} T 650 ${y} T 850 ${y}`}
                  fill="none"
                  stroke="#a78bfa"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                />
              ))}
            </g>
          )}
          {layers.includes('wind') && (
            <g opacity="0.5">
              {Array.from({ length: 6 }).map((_, i) =>
                Array.from({ length: 8 }).map((_, j) => {
                  const x = 60 + j * 95;
                  const y = 60 + i * 85;
                  return (
                    <g key={`${i}-${j}`}>
                      <line
                        x1={x}
                        y1={y}
                        x2={x + 18}
                        y2={y + 8}
                        stroke="#60a5fa"
                        strokeOpacity="0.3"
                        strokeWidth="1"
                        markerEnd="url(#windArrow)"
                      />
                    </g>
                  );
                })
              )}
              <defs>
                <marker id="windArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" fillOpacity="0.4" />
                </marker>
              </defs>
            </g>
          )}

          {/* Coastline (landmass) */}
          <path d={COASTLINE} fill="#0b1f2a" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d={COASTLINE} fill="none" stroke="#22d3ee" strokeOpacity="0.15" strokeWidth="4" />

          {/* PFZ highlight route line */}
          {highlightPfz && (
            <g>
              <line
                x1={project(19.076, 72.877)[0]}
                y1={project(19.076, 72.877)[1]}
                x2={project(18.7, 72.4)[0]}
                y2={project(18.7, 72.4)[1]}
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-dash-flow"
                filter="url(#glow)"
              />
            </g>
          )}

          {/* Markers */}
          {markers.map((m) => {
            const [x, y] = project(m.lat, m.lng);
            const isPfz = m.type === 'pfz';
            const isAlert = m.type === 'alert';
            const color = markerColor[m.type];
            const r = isPfz ? 7 : isAlert ? 6 : 4;
            return (
              <g
                key={m.id}
                transform={`translate(${x},${y})`}
                className={interactive ? 'cursor-pointer' : ''}
                onClick={() => interactive && onMarkerClick?.(m)}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {isPfz && (
                  <>
                    <circle r={r} fill={color} fillOpacity="0.2" className="animate-pulse-ring origin-center" />
                    <circle r={r} fill={color} fillOpacity="0.15" className="animate-pulse-ring origin-center" style={{ animationDelay: '1s' }} />
                  </>
                )}
                <circle
                  r={r}
                  fill={color}
                  fillOpacity={0.85}
                  stroke={color}
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  filter="url(#glow)"
                />
                {m.type === 'city' && (
                  <text
                    y={-r - 5}
                    textAnchor="middle"
                    fill="#a5f3fc"
                    fontSize="11"
                    fontWeight="500"
                  >
                    {m.name}
                  </text>
                )}
                {hovered === m.id && m.type !== 'city' && (
                  <g>
                    <rect
                      x={r + 6}
                      y={-12}
                      width={Math.max(m.name.length * 6.5, 60)}
                      height="22"
                      rx="5"
                      fill="#050a14"
                      fillOpacity="0.9"
                      stroke={color}
                      strokeOpacity="0.4"
                    />
                    <text x={r + 12} y="3" fill="#e6f7fb" fontSize="10.5" fontWeight="500">
                      {m.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Region labels */}
          <text x="250" y="300" fill="#22d3ee" fillOpacity="0.3" fontSize="22" fontWeight="600" fontFamily="Space Grotesk">
            Arabian Sea
          </text>
          <text x="540" y="220" fill="#22d3ee" fillOpacity="0.3" fontSize="22" fontWeight="600" fontFamily="Space Grotesk">
            Bay of Bengal
          </text>
          <text x="430" y="560" fill="#22d3ee" fillOpacity="0.25" fontSize="20" fontWeight="600" fontFamily="Space Grotesk">
            Indian Ocean
          </text>
        </svg>

        {/* Floating compass */}
        <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-ocean-950/60 text-xs font-bold text-cyan-300 backdrop-blur">
          N
        </div>

        {/* Scale */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[10px] text-cyan-200/50">
          <div className="h-0.5 w-16 bg-cyan-300/40" />
          500 km
        </div>
      </div>

      {/* Layer controls */}
      {showControls && (
        <div className="border-t border-cyan-400/10 bg-ocean-950/60 px-3 py-2.5">
          <div className="flex flex-wrap gap-1.5">
            {mapLayers.map((layer) => {
              const active = layers.includes(layer.id);
              return (
                <button
                  key={layer.id}
                  onClick={() => toggle(layer.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    active
                      ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                      : 'border-cyan-400/10 bg-ocean-900/40 text-cyan-100/50 hover:text-cyan-200'
                  }`}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: active ? layer.color : 'transparent', border: `1px solid ${layer.color}` }}
                  />
                  {layer.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
