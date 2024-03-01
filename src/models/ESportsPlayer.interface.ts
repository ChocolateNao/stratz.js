export interface ESportsPlayer {
  steamAccountId: number;
  name: string;
  realName?: string;
  fantasyRole?: number;
  teamId?: number;
  sponsor?: string;
  isLocked: boolean;
  isPro: boolean;
  totalEarnings: number;
  romanizedRealName?: string;
  roles?: number;
  aliases?: string[];
  statuses: number;
  signatureheroes?: string[];
  countries: string[];
  tiWins: number;
  istiwinner: boolean;
  position?: number;
  twitterLink?: string;
  twitchLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  youTubeLink?: string;
  vkLink?: string;
  weiboLink?: string;
}
