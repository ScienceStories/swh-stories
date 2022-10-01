import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CollectionPage from '../components/pages/Collection';
import HomePage from '../components/pages/Home';
import StoryPage from '../components/pages/Story';
import { APP_BROWSE_URL, STORIES_API_INRIA_COLLECTION_ID, STORIES_API_PISA_COLLECTION_ID } from '../constants';
import { formatStoryURL } from '../utils/url';

const router = (
  <Switch>
    <Route path="/inria">
      <CollectionPage
        baseUrl="/inria"
        collectionId={STORIES_API_INRIA_COLLECTION_ID}
      />
    </Route>
    <Route path="/pisa">
      <CollectionPage
        baseUrl="/pisa"
        collectionId={STORIES_API_PISA_COLLECTION_ID}
      />
    </Route>
    <Route
      component={StoryPage}
      path={formatStoryURL(':storyId', ':baseUrl')}
    />
    <Route
      component={HomePage}
      path={APP_BROWSE_URL}
    />
    <Route
      component={HomePage}
      path="/"
    />
  </Switch>
);

export default router;
