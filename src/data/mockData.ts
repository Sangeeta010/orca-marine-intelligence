import type {
  Agent,
  ChartPoint,
  DataSource,
  LocationInfo,
  MarineAlert,
  MapMarker,
  Pfz,
  ReasoningStep,
} from '@/types';

export const stats = {
  areasMonitored: '2.4M km²',
  satelliteObservations: '18,492',
  activeAlerts: 12,
  potentialFishingZones: 147,
  aiConfidence: '91.4%',
};

export const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Marine Intelligence', path: '/marine-intelligence' },
  { label: 'Map Explorer', path: '/map' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'Data Sources', path: '/data-sources' },
  { label: 'AI Agents', path: '/ai-agents' },
];

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'gu', label: 'ગુજરાતી' },
];

export const exampleQueries = [
  'Where is the nearest Potential Fishing Zone today?',
  'Show areas with high chlorophyll concentration.',
  'Is it safe for fishing near Mumbai tomorrow?',
  'Find areas with dangerous waves.',
  'Compare SST and chlorophyll conditions over the last 7 days.',
  'Show cyclone risk near the western coast.',
];

export const recentQueries = [
  'Nearest PFZ near Mumbai',
  'Cyclone risk Arabian Sea',
  'SST trend near Goa',
  'Safe fishing areas tomorrow',
  'High chlorophyll zones',
  'Lightning alert Mumbai offshore',
];

export const agents: Agent[] = [
  {
    id: 'intent',
    name: 'Intent Agent',
    role: 'Query Understanding',
    description: 'Understands the user’s natural-language query and routes it to the right specialists.',
    icon: 'MessageSquare',
    status: 'idle',
  },
  {
    id: 'satellite',
    name: 'Satellite Agent',
    role: 'Earth Observation',
    description: 'Analyzes satellite Earth Observation data — SST, chlorophyll, ocean color.',
    icon: 'Satellite',
    status: 'idle',
  },
  {
    id: 'ocean',
    name: 'Ocean Agent',
    role: 'Oceanographic Analysis',
    description: 'Analyzes SST, chlorophyll, ocean currents, wave height, and ocean conditions.',
    icon: 'Waves',
    status: 'idle',
  },
  {
    id: 'weather',
    name: 'Weather Agent',
    role: 'Meteorological Analysis',
    description: 'Analyzes wind, rain, lightning, storms, and cyclones.',
    icon: 'CloudLightning',
    status: 'idle',
  },
  {
    id: 'gis',
    name: 'GIS Agent',
    role: 'Geospatial Reasoning',
    description: 'Performs spatial queries, distance calculations, geospatial filtering, and route analysis.',
    icon: 'Map',
    status: 'idle',
  },
  {
    id: 'safety',
    name: 'Safety Agent',
    role: 'Marine Safety',
    description: 'Evaluates marine hazards and fishing safety conditions.',
    icon: 'ShieldAlert',
    status: 'idle',
  },
  {
    id: 'advisory',
    name: 'Advisory Agent',
    role: 'Final Recommendation',
    description: 'Generates the final actionable recommendation from all agent evidence.',
    icon: 'LifeBuoy',
    status: 'idle',
  },
];

export const nearestPfz: Pfz = {
  id: 'pfz-1',
  name: 'Mumbai Offshore PFZ',
  distanceKm: 42,
  direction: 'Southwest',
  sst: 27.4,
  chlorophyll: 1.82,
  confidence: 87,
  fishAvailability: 'High',
  fishingWindow: '06:00 – 11:00',
  lat: 18.7,
  lng: 72.4,
};

