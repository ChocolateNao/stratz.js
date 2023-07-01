const https = require("https");
/**
 * Provides access to the STRATZ API.
 */
export default class Stratz {
    apiToken: string;
    host: string;
    basePath: string;
    debugMode: boolean;

    /**
     * Create a new instance of this wrapper.
     * @param {string} apiToken - API token. You can get yours at https://stratz.com/api.
     * @param {boolean} debugMode - Enable showing response codes.
     */
    constructor(apiToken: string, debugMode: boolean = true) {
        this.apiToken = apiToken;
        this.host = 'https://api.stratz.com';
        this.basePath = '/api/v1';
        this.debugMode = debugMode;
    }

    /**
     * Create a direct HTTP request to the STRATZ API.
     * @param {string} path - Endpoint path.
     * @param {string} method - HTTPS method.
     * @return {Promise<any>} Promise object with the result object of the HTTPS request.
     */
    apiReq(path: string, method: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.apiToken) {
                reject('No token provided.');
            }

            let fullPath = `${this.basePath}${path}`;
            let options = {
                hostname: this.host,
                path: fullPath,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiToken}`
                }
            }

            https.request(options, (response: any) => {
                if (this.debugMode) {
                    console.log(`Status code on path ${fullPath}${path}: ${response.statusCode}`);
                }
                let data = '';

                response.on('data', (chunk: string) => {
                    data = data + chunk;
                });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });

                response.on('error', (error: { message: any; }) => {
                    reject(`HTTPS request failed to retrieve a response: ${error.message}`);
                });
            }).end();
        });
    }

    /**
     * The list of game versions the Dota 2 game has gone through.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /GameVersion.
     */
    getGameVersion(): Promise<any> {
        return this.apiReq('/GameVersion', 'GET');
    }

    /**
     * Returns the list of languages which STRATZ supports.
     * @return {Promise<any>} Promise object that resolves to JSON response represented by GET /Language.
     */
    getLanguage(): Promise<any> {
        return this.apiReq('/Language', 'GET');
    }
}