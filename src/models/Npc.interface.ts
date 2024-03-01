export interface Npc {
  id: number;
  name: string;
  stat?: Stat;
}

interface Stat {
  npcId: number;
  gameVersionId: number;
  level: number;
  statusHealth: number;
  statusHealthRegen: number;
  statusMana: number;
  statusManaRegen?: number;
  movementSpeed: number;
  movementTurnRate?: number;
  dayTimeVision?: number;
  nightTimeVision?: number;
  attackRangeBuffer: number;
  attackRange: number;
  isNeutralUnitType: boolean;
  isAncient: boolean;
  canBeDominated: boolean;
  autoAttacksByDefault: boolean;
  attackDamageMin: number;
  attackDamageMax: number;
  attackRate: number;
  attackAnimationPoint: number;
  projectileSpeed?: number;
  teamName: TeamName;
  combatClassAttack: CombatClass;
  combatClassDefend: CombatClass;
  unitRelationshipClass: UnitRelationshipClass;
  attackDesire: number;
  hasInventory: boolean;
  wakesNeutrals: boolean;
}

export type CombatClass = 'Basic';

export type TeamName = 'Neutrals' | 'BadGuys' | 'GoodGuys';

export type UnitRelationshipClass =
  | 'Default'
  | 'Ward'
  | 'Courier'
  | 'Building'
  | 'Barracks'
  | 'Siege';