export const mapMarkers: MapMarker[] = [
  { id: 'mumbai', type: 'city', name: 'Mumbai', lat: 19.076, lng: 72.877 },
  { id: 'goa', type: 'city', name: 'Goa', lat: 15.49, lng: 73.82 },
  { id: 'kochi', type: 'city', name: 'Kochi', lat: 9.93, lng: 76.27 },
  { id: 'chennai', type: 'city', name: 'Chennai', lat: 13.08, lng: 80.27 },
  { id: 'vizag', type: 'city', name: 'Visakhapatnam', lat: 17.69, lng: 83.22 },
  { id: 'kolkata', type: 'city', name: 'Kolkata', lat: 22.57, lng: 88.36 },
  { id: 'colombo', type: 'city', name: 'Colombo', lat: 6.93, lng: 79.86 },
  { id: 'pfz1', type: 'pfz', name: 'Mumbai Offshore PFZ', lat: 18.7, lng: 72.4 },
  { id: 'pfz2', type: 'pfz', name: 'Goa Deep Sea PFZ', lat: 14.6, lng: 72.9 },
  { id: 'pfz3', type: 'pfz', name: 'Kochi Shelf PFZ', lat: 9.1, lng: 75.6 },
  { id: 'pfz4', type: 'pfz', name: 'Chennai Coast PFZ', lat: 12.3, lng: 80.9 },
  { id: 'alert1', type: 'alert', name: 'Cyclone — Arabian Sea', lat: 15.2, lng: 68.5, severity: 'high' },
  { id: 'alert2', type: 'alert', name: 'High Wave — West Coast', lat: 16.8, lng: 73.1, severity: 'medium' },
  { id: 'alert3', type: 'alert', name: 'Lightning — Mumbai Offshore', lat: 19.4, lng: 72.5, severity: 'high' },
  { id: 'alert4', type: 'alert', name: 'Strong Wind — Goa Coast', lat: 15.6, lng: 73.7, severity: 'medium' },
  { id: 'mpa1', type: 'mpa', name: 'Marine Protected Area — Gulf of Mannar', lat: 8.8, lng: 78.4 },
  { id: 'mpa2', type: 'mpa', name: 'Marine Protected Area — Malvan', lat: 16.05, lng: 73.45 },
];

export const mapLayers = [
  { id: 'sst', label: 'Sea Surface Temperature', color: '#f97316' },
  { id: 'chlorophyll', label: 'Chlorophyll', color: '#22c55e' },
  { id: 'pfz', label: 'Potential Fishing Zones', color: '#22d3ee' },
  { id: 'wave', label: 'Wave Height', color: '#a78bfa' },
  { id: 'wind', label: 'Wind', color: '#60a5fa' },
  { id: 'rainfall', label: 'Rainfall', color: '#38bdf8' },
  { id: 'cyclone', label: 'Cyclones', color: '#ef4444' },
  { id: 'lightning', label: 'Lightning', color: '#facc15' },
  { id: 'mpa', label: 'Marine Protected Areas', color: '#2dd4bf' },
  { id: 'fishing', label: 'Fishing Zones', color: '#34d399' },
  { id: 'ports', label: 'Ports', color: '#94a3b8' },
];

