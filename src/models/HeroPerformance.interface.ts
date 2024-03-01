export interface HeroPerformance {
  heroId: number;
  winCount: number;
  kda: number;
  duration: number;
  imp: number;
  best: number;
  matchCount: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  positionScore: PositionScore[];
  lastPlayed: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
}

export interface PositionScore {
  id: number;
  score: number;
  matchCount: number;
  winCount: number;
  imp: number;
}
