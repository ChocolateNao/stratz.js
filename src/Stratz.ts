import type { IncomingMessage } from 'node:http';
import https from 'node:https';
import type { ParsedUrlQueryInput } from 'node:querystring';
import querystring from 'node:querystring';

import { StratzLanguage } from './enums/StratzLanguage.enum';
import { HttpException } from './exceptions/http.exception';
import type { Ability } from './models/Ability.interface';
import type { Cluster } from './models/Cluster.interface';
import type { AbilityList, HeroList } from './models/DataList.interface';
import type { DotaPlusLeaderboard } from './models/DotaPlusLeaderboard.interface';
import type { ESportsPlayer } from './models/ESportsPlayer.interface';
import type { GameMode } from './models/GameMode.interface';
import type { GameVersion } from './models/GameVersion.interface';
import type { Hero } from './models/Hero.interface';
import type { HeroPerformance } from './models/HeroPerformance.interface';
import type { Item } from './models/Item.interface';
import type { League } from './models/League.interface';
import type { LobbyType } from './models/LobbyType.interface';
import type {
  Match,
  MatchBreakdown,
  MatchDetailed,
} from './models/Match.interface';
import type { Npc } from './models/Npc.interface';
import type { NumRange } from './models/NumRange.type';
import {
  type PlayerSummary,
  type StratzPlayer,
  type StratzPlayerBasic,
} from './models/Player.interface';
import type {
  LeaguesByIdQuery,
  LeaguesQuery,
} from './models/query/LeaguesQuery.interface';
import type {
  HeroPerformanceQuery,
  MatchQuery,
  PlayerSummaryQuery,
} from './models/query/MatchQuery.interface';
import type {
  SearchByPlayerQuery,
  SearchQuery,
} from './models/query/SearchQuery.interface';
import type { Region } from './models/Region.interface';
import type { Series } from './models/Series.interface';
import type { User } from './models/User.interface';

/**
 * Provides access to the STRATZ REST API. This is the first thing you do to start.
 */
class Stratz {
  private readonly _apiToken: string;
  private readonly _host: string = 'api.stratz.com';
  private readonly _basePath: string = '/api/v1';

  /**
   * Create a new instance of STRATZ REST API wrapper. This is the first thing you do to start.
   * @param {string} apiToken - Your API token. You can get yours for free at https://stratz.com/api.
   */
  constructor(apiToken: string) {
    this._apiToken = apiToken;
  }

