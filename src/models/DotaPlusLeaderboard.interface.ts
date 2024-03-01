export interface DotaPlusLeaderboard {
  players: Player[];
}

export interface Player {
  heroId: number;
  steamAccountId: number;
  level: number;
  totalActions: number;
  awardedDateTime: number;
}
