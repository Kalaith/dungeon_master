import type { Stats } from '../types/stats';

export async function fetchStats(): Promise<Stats> {
  const stats = await import('../data/stats.json');
  return stats.default as Stats;
}