export const alerts: MarineAlert[] = [
  {
    id: 'a1',
    title: 'Cyclone Alert — Arabian Sea',
    category: 'Cyclone',
    location: 'Arabian Sea (15.2°N, 68.5°E)',
    severity: 'high',
    timestamp: '26 Aug 2026, 17:30 IST',
    duration: 'Next 24–48 hours',
    description:
      'A developing low-pressure system is intensifying in the central Arabian Sea. Cyclonic conditions expected to build over the next 24 hours.',
    action: 'Avoid offshore operations in the western Arabian Sea. Small craft remain in port. Monitor IMD bulletins.',
    lat: 15.2,
    lng: 68.5,
  },
  {
    id: 'a2',
    title: 'High Wave Alert — Western Coast',
    category: 'High Wave',
    location: 'Western Coast (16.8°N, 73.1°E)',
    severity: 'medium',
    timestamp: '26 Aug 2026, 16:45 IST',
    duration: 'Next 12 hours',
    description: 'Significant wave heights of 2.5–3.2 m expected along the western coast due to fresh westerly swell.',
    action: 'Caution for small fishing vessels. Avoid nearshore reef entries.',
    lat: 16.8,
    lng: 73.1,
  },
  {
    id: 'a3',
    title: 'Lightning Alert — Mumbai Offshore',
    category: 'Lightning',
    location: 'Mumbai Offshore (19.4°N, 72.5°E)',
    severity: 'high',
    timestamp: '26 Aug 2026, 17:10 IST',
    duration: 'Next 4–6 hours',
    description: 'Active cumulonimbus cells producing frequent cloud-to-ground lightning offshore Mumbai.',
    action: 'Suspend all fishing operations in the alert polygon. Seek shelter immediately.',
    lat: 19.4,
    lng: 72.5,
  },
  {
    id: 'a4',
    title: 'Strong Wind Alert — Goa Coast',
    category: 'Strong Wind',
    location: 'Goa Coast (15.6°N, 73.7°E)',
    severity: 'medium',
    timestamp: '26 Aug 2026, 15:20 IST',
    duration: 'Next 8 hours',
    description: 'Sustained surface winds of 35–45 km/h with gusts to 55 km/h along the Goa coast.',
    action: 'Small craft advisory in effect. Secure loose gear on decks.',
    lat: 15.6,
    lng: 73.7,
  },
];

export const dataSources: DataSource[] = [
  {
    id: 'isro',
    name: 'ISRO',
    dataType: 'Satellite Earth Observation',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 17:45 IST',
    categories: ['SST', 'Chlorophyll', 'Ocean Color'],
  },
  {
    id: 'mosdac',
    name: 'MOSDAC',
    dataType: 'Satellite Data',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 17:30 IST',
    categories: ['Rainfall', 'Humidity', 'Temperature'],
  },
  {
    id: 'incois',
    name: 'INCOIS',
    dataType: 'Oceanographic Data',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 17:45 IST',
    categories: ['PFZ', 'Wave Height', 'Ocean Currents', 'Tsunami'],
  },
  {
    id: 'imd',
    name: 'IMD',
    dataType: 'Weather & Cyclone Data',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 17:40 IST',
    categories: ['Cyclones', 'Wind', 'Lightning', 'Rainfall'],
  },
  {
    id: 'noaa',
    name: 'NOAA',
    dataType: 'Ocean & Atmospheric Data',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 17:15 IST',
    categories: ['SST', 'Weather', 'Satellite Imagery'],
  },
  {
    id: 'nasa',
    name: 'NASA',
    dataType: 'Earth Observation',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 16:50 IST',
    categories: ['MODIS', 'Chlorophyll', 'Sea Level'],
  },
  {
    id: 'copernicus',
    name: 'Copernicus Marine',
    dataType: 'Marine Data',
    status: 'Syncing',
    lastUpdated: '26 Aug 2026, 17:00 IST',
    categories: ['Wave Height', 'Currents', 'Biogeochemistry'],
  },
  {
    id: 'osm',
    name: 'OpenStreetMap',
    dataType: 'Geospatial Data',
    status: 'Connected',
    lastUpdated: '26 Aug 2026, 14:00 IST',
    categories: ['Coastline', 'Ports', 'Boundaries'],
  },
];

export const sstTrend: ChartPoint[] = [
  { label: '20 Aug', value: 26.8 },
  { label: '21 Aug', value: 27.0 },
  { label: '22 Aug', value: 27.1 },
  { label: '23 Aug', value: 27.3 },
  { label: '24 Aug', value: 27.2 },
  { label: '25 Aug', value: 27.5 },
  { label: '26 Aug', value: 27.4 },
];

