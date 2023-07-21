import { IncomingMessage } from 'http';
import https from 'https';
import querystring from 'querystring';

/**
 * Provides access to the STRATZ API. This is the first thing you do to start.
 */
export class Stratz {
    apiToken: string;
    private _host: string = 'api.stratz.com';
    private _basePath: string = '/api/v1';

    /**
     * Create a new instance of STRATZ REST API wrapper. This is the first thing you do to start.
     * @param {string} apiToken - Your API token. You can get yours for free at https://stratz.com/api.
     */
    constructor(apiToken: string) {
        this.apiToken = apiToken;
    }

    /**
     * Create a direct HTTP request to the STRATZ API.
     * @internal
     * @param {string} path - Endpoint path.
     * @param {string} method - HTTPS method.
     * @param {*} [queryParameters] - Query parameters for the request.
     * @return {Promise<any>} Promise object that resolves with the result object of the HTTPS request.
     */
    private _apiReq(path: string, method: string, queryParameters?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.apiToken) {
                reject('No token provided.');
            }

            let fullPath = `${this._basePath}${path}`;
            if (queryParameters) {
                const queryString = querystring.stringify(queryParameters);
                fullPath += `?${queryString}`;
            }

            let options: object = {
                hostname: this._host,
                path: fullPath,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiToken}`
                }
            }

            https.request(options, (response: any) => {
                let data = "";

                if (response) {
                    response.on('data', (chunk: string) => {
                        data = data + chunk;
                    });

                    response.on('end', () => {
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            resolve(JSON.parse(data));
                        } else {
                            reject(`HTTPS request failed with status code ${response.statusCode}`);
                        }
                    });

                    response.on('error', (error: { message: any; }) => {
                        reject(`HTTPS request failed to retrieve a response: ${error.message}`);
                    });
                }
            }).end();
        });
    }

    /**
     * All information retaining to the Dota 2 Abilities by Game Version.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Ability`.
     */
    getAbilities(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Ability`, 'GET', { languageId, gameVersionId });
    }

    /**
     * The list of game versions the Dota 2 game has gone through.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/GameVersion`.
     */
    getGameVersion(): Promise<any> {
        return this._apiReq('/GameVersion', 'GET');
    }

    /**
     * Returns the list of languages which STRATZ supports.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Language`.
     */
    getLanguages(): Promise<any> {
        return this._apiReq('/Language', 'GET');
    }

    /**
     * Provided directly from Dota 2 Region files, the cluster is the geographically breakdown of where the game is played.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Cluster`.
     */
    getCluster(): Promise<any> {
        return this._apiReq('/Cluster', 'GET');
    }

    /**
     * Returns a list of GameMode types which is directly supplied by Dota 2. Matches API call will have a input for this value.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/GameMode`.
     */
    getGameMode(): Promise<any> {
        return this._apiReq('/GameMode', 'GET');
    }

    /**
     * The current list of Heroes found in the Dota 2 client. Includes all base stats plus additional information on the hero.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Hero`.
     */
    getHeroes(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Hero`, 'GET', { languageId, gameVersionId });
    }

    /**
     * List of Items in the Dota 2 Game and details about each.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Item`.
     */
    getItems(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Item`, 'GET', { languageId, gameVersionId });
    }

    /**
     * More specific details about the Item ID.
     * @param {number} id - The Item ID requested. <br />`Required.`
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Item/{id}`.
     */
    getItemById(id: number, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Item/${id}`, 'GET', { gameVersionId });
    }

    /**
     * All information retaining to the Dota 2 Npcs by Game Version.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Npc`.
     */
    getNpc(gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Npc`, 'GET', { gameVersionId });
    }

    /**
     * Returns the list of Leagues limited by the queries.
     * @param {Array<number>} [tier] - The type of league your requested limit by Dota 2 filter of Tier. <br />Accepted: `1` - Amateur, `2` - Professional, `3` - DPC Minors (Premium), `4` - DPC Majors (Premium). <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
     * @param {number} [skip] - The amount to skip before returning results.
     * @param {number} [take] - The amount of results to take. <br/>`Max amount 100`.
     * @param {boolean} [requireImage] - If the league must have an image to return.
     * @param {string} [orderBy] - The determiantion of the order of the results returned. Accepted inputs are `LastMatchTime` and `Id`. <br/>Default is `LastMatchTime`.
     * @returns Promise object that resolves to JSON response represented by GET `/League`.
     */
    getLeagues(tier?: Array<number>, skip?: number, take?: number, requireImage?: boolean, orderBy?: string): Promise<any> {
        return this._apiReq(`/league`, 'GET', { tier, skip, take, requireImage, orderBy });
    }

    /**
     * Return more data about a specific League.
     * @param {number} id - League ID. <br />`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/League/{id}`.
     */
    getLeagueById(id: number): Promise<any> {
        return this._apiReq(`/league/${id}`, 'GET');
    }

    /**
     * 
     * @param {number} id - League ID. <br />`Required.`
     * @param {Array<string>} [include] - Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. Accepted Values: Player, Series, League, Team, Ability, PickBan, HeroImp. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). HeroImp will return the AvgImp values.
     * @param {number} [steamId] - Requests matches where Steam Account Id is present.
     * @param {number} [seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
     * @param {number} [teamId] - "Requests matches where a specific Team is present.
     * @param {boolean} [isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both `Parsed` and `Un-parsed`.
     * @param {boolean} [isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
     * @param {boolean} [hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
     * @param {boolean} [isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both `Stats` and `Non-stats` matches.
     * @param {Array<any>} [stageType] - For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically.
     * @param {string} [gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. This is a comma delimited `array` input.
     * @param {string} [lobbyType] - Requests matches where a specific or group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [gameVersion] - Requests matches where a specific or group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
     * @param {number} [tier] - The type of league your requested limit by Dota 2 filter of Tier. <br />Accepted: `1` - Amateur, `2` - Premium, `3` - Professional.
     * @param {number} [take] - The amount of matches that will be returned. <br />The max value is `250`.
     * @param {number} [skip] - The amount of matches that will be skipped before turning rows.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/League/{id}/matches`.
     */
    getLeagueByIdMatches(id: number, include?: Array<string>, steamId?: number, seriesId?: number, teamId?: number, isParsed?: boolean, isLeague?: boolean, hasAward?: boolean, isStats?: boolean, stageType?: Array<any>, gameMode?: string, lobbyType?: string, gameVersion?: Array<number>, tier?: number, take?: number, skip?: number): Promise<any> {
        return this._apiReq(`/league/${id}/matches`, 'GET', { include, steamId, seriesId, teamId, isParsed, isLeague, hasAward, isStats, stageType, gameMode, lobbyType, gameVersion, tier, take, skip });
    }

    /**
     * Returns a list of Series Ids with the Match Data included.
     * @param {number} id - League ID. <br/>`Required.`
     * @param {Array<any>} [stageType] - For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically.
     * @param {number} [take] - The amount of matches that will be returned. <br />The max value is `250`.
     * @param {number} [skip] - The amount of matches that will be skipped before turning rows.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/League/{id}/series`.
     */
    getLeagueByIdSeries(id: number, stageType?: Array<any>, take?: number, skip?: number): Promise<any> {
        return this._apiReq(`/league/${id}/series`, 'GET', {id, stageType, take, skip});
    }

    /**
     * Returns a list of Lobby Type which are mirrored from the Dota 2 client.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/lobbyType`.
     */
    getLobbyType(): Promise<any> {
        return this._apiReq(`/lobbyType`, 'GET');
    }

    /**
     * A very in depth return of data about the match. <br />Very large, about 500kb in size.
     * @param {number} id - The Match ID requested. <br />`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/match/{id}`.
     */
    getMatchById(id: number): Promise<any> {
        return this._apiReq(`/match/${id}`, 'GET');
    }

    /**
     * Should a match fail to download or a new parse is needed for new data, call retry will tell our system to download this match again. <br />This call is `extremely limited`.
     * @param {number} id - The Match ID requested. <br/>`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/match/{id}/retry`.
     */
    postMatchCallById(id: number): Promise<any> {
        return this._apiReq(`/match/${id}/retry`, 'POST');
    }

    /**
     * Match Breakdown is a fast way to gather basic yet more advanced information about a match.
     * @param {number} id - The Match ID for the Breakdown Data. <br/>`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/match/{id}/breakdown`.
     */
    getMatchBreakdown(id: number): Promise<any> {
        return this._apiReq(`/match/${id}/breakdown`, 'GET');
    }

    /**
     * Match Live is data where a match is on the Dota Watch list and still active. All League games are also Live.
     * @param {number} id - The Match ID for the Live Data. <br/>`Required.`
     * @param {number} [skip] - The amount in seconds you wish to skip until you start getting MatchEvents or PlayerMatchEvents.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/match/{id}/live`.
     */
    getMatchLive(id: number, skip?: number): Promise<any> {
        return this._apiReq(`/match/${id}/live`, 'GET', { skip });
    }

    /**
     * Return Patch Notes for each Item/Ability. These are found when you hover over each object in-game.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Patch/notes`.
     */
    getPatchNotes(languageId: number = 0): Promise<any> {
        return this._apiReq(`/Patch/notes`, 'GET', { languageId });
    }

    /**
     * Returns specific data ab…ecific Steam Account ID.
     * @param {number} id - Steam Account ID. <br/>`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/{id}`.
     */
    getPlayer(id: number): Promise<any> {
        return this._apiReq(`/Player/${id}`, 'GET', { id });
    }

    /**
     * Returns a very small quantity of data about a user.
     * @param {number} id - Steam Account ID. <br/>`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/{id}/basic`.
     */
    getPlayerBasic(id: number): Promise<any> {
        return this._apiReq(`/Player/${id}/basic`, 'GET', { id });
    }

    /**
     * Returns matches about a specific Steam Account ID.
     * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
     * @param {Array<number>} [matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
     * @param {Array<string>} [include] - Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. <br />Accepted Values: Player, Series, League, Team, Ability, PickBan, Spectators, Stats, StatsBreakdown. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). Stats will return back the world average stats for basic data such as kills, deaths and assists based on Hero Rank/Lane/Role.  Will also include extremely basic data for MatchPlayerStats.
     * @param {string} [playerList = "Single"] - PlayerList determines if just the original player will be returned OR all 10. <br />Accepted Values: All, Single. Default is Single.
     * @param {Array<number>} [heroId] - Requests matches where heroId is present. <br />This is a comma delimited `array` input.
     * @param {number} [leagueId] - Requests matches where a specific League is present.
     * @param {number} [seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
     * @param {number} [teamId] - Requests matches where a specific Team is present.
     * @param {boolean} [isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
     * @param {boolean} [isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
     * @param {boolean} [hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
     * @param {boolean} [isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
     * @param {boolean} [isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
     * @param {string} [gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
     * @param {string} [lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
     * @param {Array<any>} [lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
     * @param {number} [role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
     * @param {number} [tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
     * @param {Array<number>} [region = null] - A comma delimited array model of Region Ids. Leaving null will produce all regions.
     * @param {Array<number>} [rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
     * @param {number} [minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
     * @param {number} [maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
     * @param {number} [minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
     * @param {number} [maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
     * @param {number} [startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
     * @param {number} [endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
     * @param {boolean} [isParty] - Shows only matches where the user is in a party.
     * @param {Array<number>} [partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
     * @param {boolean} [isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
     * @param {Array<any>} [award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
     * @param {boolean} [isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
     * @param {number} [take] - The amount of matches that will be returned. <br />`The max value is 50`.
     * @param {number} [skip] - The amount of matches that will be skipped before turning rows.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/{id}/matches`.
     */
    getPlayerMatches(id: number, matchId?: Array<number>, include?: Array<string>, playerList?: string, heroId?: Array<number>, leagueId?: number, seriesId?: number, teamId?: number, isParsed?: boolean, isLeague?: boolean, hasAward?: boolean, isStats?: boolean, isVictory?: boolean, gameMode?: string, lobbyType?: string, gameVersionId?: Array<number>, withFriends?: Array<number>, withFriendsHero?: Array<number>, lane?: Array<any>, role?: number, tier?: number, region?: Array<number>, rank?: Array<number>, minDuration?: number, maxDuration?: number, minGameVersionId?: number, maxGameVersionId?: number, startDateTime?: number, endDateTime?: number, isParty?: boolean, partyCount?: Array<number>, isRadiant?: boolean, award?: Array<any>, isTeam?: boolean, take?: number, skip?: number): Promise<any> {
        return this._apiReq(`/Player/${id}/matches`, 'GET', { matchId, include, playerList, heroId, leagueId, seriesId, teamId, isParsed, isLeague, hasAward, isStats, isVictory, gameMode, lobbyType, gameVersionId, withFriends, withFriendsHero, lane, role, tier, region, rank, minDuration, maxDuration, minGameVersionId, maxGameVersionId, startDateTime, endDateTime, isParty, partyCount, isRadiant, award, isTeam, take, skip });
    }

    /**
     * Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.
     * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
     * @param {Array<number>} [heroId] - Requests matches where heroId is present. <br />This is a comma delimited `array` input. <br/>`Required.`
     * @param {Array<number>} [matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
     * @param {number} [leagueId] - Requests matches where a specific League is present.
     * @param {number} [seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
     * @param {number} [teamId] - Requests matches where a specific Team is present.
     * @param {boolean} [isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
     * @param {boolean} [isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
     * @param {boolean} [hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
     * @param {boolean} [isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
     * @param {boolean} [isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
     * @param {string} [gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
     * @param {string} [lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
     * @param {Array<any>} [lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
     * @param {number} [role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
     * @param {number} [tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
     * @param {Array<number>} [region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
     * @param {Array<number>} [rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
     * @param {number} [minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
     * @param {number} [maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
     * @param {number} [minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
     * @param {number} [maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
     * @param {number} [startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
     * @param {number} [endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
     * @param {boolean} [isParty] - Shows only matches where the user is in a party.
     * @param {Array<number>} [partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
     * @param {boolean} [isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
     * @param {Array<any>} [award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
     * @param {boolean} [isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.
     */
    getPlayerHeroPerformance(id: number, heroId?: Array<number>, matchId?: Array<number>, leagueId?: number, seriesId?: number, teamId?: number, isParsed?: boolean, isLeague?: boolean, isTeam?: boolean, hasAward?: boolean, isStats?: boolean, isVictory?: boolean, gameMode?: string, lobbyType?: string, gameVersionId?: Array<number>, withFriends?: Array<number>, withFriendsHero?: Array<number>, lane?: Array<any>, role?: number, tier?: number, region?: Array<number>, rank?: Array<number>, minDuration?: number, maxDuration?: number, minGameVersionId?: number, maxGameVersionId?: number, startDateTime?: number, endDateTime?: number, isParty?: boolean, partyCount?: Array<number>, isRadiant?: boolean, award?: Array<any>): Promise<any> {
        return this._apiReq(`/player/${id}/heroPerformance/${heroId}`, 'GET', { matchId, leagueId, seriesId, teamId, isParsed, isLeague, hasAward, isStats, isVictory, gameMode, lobbyType, gameVersionId, withFriends, withFriendsHero, lane, role, tier, region, rank, minDuration, maxDuration, minGameVersionId, maxGameVersionId, startDateTime, endDateTime, isParty, partyCount, isRadiant, award, isTeam});
    }

    /**
     * A more in depth at a single player's single hero performance.
     * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
     * @param {Array<number>} heroId - Requests matches where heroId is present. <br />This is a comma delimited `array` input. <br/>`Required.`
     * @param {Array<number>} [matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
     * @param {number} [leagueId] - Requests matches where a specific League is present.
     * @param {number} [seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
     * @param {number} [teamId] - Requests matches where a specific Team is present.
     * @param {boolean} [isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
     * @param {boolean} [isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
     * @param {boolean} [hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
     * @param {boolean} [isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
     * @param {boolean} [isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
     * @param {string} [gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
     * @param {string} [lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
     * @param {Array<any>} [lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
     * @param {number} [role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
     * @param {number} [tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
     * @param {Array<number>} [region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
     * @param {Array<number>} [rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
     * @param {number} [minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
     * @param {number} [maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
     * @param {number} [minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
     * @param {number} [maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
     * @param {number} [startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
     * @param {number} [endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
     * @param {boolean} [isParty] - Shows only matches where the user is in a party.
     * @param {Array<number>} [partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
     * @param {boolean} [isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
     * @param {Array<any>} [award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
     * @param {boolean} [isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.
     */
    getPlayerHeroPerformanceByHeroId(id: number, heroId: number, matchId?: Array<number>, leagueId?: number, seriesId?: number, teamId?: number, isParsed?: boolean, isLeague?: boolean, isTeam?: boolean, hasAward?: boolean, isStats?: boolean, isVictory?: boolean, gameMode?: string, lobbyType?: string, gameVersionId?: Array<number>, withFriends?: Array<number>, withFriendsHero?: Array<number>, lane?: Array<any>, role?: number, tier?: number, region?: Array<number>, rank?: Array<number>, minDuration?: number, maxDuration?: number, minGameVersionId?: number, maxGameVersionId?: number, startDateTime?: number, endDateTime?: number, isParty?: boolean, partyCount?: Array<number>, isRadiant?: boolean, award?: Array<any>): Promise<any> {
        return this._apiReq(`/player/${id}/heroPerformance/${heroId}`, 'GET', { matchId, leagueId, seriesId, teamId, isParsed, isLeague, hasAward, isStats, isVictory, gameMode, lobbyType, gameVersionId, withFriends, withFriendsHero, lane, role, tier, region, rank, minDuration, maxDuration, minGameVersionId, maxGameVersionId, startDateTime, endDateTime, isParty, partyCount, isRadiant, award, isTeam});
    }

    /**
     * Gets the Players of Dota which have DotaPlus and have a high level hero.
     * @param {number} [heroId] - If you want to limit to a single HeroId to find awards. <br />It can be found at [.getGameVersion()](#Stratz+getGameVersion).
     * @param {string} [orderBy] - Helps with the ordering. <br />Accepted values are `recent` (Shows the most recent awards given) and `level` (showes by the highest level first).
     * @param {number} [skip = 0] - Amount of records you want to skip before starting.
     * @param {number} [take = 20] - Amount of total records you want to take. <br />Maximum amount is `100`.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/dotaPlusLeaderboard`.
     */
    getDotaPlusLeaderboard(heroId?: number, orderBy?: string, skip?: number, take?: number): Promise<any> {
        return this._apiReq('/Player/dotaPlusLeaderboard', 'GET', { heroId, orderBy, skip, take });
    }

    /**
     * Returns all known Professional eSport Players.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Player/proSteamAccount`.
     */
    getProSteamAccounts(): Promise<any> {
        return this._apiReq('/Player/proSteamAccount', 'GET');
    }

    /**
     * Picked the top pros and announcers and determines if you ever have played with them and when.
     * @param {number} id - Steam Account ID. <br/>`Required.`
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `Player/{id}/playedWithPro`.
     */
    getPlayedWithPro(id: number): Promise<any> {
        return this._apiReq(`Player/${id}/playedWithPro`, 'GET');
    }

    /**
     * Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.
     * @param {number} id - Steam Account ID of the Player. <br/>`Required.`
     * @param {Array<number>} [matchId] - Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [heroId] - Requests matches where heroId is present. <br />This is a comma delimited `array` input.
     * @param {number} [leagueId] - Requests matches where a specific League is present.
     * @param {number} [seriesId] - Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries).
     * @param {number} [teamId] - Requests matches where a specific Team is present.
     * @param {boolean} [isParsed] - Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed.
     * @param {boolean} [isLeague] - Requests matches where they are league if any kind. Default takes both leagues and non-leagues.
     * @param {boolean} [hasAward] - Requests matches where the an award has been won. Must be used in conjunction with playerType = Single.
     * @param {boolean} [isStats] - Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches.
     * @param {boolean} [isVictory = null] - Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats.
     * @param {string} [gameMode] - Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input.
     * @param {string} [lobbyType] - Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [gameVersionId] - Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriends] - Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input.
     * @param {Array<number>} [withFriendsHero] - Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input.
     * @param {Array<any>} [lane = null] - Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`.
     * @param {number} [role = null] - Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`.
     * @param {number} [tier] - Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
     * @param {Array<number>} [region = null] - A comma delimited `array` model of Region Ids. Leaving null will produce all regions.
     * @param {Array<number>} [rank] - "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input.
     * @param {number} [minDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum.
     * @param {number} [maxDuration = null] - Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum.
     * @param {number} [minGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum.
     * @param {number} [maxGameVersionId] - Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum.
     * @param {number} [startDateTime = null] - Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium.
     * @param {number} [endDateTime = null] - Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum.
     * @param {boolean} [isParty] - Shows only matches where the user is in a party.
     * @param {Array<number>} [partyCount = true] - Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input.
     * @param {boolean} [isRadiant] - Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`.
     * @param {Array<any>} [award] - Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`.
     * @param {boolean} [isTeam] - Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/player/{id}/summary`.
     */
    getPlayerSummary(id: number, heroId?: Array<number>, matchId?: Array<number>, leagueId?: number, seriesId?: number, teamId?: number, isParsed?: boolean, isLeague?: boolean, hasAward?: boolean, isStats?: boolean, isVictory?: boolean, gameMode?: string, lobbyType?: string, gameVersionId?: Array<number>, withFriends?: Array<number>, withFriendsHero?: Array<number>, lane?: Array<any>, role?: number, tier?: number, region?: Array<number>, rank?: Array<number>, minDuration?: number, maxDuration?: number, minGameVersionId?: number, maxGameVersionId?: number, startDateTime?: number, endDateTime?: number, isParty?: boolean, partyCount?: Array<number>, isRadiant?: boolean, award?: Array<any>, isTeam?: boolean): Promise<any> {
        return this._apiReq(`/player/${id}/summary`, 'GET', { matchId, heroId, leagueId, seriesId, teamId, isParsed, isLeague, hasAward, isStats, isVictory, gameMode, lobbyType, gameVersionId, withFriends, withFriendsHero, lane, role, tier, region, rank, minDuration, maxDuration, minGameVersionId, maxGameVersionId, startDateTime, endDateTime, isParty, partyCount, isRadiant, award, isTeam});
    }

    /**
     * Give a list connection the Cluster Id to a Region ID.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/Region`.
     */
    getRegion(): Promise<any> {
        return this._apiReq('/Region', 'GET');
    }

    /**
     * Get information about the current logged in user. <br />`Required Authorization`.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/User`.
     */
    getUser(): Promise<any> {
        return this._apiReq(`/User`, 'GET');
    }

    /**
     * Get information about the current logged in user. `Required Authorization`.
     * @param {string} [returnUrl = /api/v1/home/news] - The return URL.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET `/User/steam`.
     */
    getUserSteam(returnUrl?: string): Promise<any> {
        return this._apiReq(`/User/steam`, 'GET', { returnUrl });
    }

    /**
     * The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
     * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
     * @param {number} [minRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
     * @param {number} [maxRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
     * @param {Array<number>} [leaderboardRegion] - A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input.
     * @param {number} [lastSeen] - The Epoc Datestamp of when the player must have played by.
     * @param {Array<number>} [tiers] - Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`.
     * @param {boolean} [isPro] - Used when searching Teams, if the Team is a professional team.
     * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/Search`.
     */
    getSearch(query: string, minRank?: number, maxRank?: number, leaderboardRegion?: Array<number>, lastSeen?: number, tiers?: Array<number>, isPro?: boolean, take?: number): Promise<any> {
        return this._apiReq(`/Search`, 'GET', { query, minRank, maxRank, leaderboardRegion, lastSeen, tiers, isPro, take });
    }

    /**
     * The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
     * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
     * @param {number} [minRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
     * @param {number} [maxRank] - Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc.
     * @param {Array<number>} [leaderboardRegion] - A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input.
     * @param {number} [lastSeen] - The Epoc Datestamp of when the player must have played by.
     * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/player`.
     */
    getSearchByPlayer(query: string, minRank?: number, maxRank?: number, leaderboardRegion?: Array<number>, lastSeen?: number, take?: number): Promise<any> {
        return this._apiReq(`/search/player`, 'GET', { query, minRank, maxRank, leaderboardRegion, lastSeen, take });
    }

    /**
     * The basic league search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
     * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
     * @param {Array<number>} [tiers] - Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`.
     * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/league`.
     */
    getSearchByLeague(query: string, tiers?: Array<number>, take?: number): Promise<any> {
        return this._apiReq(`/search/league`, 'GET', { query, tiers, take });
    }

    /**
     * The basic team search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
     * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
     * @param {boolean} [isPro] - Used when searching Teams, if the Team is a professional team.
     * @param {number} [take] - Amount of results to be returned. <br />`Max is 150`.
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/team`.
     */
    getSearchByTeam(query: string, isPro?: Array<number>, take?: number): Promise<any> {
        return this._apiReq(`/search/team`, 'GET', { query, isPro, take });
    }

    /**
     * The basic match search system for STRATZ. Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.
     * @param {string} query - The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.`
     * @returns {Promise<any>} Promise object that resolves to JSON response represented by GET `/search/match`.
     */
    getSearchByMatch(query: string): Promise<any> {
        return this._apiReq(`/search/match`, 'GET', { query });
    }

    /**
     * Search a Hero by its ID.
     * @param {number} [id] - Hero ID according to [.getHeroList()](#Stratz+getHeroList). <br />If not specified, the resolve is equivalent to [.getHeroes()](#Stratz+getHeroes) method.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON representation of a hero information.
     */
    async getHeroById(id?: number, languageId: number = 0, gameVersionId?: number): Promise<any> {
        let data: any = await this.getHeroes(languageId, gameVersionId);
        if (id) {
            return data[String(id)];
        }
        return data;
    }

    /**
     * Search an Ability by its ID.
     * @param {number} [id] - Ability ID according to [.getAbilityList()](#Stratz+getAbilityList). <br />If not specified, the resolve is equivalent to [.getAbilities()](#Stratz+getAbilities) method.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON representation of a hero's abilities information.
     */
    async getAbilityById(id?: number, languageId: number = 0, gameVersionId?: number): Promise<any> {
        let data: any = await this.getAbilities(languageId, gameVersionId);
        if (id) {
            return data[String(id)];
        }
        return data;
    }

    /**
     * List of All Heroes in the Dota 2 Game by Name and Hero ID. 
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON representation of a list of abilities.
     */
    async getHeroList(languageId: number = 0, gameVersionId?: number): Promise<any> {
        let data: any = await this.getHeroes(languageId, gameVersionId);
        let extractedIdArray: object[] = [];

        for (let id in data) {
            let heroId = data[id].id;
            let heroName = data[id].shortName;
            extractedIdArray.push({
                heroId, 
                heroName
            });
        }
        return extractedIdArray;        
    }

    /**
     * List of All Abilities in the Dota 2 Game by Name and Ability ID. 
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON representation of a list of abilities.
     */
    async getAbilityList(languageId: number = 0, gameVersionId?: number): Promise<any> {
        let data: any = await this.getAbilities(languageId, gameVersionId);
        let extractedIdArray: object[] = [];

        for (let id in data) {
            let abilityId = data[id].id;
            let abilityName = data[id].name;
            extractedIdArray.push({
                abilityId, 
                abilityName
            });
        }
        return extractedIdArray;        
    }

    /**
     * Get the Latest Version of Dota 2 Game with different variations.
     * @param {string} [outputType] - The type of the value returned. <br />Accepted: `"date"`, `"name"`, `"id"` as strings. <br /> If not specified, returns an object with all these values.
     * @return {number | string | object} Promise object that resolves to a representation of a latest Dota 2 version.
     */
    async getLatestGameVersion(outputType?: string): Promise<any> {
        let data = await this.getGameVersion();
        if (data) {
            switch (outputType) {
                case "date":
                    return data[0].startDate;                
                case "name":
                    return data[0].name;
                case "id":
                    return data[0].id;       
                default:
                    return data[0];
            }
        }
    }
}
