/**
 * Customized response based on https://scryfall.com/docs/api/sets response
 */
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

type PreviewCard = {
  /**
   * The name of the artist for the preview card art, e.g.
   * "Anthony Hernandez"
   */
  artist: string;
  /**
   * Name of the preview card, e.g.
   * "Grizzly Bears"
   */
  name: string;
  /**
   * Link to preview art for the set (random card's art), e.g.
   * "https://cards.scryfall.io/art_crop/front/4/0/409f9b88-f03e-40b6-9883-68c14c37c0de.jpg"
   */
  preview_art: string;
  /**
   * Link to the card's API payload, e.g.
   * "https://api.scryfall.com/cards/87b56584-8a61-40bc-99b5-7434a681fcdc"
   */
  uri: string;
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
   * Details about the preview card
   */
  preview_card: PreviewCard;
  /**
   * Query to fetch a random card from the set, e.g.
   * "https://api.scryfall.com/cards/random?q=set:woe"
   */
  random_card_query: string;
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
   * Whether to show the set in the list of sets available, e.g.
   * true
   */
  show: boolean;
  /**
   * 23337
   */
  tcgplayer_id?: number;
  /**
   * "https://api.scryfall.com/sets/07ee7ac3-059b-4de5-924a-2bd1b7910c8b"
   */
  uri: string;
};
