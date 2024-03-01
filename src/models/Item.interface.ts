export interface Item {
  id: number;
  name: string;
  displayName?: string;
  shortName: string;
  language: Language;
  stat?: Stat;
  image?: string;
  isInNeuralNetwork: boolean;
  isFullItemHeroPurchaseItem: boolean;
  components?: Component[];
  isSupportFullItem?: boolean;
}

interface Component {
  itemIndex: number;
  componentId: number;
}

interface Language {
  displayName: string;
  lore: string[];
  description: string[];
  notes: string[];
  attributes: string[];
}

interface Stat {
  behavior: number;
  unitTargetType: number;
  unitTargetTeam: number;
  unitTargetFlags: number;
  fightLevelRecap: number;
  castRange?: number[];
  castPoint?: number[];
  cooldown?: number[];
  manaCost?: number[];
  sharedCooldown: SharedCooldown;
  cost: number;
  shopTags?: string;
  aliases?: string;
  quality?: Quality;
  isSellable: boolean;
  isDroppable: boolean;
  isPurchaseable: boolean;
  isSecretShop: boolean;
  isSideShop: boolean;
  isStackable: boolean;
  isPermanent: boolean;
  isHideCharges: boolean;
  isRequiresCharges: boolean;
  isDisplayCharges: boolean;
  isSupport: boolean;
  isTempestDoubleClonable: boolean;
  stockMax: number;
  initialCharges: number;
  initialStock: number;
  stockTime: number;
  initialStockTime: number;
  isRecipe: boolean;
  needsComponents: boolean;
  ItemResult?: number;
  channelTime?: number[];
  UpgradeItem?: number;
  UpgradeRecipe?: number;
  isAlertable?: boolean;
  neutralItemTier?: number;
  neutralItemDropTime?: number;
}

export type Quality =
  | 'component'
  | 'secret_shop'
  | 'consumable'
  | 'common'
  | 'rare'
  | 'epic'
  | 'artifact';

export type SharedCooldown =
  | 'blink'
  | ''
  | 'magicwand'
  | 'ethereal'
  | 'teleport'
  | 'urn'
  | 'orchid'
  | 'cyclone'
  | 'force'
  | 'dagon'
  | 'necronomicon'
  | 'shadow_blade'
  | 'diffusal'
  | 'medallion'
  | 'atos'
  | 'pavise'
  | 'echo_sabre'
  | 'tome'
  | 'phylactery'
  | 'famango';
