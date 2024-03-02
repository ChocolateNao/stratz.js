import type { BaseQuery } from './BaseQuery.interface';

export interface SearchByPlayerQuery extends Omit<BaseQuery, 'skip'> {
  query: string;
  minRank?: number;
  maxRank?: number;
  leaderboardRegion?: Array<0 | 1 | 2 | 3>;
  lastSeen?: number;
}

export interface SearchQuery extends SearchByPlayerQuery {
  tiers?: Array<1 | 2 | 3 | 4 | 5>;
  isPro?: boolean;
}
