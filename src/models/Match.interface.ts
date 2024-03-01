import type { SteamAccount } from './SteamAccount.interface';

export interface MatchBreakdown {
  id: number;
  didRadiantWin: boolean;
  durationSeconds: number;
  startDateTime: number;
  clusterId: number;
  firstBloodTime: number;
  lobbyType: number;
  numHumanPlayers: number;
  gameMode: number;
  isStats: boolean;
  avgImp: number;
  parsedDateTime: number;
  statsDateTime: number;
  gameVersionId: number;
  regionId: number;
  sequenceNum: number;
  rank: number;
  bracket: number;
  endDateTime: number;
  pickBans: PickBan[];
  players: Player[];
  analysisOutcome: number;
  predictedOutcomeWeight: number;
  bottomLaneOutcome: number;
  midLaneOutcome: number;
  topLaneOutcome: number;
  radiantNetworthLead: number[];
  radiantExperienceLead: number[];
  radiantKills: number[];
  direKills: number[];
  towerStatus: TowerStatus[];
  laneReport: LaneReport;
  winRates: number[];
  predictedWinRates: number[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  didRequestDownload: boolean;
}

export interface ChatEvent {
  time: number;
  type: number;
  fromHeroId?: number;
  value: number;
  pausedTick: number;
  isRadiant: boolean;
  toHeroId?: number;
}

export interface LaneReport {
  radiant: Dire[];
  dire: Dire[];
}

export interface Dire {
  midLane: Lane;
  offLane: Lane;
  safeLane: Lane;
}

export interface Lane {
  meleeCount: number;
  rangeCount: number;
  siegeCount: number;
  denyCount: number;
  neutralCount: number;
}

export interface PickBan {
  isPick: boolean;
  heroId?: number;
  bannedHeroId?: number;
  isRadiant?: boolean;
  playerIndex?: number;
  wasBannedSuccessfully?: boolean;
  order?: number;
  baseWinRate?: number;
  adjustedWinRate?: number;
}

export interface Player {
  matchId: number;
  playerSlot: number;
  heroId: number;
  steamAccountId: number;
  isRadiant: boolean;
  numKills: number;
  numDeaths: number;
  numAssists: number;
  leaverStatus: number;
  numLastHits: number;
  numDenies: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  level: number;
  gold: number;
  goldSpent: number;
  heroDamage: number;
  towerDamage: number;
  partyId?: number;
  isRandom: boolean;
  lane: number;
  intentionalFeeding: boolean;
  role: number;
  imp: number;
  award: number;
  item0Id: number;
  item1Id?: number;
  item2Id?: number;
  item4Id?: number;
  item5Id?: number;
  backpack1Id?: number;
  behavior: number;
  heroHealing: number;
  roamLane: number;
  abilities: Ability[];
  isVictory: boolean;
  networth: number;
  neutral0Id?: number;
  dotaPlusHeroXp: number;
  invisibleSeconds: number;
  stats?: Stats;
  steamAccount?: SteamAccount;
  backpack0Id?: number;
  streakPrediction?: number;
  item3Id?: number;
  backpack2Id?: number;
  playbackData?: PlayerPlaybackData;
}

export interface Ability {
  abilityId: number;
  time: number;
  level: number;
}

export interface PlayerPlaybackData {
  abilityLearnEvents: AbilityLearnEvent[];
  abilityUsedEvents: UsedEvent[];
  abilityActiveLists: AbilityActiveList[];
  itemUsedEvents: UsedEvent[];
  playerUpdatePositionEvents: PlayerUpdatePositionEvent[];
  playerUpdateGoldEvents: PlayerUpdateGoldEvent[];
  playerUpdateAttributeEvents: PlayerUpdateAttributeEvent[];
  playerUpdateLevelEvents: PlayerUpdateLevelEvent[];
  playerUpdateHealthEvents: PlayerUpdateHealthEvent[];
  playerUpdateBattleEvents: PlayerUpdateBattleEvent[];
  killEvents: KillEvent[];
  deathEvents: DeathEvent[];
  assistEvents: AssistEvent[];
  csEvents: CSEvent[];
  goldEvents: GoldEvent[];
  experienceEvents: ExperienceEvent[];
  healEvents: HealEvent[];
  heroDamageEvents: HeroDamageEvent[];
  towerDamageEvents: TowerDamageEvent[];
  inventoryEvent: Inventory[];
  purchaseEvents: PurchaseEvent[];
  buyBackEvents: BuyBackEvent[];
  streakEvents: StreakEvent[];
  runeEvents: PurpleRuneEvent[];
}

export interface AbilityActiveList {
  time: number;
  ability0: number;
  ability1: number;
  ability2: number;
  ability3?: number;
  ability5: number;
  ability4?: number;
}

export interface AbilityLearnEvent {
  time: number;
  abilityId: number;
}

export interface UsedEvent {
  time: number;
  abilityId?: number;
  attacker: number;
  target?: number;
  itemId?: number;
}

export interface AssistEvent {
  time: number;
  target: number;
  gold: number;
  xp: number;
  X?: number;
  Y?: number;
  attacker?: number;
}

export interface BuyBackEvent {
  time: number;
  heroId: number;
  deathTimeRemaining: number;
  cost: number;
}

export interface CSEvent {
  time: number;
  attacker: number;
  isFromIllusion: boolean;
  npcId: number;
  gold?: number;
  xp?: number;
  x?: number;
  Y?: number;
  abilityId?: number;
  itemId?: number;
}

export interface DeathEvent {
  time: number;
  target: number;
  goldFed: number;
  xp: number;
  timeDead: number;
  x: number;
  y: number;
  goldLost: number;
  assist: number[];
  isWardWalkThrough: boolean;
  isAttemptTpOut: boolean;
  isDieBack: boolean;
  isBurst: boolean;
  isEngagedOnDeath: boolean;
  hasHealAvailable: boolean;
  isTracked: boolean;
  attacker?: number;
  abilityId?: number;
  itemId?: number;
  isFromIllusion?: boolean;
  reliableGold?: number;
  unreliableGold?: number;
  isFeed?: boolean;
}

export interface ExperienceEvent {
  time: number;
  amount: number;
  reason: number;
  y: number;
  x: number;
}

export interface GoldEvent {
  time: number;
  amount: number;
  reason: number;
}

export interface HealEvent {
  time: number;
  attacker: number;
  target: number;
  value: number;
  abilityId: number;
  itemId: number;
}

export interface HeroDamageEvent {
  time: number;
  attacker: number;
  target: number;
  value: number;
  abilityId: number;
  itemId: number;
  damageType: number;
  fromNpc: number;
  toNpc: number;
  fromIllusion: boolean;
  toIllusion: boolean;
}

export interface Inventory {
  item0?: BackPack0;
  item1?: BackPack0;
  item2?: BackPack0;
  item3?: BackPack0;
  item4?: BackPack0;
  item5?: BackPack0;
  backPack0?: BackPack0;
  neutral0?: Neutral0;
  backPack1?: BackPack0;
  backPack2?: BackPack0;
  time?: number;
  teleport0?: Neutral0;
}

export interface BackPack0 {
  itemId: number;
  charges?: number;
  secondaryCharges?: number;
}

export interface Neutral0 {
  itemId: number;
  charges?: number;
}

export interface KillEvent {
  time: number;
  target: number;
  abilityId?: number;
  gold: number;
  xp?: number;
  X: number;
  Y: number;
  isSolo: boolean;
  isGank: boolean;
  isInvisible: boolean;
  isSmoke: boolean;
  isTpRecently: boolean;
  itemId?: number;
  attacker?: number;
  isFromIllusion?: boolean;
  isRuneEffected?: boolean;
}

export interface PlayerUpdateAttributeEvent {
  time: number;
  agi: number;
  int: number;
  str: number;
}

export interface PlayerUpdateBattleEvent {
  time: number;
  damageMinMax: number;
  damageBonus: number;
  hpRegen: number;
  mpRegen: number;
}

export interface PlayerUpdateGoldEvent {
  time: number;
  gold: number;
  unreliableGold: number;
  networth: number;
  networthDifference: number;
  goldPerMinute: number;
}

export interface PlayerUpdateHealthEvent {
  time: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
}

export interface PlayerUpdateLevelEvent {
  time: number;
  level: number;
}

export interface PlayerUpdatePositionEvent {
  time: number;
  x: number;
  y: number;
}

export interface PurchaseEvent {
  time: number;
  item: number;
}

export interface PurpleRuneEvent {
  time: number;
  type: number;
  action: number;
  positionX: number;
  positionY: number;
}

export interface StreakEvent {
  time: number;
  type: number;
  value: number;
}

export interface TowerDamageEvent {
  time: number;
  attacker: number;
  npcId: number;
  damage: number;
  abilityId: number;
  itemId: number;
  fromNpc: number;
}

export interface Stats {
  steamAccountId: number;
  matchId: number;
  gameVersionId: number;
  abilityCastReport: AbilityCastReport[];
  actionReport: Record<string, number>;
  actionsPerMin: number[];
  allTalk: AllTalk[];
  assistEvents: AssistEvent[];
  buffEvents: any[];
  campStackPerMin: number[];
  chatWheels: ChatWheel[];
  courierKills: CourierKill[];
  deathEvents: DeathEvent[];
  denyPerMin: number[];
  experiencePerMinMin: number[];
  farmDistributionReport: FarmDistributionReport;
  goldPerMinMin: number[];
  healPerMin: number[];
  heroDamagePerMin: number[];
  heroDamageReceivedPerMin: number[];
  heroDamageReport: HeroDamageReport;
  impPerMin: number[];
  inventoryReport: Inventory[];
  itemPurchases: ItemPurchase[];
  itemUsed: ItemUsed[];
  killEvents: KillEvent[];
  lastHitPerMin: number[];
  levelsPerMin: number[];
  locationReport: LocationReport[];
  networthPerMin: number[];
  runeEvents: StatsRuneEvent[];
  towerDamagePerMin: number[];
  towerDamageReport: TowerDamageReport[];
  tripsFountainPerMin: number[];
  wardPlaced: CourierKill[];
  wardDestruction: WardDestruction[];
}

export interface AbilityCastReport {
  abilityId: number;
  count: number;
  targets: Target[];
}

export interface Target {
  target: number;
  count: number;
  damage: number;
}

export interface AllTalk {
  time: number;
  message: string;
  pausedTick: number;
}

export interface ChatWheel {
  time: number;
  chatWheelId: number;
  pauseTick: number;
}

export interface CourierKill {
  time: number;
  X: number;
  Y: number;
  type?: number;
}

export interface FarmDistributionReport {
  creepType: BountyGold[];
  creepLocation: BountyGold[];
  neutralLocation: BountyGold[];
  ancientLocation: BountyGold[];
  buildings: BountyGold[];
  buyBackGold: number;
  abandonGold: number;
  bountyGold: BountyGold;
  other: BountyGold[];
}

export interface BountyGold {
  id: number;
  count: number;
  gold: number;
  xp?: number;
}

export interface HeroDamageReport {
  dealtTotal: Record<string, number>;
  receivedTotal: Record<string, number>;
  dealtTargets: DealtTargetElement[];
  receivedTargets: DealtTargetElement[];
  dealtSourceAbility: SourceAbility[];
  receivedSourceAbility: SourceAbility[];
  dealtSourceItem: SourceItem[];
  receivedSourceItem: SourceItem[];
}

export interface SourceAbility {
  abilityId: number;
  count: number;
  amount: number;
}

export interface SourceItem {
  itemId: number;
  count: number;
  amount: number;
}

export interface DealtTargetElement {
  target: number;
  amount: number;
}

export interface ItemPurchase {
  time: number;
  itemId: number;
}

export interface ItemUsed {
  itemId: number;
  count: number;
}

export interface LocationReport {
  X: number;
  Y: number;
}

export interface StatsRuneEvent {
  time: number;
  type: number;
  action: number;
  x: number;
  y: number;
}

export interface TowerDamageReport {
  npcId: number;
  damage: number;
  damageFromAbility: number;
  damageCreeps: number;
}

export interface WardDestruction {
  time: number;
  gold?: number;
  isWard: boolean;
}

export interface TowerDeath {
  time: number;
  npcId: number;
  isRadiant: boolean;
  attacker?: number;
}

export interface TowerStatus {
  towers: Tower[];
  outposts: Outpost[];
}

export interface Outpost {
  npcId: number;
  isRadiantSide: boolean;
  isControlledByRadiant: boolean;
}

export interface Tower {
  npcId: number;
  hp: number;
}

export interface MatchDetailed {
  id: number;
  didRadiantWin: boolean;
  durationSeconds: number;
  startDateTime: number;
  clusterId: number;
  firstBloodTime: number;
  lobbyType: number;
  numHumanPlayers: number;
  gameMode: number;
  isStats: boolean;
  avgImp: number;
  parsedDateTime: number;
  statsDateTime: number;
  gameVersionId: number;
  regionId: number;
  sequenceNum: number;
  rank: number;
  bracket: number;
  endDateTime: number;
  playbackData: MatchDetailedPlaybackData;
  pickBans: PickBan[];
  players: Player[];
  analysisOutcome: number;
  predictedOutcomeWeight: number;
  bottomLaneOutcome: number;
  midLaneOutcome: number;
  topLaneOutcome: number;
  radiantNetworthLead: number[];
  radiantExperienceLead: number[];
  radiantKills: number[];
  direKills: number[];
  towerStatus: TowerStatus[];
  laneReport: LaneReport;
  winRates: number[];
  predictedWinRates: number[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  didRequestDownload: boolean;
}

export interface MatchDetailedPlaybackData {
  courierEvents: CourierEvent[];
  runeEvents: FluffyRuneEvent[];
  wardEvents: WardEvent[];
  towerDeathEvents: TowerDeathEvent[];
  roshanEvents: RoshanEvent[];
  buildingEvents: BuildingEvent[];
  radiantCaptainHeroId: number;
  direCaptainHeroId: number;
}

export interface BuildingEvent {
  time: number;
  id: number;
  type?: number;
  hp?: number;
  maxHp?: number;
  x?: number;
  y?: number;
  isRadiant?: boolean;
  npcId: number;
}

export interface CourierEvent {
  id: number;
  owner: number;
  isRadiant: boolean;
  events: Event[];
}

export interface Event {
  time: number;
  x: number;
  y: number;
  hp: number;
  is_flying: boolean;
  respawn_time: number;
  item0Id: number;
  item1Id: number;
  item2Id: number;
  item3Id: number;
  item4Id: number;
  item5Id: number;
}

export interface RoshanEvent {
  time: number;
  hp?: number;
  maxHp?: number;
  x?: number;
  y?: number;
  item0?: number;
}

export interface FluffyRuneEvent {
  id: number;
  time: number;
  x: number;
  y: number;
  location: number;
  runeType: number;
  action: number;
}

export interface TowerDeathEvent {
  time: number;
  radiant: number;
  dire: number;
}

export interface WardEvent {
  id: number;
  time: number;
  fromPlayer: number;
  x: number;
  y: number;
  wardType: number;
  action: number;
  playerDestroyed?: number;
}

export interface Match {
  id: number;
  didRadiantWin: boolean;
  durationSeconds: number;
  startDateTime: number;
  clusterId: number;
  firstBloodTime: number;
  lobbyType: number;
  numHumanPlayers: number;
  gameMode: number;
  isStats: boolean;
  avgImp: number;
  parsedDateTime: number;
  statsDateTime: number;
  leagueId: number;
  radiantTeamId: number;
  direTeamId: number;
  seriesId: number;
  gameVersionId: number;
  regionId: number;
  sequenceNum: number;
  rank: number;
  bracket: number;
  endDateTime: number;
  pickBans: PickBan[];
  players: Player[];
  analysisOutcome: number;
  predictedOutcomeWeight: number;
  bottomLaneOutcome: number;
  midLaneOutcome: number;
  topLaneOutcome: number;
  radiantNetworthLead: number[];
  radiantExperienceLead: number[];
  radiantKills: number[];
  direKills: number[];
  towerStatus: TowerStatus[];
  laneReport: LaneReport;
  winRates: number[];
  predictedWinRates: number[];
  towerDeaths: TowerDeath[];
  chatEvents: ChatEvent[];
  didRequestDownload: boolean;
}
