import React from 'react';
import { StoriesAPICollection } from 'react-stories-api';

import {
  STORIES_API_COLLECTION_ID,
  STORIES_API_ENDPOINT,
  STORIES_API_PUBLIC_KEY,
} from '../../../constants';
import { formatStoryURL } from '../../../utils/url';
import PageTitle from '../../layout/PageTitle';

const urlFormatter = formatStoryURL('$id');

const CollectionPage = () => (
  <>
    <PageTitle title="Browse Stories" />
    <StoriesAPICollection
      apiKey={STORIES_API_PUBLIC_KEY}
      endpoint={STORIES_API_ENDPOINT}
      id={STORIES_API_COLLECTION_ID}
      urlFormatter={urlFormatter}
    />
  </>
);

export default CollectionPage;
