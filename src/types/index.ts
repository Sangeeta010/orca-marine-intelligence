export type Severity = 'low' | 'medium' | 'high' | 'extreme';

export type AgentStatus = 'completed' | 'processing' | 'waiting' | 'idle';

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  status: AgentStatus;
}

export interface Pfz {
  id: string;
  name: string;
  distanceKm: number;
  direction: string;
  sst: number;
  chlorophyll: number;
  confidence: number;
  fishAvailability: 'Low' | 'Medium' | 'High';
  fishingWindow: string;
  lat: number;
  lng: number;
}

export interface MarineAlert {
  id: string;
  title: string;
  category: 'Cyclone' | 'High Wave' | 'Lightning' | 'Strong Wind' | 'Storm Surge';
  location: string;
  severity: Severity;
  timestamp: string;
  duration: string;
  description: string;
  action: string;
  lat: number;
  lng: number;
}

export interface DataSource {
  id: string;
  name: string;
  dataType: string;
  status: 'Connected' | 'Degraded' | 'Syncing';
  lastUpdated: string;
  categories: string[];
}

export interface MapMarker {
  id: string;
  type: 'pfz' | 'alert' | 'port' | 'city' | 'mpa';
  name: string;
  lat: number;
  lng: number;
  severity?: Severity;
}

export interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
  sst: number;
  chlorophyll: number;
  waveHeight: number;
  windSpeed: number;
  fishingPotential: 'Low' | 'Medium' | 'High';
  safety: 'Safe' | 'Moderate' | 'High Risk';
}

export interface ReasoningStep {
  step: number;
  text: string;
}

export interface ChartPoint {
  label: string;
  value: number;
  value2?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
  reasoning?: ReasoningStep[];
  pfz?: Pfz;
  safety?: {
    waveRisk: Severity;
    waveHeight: number;
    windRisk: Severity;
    windSpeed: number;
    lightning: Severity;
    cyclone: Severity;
    overall: string;
  };
  confidence?: number;
  evidence?: string[];
}
