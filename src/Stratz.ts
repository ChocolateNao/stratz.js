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

            let options = {
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
            }).end();
        });
    }

    /**
     * All information retaining to the Dota 2 Abilities by Game Version.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Ability.
     */
    getAbility(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Ability`, 'GET', { languageId, gameVersionId });
    }

    /**
     * The list of game versions the Dota 2 game has gone through.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /GameVersion.
     */
    getGameVersion(): Promise<any> {
        return this._apiReq('/GameVersion', 'GET');
    }

    /**
     * Returns the list of languages which STRATZ supports.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Language.
     */
    getLanguages(): Promise<any> {
        return this._apiReq('/Language', 'GET');
    }

    /**
     * Provided directly from Dota 2 Region files, the cluster is the geographically breakdown of where the game is played.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Cluster.
     */
    getCluster(): Promise<any> {
        return this._apiReq('/Cluster', 'GET');
    }

    /**
     * Returns a list of GameMode types which is directly supplied by Dota 2. Matches API call will have a input for this value.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /GameMode.
     */
    getGameMode(): Promise<any> {
        return this._apiReq('/GameMode', 'GET');
    }

    /**
     * The current list of Heroes found in the Dota 2 client. Includes all base stats plus additional information on the hero.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Hero.
     */
    getHero(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Hero`, 'GET', { languageId, gameVersionId });
    }

    /**
     * List of Items in the Dota 2 Game and details about each.
     * @param {number} [languageId = 0] - Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Item.
     */
    getItem(languageId: number = 0, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Item`, 'GET', { languageId, gameVersionId });
    }

    /**
     * More specific details about the Item ID.
     * @param {number} id - The Item ID requested. <br/>`Required.`
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Item/{id}.
     */
    getItemById(id: number, gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Item/${id}`, 'GET', { gameVersionId });
    }

    /**
     * All information retaining to the Dota 2 Npcs by Game Version.
     * @param {number} [gameVersionId] - Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Npc.
     */
    getNpc(gameVersionId?: number): Promise<any> {
        return this._apiReq(`/Npc`, 'GET', { gameVersionId });
    }
}

module.exports = { Stratz };
