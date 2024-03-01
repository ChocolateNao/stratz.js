import type { Match } from './Match.interface';

export interface Series {
  id: number;
  type: number;
  teamOneId: number;
  teamTwoId: number;
  leagueId: number;
  teamOneWinCount: number;
  teamTwoWinCount: number;
  winningTeamId: number;
  matches: Match[];
  lastMatchDate: number;
}
