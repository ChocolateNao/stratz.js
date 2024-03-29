export interface Hero {
  id: number;
  name: string;
  shortName: string;
  stat: HeroStat;
  aliases: string[];
  displayName?: string;
  abilities?: HeroAbility[];
  roles?: Role[];
  talents?: Talent[];
  language?: HeroLanguage;
}

interface HeroAbility {
  slot: number;
  abilityId: number;
}

interface HeroLanguage {
  heroId: number;
  gameVersionId: number;
  languageId: number;
  displayName: string;
  bio: string;
  hype: string;
}

interface Role {
  roleId: number;
  level: number;
}

interface HeroStat {
  gameVersionId: number;
  enabled?: boolean;
  heroUnlockOrder?: number;
  team?: boolean;
  cmEnabled?: boolean;
  newPlayerEnabled?: boolean;
  attackType?: AttackType;
  startingArmor?: number;
  startingMagicArmor?: number;
  startingDamageMin?: number;
  startingDamageMax?: number;
  attackRate?: number;
  attackAnimationPoint?: number;
  attackAcquisitionRange?: number;
  attackRange?: number;
  AttributePrimary?: AttributePrimary;
  heroPrimaryAttribute?: number;
  strengthBase?: number;
  strengthGain?: number;
  intelligenceBase?: number;
  intelligenceGain?: number;
  agilityBase?: number;
  agilityGain?: number;
  hpRegen?: number;
  mpRegen?: number;
  moveSpeed?: number;
  moveTurnRate?: number;
  hpBarOffset?: number;
  visionDaytimeRange?: number;
  visionNighttimeRange?: number;
  complexity?: number;
  primaryAttributeEnum?: number;
}

export type AttributePrimary = 'agi' | 'str' | 'int' | 'all';

export type AttackType = 'Melee' | 'Ranged';

interface Talent {
  slot: number;
  gameVersionId: number;
  abilityId: number;
}
