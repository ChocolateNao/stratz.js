export interface Ability {
  id: number;
  name?: string;
  language: Language;
  stat?: Stat;
  isTalent: boolean;
  uri?: string;
}

interface Language {
  abilityId: number;
  gameVersionId: number;
  languageId: number;
  displayName?: string;
  description: string[];
  attributes: any[];
  notes: string[];
  lore?: string;
  shardDescription?: string;
  aghanimDescription?: string;
}

interface Stat {
  abilityId: number;
  gameVersionId: number;
  type: number;
  behavior: number;
  unitTargetType: number;
  unitTargetTeam: number;
  unitTargetFlags: number;
  unitDamageType: number;
  spellImmunity: number;
  modifierSupportValue: number;
  modifierSupportBonus: number;
  isOnCastbar: boolean;
  isOnLearnbar: boolean;
  fightRecapLevel: number;
  isGrantedByScepter: boolean;
  hasScepterUpgrade: boolean;
  maxLevel?: number;
  levelsBetweenUpgrade: number;
  requiredLevel: number;
  displayAdditionalHeroes: boolean;
  castRangeBuffer: number[];
  isUltimate: boolean;
  duration: string;
  charges: string;
  chargeRestoreTime: string;
  isGrantedByShard: boolean;
  dispellable: number;
  hasShardUpgrade: boolean;
  castRange?: number[];
  castPoint?: number[];
  cooldown?: number[];
  manaCost?: number[];
  linkedAbilityId?: number;
  channelTime?: number[];
  damage?: number[];
  hotKeyOverride?: string;
}