export const chlorophyllTrend: ChartPoint[] = [
  { label: '20 Aug', value: 1.4 },
  { label: '21 Aug', value: 1.55 },
  { label: '22 Aug', value: 1.6 },
  { label: '23 Aug', value: 1.72 },
  { label: '24 Aug', value: 1.68 },
  { label: '25 Aug', value: 1.8 },
  { label: '26 Aug', value: 1.82 },
];

export const waveTrend: ChartPoint[] = [
  { label: '00:00', value: 1.4 },
  { label: '04:00', value: 1.5 },
  { label: '08:00', value: 1.7 },
  { label: '12:00', value: 1.8 },
  { label: '16:00', value: 1.9 },
  { label: '20:00', value: 1.8 },
  { label: '23:00', value: 1.6 },
];

export const windTrend: ChartPoint[] = [
  { label: '00:00', value: 12 },
  { label: '04:00', value: 14 },
  { label: '08:00', value: 16 },
  { label: '12:00', value: 18 },
  { label: '16:00', value: 20 },
  { label: '20:00', value: 17 },
  { label: '23:00', value: 15 },
];

export const sstChlorophyllCompare: ChartPoint[] = sstTrend.map((p, i) => ({
  label: p.label,
  value: p.value,
  value2: chlorophyllTrend[i]?.value ?? 0,
}));

export const reasoningSteps: ReasoningStep[] = [
  { step: 1, text: 'High chlorophyll concentration (1.82 mg/m³) detected at the target zone.' },
  { step: 2, text: 'SST is within the favorable range (27.4°C) for pelagic fish aggregation.' },
  { step: 3, text: 'Ocean current is moving toward the identified region, reinforcing productivity.' },
  { step: 4, text: 'Weather conditions are currently suitable, with moderate wind (18 km/h).' },
  { step: 5, text: 'No major marine hazard detected in the immediate PFZ polygon.' },
  { step: 6, text: 'GIS analysis found the zone 42 km southwest of the selected location.' },
  { step: 7, text: 'Combined evidence indicates a high-potential fishing zone.' },
];

export const evidenceItems = [
  'MODIS Aqua · Chlorophyll-a · 26 Aug 2026 · 1.82 mg/m³',
  'NOAA SST · 26 Aug 2026 · 27.4°C',
  'INCOIS PFZ Advisory · 26 Aug 2026 · Zone SW-042',
  'IMD Wind Analysis · 26 Aug 2026 · 18 km/h WSW',
  'Wave Watch III · Significant Wave Height · 1.8 m',
  'OSM Coastline · Mumbai Offshore · 19.076°N, 72.877°E',
];

export const locationInfo: LocationInfo = {
  name: 'Mumbai Offshore',
  lat: 19.076,
  lng: 72.877,
  sst: 27.4,
  chlorophyll: 1.82,
  waveHeight: 1.8,
  windSpeed: 18,
  fishingPotential: 'High',
  safety: 'Moderate',
};

export const notifications = [
  {
    id: 'n1',
    title: 'Marine Alert',
    body: 'High waves detected near Mumbai.',
    time: '10 min ago',
  },
  {
    id: 'n2',
    title: 'Cyclone Update',
    body: 'Cyclone risk increased in Arabian Sea.',
    time: '25 min ago',
  },
  {
    id: 'n3',
    title: 'PFZ Advisory',
    body: 'New Potential Fishing Zone identified 42 km SW.',
    time: '1 hr ago',
  },
];

export const safetyData = {
  waveRisk: 'medium' as const,
  waveHeight: 1.8,
  windRisk: 'low' as const,
  windSpeed: 18,
  lightning: 'low' as const,
  cyclone: 'low' as const,
  overall: 'SAFE FOR NORMAL FISHING',
};

export const emergencySafetyData = {
  waveRisk: 'high' as const,
  waveHeight: 3.4,
  windRisk: 'high' as const,
  windSpeed: 52,
  lightning: 'high' as const,
  cyclone: 'medium' as const,
  overall: 'HIGH MARINE RISK',
};
