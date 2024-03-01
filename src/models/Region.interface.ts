export interface Region {
  id: number;
  name: string;
  displayName: string;
  langKey?: string;
  latitude: number;
  longitude: number;
  matchGroup: number;
  clientName?: string;
  leaderboardDivision?: LeaderboardDivision;
  code?: string;
  weekendTourneyDivision?: string;
}

export type LeaderboardDivision = 'americas' | 'europe' | 'se_asia' | 'china';
