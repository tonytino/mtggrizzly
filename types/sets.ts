export type SetsResponse = {
  /**
   * Number of Sets present
   */
  count: number;
  /**
   * All sets in magic's history, filtered and sorted per query params
   */
  sets: Set[];
  /**
   * The types of sets to include, e.g. 'expansion'
   */
  type: string;
};

export type Set = {
  /**
   * @example 0
   */
  card_count: number;
  /**
   * @example "tlci"
   */
  code: string;
  /**
   * @example false
   */
  digital: boolean;
  /**
   * @example true
   */
  foil_only: boolean;
  /**
   * @example "https://svgs.scryfall.io/sets/default.svg?1698033600"
   */
  icon_svg_uri: string;
  /**
   * @example "07ee7ac3-059b-4de5-924a-2bd1b7910c8b"
   */
  id: string;
  /**
   * @example "Lost Caverns of Ixalan Tokens"
   */
  name: string;
  /**
   * @example true
   */
  nonfoil_only: boolean;
  /**
   * @example "set"
   */
  object: string;
  /**
   * @example "lci"
   */
  parent_set_code?: string;
  /**
   * @example "2023-11-17"
   */
  released_at: string;
  /**
   * @example "https://scryfall.com/sets/tlci"
   */
  scryfall_uri: string;
  /**
   * @example "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Atlci&unique=prints"
   */
  search_uri: string;
  /**
   * @example "token"
   */
  set_type: string;
  /**
   * @example 23337
   */
  tcgplayer_id?: number;
  /**
   * @example "https://api.scryfall.com/sets/07ee7ac3-059b-4de5-924a-2bd1b7910c8b"
   */
  uri: string;
};
