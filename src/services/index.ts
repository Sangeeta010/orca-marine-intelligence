import type { Agent, ChartPoint, Pfz, ReasoningStep } from '@/types';
import {
  agents as agentDefs,
  chlorophyllTrend,
  evidenceItems,
  nearestPfz,
  reasoningSteps,
  sstTrend,
  waveTrend,
  windTrend,
} from '@/data/mockData';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const marineService = {
  async getSstTrend(): Promise<ChartPoint[]> {
    await delay(200);
    return sstTrend;
  },
  async getChlorophyllTrend(): Promise<ChartPoint[]> {
    await delay(200);
    return chlorophyllTrend;
  },
  async getWaveTrend(): Promise<ChartPoint[]> {
    await delay(200);
    return waveTrend;
  },
};

export const weatherService = {
  async getWindTrend(): Promise<ChartPoint[]> {
    await delay(200);
    return windTrend;
  },
};

export const satelliteService = {
  async getObservations(): Promise<{ count: number; lastPass: string }> {
    await delay(150);
    return { count: 18492, lastPass: '26 Aug 2026, 17:45 IST' };
  },
};

export const gisService = {
  async getNearestPfz(): Promise<Pfz> {
    await delay(200);
    return nearestPfz;
  },
};

export const aiService = {
  async getAgents(): Promise<Agent[]> {
    await delay(100);
    return agentDefs;
  },
  async getReasoning(): Promise<ReasoningStep[]> {
    await delay(150);
    return reasoningSteps;
  },
  async getEvidence(): Promise<string[]> {
    await delay(150);
    return evidenceItems;
  },
};

export type { Agent, ChartPoint, Pfz };
