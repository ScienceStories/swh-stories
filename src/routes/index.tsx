import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CollectionPage from '../components/pages/Collection';
import StoryPage from '../components/pages/Story';
import { APP_BROWSE_URL } from '../constants';
import { formatStoryURL } from '../utils/url';

const router = (
  <Switch>
    <Route
      component={StoryPage}
      path={formatStoryURL(':storyId')}
    />
    <Route
      component={CollectionPage}
      path={APP_BROWSE_URL}
    />
    <Route
      component={CollectionPage}
      path="/"
    />
  </Switch>
);

export default router;
