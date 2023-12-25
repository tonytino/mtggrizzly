/**
 * THIS FILE IS IN A VERY ROUGH DRAFT STATE, PLEASE EXCUSE THE MESS FOR NOW
 */

export type Card = {
  artist_ids: string[];
  artist: string;
  booster: boolean;
  border_color: string;
  /**
   * Present when a card has multiple faces
   */
  card_faces?: CardFace[];
  card_back_id: string;
  cardmarket_id: number;
  cmc: number;
  collector_number: string;
  color_identity: string[];
  colors: unknown[];
  digital: boolean;
  edhrec_rank: number;
  finishes: string[];
  flavor_text: string;
  foil: boolean;
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  id: string;
  illustration_id: string;
  image_status: string;
  image_uris: ImageURI;
  keywords: unknown[];
  lang: string;
  layout: string;
  legalities: Legality;
  /**
   * The mana cost associated with the spell, e.g. "{4}{W}{W}"
   * @example "{4}{W}{W}"
   */
  mana_cost: string;
  mtgo_foil_id: number;
  mtgo_id: number;
  multiverse_ids: number[];
  name: string;
  nonfoil: boolean;
  object: string;
  oracle_id: string;
  oracle_text: string;
  oversized: boolean;
  power: string;
  prices: Price;
  prints_search_uri: string;
  promo: boolean;
  purchase_uris: Purchase_uri;
  rarity: string;
  related_uris: RelatedURI;
  released_at: string;
  reprint: boolean;
  reserved: boolean;
  rulings_uri: string;
  scryfall_set_uri: string;
  scryfall_uri: string;
  set_id: string;
  set_name: string;
  set_search_uri: string;
  set_type: string;
  set_uri: string;
  set: string;
  story_spotlight: boolean;
  tcgplayer_id: number;
  textless: boolean;
  toughness: string;
  /**
   * The string found within the type line of a spell, e.g. "Enchantment – Aura"
   * @example "Artifact — Equipment"
   */
  type_line: CardType;
  uri: string;
  variation: boolean;
};

/**
 * Information about card types can be found here: https://mtg.fandom.com/wiki/Card_type
 */
const CARD_TYPES = {
  ARTIFACT: 'Artifact',
  BATTLE: 'Battle',
  CREATURE: 'Creature',
  ENCHANTMENT: 'Enchantment',
  INSTANT: 'Instant',
  LAND: 'Land',
  PLANESWALKER: 'Planeswalker',
  SORCERY: 'Sorcery',
  TRIBAL: 'Tribal',
} as const;

export type CardType = keyof typeof CARD_TYPES;

/**
 * Used to provide details about the separate Card faces (e.g. transform cards)
 */
export type CardFace = {
  object: string;
  name: string;
  /**
   * The mana cost associated with the spell, e.g. "{4}{W}{W}"
   * @example "{4}{W}{W}"
   */
  mana_cost: string;
  /**
   * The string found within the type line of a spell, e.g. "Artifact — Equipment"
   * @example "Artifact — Equipment"
   */
  type_line: CardType;
  oracle_text: string;
  colors?: string[];
  power: string;
  toughness: string;
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: ImageURI;
};

export type ImageURI = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

export type Legality = {
  standard: string;
  future: string;
  historic: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  brawl: string;
  historicbrawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
};

export type Price = {
  usd: string;
  usd_foil: string;
  usd_etched?: unknown;
  eur: string;
  eur_foil: string;
  tix: string;
};

export type Purchase_uri = {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
};

export type RelatedURI = {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
};
