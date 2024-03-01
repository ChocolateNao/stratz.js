import type { SteamAccount } from './SteamAccount.interface';

export interface StratzPlayer {
  identity: Identity;
  steamAccount: SteamAccount;
  battlePass: BattlePass[];
  date: number;
  lastRegionId: number;
  ranks: Rank[];
  languageCode: any[];
  firstMatchDate: number;
  matchCount: number;
  winCount: number;
  names: Name[];
  team: Team;
  behaviorScore: number;
  steamAccountId: number;
  isFollowed: boolean;
}

export interface StratzPlayerBasic {
  steamAccount: SteamAccount;
  steamAccountId: number;
}

export interface PlayerSummary {
  allTime: AllTime;
  sixMonths: SixMonths;
  oneMonth: OneMonth;
}

export type SixMonths = AllTime;

export interface AllTime {
  matches: MatchBrief;
  isStatsMatches: MatchBrief[];
  rankMatches: MatchBrief[];
  lobbyMatches: MatchBrief[];
  gameModeMatches: MatchBrief[];
  factionMatches: MatchBrief[];
  regionMatches: MatchBrief[];
  laneMatches: MatchBrief[];
  roleMatches: MatchBrief[];
  partyMatches: MatchBrief[];
  impMatches: MatchBrief[];
  durationMatches: MatchBrief[];
  heroAttributeMatches: MatchBrief[];
  dayOfWeekMatches: MatchBrief[];
  timeOfDayMatches: MatchBrief[];
  weekEndMatches: MatchBrief[];
}

export interface MatchBrief {
  id?: number;
  matchCount: number;
  win: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  date: number;
  imp?: number;
}

export interface OneMonth {
  matches: OneMonthMatches;
  isStatsMatches: any[];
  rankMatches: any[];
  lobbyMatches: any[];
  gameModeMatches: any[];
  factionMatches: any[];
  regionMatches: any[];
  laneMatches: any[];
  roleMatches: any[];
  partyMatches: any[];
  impMatches: any[];
  durationMatches: any[];
  heroAttributeMatches: any[];
  dayOfWeekMatches: any[];
  timeOfDayMatches: any[];
  weekEndMatches: any[];
}

export interface OneMonthMatches {
  matchCount: number;
  win: number;
}

export interface BattlePass {
  eventId: number;
  level: number;
  countryCode: string;
  bracket: number;
  isAnonymous: boolean;
}

export interface Identity {
  captainJackIdentityId: string;
  name: string;
  feedLevel: number;
  emailLevel: number;
  dailyEmail: boolean;
  weeklyEmail: boolean;
  monthlyEmail: boolean;
  proCircuitFeedLevel: number;
  proCircuitEmailLevel: number;
  themeType: number;
  languageId: number;
  isEmailValidated: boolean;
  emailHour: number;
  lastDailyEmail: number;
  lastWeeklyEmail: number;
  lastMonthlyEmail: number;
  lastLeagueDailyEmail: number;
  lastTeamDailyEmail: number;
  lastProCircuitDailyEmail: number;
  unsubscribeCode: string;
  steamAccountId: number;
}

export interface Name {
  name: string;
  lastseendatetime: number;
}

export interface Rank {
  seasonRankId: number;
  asOfDateTime: Date;
  isCore: boolean;
  rank: number;
}

export interface Team {
  teamId: number;
  firstMatchId: number;
  firstMatchDateTime: Date;
  lastMatchId: number;
  lastMatchDateTime: Date;
}
