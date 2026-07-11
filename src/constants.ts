import { env, envNumber } from './utils/envVars';
// Environment variables
export const {
  BUCKET_COLLECTIONS_ROOT_PATH = '/collections',
  COLLECTIONS_BASE_URL = '',
  STORIES_CONTENT_SOURCE = 'BUCKET',
  STORIES_SERVICES_API_BASE_URL = 'https://stories.k2.services',
  STORIES_SERVICES_API_KEY = '',
} = env;
export const STORIES_SERVICES_PROJECT_ID = envNumber(env.STORIES_SERVICES_PROJECT_ID);

// App Settings
export const APP_NAME = 'Software Stories';
export const COLLECTION_SECTION_CACHE_KEY = 'collection-section-{collectionId}';
export const DEFAULT_PAGE_TITLE = `${APP_NAME} - Software Heritage`;
export const SCIENCE_STORIES_URL = 'https://sciencestories.io';
export const PREVIEW_STORAGE_KEY = 'stories.preview.enabled';
export const SWH_URL = 'https://softwareheritage.org';

export enum RoutePaths {
  Collection = '/:collectionId',
  Home = '/',
  Story = '/:collectionId/:storyId',
}

export const NavLinks = [
  { path: RoutePaths.Home, title: 'nav.home' },
  { path: `${RoutePaths.Home}#`, title: 'nav.explore' },
];

export enum Color {
  DarkGray = '#5d5d5d',
  Red = '#e20427',
  Yellow = '#f6b415',
}

export enum Images {
  collectionHeader = '/images/collection-header-tree.png',
  inria = '/images/inria.png',
  inriaFoundation = '/images/inria-foundation.png',
  homeHeader = 'https://stories-api-public.s3.us-east-1.amazonaws.com/software-heritage/swh-stories-collage.png',
  pisa = '/images/pisa.png',
  swh = '/images/swh-full.png',
  swhIcon = '/images/swh.png',
  unesco = '/images/unesco.png',
  ss = '/images/science-stories-logo.png',
}

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
  { name: 'Science Stories', logo: Images.ss, url: SCIENCE_STORIES_URL },
];
