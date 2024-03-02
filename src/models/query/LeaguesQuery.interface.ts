import type { BaseQuery } from './BaseQuery.interface';

export interface LeaguesQuery extends BaseQuery {
  tier?: Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>;
  requireImage?: boolean;
  orderBy?: string;
}

export interface LeaguesByIdQuery extends LeaguesQuery {
  include?: string[];
  steamId?: number;
  seriesId?: number;
  teamId?: number;
  isParsed?: boolean;
  isLeague?: boolean;
  hasAward?: boolean;
  isStats?: boolean;
  stageType?: string[];
  gameMode?: string;
  lobbyType?: string;
  gameVersion?: number[];
}
