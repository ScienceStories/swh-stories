export const APP_BROWSE_URL = '/stories';
export const APP_NAME = 'Software Heritage Stories';
export const CLASSNAME_SEED = 'swh-stories';
export const CLASSNAME_PRODUCTION_PREFIX = 'prod';
export enum Color {
  Red = '#e20427',
  Yellow = '#f6b415',
}
export const DEFAULT_PAGE_TITLE = 'SWH Stories';
export enum Images {
  collectionHeader = '/images/collection-header-tree.png',
  inria = '/images/inria.png',
  inriaFoundation = '/images/inria-foundation.png',
  pisa = '/images/pisa.png',
  swh = '/images/swh-full.png',
  unesco = '/images/unesco.png',
}
export const STORIES_API_ENDPOINT = 'https://stage.stories.k2.services';
export const STORIES_API_INRIA_COLLECTION_ID = 45;
export const STORIES_API_PISA_COLLECTION_ID = 42;
export const STORIES_API_PUBLIC_KEY = 'tN5X1y7O.2NhLogJVhLsYANuCtSP1FjHPZHA6TUBd';
export const SCIENCE_STORIES_URL = 'http://sciencestories.io';
export const SWH_LOGO = '/images/swh.png';
export const SWH_URL = 'https://softwareheritage.org';
export const FooterLinks = [
  { name: 'Software Heritage', logo: Images.swh, url: SWH_URL },
  { name: 'Università Di Pisa', logo: Images.pisa, url: 'https://unipi.it' },
  { name: 'UNESCO', logo: Images.unesco, url: 'https://unesco.org' },
  { name: 'INRIA', logo: Images.inria, url: 'https://www.inria.fr/en' },
  {
    name: 'INRIA La Fondation',
    logo: Images.inriaFoundation,
    url: 'https://www.inria.fr/en/inria-foundation-making-sense-digital-world',
  },
];
