import https from 'https';

/**
 * Provides access to the STRATZ API.
 */
export default class Stratz {
    private _apiToken: string;
    private _host: string;
    private _basePath: string;
    private _latestVersionID: number | null;

    /**
     * Create a new instance of this wrapper.
     * @param {string} apiToken - API token. You can get yours for free at https://stratz.com/api.
     */
    constructor(apiToken: string) {
        this._apiToken = apiToken;
        this._host = 'api.stratz.com';
        this._basePath = '/api/v1';
        this._latestVersionID = null;
    }

    /**
     * Create a direct HTTP request to the STRATZ API.
     * @internal
     * @param {string} path - Endpoint path.
     * @param {string} method - HTTPS method.
     * @return {Promise<any>} Promise object with the result object of the HTTPS request.
     */
    private _apiReq(path: string, method: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this._apiToken) {
                reject('No token provided.');
            }

            let fullPath = `${this._basePath}${path}`;
            let options = {
                hostname: this._host,
                path: fullPath,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this._apiToken}`
                }
            }

            https.request(options, (response: any) => {
                let data = '';

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
     * Latest Dota 2 version ID. 
     * @internal
     * @param {number} [gameVersionId = effectiveVersionId] - An optional GameVersion ID that is passed to this helper.
     * @return {Promise<number>} Promise object that resolves to the latest Dota 2 version ID. 
     */
    private async _getEffectiveVersionId(gameVersionId?: number): Promise<number> {
        if (gameVersionId) {
            return gameVersionId;
        }
        if (this._latestVersionID !== null) {
            return Promise.resolve(this._latestVersionID as number);
        }
        return this.getGameVersion()
            .then(data => {
            this._latestVersionID = data[0].id;
            return this._latestVersionID as number;
            });
    }

    /**
     * All information retaining to the Dota 2 Abilities by Game Version.
     * @param {number} [gameVersionId = effectiveVersionId] - Game Version ID matching STRATZ GameVersion endpoint. If not specified, the latest version data will be presented.
     * @param {number} [languageId = 0] - Language for data to come back. If not specified, the response will contain results in English.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Ability.
     */
    async getAbility(gameVersionId?: number, languageId: number = 0): Promise<any> {
        const effectiveVersionId = await this._getEffectiveVersionId(gameVersionId);
        return this._apiReq(`/Ability?gameVersionId=${effectiveVersionId}&languageId=${languageId}`, 'GET');
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
    getLanguage(): Promise<any> {
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
     * @param {number} [gameVersionId = effectiveVersionId] - Returns the list of heroes for the given GameVersionId. If not specified, the latest version data will be presented.
     * @param {number} [languageId = 0] - Language for data to come back. If not specified, the response will contain results in English.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Hero.
     */
    async getHero(gameVersionId?: number, languageId: number = 0): Promise<any> {
        const effectiveVersionId = await this._getEffectiveVersionId(gameVersionId);
        return this._apiReq(`/Hero?gameVersionId=${effectiveVersionId}&languageId=${languageId}`, 'GET');
    }

    /**
     * List of Items in the Dota 2 Game and details about each.
     * @param {number} [gameVersionId = effectiveVersionId] - Game Version ID matching STRATZ GameVersion endpoint. If not specified, the latest version data will be presented.
     * @param {number} [languageId = 0] - Language for data to come back. If not specified, the response will contain results in English.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Item.
     */
    async getItem(gameVersionId?: number, languageId: number = 0): Promise<any> {
        const effectiveVersionId = await this._getEffectiveVersionId(gameVersionId);
        return this._apiReq(`/Item?gameVersionId=${effectiveVersionId}&languageId=${languageId}`, 'GET');
    }

    /**
     * More specific details about the Item ID.
     * @param {number} id - The Item ID requested. `Not optional.`
     * @param {number} [gameVersionId = effectiveVersionId] - Game Version ID matching STRATZ GameVersion endpoint. If not specified, the latest version data will be presented.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Item/{id}.
     */
    async getItemById(id: number, gameVersionId?: number): Promise<any> {
        const effectiveVersionId = await this._getEffectiveVersionId(gameVersionId);
        return this._apiReq(`/Item/${id}?gameVersionId=${effectiveVersionId}`, 'GET');
    }
}
