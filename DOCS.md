<a name="Stratz"></a>

## Stratz
**Kind**: global class  

- [Stratz](#stratz)
  - [new Stratz(apiToken)](#new-stratzapitoken)
  - [stratz.\_apiReq(path, method, \[queryParameters\]) ⇒ Promise\<any\>](#stratz_apireqpath-method-queryparameters--promiseany)
  - [stratz.getAbilities(\[languageId\], \[gameVersionId\]) ⇒ Record\<string, Ability\>](#stratzgetabilitieslanguageid-gameversionid--recordstring-ability)
  - [stratz.getGameVersion() ⇒ Promise\<Array\<GameVersion\>\>](#stratzgetgameversion--promisearraygameversion)
  - [stratz.getLanguages() ⇒ Promise\<Record\<string, string\>\>](#stratzgetlanguages--promiserecordstring-string)
  - [stratz.getCluster() ⇒ Promise\<Array\<Cluster\>\>](#stratzgetcluster--promisearraycluster)
  - [stratz.getGameMode() ⇒ Promise\<Record\<string, GameMode\>\>](#stratzgetgamemode--promiserecordstring-gamemode)
  - [stratz.getHeroes(\[languageId\], \[gameVersionId\]) ⇒ Promise\<Record\<string, Hero\>\>](#stratzgetheroeslanguageid-gameversionid--promiserecordstring-hero)
  - [stratz.getItems(\[languageId\], \[gameVersionId\]) ⇒ Promise\<Record\<string, Item\>\>](#stratzgetitemslanguageid-gameversionid--promiserecordstring-item)
  - [stratz.getItemById(id, \[gameVersionId\]) ⇒ Promise\<Item\>](#stratzgetitembyidid-gameversionid--promiseitem)
  - [stratz.getNpc(\[gameVersionId\]) ⇒ Promise\<Record\<string, Npc\>\>](#stratzgetnpcgameversionid--promiserecordstring-npc)
  - [stratz.getLeagues() ⇒ Promise\<Array\<League\>\>](#stratzgetleagues--promisearrayleague)
  - [stratz.getLeagueById(id) ⇒ Promise\<League\>](#stratzgetleaguebyidid--promiseleague)
  - [stratz.getLeagueByIdMatches(id) ⇒ Promise\<Array\<Match\>\>](#stratzgetleaguebyidmatchesid--promisearraymatch)
  - [stratz.getLeagueByIdSeries(id, \[stageType\], \[take\], \[skip\]) ⇒ Promise\<Array\<Series\>\>](#stratzgetleaguebyidseriesid-stagetype-take-skip--promisearrayseries)
  - [stratz.getLobbyType() ⇒ Promise\<Record\<string, LobbyType\>\>](#stratzgetlobbytype--promiserecordstring-lobbytype)
  - [stratz.getMatchById(id) ⇒ Promise\<MatchDetailed\>](#stratzgetmatchbyidid--promisematchdetailed)
  - [stratz.postMatchCallById(id) ⇒ Promise\<unknown\>](#stratzpostmatchcallbyidid--promiseunknown)
  - [stratz.getMatchBreakdown(id) ⇒ Promise\<any\>](#stratzgetmatchbreakdownid--promiseany)
  - [stratz.getMatchLive(id, \[skip\]) ⇒ Promise\<Match\>](#stratzgetmatchliveid-skip--promisematch)
  - [~~stratz.getPatchNotes(\[languageId\]) ⇒ Promise\<any\>~~](#stratzgetpatchnoteslanguageid--promiseany)
  - [stratz.getPlayer(id) ⇒ Promise\<StratzPlayer\>](#stratzgetplayerid--promisestratzplayer)
  - [stratz.getPlayerBasic(id) ⇒ Promise\<StratzPlayerBasic\>](#stratzgetplayerbasicid--promisestratzplayerbasic)
  - [stratz.getPlayerMatches(id) ⇒ Promise\<Array\<MatchBreakdown\>\>](#stratzgetplayermatchesid--promisearraymatchbreakdown)
  - [stratz.getPlayerHeroPerformance(id, \[heroId\]) ⇒ Promise\<(HeroPerformance|Array\<HeroPerformance\>)\>](#stratzgetplayerheroperformanceid-heroid--promiseheroperformancearrayheroperformance)
  - [stratz.getPlayerHeroPerformanceByHeroId(id, heroId) ⇒ Promise\<HeroPerformance\>](#stratzgetplayerheroperformancebyheroidid-heroid--promiseheroperformance)
  - [stratz.getDotaPlusLeaderboard(\[heroId\], \[orderBy\], \[skip\], \[take\]) ⇒ Promise\<DotaPlusLeaderboard\>](#stratzgetdotaplusleaderboardheroid-orderby-skip-take--promisedotaplusleaderboard)
  - [stratz.getProSteamAccounts() ⇒ Promise\<Record\<string, ESportsPlayer\>\>](#stratzgetprosteamaccounts--promiserecordstring-esportsplayer)
  - [stratz.getPlayedWithPro(id) ⇒ Promise\<unknown\>](#stratzgetplayedwithproid--promiseunknown)
  - [stratz.getPlayerSummary(id) ⇒ Promise\<PlayerSummary\>](#stratzgetplayersummaryid--promiseplayersummary)
  - [stratz.getRegion() ⇒ Promise\<Region\>](#stratzgetregion--promiseregion)
  - [stratz.getUser() ⇒ Promise\<User\>](#stratzgetuser--promiseuser)
  - [stratz.getUserSteam(\[returnUrl\]) ⇒ Promise\<any\>](#stratzgetusersteamreturnurl--promiseany)
  - [stratz.getSearch(query) ⇒ Promise\<any\>](#stratzgetsearchquery--promiseany)
  - [stratz.getSearchByPlayer(query) ⇒ Promise\<any\>](#stratzgetsearchbyplayerquery--promiseany)
  - [stratz.getSearchByLeague(query, \[tiers\], \[take\]) ⇒ Promise\<any\>](#stratzgetsearchbyleaguequery-tiers-take--promiseany)
  - [stratz.getSearchByTeam(query, \[isPro\], \[take\]) ⇒ Promise\<any\>](#stratzgetsearchbyteamquery-ispro-take--promiseany)
  - [stratz.getSearchByMatch(query) ⇒ Promise\<any\>](#stratzgetsearchbymatchquery--promiseany)
  - [stratz.getHeroById(\[id\], \[languageId\], \[gameVersionId\]) ⇒ Promise\<Hero\>](#stratzgetherobyidid-languageid-gameversionid--promisehero)
  - [stratz.getAbilityById(\[id\], \[languageId\], \[gameVersionId\]) ⇒ Promise\<(Ability|Record\<string, Ability\>)\>](#stratzgetabilitybyidid-languageid-gameversionid--promiseabilityrecordstring-ability)
  - [stratz.getHeroList(\[languageId\], \[gameVersionId\]) ⇒ Promise](#stratzgetherolistlanguageid-gameversionid--promise)
  - [stratz.getAbilityList(\[languageId\], \[gameVersionId\]) ⇒ Promise](#stratzgetabilitylistlanguageid-gameversionid--promise)
  - [stratz.getLatestGameVersion(\[outputType\]) ⇒ Promise\<number\> | Promise\<string\> | Promise\<object\>](#stratzgetlatestgameversionoutputtype--promisenumber--promisestring--promiseobject)


* * *

<a name="new_Stratz_new"></a>

### new Stratz(apiToken)
Create a new instance of STRATZ REST API wrapper. This is the first thing you do to start.


| Param | Type | Description |
| --- | --- | --- |
| apiToken | <code>string</code> | Your API token. You can get yours for free at https://stratz.com/api. |


* * *

<a name="Stratz+_apiReq"></a>

### stratz.\_apiReq(path, method, [queryParameters]) ⇒ <code>Promise&lt;any&gt;</code>
Create a direct HTTP request to the STRATZ API.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves with the result object of the HTTPS request.  
**Internal**:   

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | Endpoint path. |
| method | <code>string</code> | HTTPS method. |
| [queryParameters] | <code>\*</code> | Query parameters for the request. |


* * *

<a name="Stratz+getAbilities"></a>

### stratz.getAbilities([languageId], [gameVersionId]) ⇒ <code>Record&lt;string, Ability&gt;</code>
All information retaining to the Dota 2 Abilities by Game Version.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Record&lt;string, Ability&gt;</code> - Promise object that resolves to JSON response represented by GET `/Ability`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getGameVersion"></a>

### stratz.getGameVersion() ⇒ <code>Promise&lt;Array&lt;GameVersion&gt;&gt;</code>
The list of game versions the Dota 2 game has gone through.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;GameVersion&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/GameVersion`.  

* * *

<a name="Stratz+getLanguages"></a>

### stratz.getLanguages() ⇒ <code>Promise&lt;Record&lt;string, string&gt;&gt;</code>
Returns the list of languages which STRATZ supports.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, string&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Language`.  

* * *

<a name="Stratz+getCluster"></a>

### stratz.getCluster() ⇒ <code>Promise&lt;Array&lt;Cluster&gt;&gt;</code>
Provided directly from Dota 2 Region files, the cluster is the geographically breakdown of where the game is played.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;Cluster&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Cluster`.  

* * *

<a name="Stratz+getGameMode"></a>

### stratz.getGameMode() ⇒ <code>Promise&lt;Record&lt;string, GameMode&gt;&gt;</code>
Returns a list of GameMode types which is directly supplied by Dota 2. Matches API call will have a input for this value.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, GameMode&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/GameMode`.  

* * *

<a name="Stratz+getHeroes"></a>

### stratz.getHeroes([languageId], [gameVersionId]) ⇒ <code>Promise&lt;Record&lt;string, Hero&gt;&gt;</code>
The current list of Heroes found in the Dota 2 client. Includes all base stats plus additional information on the hero.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, Hero&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Hero`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getItems"></a>

### stratz.getItems([languageId], [gameVersionId]) ⇒ <code>Promise&lt;Record&lt;string, Item&gt;&gt;</code>
List of Items in the Dota 2 Game and details about each.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, Item&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Item`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getItemById"></a>

### stratz.getItemById(id, [gameVersionId]) ⇒ <code>Promise&lt;Item&gt;</code>
More specific details about the Item ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Item&gt;</code> - Promise object that resolves to JSON response represented by GET `/Item/{id}`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Item ID requested. <br />`Required.` |
| [gameVersionId] | <code>number</code> | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getNpc"></a>

### stratz.getNpc([gameVersionId]) ⇒ <code>Promise&lt;Record&lt;string, Npc&gt;&gt;</code>
All information retaining to the Dota 2 Npcs by Game Version.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, Npc&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Npc`.  

| Param | Type | Description |
| --- | --- | --- |
| [gameVersionId] | <code>number</code> | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getLeagues"></a>

### stratz.getLeagues() ⇒ <code>Promise&lt;Array&lt;League&gt;&gt;</code>
Returns the list of Leagues limited by the queries.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;League&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/League`.  

| Param | Type | Description |
| --- | --- | --- |
| [queryParameters.tier] | <code>Array&lt;number&gt;</code> | The type of league your requested limit by Dota 2 filter of Tier. Accepted : 1 - Amateur, 2 - Professional, 3 - DPC Minors (Premium), 4 - DPC Majors (Premium). <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9` |
| [queryParameters.skip] | <code>number</code> | The amount to skip before returning results. |
| [queryParameters.take] | <code>number</code> | The amount of results to take. <br/>`Max amount 100`. |
| [queryParameters.requireImage] | <code>boolean</code> | If the league must have an image to return. |
| [queryParameters.orderBy] | <code>string</code> | The determiantion of the order of the results returned. Accepted inputs are `LastMatchTime` and `Id`. <br/>Default is `LastMatchTime`. |


* * *

<a name="Stratz+getLeagueById"></a>

### stratz.getLeagueById(id) ⇒ <code>Promise&lt;League&gt;</code>
Return more data about a specific League.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;League&gt;</code> - Promise object that resolves to JSON response represented by GET `/League/{id}`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | League ID. <br />`Required.` |


* * *

<a name="Stratz+getLeagueByIdMatches"></a>

### stratz.getLeagueByIdMatches(id) ⇒ <code>Promise&lt;Array&lt;Match&gt;&gt;</code>
**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;Match&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/League/{id}/matches`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | League ID. <br />`Required.` |
| [queryParameters.include] | <code>Array&lt;string&gt;</code> | Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. Accepted Values: Player, Series, League, Team, Ability, PickBan, HeroImp. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). HeroImp will return the AvgImp values. |
| [queryParameters.steamId] | <code>number</code> | Requests matches where Steam Account Id is present. |
| [queryParameters.seriesId] | <code>number</code> | Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries). |
| [queryParameters.teamId] | <code>number</code> | Requests matches where a specific Team is present. |
| [queryParameters.isParsed] | <code>boolean</code> | Requests matches where we have parsed data for the match. <br />Default takes both `Parsed` and `Un-parsed`. |
| [queryParameters.isLeague] | <code>boolean</code> | Requests matches where they are league if any kind. Default takes both leagues and non-leagues. |
| [queryParameters.hasAward] | <code>boolean</code> | Requests matches where the an award has been won. Must be used in conjunction with playerType = Single. |
| [queryParameters.isStats] | <code>boolean</code> | Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both `Stats` and `Non-stats` matches. |
| [queryParameters.stageType] | <code>Array&lt;string&gt;</code> | For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically. |
| [queryParameters.gameMode] | <code>string</code> | Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. This is a comma delimited `array` input. |
| [queryParameters.lobbyType] | <code>string</code> | Requests matches where a specific or group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.gameVersion] | <code>Array&lt;number&gt;</code> | Requests matches where a specific or group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.tier] | <code>number</code> | The type of league your requested limit by Dota 2 filter of Tier. <br />Accepted: `1` - Amateur, `2` - Premium, `3` - Professional. |
| [queryParameters.take] | <code>number</code> | The amount of matches that will be returned. <br />The max value is `250`. |
| [queryParameters.skip] | <code>number</code> | The amount of matches that will be skipped before turning rows. |


* * *

<a name="Stratz+getLeagueByIdSeries"></a>

### stratz.getLeagueByIdSeries(id, [stageType], [take], [skip]) ⇒ <code>Promise&lt;Array&lt;Series&gt;&gt;</code>
Returns a list of Series Ids with the Match Data included.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;Series&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/League/{id}/series`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | League ID. <br/>`Required.` |
| [stageType] | <code>Array&lt;string&gt;</code> | For league, if you want only data from a specific set of time.  Like Group Stages, Main Event, etc.  Not all league have stages.  This will apply a start/end date time to the query automatically. |
| [take] | <code>number</code> | The amount of matches that will be returned. <br />The max value is `250`. |
| [skip] | <code>number</code> | The amount of matches that will be skipped before turning rows. |


* * *

<a name="Stratz+getLobbyType"></a>

### stratz.getLobbyType() ⇒ <code>Promise&lt;Record&lt;string, LobbyType&gt;&gt;</code>
Returns a list of Lobby Type which are mirrored from the Dota 2 client.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, LobbyType&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/lobbyType`.  

* * *

<a name="Stratz+getMatchById"></a>

### stratz.getMatchById(id) ⇒ <code>Promise&lt;MatchDetailed&gt;</code>
A very in depth return of data about the match. <br />Very large, about 500kb in size.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;MatchDetailed&gt;</code> - Promise object that resolves to JSON response represented by GET `/match/{id}`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Match ID requested. <br />`Required.` |


* * *

<a name="Stratz+postMatchCallById"></a>

### stratz.postMatchCallById(id) ⇒ <code>Promise&lt;unknown&gt;</code>
Should a match fail to download or a new parse is needed for new data, call retry will tell our system to download this match again. <br />This call is `extremely limited`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;unknown&gt;</code> - Promise object that resolves to JSON response represented by POST `/match/{id}/retry`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Match ID requested. <br/>`Required.` |


* * *

<a name="Stratz+getMatchBreakdown"></a>

### stratz.getMatchBreakdown(id) ⇒ <code>Promise&lt;any&gt;</code>
Match Breakdown is a fast way to gather basic yet more advanced information about a match.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/match/{id}/breakdown`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Match ID for the Breakdown Data. <br/>`Required.` |


* * *

<a name="Stratz+getMatchLive"></a>

### stratz.getMatchLive(id, [skip]) ⇒ <code>Promise&lt;Match&gt;</code>
Match Live is data where a match is on the Dota Watch list and still active. All League games are also Live.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Match&gt;</code> - Promise object that resolves to JSON response represented by GET `/match/{id}/live`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | The Match ID for the Live Data. <br/>`Required.` |
| [skip] | <code>number</code> | The amount in seconds you wish to skip until you start getting MatchEvents or PlayerMatchEvents. |


* * *

<a name="Stratz+getPatchNotes"></a>

### ~~stratz.getPatchNotes([languageId]) ⇒ <code>Promise&lt;any&gt;</code>~~
***Deprecated***

Return Patch Notes for each Item/Ability. These are found when you hover over each object in-game.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/Patch/notes`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguage()](#Stratz+getLanguage) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |


* * *

<a name="Stratz+getPlayer"></a>

### stratz.getPlayer(id) ⇒ <code>Promise&lt;StratzPlayer&gt;</code>
Returns specific data about specific Steam Account ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;StratzPlayer&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/{id}`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Steam Account ID. <br/>`Required.` |


* * *

<a name="Stratz+getPlayerBasic"></a>

### stratz.getPlayerBasic(id) ⇒ <code>Promise&lt;StratzPlayerBasic&gt;</code>
Returns a very small quantity of data about a user.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;StratzPlayerBasic&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/{id}/basic`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Steam Account ID. <br/>`Required.` |


* * *

<a name="Stratz+getPlayerMatches"></a>

### stratz.getPlayerMatches(id) ⇒ <code>Promise&lt;Array&lt;MatchBreakdown&gt;&gt;</code>
Returns matches about a specific Steam Account ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Array&lt;MatchBreakdown&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/{id}/matches`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> \| <code>string</code> |  | Steam Account ID of the Player. <br/>`Required.` |
| [queryParameters.matchId] | <code>Array&lt;number&gt;</code> |  | Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input. |
| [queryParameters.include] | <code>Array&lt;string&gt;</code> |  | Determines what data you want to include back from the system. This is a comma delimited `array` input. The default data for this call is very limited. Accepted Values: Player, Series, League, Team, Ability, PickBan, Spectators, Stats, StatsBreakdown. Player will return additional information about each player such as Name, Rank, Season Leader Board, etc. Series returns back any information about the series. League returns League Object. Team returns back the RadiantTeam and DireTeam Object. Ability will return the Ability (Learn Events) object. PickBan will return the PickBan Object (Hero Pick and Ban Events during the draft). Stats will return back the world average stats for basic data such as kills, deaths and assists based on Hero Rank/Lane/Role.  Will also include extremely basic data for MatchPlayerStats. |
| [queryParameters.playerList] | <code>string</code> | <code>&quot;\&quot;Single\&quot;&quot;</code> | PlayerList determines if just the original player will be returned OR all 10. <br />Accepted Values: All, Single. Default is Single. |
| [queryParameters.heroId] | <code>Array&lt;number&gt;</code> |  | Requests matches where heroId is present. <br />This is a comma delimited `array` input. |
| [queryParameters.leagueId] | <code>number</code> |  | Requests matches where a specific League is present. |
| [queryParameters.seriesId] | <code>number</code> |  | Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries). |
| [queryParameters.teamId] | <code>number</code> |  | Requests matches where a specific Team is present. |
| [queryParameters.isParsed] | <code>boolean</code> |  | Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed. |
| [queryParameters.isLeague] | <code>boolean</code> |  | Requests matches where they are league if any kind. Default takes both leagues and non-leagues. |
| [queryParameters.hasAward] | <code>boolean</code> |  | Requests matches where the an award has been won. Must be used in conjunction with playerType = Single. |
| [queryParameters.isStats] | <code>boolean</code> |  | Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches. |
| [queryParameters.isVictory] | <code>boolean</code> | <code></code> | Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats. |
| [queryParameters.gameMode] | <code>string</code> |  | Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.lobbyType] | <code>string</code> |  | Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.gameVersionId] | <code>Array&lt;number&gt;</code> |  | Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriends] | <code>Array&lt;number&gt;</code> |  | Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriendsHero] | <code>Array&lt;number&gt;</code> |  | Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input. |
| [queryParameters.lane] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> \| <code>4</code> \| <code>255</code> | <code></code> | Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`. |
| [queryParameters.role] | <code>number</code> | <code></code> | Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`. |
| [queryParameters.tier] | <code>number</code> |  | Requests matches where the League tier matches. <br/>Available values: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9` |
| [queryParameters.region] | <code>Array&lt;number&gt;</code> | <code></code> | A comma delimited array model of Region Ids. Leaving null will produce all regions. |
| [queryParameters.rank] | <code>Array&lt;number&gt;</code> |  | "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input. |
| [queryParameters.minDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum. |
| [queryParameters.maxDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum. |
| [queryParameters.minGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum. |
| [queryParameters.maxGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum. |
| [queryParameters.startDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium. |
| [queryParameters.endDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum. |
| [queryParameters.isParty] | <code>boolean</code> |  | Shows only matches where the user is in a party. |
| [queryParameters.partyCount] | <code>Array&lt;number&gt;</code> | <code>true</code> | Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input. |
| [queryParameters.isRadiant] | <code>boolean</code> |  | Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`. |
| [queryParameters.award] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> |  | Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`. |
| [queryParameters.isTeam] | <code>boolean</code> |  | Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches. |
| [queryParameters.take] | <code>number</code> |  | The amount of matches that will be returned. <br />`The max value is 50`. |
| [queryParameters.skip] | <code>number</code> |  | The amount of matches that will be skipped before turning rows. |


* * *

<a name="Stratz+getPlayerHeroPerformance"></a>

### stratz.getPlayerHeroPerformance(id, [heroId]) ⇒ <code>Promise&lt;(HeroPerformance\|Array&lt;HeroPerformance&gt;)&gt;</code>
Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;(HeroPerformance\|Array&lt;HeroPerformance&gt;)&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | Steam Account ID of the Player. <br/>`Required.` |
| [heroId] | <code>Array&lt;number&gt;</code> |  | Requests matches where heroId is present. <br />If specified, shows the detailed statistics for matching `heroId`. |
| [queryParameters.matchId] | <code>Array&lt;number&gt;</code> |  | Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input. |
| [queryParameters.leagueId] | <code>number</code> |  | Requests matches where a specific League is present. |
| [queryParameters.seriesId] | <code>number</code> |  | Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries). |
| [queryParameters.teamId] | <code>number</code> |  | Requests matches where a specific Team is present. |
| [queryParameters.isParsed] | <code>boolean</code> |  | Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed. |
| [queryParameters.isLeague] | <code>boolean</code> |  | Requests matches where they are league if any kind. Default takes both leagues and non-leagues. |
| [queryParameters.hasAward] | <code>boolean</code> |  | Requests matches where the an award has been won. Must be used in conjunction with playerType = Single. |
| [queryParameters.isStats] | <code>boolean</code> |  | Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches. |
| [queryParameters.isVictory] | <code>boolean</code> | <code></code> | Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats. |
| [queryParameters.gameMode] | <code>string</code> |  | Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.lobbyType] | <code>string</code> |  | Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.gameVersionId] | <code>Array&lt;number&gt;</code> |  | Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriends] | <code>Array&lt;number&gt;</code> |  | Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriendsHero] | <code>Array&lt;number&gt;</code> |  | Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input. |
| [queryParameters.lane] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> \| <code>4</code> \| <code>255</code> | <code></code> | Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`. |
| [queryParameters.role] | <code>number</code> | <code></code> | Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`. |
| [queryParameters.tier] | <code>number</code> |  | Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9` |
| [queryParameters.region] | <code>Array&lt;number&gt;</code> | <code></code> | A comma delimited `array` model of Region Ids. Leaving null will produce all regions. |
| [queryParameters.rank] | <code>Array&lt;number&gt;</code> |  | "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input. |
| [queryParameters.minDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum. |
| [queryParameters.maxDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum. |
| [queryParameters.minGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum. |
| [queryParameters.maxGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum. |
| [queryParameters.startDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium. |
| [queryParameters.endDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum. |
| [queryParameters.isParty] | <code>boolean</code> |  | Shows only matches where the user is in a party. |
| [queryParameters.partyCount] | <code>Array&lt;number&gt;</code> | <code>true</code> | Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input. |
| [queryParameters.isRadiant] | <code>boolean</code> |  | Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`. |
| [queryParameters.award] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> |  | Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`. |
| [queryParameters.isTeam] | <code>boolean</code> |  | Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches. |


* * *

<a name="Stratz+getPlayerHeroPerformanceByHeroId"></a>

### stratz.getPlayerHeroPerformanceByHeroId(id, heroId) ⇒ <code>Promise&lt;HeroPerformance&gt;</code>
A more in depth at a single player's single hero performance.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;HeroPerformance&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/{id}/heroPerformance/{heroId}`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | Steam Account ID of the Player. <br/>`Required.` |
| heroId | <code>Array&lt;number&gt;</code> |  | Requests matches where heroId is present. <br />This is a comma delimited `array` input. <br/>`Required.` |
| [queryParameters.matchId] | <code>Array&lt;number&gt;</code> |  | Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input. |
| [queryParameters.leagueId] | <code>number</code> |  | Requests matches where a specific League is present. |
| [queryParameters.seriesId] | <code>number</code> |  | Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries). |
| [queryParameters.teamId] | <code>number</code> |  | Requests matches where a specific Team is present. |
| [queryParameters.isParsed] | <code>boolean</code> |  | Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed. |
| [queryParameters.isLeague] | <code>boolean</code> |  | Requests matches where they are league if any kind. Default takes both leagues and non-leagues. |
| [queryParameters.hasAward] | <code>boolean</code> |  | Requests matches where the an award has been won. Must be used in conjunction with playerType = Single. |
| [queryParameters.isStats] | <code>boolean</code> |  | Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches. |
| [queryParameters.isVictory] | <code>boolean</code> | <code></code> | Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats. |
| [queryParameters.gameMode] | <code>string</code> |  | Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.lobbyType] | <code>string</code> |  | Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.gameVersionId] | <code>Array&lt;number&gt;</code> |  | Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriends] | <code>Array&lt;number&gt;</code> |  | Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriendsHero] | <code>Array&lt;number&gt;</code> |  | Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input. |
| [queryParameters.lane] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> \| <code>4</code> \| <code>255</code> | <code></code> | Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`. |
| [queryParameters.role] | <code>number</code> | <code></code> | Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`. |
| [queryParameters.tier] | <code>number</code> |  | Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9` |
| [queryParameters.region] | <code>Array&lt;number&gt;</code> | <code></code> | A comma delimited `array` model of Region Ids. Leaving null will produce all regions. |
| [queryParameters.rank] | <code>Array&lt;number&gt;</code> |  | "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input. |
| [queryParameters.minDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum. |
| [queryParameters.maxDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum. |
| [queryParameters.minGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum. |
| [queryParameters.maxGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum. |
| [queryParameters.startDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium. |
| [queryParameters.endDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum. |
| [queryParameters.isParty] | <code>boolean</code> |  | Shows only matches where the user is in a party. |
| [queryParameters.partyCount] | <code>Array&lt;number&gt;</code> | <code>true</code> | Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input. |
| [queryParameters.isRadiant] | <code>boolean</code> |  | Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`. |
| [queryParameters.award] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> |  | Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`. |
| [queryParameters.isTeam] | <code>boolean</code> |  | Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches. |


* * *

<a name="Stratz+getDotaPlusLeaderboard"></a>

### stratz.getDotaPlusLeaderboard([heroId], [orderBy], [skip], [take]) ⇒ <code>Promise&lt;DotaPlusLeaderboard&gt;</code>
Gets the Players of Dota which have DotaPlus and have a high level hero.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;DotaPlusLeaderboard&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/dotaPlusLeaderboard`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [heroId] | <code>number</code> |  | If you want to limit to a single HeroId to find awards. <br />It can be found at [.getGameVersion()](#Stratz+getGameVersion). |
| [orderBy] | <code>string</code> |  | Helps with the ordering. Accepted values are `recent` (Shows the most recent awards given) and `level` (showes by the highest level first). |
| [skip] | <code>number</code> | <code>0</code> | Amount of records you want to skip before starting. |
| [take] | <code>number</code> | <code>20</code> | Amount of total records you want to take. <br />Maximum amount is `100`. |


* * *

<a name="Stratz+getProSteamAccounts"></a>

### stratz.getProSteamAccounts() ⇒ <code>Promise&lt;Record&lt;string, ESportsPlayer&gt;&gt;</code>
Returns all known Professional eSport Players.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Record&lt;string, ESportsPlayer&gt;&gt;</code> - Promise object that resolves to JSON response represented by GET `/Player/proSteamAccount`.  

* * *

<a name="Stratz+getPlayedWithPro"></a>

### stratz.getPlayedWithPro(id) ⇒ <code>Promise&lt;unknown&gt;</code>
Picked the top pros and announcers and determines if you ever have played with them and when.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;unknown&gt;</code> - Promise object that resolves to JSON response represented by GET `Player/{id}/playedWithPro`.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Steam Account ID. <br/>`Required.` |


* * *

<a name="Stratz+getPlayerSummary"></a>

### stratz.getPlayerSummary(id) ⇒ <code>Promise&lt;PlayerSummary&gt;</code>
Returns a list of all Heroes played by the Steam Account ID and contains data about the average performance.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;PlayerSummary&gt;</code> - Promise object that resolves to JSON response represented by GET `/player/{id}/summary`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | Steam Account ID of the Player. <br/>`Required.` |
| [queryParameters.matchId] | <code>Array&lt;number&gt;</code> |  | Requests matches where the match id is an exact match. <br />This is a comma delimited `array` input. |
| [queryParameters.heroId] | <code>Array&lt;number&gt;</code> |  | Requests matches where heroId is present. <br />This is a comma delimited `array` input. |
| [queryParameters.leagueId] | <code>number</code> |  | Requests matches where a specific League is present. |
| [queryParameters.seriesId] | <code>number</code> |  | Matches with a matching [.getLeagueByIdSeries()](#Stratz+getLeagueByIdSeries). |
| [queryParameters.teamId] | <code>number</code> |  | Requests matches where a specific Team is present. |
| [queryParameters.isParsed] | <code>boolean</code> |  | Requests matches where we have parsed data for the match. <br />Default takes both Parsed and Un-parsed. |
| [queryParameters.isLeague] | <code>boolean</code> |  | Requests matches where they are league if any kind. Default takes both leagues and non-leagues. |
| [queryParameters.hasAward] | <code>boolean</code> |  | Requests matches where the an award has been won. Must be used in conjunction with playerType = Single. |
| [queryParameters.isStats] | <code>boolean</code> |  | Require that STRATZ belives this was a legit match and did not contain a leaver, feeding, etc. <br />Default includes both Stats and non-stats matches. |
| [queryParameters.isVictory] | <code>boolean</code> | <code></code> | Requests matches where the SteamId is Victorious. Default is null which returns both wins and defeats. Setting to `0` returns only defeats. |
| [queryParameters.gameMode] | <code>string</code> |  | Requests matches where a specific or a group of [.getGameMode()](#Stratz+getGameMode) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.lobbyType] | <code>string</code> |  | Requests matches where a specific or a group of [.getLobbyType()](#Stratz+getLobbyType) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.gameVersionId] | <code>Array&lt;number&gt;</code> |  | Requests matches where a specific or a group of [.getGameVersion()](#Stratz+getGameVersion) are present. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriends] | <code>Array&lt;number&gt;</code> |  | Request matches where the friend Steam Account ID must be present. More than one value requires that all players must exist in the match. <br />This is a comma delimited `array` input. |
| [queryParameters.withFriendsHero] | <code>Array&lt;number&gt;</code> |  | Requests matches where the friend must be playing the specific hero. Must have the same array length as withFriends. <br />This is a comma delimited `array` input. |
| [queryParameters.lane] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> \| <code>4</code> \| <code>255</code> | <code></code> | Requests matches where the SteamId played in a specific lane. Default is null which returns all lanes. <br />This is a comma delimited `array` input. <br />Available values : `0, 1, 2, 3, 4, 255`. |
| [queryParameters.role] | <code>number</code> | <code></code> | Requests matches where the SteamId played in a specific Role. (Core/Support). <br />Default is null which returns both roles. <br />Available values: `0, 1, 2, 255`. |
| [queryParameters.tier] | <code>number</code> |  | Requests matches where the League tier matches. <br/>`Available values : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9` |
| [queryParameters.region] | <code>Array&lt;number&gt;</code> | <code></code> | A comma delimited `array` model of Region Ids. Leaving null will produce all regions. |
| [queryParameters.rank] | <code>Array&lt;number&gt;</code> |  | "Requests matches where the average Rank of the match is in the bracket. Enter 0 for unknown average rank. Followed by 1-7 for each Dota 2 Rank. <br />This is a comma delimited `array` input. |
| [queryParameters.minDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no minimum. |
| [queryParameters.maxDuration] | <code>number</code> | <code></code> | Requests matches where the match is no longer than this many minutes. <br />Default is null and there is no maximum. |
| [queryParameters.minGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no minimum. |
| [queryParameters.maxGameVersionId] | <code>number</code> |  | Requests matches where the match is lower than this input.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br /> Default is null and there is no maximum. |
| [queryParameters.startDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is greater than the inputted time.  Must input an Epoc Unix Timestamp of the time. <br /> Default is null and there is no minium. |
| [queryParameters.endDateTime] | <code>number</code> | <code></code> | Requests matches where the match end date is less than the inputted time.  See [.getGameVersion()](#Stratz+getGameVersion) API call for a list of patch IDs. <br />Default is null and there is no maximum. |
| [queryParameters.isParty] | <code>boolean</code> |  | Shows only matches where the user is in a party. |
| [queryParameters.partyCount] | <code>Array&lt;number&gt;</code> | <code>true</code> | Matches where the user is in a party with this many friends. <br />This is a comma delimited `array` input. |
| [queryParameters.isRadiant] | <code>boolean</code> |  | Matches where the user is on the Radiant Faction. Default is null which shows both factions. <br />`Set to false for Dire`. |
| [queryParameters.award] | <code>0</code> \| <code>1</code> \| <code>2</code> \| <code>3</code> |  | Matches where the user gets a specific award. <br />This is a comma delimited `array` input. <br />Available values: `0, 1, 2, 3`. |
| [queryParameters.isTeam] | <code>boolean</code> |  | Requests matches where they are on a team if any kind. <br />Default takes both team and non-team matches. |


* * *

<a name="Stratz+getRegion"></a>

### stratz.getRegion() ⇒ <code>Promise&lt;Region&gt;</code>
Give a list connection the Cluster Id to a Region ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Region&gt;</code> - Promise object that resolves to JSON response represented by GET `/Region`.  

* * *

<a name="Stratz+getUser"></a>

### stratz.getUser() ⇒ <code>Promise&lt;User&gt;</code>
Get information about the current logged in user. <br />`Required Authorization`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;User&gt;</code> - Promise object that resolves to JSON response represented by GET `/User`.  

* * *

<a name="Stratz+getUserSteam"></a>

### stratz.getUserSteam([returnUrl]) ⇒ <code>Promise&lt;any&gt;</code>
Get information about the current logged in user. `Required Authorization`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/User/steam`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [returnUrl] | <code>string</code> | <code>&quot;/api/v1/home/news&quot;</code> | The return URL <br/>`Required.` <br/>Default value: `'/api/v1/home/news'`. |


* * *

<a name="Stratz+getSearch"></a>

### stratz.getSearch(query) ⇒ <code>Promise&lt;any&gt;</code>
The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/Search`.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.` |
| [queryParameters.minRank] | <code>number</code> | Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc. |
| [queryParameters.maxRank] | <code>number</code> | Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc. |
| [queryParameters.leaderboardRegion] | <code>Array&lt;number&gt;</code> | A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input. |
| [queryParameters.lastSeen] | <code>number</code> | The Epoc Datestamp of when the player must have played by. |
| [queryParameters.tiers] | <code>Array&lt;number&gt;</code> | Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`. |
| [queryParameters.isPro] | <code>boolean</code> | Used when searching Teams, if the Team is a professional team. |
| [queryParameters.take] | <code>number</code> | Amount of results to be returned. <br />`Max is 150`. |


* * *

<a name="Stratz+getSearchByPlayer"></a>

### stratz.getSearchByPlayer(query) ⇒ <code>Promise&lt;any&gt;</code>
The basic search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/search/player`.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.` |
| [queryParameters.minRank] | <code>number</code> | Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc. |
| [queryParameters.maxRank] | <code>number</code> | Value of the current badge for a Player. 80 is Immortal, 70 Divine, etc. |
| [queryParameters.leaderboardRegion] | <code>Array&lt;number&gt;</code> | A list of Leaderboard Region Values. <br />`0 America, 1 SE Asia, 2 Europe, 3 China`. This is a comma delimited `array` input. |
| [queryParameters.lastSeen] | <code>number</code> | The Epoc Datestamp of when the player must have played by. |
| [queryParameters.take] | <code>number</code> | Amount of results to be returned. <br />`Max is 150`. |


* * *

<a name="Stratz+getSearchByLeague"></a>

### stratz.getSearchByLeague(query, [tiers], [take]) ⇒ <code>Promise&lt;any&gt;</code>
The basic league search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/search/league`.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.` |
| [tiers] | <code>Array&lt;number&gt;</code> | Used when searching Leagues. <br />`1 Amateur, 2 Professional, 3 Premium, 4 and 5 are Pro Circuit`. |
| [take] | <code>number</code> | Amount of results to be returned. <br />`Max is 150`. |


* * *

<a name="Stratz+getSearchByTeam"></a>

### stratz.getSearchByTeam(query, [isPro], [take]) ⇒ <code>Promise&lt;any&gt;</code>
The basic team search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/search/team`.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.` |
| [isPro] | <code>boolean</code> | Used when searching Teams, if the Team is a professional team. |
| [take] | <code>number</code> | Amount of results to be returned. <br />`Max is 150`. |


* * *

<a name="Stratz+getSearchByMatch"></a>

### stratz.getSearchByMatch(query) ⇒ <code>Promise&lt;any&gt;</code>
The basic match search system for STRATZ.  Input a query and apply filters to limit the result set. There is over 50,000,000 names in the database. `Be specific`.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;any&gt;</code> - Promise object that resolves to JSON response represented by GET `/search/match`.  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | The text query you wish to search on. <br />Minimum input is `2 characters`. <br/>`Required.` |


* * *

<a name="Stratz+getHeroById"></a>

### stratz.getHeroById([id], [languageId], [gameVersionId]) ⇒ <code>Promise&lt;Hero&gt;</code>
Search a Hero by its ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;Hero&gt;</code> - Promise object that resolves to JSON representation of a hero information.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> |  | Hero ID according to [.getHeroList()](#Stratz+getHeroList). <br />If not specified, the resolve is equivalent to [.getHeroes()](#Stratz+getHeroes) method. |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getAbilityById"></a>

### stratz.getAbilityById([id], [languageId], [gameVersionId]) ⇒ <code>Promise&lt;(Ability\|Record&lt;string, Ability&gt;)&gt;</code>
Search an Ability by its ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;(Ability\|Record&lt;string, Ability&gt;)&gt;</code> - Promise object that resolves to JSON representation of a hero's abilities information.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>number</code> |  | Ability ID according to [.getAbilityList()](#Stratz+getAbilityList). <br />If not specified, the resolve is equivalent to [.getAbilities()](#Stratz+getAbilities) method. |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getHeroList"></a>

### stratz.getHeroList([languageId], [gameVersionId]) ⇒ <code>Promise</code>
List of All Heroes in the Dota 2 Game by Name and Hero ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise</code> - Promise object that resolves to JSON representation of a list of abilities.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getAbilityList"></a>

### stratz.getAbilityList([languageId], [gameVersionId]) ⇒ <code>Promise</code>
List of All Abilities in the Dota 2 Game by Name and Ability ID.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise</code> - Promise object that resolves to JSON representation of a list of abilities.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [languageId] | <code>number</code> | <code>StratzLanguage.English</code> | Language for the data to come back. Check [.getLanguages()](#Stratz+getLanguages) for the full list of avaliable languages. <br/>`If not specified`, the response will contain results `in English`. |
| [gameVersionId] | <code>number</code> |  | Game Version ID matching [.getGameVersion()](#Stratz+getGameVersion). <br/>`If not specified`, the `latest version` data will be presented. |


* * *

<a name="Stratz+getLatestGameVersion"></a>

### stratz.getLatestGameVersion([outputType]) ⇒ <code>Promise&lt;number&gt;</code> \| <code>Promise&lt;string&gt;</code> \| <code>Promise&lt;object&gt;</code>
Get the Latest Version of Dota 2 Game with different variations.

**Kind**: instance method of [<code>Stratz</code>](#Stratz)  
**Returns**: <code>Promise&lt;number&gt;</code> \| <code>Promise&lt;string&gt;</code> \| <code>Promise&lt;object&gt;</code> - Promise object that resolves to a representation of a latest Dota 2 version.  

| Param | Type | Description |
| --- | --- | --- |
| [outputType] | <code>string</code> | The type of the value returned. <br />Accepted: `"date"`, `"name"`, `"id"` as strings. <br /> If not specified, returns an object with all these values. |


* * *

