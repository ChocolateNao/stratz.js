export interface League {
  id: number;
  basePrizePool: number;
  tier: number;
  startDateTime: number;
  endDateTime: number;
  tournamentUrl: string;
  lastMatchDateTime: number;
  prizePool: number;
  displayName: string;
  status: number;
  description: string;
  pro_circuit_points: number;
  registration_period: number;
  region: number;
  isFollowed: boolean;
}
