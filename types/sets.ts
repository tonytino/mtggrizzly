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
  types: string[];
};

export type Set = {
  /**
   * 0
   */
  card_count: number;
  /**
   * "tlci"
   */
  code: string;
  /**
   * false
   */
  digital: boolean;
  /**
   * true
   */
  foil_only: boolean;
  /**
   * "https://svgs.scryfall.io/sets/default.svg?1698033600"
   */
  icon_svg_uri: string;
  /**
   * "07ee7ac3-059b-4de5-924a-2bd1b7910c8b"
   */
  id: string;
  /**
   * "Lost Caverns of Ixalan Tokens"
   */
  name: string;
  /**
   * true
   */
  nonfoil_only: boolean;
  /**
   * "set"
   */
  object: string;
  /**
   * "lci"
   */
  parent_set_code?: string;
  /**
   * "2023-11-17"
   */
  released_at: string;
  /**
   * "https://scryfall.com/sets/tlci"
   */
  scryfall_uri: string;
  /**
   * "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Atlci&unique=prints"
   */
  search_uri: string;
  /**
   * "token"
   */
  set_type: string;
  /**
   * 23337
   */
  tcgplayer_id?: number;
  /**
   * "https://api.scryfall.com/sets/07ee7ac3-059b-4de5-924a-2bd1b7910c8b"
   */
  uri: string;
};
