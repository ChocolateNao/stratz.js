import type {
  ChatEvent,
  LaneReport,
  PickBan,
  Player,
  TowerDeath,
  TowerStatus,
} from './Match.interface';
import type { Identity } from './Player.interface';
import type { SteamAccount } from './SteamAccount.interface';

export interface User {
  steamAccount: SteamAccount;
  profile: Identity;
  recentMatch: RecentMatch;
  followingCount: number;
  followerCount: number;
  followingLeagueCount: number;
  followingTeamCount: number;
}

export interface RecentMatch {
  id: number;
  didRadiantWin: boolean;
  durationSeconds: number;
  startDateTime: number;
  clusterId: number;
  firstBloodTime: number;
  lobbyType: number;
  numHumanPlayers: number;
  gameMode: number;
  isStats: boolean;
  avgImp: number;
  parsedDateTime: number;
  statsDateTime: number;
  gameVersionId: number;
  regionId: number;
  sequenceNum: number;
  rank: number;
  bracket: number;
  endDateTime: number;
  pickBans: PickBan[];
  players: Player[];
  analysisOutcome: number;
  predictedOutcomeWeight: number;
  bottomLaneOutcome: number;
  midLaneOutcome: number;
  topLaneOutcome: number;
  radiantNetworthLead: number[];
  radiantExperienceLead: number[];
  radiantKills: number[];
  direKills: number[];
  towerStatus: TowerStatus[];
  laneReport: LaneReport;
  winRates: number[];
  predictedWinRates: number[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  didRequestDownload: boolean;
}
