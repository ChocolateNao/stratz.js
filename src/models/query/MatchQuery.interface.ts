import type { BaseQuery } from './BaseQuery.interface';

export interface BaseMatchQuery extends BaseQuery {
  matchId?: number[];
  include?: string[];
  heroId?: number[];
  leagueId?: number;
  seriesId?: number;
  teamId?: number;
  isParsed?: boolean;
  isLeague?: boolean;
  hasAward?: boolean;
  isStats?: boolean;
  isVictory?: boolean;
  gameMode?: string | string[];
  lobbyType?: string | string[];
  gameVersionId?: number[];
  withFriends?: number[];
  withFriendsHero?: number[];
  lane?: Array<0 | 1 | 2 | 3 | 4 | 255>;
  role?: number;
  tier?: number;
  region?: number[];
  rank?: number[];
  minDuration?: number;
  maxDuration?: number;
  minGameVersionId?: number;
  maxGameVersionId?: number;
  startDateTime?: number;
  endDateTime?: number;
  isParty?: boolean;
  partyCount?: number[];
  isRadiant?: boolean;
  award?: Array<0 | 1 | 2 | 3>;
  isTeam?: boolean;
}

export interface MatchQuery extends BaseMatchQuery {
  playerList?: string;
}

export interface HeroPerformanceQuery extends Omit<BaseMatchQuery, 'include'> {}

export interface PlayerSummaryQuery extends HeroPerformanceQuery {}
