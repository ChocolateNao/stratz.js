export interface SteamAccount {
  id: number;
  profileUri: string;
  realName?: string;
  countryCode?: string;
  stateCode?: string;
  name: string;
  avatar: string;
  isDotaPlusSubscriber?: boolean;
  dotaPlusOriginalStartDate?: number;
  isAnonymous: boolean;
  isStratzPublic: boolean;
  seasonRank: number;
  smurfFlag: number;
  smurfCheckDate: number;
  dotaAccountLevel: number;
  lastActiveTime?: Date;
  timeCreated?: number;
  cityId?: number;
  communityVisibleState?: number;
  primaryClanId?: number;
  soloRank?: number;
  partyRank?: number;
  lastMatchDateTime?: number;
  lastMatchRegionId?: number;
}
