/**
 * THIS FILE IS IN A VERY ROUGH DRAFT STATE, PLEASE EXCUSE THE MESS FOR NOW
 */

export type ImageURI = {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};

/**
 * Used to provide details about the separate Card faces (e.g. transform cards)
 */
export type CardFace = {
  object: string;
  name: string;
  mana_cost: string;
  type_line: string;
  oracle_text: string;
  colors: string[];
  power: string;
  toughness: string;
  artist: string;
  artist_id: string;
  illustration_id: string;
  image_uris: ImageURI;
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

export type RelatedURI = {
  gatherer: string;
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
};

export type Purchase_uri = {
  tcgplayer: string;
  cardmarket: string;
  cardhoarder: string;
};

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
  image_uris: Image_uri;
  keywords: unknown[];
  lang: string;
  layout: string;
  legalities: Legality;
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
  type_line: string;
  uri: string;
  variation: boolean;
};
