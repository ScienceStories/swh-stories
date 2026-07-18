import type { LocalizationConfig } from 'react-stories-api/types';

const localizationConfig: LocalizationConfig = {
  defaultLocale: 'en',
  localeSettings: {},
  supportedLocales: ['en'],
  translations: {
    en: {
      'app.title': 'Software Stories',
      'error.fallbackButton': 'Go Home',
      'nav.explore': 'Explore',
      'nav.home': 'Home',
      'story.collectionLink': 'Explore More Stories',
    },
  },

};

export default localizationConfig;
