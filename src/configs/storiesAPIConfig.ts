import {
  DEFAULT_PAGE_TITLE,
  Images,
  RoutePaths,
  STORIES_SERVICES_API_BASE_URL,
  STORIES_SERVICES_API_KEY,
  STORIES_SERVICES_PROJECT_ID,
} from '../constants';
import localizationConfig from './localizationConfig';
import theme from './theme';

const storiesAPIConfig = {
  api: {
    apiKey: STORIES_SERVICES_API_KEY,
    baseURL: STORIES_SERVICES_API_BASE_URL,
  },
  formatters: {
    collectionPageTitle: `{collection_name} - ${DEFAULT_PAGE_TITLE}`,
    collectionPath: RoutePaths.Collection.replace(':collectionId', '{collection_id}'),
    storyPath: RoutePaths.Story
      .replace(':collectionId', '{collection_id}')
      .replace(':storyId', '{story_id}'),
    storyPageTitle: `{story_label} - ${DEFAULT_PAGE_TITLE}`,
  },
  loaders: {
    collection: { image: { url: '' } },
    story: { image: { alt: 'Software Heritage', url: Images.swhIcon } },
  },
  localization: localizationConfig,
  projectId: STORIES_SERVICES_PROJECT_ID,
  theme,
};

export default storiesAPIConfig;
