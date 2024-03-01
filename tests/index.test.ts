import 'dotenv/config';

import { StratzLanguage } from '../src/enums/StratzLanguage.enum';
import { Stratz } from '../src/index';

const apiToken = process.env.STRATZ_TOKEN ?? '';
const api = new Stratz(apiToken);

const STEAM_ID = 282424658;
const GAME_VERSION_ID = 169; // 7.35
const ITEM_ID = 1; // blink dagger
const LEAGUE_ID = 4122;
const MATCH_ID = 7012302987;
const HERO_ID = 14; // pudge
const TEAM_NAME = 'alliance';
const ABILITY_ID = 9627; // 'hoodwink_hunters_boomerang'

describe('Stratz.js Unit Tests', () => {
  test('Get Ability', async () => {
    const result = await api.getAbilities(StratzLanguage.English, GAME_VERSION_ID);
    expect(result).toBeDefined();
  });

  test('Get Game Version', async () => {
    const result = await api.getGameVersion();
    expect(result).toBeDefined();
  });

  test('Get Languages', async () => {
    const result = await api.getLanguages();
    expect(result).toBeDefined();
  });

  test('Get Cluster', async () => {
    const result = await api.getCluster();
    expect(result).toBeDefined();
  });

  test('Get Game Mode', async () => {
    const result = await api.getGameMode();
    expect(result).toBeDefined();
  });

  test('Get Heroes', async () => {
    const result = await api.getHeroes(StratzLanguage.English, GAME_VERSION_ID);
    expect(result).toBeDefined();
  });

  test('Get Items', async () => {
    const result = await api.getItems(StratzLanguage.English, GAME_VERSION_ID);
    expect(result).toBeDefined();
  });

  test('Get Items By ID', async () => {
    const result = await api.getItemById(ITEM_ID, GAME_VERSION_ID);
    expect(result).toBeDefined();
  });

  test('Get NPC', async () => {
    const result = await api.getNpc(GAME_VERSION_ID);
    expect(result).toBeDefined();
  });

  test('Get League', async () => {
    const result = await api.getLeagues();
    expect(result).toBeDefined();
  });

  test('Get League By ID', async () => {
    const result = await api.getLeagueById(LEAGUE_ID);
    expect(result).toBeDefined();
  });

  test('Get League Matches By ID', async () => {
    const result = await api.getLeagueByIdMatches(LEAGUE_ID);
    expect(result).toBeDefined();
  });

  test('Get League Series By ID', async () => {
    const result = await api.getLeagueByIdSeries(LEAGUE_ID);
    expect(result).toBeDefined();
  });

  test('Get Lobby Type', async () => {
    const result = await api.getLobbyType();
    expect(result).toBeDefined();
  });

  test('Get Match Breakdown', async () => {
    const result = await api.getMatchBreakdown(MATCH_ID);
    expect(result).toBeDefined();
  });

  test('Get Patch Notes', async () => {
    const result = await api.getPatchNotes();
    expect(result).toBeDefined();
  });

  test('Get Player', async () => {
    const result = await api.getPlayer(STEAM_ID);
    expect(result).toBeDefined();
  });

  test('Get Player Basic Info', async () => {
    const result = await api.getPlayerBasic(STEAM_ID);
    expect(result).toBeDefined();
  });

  test('Get Player Matches', async () => {
    const result = await api.getPlayerMatches(STEAM_ID);
    expect(result).toBeDefined();
  });

  test('Get Player Hero Performance', async () => {
    const result = await api.getPlayerHeroPerformance(STEAM_ID, 1);
    expect(result).toBeDefined();
  });

  test('Get Player Hero Performance By Hero ID', async () => {
    const result = await api.getPlayerHeroPerformanceByHeroId(
      STEAM_ID,
      HERO_ID,
    );
    expect(result).toBeDefined();
  });

  test('Get Dota+ Leaderboard', async () => {
    const result = await api.getDotaPlusLeaderboard(HERO_ID);
    expect(result).toBeDefined();
  });

  test('Get All Pro Accounts', async () => {
    const result = await api.getProSteamAccounts();
    expect(result).toBeDefined();
  });

  test('Get Played With Pro', async () => {
    await expect(async () => await api.getPlayedWithPro(STEAM_ID)).rejects.toThrow();
  });

  test('Get Player Summary', async () => {
    const result = await api.getPlayerSummary(STEAM_ID);
    expect(result).toBeDefined();
  });

  test('Get Region', async () => {
    const result = await api.getRegion();
    expect(result).toBeDefined();
  });

  test('Get User', async () => {
    const result = await api.getUser();
    expect(result).toBeDefined();
  });

  test("Get User's Steam", async () => {
    expect(await api.getUserSteam()).toBeDefined();
  });

  test('Basic Search', async () => {
    const result = await api.getSearch(MATCH_ID);
    expect(result).toBeDefined();
  });

  test('Player Search', async () => {
    const result = await api.getSearchByPlayer(STEAM_ID);
    expect(result).toBeDefined();
  });

  test('League Search', async () => {
    const result = await api.getSearchByLeague(LEAGUE_ID);
    expect(result).toBeDefined();
  });

  test('Team Search', async () => {
    const result = await api.getSearchByTeam(TEAM_NAME);
    expect(result).toBeDefined();
  });

  test('Match Search', async () => {
    const result = await api.getSearchByMatch(MATCH_ID);
    expect(result).toBeDefined();
  });

  test('Get Match By Id', async () => {
    expect(async () => await api.getMatchById(MATCH_ID)).not.toThrow();
  });

  test('Post Match Call By Id', async () => {
    expect(async () => await api.postMatchCallById(MATCH_ID)).not.toThrow();
  });

  test('Get Match Live', async () => {
    expect(async () => await api.getMatchLive(MATCH_ID)).not.toThrow();
  });

  test('Resolves to an error if no token is provided', async () => {
    const noTokenClass = new Stratz('');
    await expect(async () => await noTokenClass.getUserSteam()).rejects.toThrow();
  });
});

describe('Stratz.js v2.0.0 Methods', () => {
  test('Get Hero By ID', async () => {
      expect(async () => await api.getHeroById(HERO_ID)).not.toThrow();
  });

  test('Get Ability By ID', () => {
    expect(async () => await api.getAbilityById(ABILITY_ID, StratzLanguage.English, GAME_VERSION_ID)).not.toThrow();
  });

  test('Get a List of Heroes', () => {
    expect(async () => await api.getHeroList(StratzLanguage.English, GAME_VERSION_ID)).not.toThrow();
  });

  test('Get a List of Abilities', () => {
    expect(async () => await api.getAbilityList(StratzLanguage.English, GAME_VERSION_ID)).not.toThrow();
  });

  test('Get Latest Version', () => {
    expect(async () => await api.getLatestGameVersion()).not.toThrow();
  });
});