  /**
   * Create a direct HTTP request to the STRATZ API.
   * @internal
   * @param {string} path - Endpoint path.
   * @param {string} method - HTTPS method.
   * @param {*} [queryParameters] - Query parameters for the request.
   * @return {Promise<HttpExceptionBody | any>} Promise object that resolves with the result object of the HTTPS request OR the error object of type `HttpExceptionBody`.
   */
  private async _apiReq(
    path: string,
    method: string,
    queryParameters?: ParsedUrlQueryInput | undefined,
  ): Promise<any> {
    return await new Promise((resolve, reject) => {
      if (!this._apiToken) {
        reject(new Error('No token provided.'));
      }

      let fullPath = `${this._basePath}${path}`;
      if (queryParameters) {
        const queryString = querystring.stringify(queryParameters);
        fullPath += `?${queryString}`;
      }

      const options = {
        hostname: this._host,
        path: fullPath,
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._apiToken}`,
        },
      };

      https
        .request(options, (response: IncomingMessage) => {
          let data = '';

          response.on('data', (chunk: string) => {
            data = data + chunk;
          });

          response.on('end', () => {
            if (response.statusCode === 302) {
              resolve({ statusCode: response.statusCode, message: 'Found' });
            }
            if (response.statusCode === 204) {
              reject(
                new HttpException(
                  response.statusCode,
                  'No Content',
                  'The request was processed but no content was found with given parameters',
                ).initBody(),
              );
            }
            if (
              response.statusCode &&
              response.statusCode !== 204 &&
              response.statusCode >= 200 &&
              response.statusCode < 300
            ) {
              resolve(JSON.parse(data));
            } else {
              reject(new HttpException(response.statusCode ?? 500).initBody());
            }
          });

          response.on('error', (error: string) => {
            reject(
              new HttpException(response.statusCode ?? 500, error).initBody(),
            );
          });
        })
        .end();
    });
  }

  /**
   * All information retaining to the Dota 2 Abilities by Game Version.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Record<string, Ability>} Promise object that resolves to JSON response represented by GET `/Ability`.
   */
  async getAbilities(
    languageId: number | string = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<Record<string, Ability>> {
    return await this._apiReq(`/Ability`, 'GET', { languageId, gameVersionId });
  }

  /**
   * The list of game versions the Dota 2 game has gone through.
   * @return {Promise<GameVersion[]>} Promise object that resolves to JSON response represented by GET `/GameVersion`.
   */
  async getGameVersion(): Promise<GameVersion[]> {
    return await this._apiReq('/GameVersion', 'GET');
  }

  /**
   * Returns the list of languages which STRATZ supports.
   * @return {Promise<Record<string, string>>} Promise object that resolves to JSON response represented by GET `/Language`.
   */
  async getLanguages(): Promise<Record<string, string>> {
    return await this._apiReq('/Language', 'GET');
  }

  /**
   * Provided directly from Dota 2 Region files, the cluster is the geographically breakdown of where the game is played.
   * @return {Promise<Cluster[]>} Promise object that resolves to JSON response represented by GET `/Cluster`.
   */
  async getCluster(): Promise<Cluster[]> {
    return await this._apiReq('/Cluster', 'GET');
  }

  /**
   * Returns a list of GameMode types which is directly supplied by Dota 2. Matches API call will have a input for this value.
   * @return {Promise<Record<string, GameMode>>} Promise object that resolves to JSON response represented by GET `/GameMode`.
   */
  async getGameMode(): Promise<Record<string, GameMode>> {
    return await this._apiReq('/GameMode', 'GET');
  }

  /**
   * The current list of Heroes found in the Dota 2 client. Includes all base stats plus additional information on the hero.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Record<string, Hero>>} Promise object that resolves to JSON response represented by GET `/Hero`.
   */
  async getHeroes(
    languageId: number | string = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<Record<string, Hero>> {
    return await this._apiReq(`/Hero`, 'GET', { languageId, gameVersionId });
  }

  /**
   * List of Items in the Dota 2 Game and details about each.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Record<string, Item>>} Promise object that resolves to JSON response represented by GET `/Item`.
   */
  async getItems(
    languageId: number | string = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<Record<string, Item>> {
    return await this._apiReq(`/Item`, 'GET', { languageId, gameVersionId });
  }

  /**
   * More specific details about the Item ID.
   * @param {number} id - The Item ID requested. <br />`Required.`
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Item>} Promise object that resolves to JSON response represented by GET `/Item/{id}`.
   */
  async getItemById(
    id: number | string,
    gameVersionId?: number | string,
  ): Promise<Item> {
    return await this._apiReq(`/Item/${id}`, 'GET', { gameVersionId });
  }

  /**
   * All information retaining to the Dota 2 Npcs by Game Version.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Record<string, Npc>>} Promise object that resolves to JSON response represented by GET `/Npc`.
   */
  async getNpc(gameVersionId?: number): Promise<Record<string, Npc>> {
    return await this._apiReq(`/Npc`, 'GET', { gameVersionId });
  }

  /**
   * Returns the list of Leagues limited by the queries.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - The type of league your requested limit by Dota 2 filter of Tier. Accepted : 1 - Amateur, 2 - Professional, 3 - DPC Minors (Premium), 4 - DPC Majors (Premium). <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   * @param {number} [queryParameters.skip] - The amount to skip before returning results.
   * @param {number} [queryParameters.take] - The amount of results to take. <br/>`Max amount 100`.
   * @param {boolean} [queryParameters.requireImage] - If the league must have an image to return.
   * @param {string} [queryParameters.orderBy] - The determiantion of the order of the results returned. Accepted inputs are `LastMatchTime` and `Id`. <br/>Default is `LastMatchTime`.
   * @returns {Promise<League[]>} Promise object that resolves to JSON response represented by GET `/League`.
   */
  async getLeagues(queryParameters?: LeaguesQuery): Promise<League[]> {
    return await this._apiReq(`/league`, 'GET', queryParameters);
  }

  /**
   * Return more data about a specific League.
   * @param {number} id - League ID. <br />`Required.`
   * @return {Promise<League>} Promise object that resolves to JSON response represented by GET `/League/{id}`.
   */
  async getLeagueById(id: number | string | string): Promise<League> {
    return await this._apiReq(`/league/${id}`, 'GET');
  }

  /**
   *
   * @param {number} id - League ID. <br />`Required.`
   * @param {string[]} [queryParameters.include] - Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. Accepted Values: Player, Series, League, Team, Ability, PickBan, HeroImp. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). HeroImp will return the AvgImp values.
   * @param {number} [queryParameters.steamId] - Requests matches where Steam Account Id is present.
   * @param {number} [queryParameters.seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
   * @param {number} [queryParameters.teamId] - Requests matches where a specific Team is present.
   * @param {boolean} [queryParameters.isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both `Parsed` and `Un-parsed`.
   * @param {boolean} [queryParameters.isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
   * @param {boolean} [queryParameters.hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
   * @param {boolean} [queryParameters.isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both `Stats` and `Non-stats` matches.
   * @param {string[]} [queryParameters.stageType] - For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically.
   * @param {string} [queryParameters.gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. This is a comma delimited `array` input.
   * @param {string} [queryParameters.lobbyType] - Requests matches where a specific or group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.gameVersion] - Requests matches where a specific or group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - The type of league your requested limit by Dota 2 filter of Tier. <br />Accepted: `1` - Amateur, `2` - Premium, `3` - Professional.
   * @param {number} [queryParameters.take] - The amount of matches that will be returned. <br />The max value is `250`.
   * @param {number} [queryParameters.skip] - The amount of matches that will be skipped before turning rows.
   * @returns {Promise<Match[]>} Promise object that resolves to JSON response represented by GET `/League/{id}/matches`.
   */
  async getLeagueByIdMatches(
    id: number | string,
    queryParameters?: LeaguesByIdQuery,
  ): Promise<Match[]> {
    return await this._apiReq(`/league/${id}/matches`, 'GET', queryParameters);
  }

  /**
   * Returns a list of Series Ids with the Match Data included.
   * @param {number} id - League ID. <br/>`Required.`
   * @param {string[]} [stageType] - For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically.
   * @param {number} [take] - The amount of matches that will be returned. <br />The max value is `250`.
   * @param {number} [skip] - The amount of matches that will be skipped before turning rows.
   * @return {Promise<Series[]>} Promise object that resolves to JSON response represented by GET `/League/{id}/series`.
   */
  async getLeagueByIdSeries(
    id: number | string | string,
    stageType?: any[],
    take?: NumRange<0, 251>,
    skip?: number,
  ): Promise<Series[]> {
    return await this._apiReq(`/league/${id}/series`, 'GET', {
      id,
      stageType,
      take,
      skip,
    });
  }

  /**
   * Returns a list of Lobby Type which are mirrored from the Dota 2 client.
   * @return {Promise<Record<string, LobbyType>>} Promise object that resolves to JSON response represented by GET `/lobbyType`.
   */
  async getLobbyType(): Promise<Record<string, LobbyType>> {
    return await this._apiReq(`/lobbyType`, 'GET');
  }

  /**
   * A very in depth return of data about the match. <br />Very large, about 500kb in size.
   * @param {number} id - The Match ID requested. <br />`Required.`
   * @return {Promise<MatchDetailed>} Promise object that resolves to JSON response represented by GET `/match/{id}`.
   */
  async getMatchById(id: number | string): Promise<MatchDetailed> {
    return await this._apiReq(`/match/${id}`, 'GET');
  }

  /**
   * Should a match fail to download or a new parse is needed for new data, call retry will tell our system to download this match again. <br />This call is `extremely limited`.
   * @param {number} id - The Match ID requested. <br/>`Required.`
   * @return {Promise<unknown>} Promise object that resolves to JSON response represented by POST `/match/{id}/retry`.
   */
  async postMatchCallById(id: number | string): Promise<unknown> {
    return await this._apiReq(`/match/${id}/retry`, 'POST');
  }

  /**
   * Match Breakdown is a fast way to gather basic yet more advanced information about a match.
   * @param {number} id - The Match ID for the Breakdown Data. <br/>`Required.`
   * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/match/{id}/breakdown`.
   */
  async getMatchBreakdown(id: number | string): Promise<MatchBreakdown> {
    return await this._apiReq(`/match/${id}/breakdown`, 'GET');
  }

  /**
   * Match Live is data where a match is on the Dota Watch list and still active. All League games are also Live.
   * @param {number} id - The Match ID for the Live Data. <br/>`Required.`
   * @param {number} [skip] - The amount in seconds you wish to skip until you start getting MatchEvents or PlayerMatchEvents.
   * @return {Promise<Match>} Promise object that resolves to JSON response represented by GET `/match/{id}/live`.
   */
  async getMatchLive(id: number | string, skip?: number): Promise<Match> {
    return await this._apiReq(`/match/${id}/live`, 'GET', { skip });
  }

  /**
   * Return Patch Notes for each Item/Ability. These are found when you hover over each object in-game.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Patch/notes`.
   * @deprecated Not working
   */
  async getPatchNotes(
    languageId: number | string = StratzLanguage.English,
  ): Promise<any> {
    return await this._apiReq(`/Patch/notes`, 'GET', { languageId });
  }

  /**
   * Returns specific data about specific Steam Account ID.
   * @param {number} id - Steam Account ID. <br/>`Required.`
   * @return {Promise<StratzPlayer>} Promise object that resolves to JSON response represented by GET `/Player/{id}`.
   */
  async getPlayer(id: number | string): Promise<StratzPlayer> {
    return await this._apiReq(`/Player/${id}`, 'GET');
  }

  /**
   * Returns a very small quantity of data about a user.
   * @param {number} id - Steam Account ID. <br/>`Required.`
   * @return {Promise<StratzPlayerBasic>} Promise object that resolves to JSON response represented by GET `/Player/{id}/basic`.
   */
  async getPlayerBasic(
    id: number | string | string,
  ): Promise<StratzPlayerBasic> {
    return await this._apiReq(`/Player/${id}/basic`, 'GET');
  }

  /**
   * Returns matches about a specific Steam Account ID.
   * @param {number | string} id - Steam Account ID of the Player. <br/>`Required.`
   * @param {number[]} [queryParameters.matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
   * @param {string[]} [queryParameters.include] - Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. Accepted Values: Player, Series, League, Team, Ability, PickBan, Spectators, Stats, StatsBreakdown. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). Stats will return back the world average stats for basic data such as kills, deaths and assists based on Hero Rank/Lane/Role.  Will also include extremely basic data for MatchPlayerStats.
   * @param {string} [queryParameters.playerList = "Single"] - PlayerList determines if just the original player will be returned OR all 10. <br />Accepted Values: All, Single. Default is Single.
   * @param {number[]} [queryParameters.heroId] - Requests matches where heroId is present. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.leagueId] - Requests matches where a specific League is present.
   * @param {number} [queryParameters.seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
   * @param {number} [queryParameters.teamId] - Requests matches where a specific Team is present.
   * @param {boolean} [queryParameters.isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
   * @param {boolean} [queryParameters.isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
   * @param {boolean} [queryParameters.hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
   * @param {boolean} [queryParameters.isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
   * @param {boolean} [queryParameters.isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
   * @param {string} [queryParameters.gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
   * @param {string} [queryParameters.lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 255>} [queryParameters.lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
   * @param {number} [queryParameters.role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - Requests matches where the League tier matches. <br/>Available values: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   * @param {number[]} [queryParameters.region = null] - A comma delimited array model of Region Ids. Leaving null will produce all regions.
   * @param {number[]} [queryParameters.rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
   * @param {number} [queryParameters.maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
   * @param {number} [queryParameters.minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
   * @param {number} [queryParameters.maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
   * @param {number} [queryParameters.startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
   * @param {number} [queryParameters.endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
   * @param {boolean} [queryParameters.isParty] - Shows only matches where the user is in a party.
   * @param {number[]} [queryParameters.partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
   * @param {boolean} [queryParameters.isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
   * @param {0 | 1 | 2 | 3[]} [queryParameters.award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
   * @param {boolean} [queryParameters.isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
   * @param {number} [queryParameters.take] - The amount of matches that will be returned. <br />`The max value is 50`.
   * @param {number} [queryParameters.skip] - The amount of matches that will be skipped before turning rows.
   * @returns {Promise<MatchBreakdown[]>} Promise object that resolves to JSON response represented by GET `/Player/{id}/matches`.
   */
  async getPlayerMatches(
    id: number | string,
    queryParameters?: MatchQuery,
  ): Promise<MatchBreakdown[]> {
    return await this._apiReq(`/Player/${id}/matches`, 'GET', queryParameters);
  }

  /**
   * Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.
   * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
   * @param {number[]} [heroId] - Requests matches where heroId is present. <br />If specified, shows the detailed statistics for matching `heroId`.
   * @param {number[]} [queryParameters.matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.leagueId] - Requests matches where a specific League is present.
   * @param {number} [queryParameters.seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
   * @param {number} [queryParameters.teamId] - Requests matches where a specific Team is present.
   * @param {boolean} [queryParameters.isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
   * @param {boolean} [queryParameters.isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
   * @param {boolean} [queryParameters.hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
   * @param {boolean} [queryParameters.isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
   * @param {boolean} [queryParameters.isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
   * @param {string} [queryParameters.gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
   * @param {string} [queryParameters.lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 255>} [queryParameters.lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
   * @param {number} [queryParameters.role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   * @param {number[]} [queryParameters.region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
   * @param {number[]} [queryParameters.rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
   * @param {number} [queryParameters.maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
   * @param {number} [queryParameters.minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
   * @param {number} [queryParameters.maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
   * @param {number} [queryParameters.startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
   * @param {number} [queryParameters.endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
   * @param {boolean} [queryParameters.isParty] - Shows only matches where the user is in a party.
   * @param {number[]} [queryParameters.partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
   * @param {boolean} [queryParameters.isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
   * @param {0 | 1 | 2 | 3[]} [queryParameters.award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
   * @param {boolean} [queryParameters.isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
   * @returns {Promise<HeroPerformance | HeroPerformance[]>} Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.
   */
  async getPlayerHeroPerformance(
    id: number | string,
    heroId?: number | string,
    queryParameters?: HeroPerformanceQuery,
  ): Promise<HeroPerformance | HeroPerformance[]> {
    return await this._apiReq(
      `/player/${id}/heroPerformance/${heroId}`,
      'GET',
      queryParameters,
    );
  }

  /**
   * A more in depth at a single player's single hero performance.
   * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
   * @param {number[]} heroId - Requests matches where heroId is present. <br />This is a comma delimited `array` input. <br/>`Required.`
   * @param {number[]} [queryParameters.matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.leagueId] - Requests matches where a specific League is present.
   * @param {number} [queryParameters.seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
   * @param {number} [queryParameters.teamId] - Requests matches where a specific Team is present.
   * @param {boolean} [queryParameters.isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
   * @param {boolean} [queryParameters.isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
   * @param {boolean} [queryParameters.hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
   * @param {boolean} [queryParameters.isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
   * @param {boolean} [queryParameters.isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
   * @param {string} [queryParameters.gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
   * @param {string} [queryParameters.lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 255>} [queryParameters.lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
   * @param {number} [queryParameters.role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   * @param {number[]} [queryParameters.region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
   * @param {number[]} [queryParameters.rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
   * @param {number} [queryParameters.maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
   * @param {number} [queryParameters.minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
   * @param {number} [queryParameters.maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
   * @param {number} [queryParameters.startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
   * @param {number} [queryParameters.endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
   * @param {boolean} [queryParameters.isParty] - Shows only matches where the user is in a party.
   * @param {number[]} [queryParameters.partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
   * @param {boolean} [queryParameters.isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
   * @param {0 | 1 | 2 | 3[]} [queryParameters.award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
   * @param {boolean} [queryParameters.isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
   * @returns {Promise<HeroPerformance>} Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.
   */
  async getPlayerHeroPerformanceByHeroId(
    id: number | string,
    heroId: number | string,
    queryParameters?: HeroPerformanceQuery,
  ): Promise<HeroPerformance> {
    return await this._apiReq(
      `/player/${id}/heroPerformance/${heroId}`,
      'GET',
      queryParameters,
    );
  }

  /**
   * Gets the Players of Dota which have DotaPlus and have a high level hero.
   * @param {number} [heroId] - If you want to limit to a single HeroId to find awards. <br />It can be found at [.getGameVersion()](#Stratz+getGameVersion).
   * @param {string} [orderBy] - Helps with the ordering. Accepted values are `recent` (Shows the most recent awards given) and `level` (showes by the highest level first).
   * @param {number} [skip = 0] - Amount of records you want to skip before starting.
   * @param {number} [take = 20] - Amount of total records you want to take. <br />Maximum amount is `100`.
   * @return {Promise<DotaPlusLeaderboard>} Promise object that resolves to JSON response represented by GET `/Player/dotaPlusLeaderboard`.
   */
  async getDotaPlusLeaderboard(
    heroId?: number,
    orderBy?: string,
    skip?: number,
    take?: NumRange<0, 101>,
  ): Promise<DotaPlusLeaderboard> {
    return await this._apiReq('/Player/dotaPlusLeaderboard', 'GET', {
      heroId,
      orderBy,
      skip,
      take,
    });
  }

  /**
   * Returns all known Professional eSport Players.
   * @return {Promise<Record<string, ESportsPlayer>>} Promise object that resolves to JSON response represented by GET `/Player/proSteamAccount`.
   */
  async getProSteamAccounts(): Promise<Record<string, ESportsPlayer>> {
    return await this._apiReq('/Player/proSteamAccount', 'GET');
  }

  /**
   * Picked the top pros and announcers and determines if you ever have played with them and when.
   * @param {number} id - Steam Account ID. <br/>`Required.`
   * @return {Promise<unknown>} Promise object that resolves to JSON response represented by GET `Player/{id}/playedWithPro`.
   */
  async getPlayedWithPro(id: number | string): Promise<unknown> {
    return await this._apiReq(`Player/${id}/playedWithPro`, 'GET');
  }

  /**
   * Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.
   * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
   * @param {number[]} [queryParameters.matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.heroId] - Requests matches where heroId is present. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.leagueId] - Requests matches where a specific League is present.
   * @param {number} [queryParameters.seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
   * @param {number} [queryParameters.teamId] - Requests matches where a specific Team is present.
   * @param {boolean} [queryParameters.isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
   * @param {boolean} [queryParameters.isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
   * @param {boolean} [queryParameters.hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
   * @param {boolean} [queryParameters.isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
   * @param {boolean} [queryParameters.isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
   * @param {string} [queryParameters.gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
   * @param {string} [queryParameters.lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
   * @param {number[]} [queryParameters.withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 255>} [queryParameters.lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
   * @param {number} [queryParameters.role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
   * @param {Array<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>} [queryParameters.tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   * @param {number[]} [queryParameters.region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
   * @param {number[]} [queryParameters.rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
   * @param {number} [queryParameters.minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
   * @param {number} [queryParameters.maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
   * @param {number} [queryParameters.minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
   * @param {number} [queryParameters.maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
   * @param {number} [queryParameters.startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
   * @param {number} [queryParameters.endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
   * @param {boolean} [queryParameters.isParty] - Shows only matches where the user is in a party.
   * @param {number[]} [queryParameters.partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
   * @param {boolean} [queryParameters.isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
   * @param {0 | 1 | 2 | 3[]} [queryParameters.award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
   * @param {boolean} [queryParameters.isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
   * @returns {Promise<PlayerSummary>} Promise object that resolves to JSON response represented by GET `/player/{id}/summary`.
   */
  async getPlayerSummary(
    id: number | string,
    queryParameters?: PlayerSummaryQuery,
  ): Promise<PlayerSummary> {
    return await this._apiReq(`/player/${id}/summary`, 'GET', queryParameters);
  }

  /**
   * Give a list connection the Cluster Id to a Region ID.
   * @return {Promise<Region>} Promise object that resolves to JSON response represented by GET `/Region`.
   */
  async getRegion(): Promise<Region> {
    return await this._apiReq('/Region', 'GET');
  }

  /**
   * Get information about the current logged in user. <br />`Required Authorization`.
   * @return {Promise<User>} Promise object that resolves to JSON response represented by GET `/User`.
   */
  async getUser(): Promise<User> {
    return await this._apiReq(`/User`, 'GET');
  }

  /**
   * Get information about the current logged in user. `Required Authorization`.
   * @param {string} [returnUrl = /api/v1/home/news] - The return URL <br/>`Required.` <br/>Default value: `'/api/v1/home/news'`.
   * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/User/steam`.
   */
  async getUserSteam(
    returnUrl: string = '/api/v1/home/news',
  ): Promise<unknown> {
    return await this._apiReq(`/User/steam`, 'GET', { returnUrl });
  }

  /**
   * The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
   * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
   * @param {number} [queryParameters.minRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
   * @param {number} [queryParameters.maxRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
   * @param {Array<0 | 1 | 2 | 3>} [queryParameters.leaderboardRegion] - A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input.
   * @param {number} [queryParameters.lastSeen] - The Epoc Datestamp of when the player must have played by.
   * @param {Array<1 | 2 | 3 | 4 | 5>} [queryParameters.tiers] - Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`.
   * @param {boolean} [queryParameters.isPro] - Used when searching Teams, if the Team is a professional team.
   * @param {number} [queryParameters.take] - Amount of results to be returned. <br />`Max is 150`.
   * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/Search`.
   */
  async getSearch(
    query: string | number,
    queryParameters?: SearchQuery,
  ): Promise<any> {
    return await this._apiReq(`/Search`, 'GET', { query, ...queryParameters });
  }

  /**
   * The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
   * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
   * @param {number} [queryParameters.minRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
   * @param {number} [queryParameters.maxRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
   * @param {number[]} [queryParameters.leaderboardRegion] - A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input.
   * @param {number} [queryParameters.lastSeen] - The Epoc Datestamp of when the player must have played by.
   * @param {number} [queryParameters.take] - Amount of results to be returned. <br />`Max is 150`.
   * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/player`.
   */
  async getSearchByPlayer(
    query: string | number,
    queryParameters?: SearchByPlayerQuery,
  ): Promise<any> {
    return await this._apiReq(`/search/player`, 'GET', {
      query,
      ...queryParameters,
    });
  }

  /**
   * The basic league search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
   * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
   * @param {Array<1 | 2 | 3 | 4 | 5>} [tiers] - Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`.
   * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
   * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/league`.
   */
  async getSearchByLeague(
    query: string | number,
    tiers?: Array<1 | 2 | 3 | 4 | 5>,
    take?: NumRange<0, 151>,
  ): Promise<any> {
    return await this._apiReq(`/search/league`, 'GET', { query, tiers, take });
  }

  /**
   * The basic team search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
   * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
   * @param {boolean} [isPro] - Used when searching Teams, if the Team is a professional team.
   * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
   * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/team`.
   */
  async getSearchByTeam(
    query: string,
    isPro?: number[],
    take?: NumRange<0, 151>,
  ): Promise<any> {
    return await this._apiReq(`/search/team`, 'GET', { query, isPro, take });
  }

  /**
   * The basic match search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
   * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
   * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/match`.
   */
  async getSearchByMatch(query: string | number): Promise<any> {
    return await this._apiReq(`/search/match`, 'GET', { query });
  }

  /**
   * Search a Hero by its ID.
   * @param {number} [id] - Hero ID according to [.getHeroList()](#Stratz+getHeroList). <br />If not specified, the resolve is equivalent to [.getHeroes()](#Stratz+getHeroes) method.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Hero>} Promise object that resolves to JSON representation of a hero information.
   */
  async getHeroById(
    id?: number | string,
    languageId: string | number = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<Hero> {
    const data: Record<string, Hero> = await this.getHeroes(
      languageId,
      gameVersionId,
    );
    if (!id) {
      throw new SyntaxError('Invalid Hero ID');
    }
    return data[String(id)];
  }

  /**
   * Search an Ability by its ID.
   * @param {number} [id] - Ability ID according to [.getAbilityList()](#Stratz+getAbilityList). <br />If not specified, the resolve is equivalent to [.getAbilities()](#Stratz+getAbilities) method.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<Ability | Record<string, Ability>>} Promise object that resolves to JSON representation of a hero's abilities information.
   */
  async getAbilityById(
    id?: number,
    languageId: string | number = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<Ability> {
    const data: Record<string, Ability> = await this.getAbilities(
      languageId,
      gameVersionId,
    );
    if (!id) {
      throw new SyntaxError('Invalid Ability ID');
    }
    return data[String(id)];
  }

  /**
   * List of All Heroes in the Dota 2 Game by Name and Hero ID.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise} Promise object that resolves to JSON representation of a list of abilities.
   */
  async getHeroList(
    languageId: string | number = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<HeroList[]> {
    const data: Record<string, Hero> = await this.getHeroes(
      languageId,
      gameVersionId,
    );
    const extractedIdArray: HeroList[] = [];

    for (const id in data) {
      const heroId = data[id].id;
      const heroName = data[id].shortName;
      extractedIdArray.push({
        heroId,
        heroName,
      });
    }
    return extractedIdArray;
  }

  /**
   * List of All Abilities in the Dota 2 Game by Name and Ability ID.
   * @param {number} [languageId = StratzLanguage.English] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
   * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
   * @return {Promise<AbilityList[]>} Promise object that resolves to JSON representation of a list of abilities.
   */
  async getAbilityList(
    languageId: string | number = StratzLanguage.English,
    gameVersionId?: number,
  ): Promise<AbilityList[]> {
    const data: Record<string, Ability> = await this.getAbilities(
      languageId,
      gameVersionId,
    );
    const extractedIdArray: AbilityList[] = [];

    for (const id in data) {
      const abilityId = data[id].id;
      const abilityName = data[id].name;
      extractedIdArray.push({
        abilityId,
        abilityName,
      });
    }
    return extractedIdArray;
  }

  /**
   * Get the Latest Version of Dota 2 Game with different variations.
   * @param {'date' | 'name' | 'id'} [outputType] - The type of the value returned. <br />Accepted: `"date"`, `"name"`, `"id"` as strings. <br /> If not specified, returns an object with all these values.
   * @return {Promise<number | string | GameVersion | Date | undefined>} Promise object that resolves to a representation of a latest Dota 2 version.
   */
  async getLatestGameVersion(
    outputType?: 'date' | 'name' | 'id',
  ): Promise<number | string | GameVersion | Date | undefined> {
    const data = await this.getGameVersion();
    if (data) {
      switch (outputType) {
        case 'date':
          return data[0].startDate;
        case 'name':
          return data[0].name;
        case 'id':
          return data[0].id;
        default:
          return data[0];
      }
    }
  }
}

export default Stratz;
