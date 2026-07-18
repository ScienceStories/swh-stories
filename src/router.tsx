import { createBrowserRouter } from 'react-router-dom';

import { RoutePaths } from './constants';
import CollectionView from './views/CollectionView/CollectionView';
import ErrorView from './views/ErrorView/ErrorView';
import HomeView from './views/HomeView/HomeView';
import StoryView from './views/StoryView/StoryView';

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorView message="Page not found" />,
  },
  {
    Component: CollectionView,
    path: RoutePaths.Collection,
  },
  {
    Component: HomeView,
    path: RoutePaths.Home,
  },
  {
    Component: StoryView,
    path: RoutePaths.Story,
  },
].map((route) => ({
  errorElement: <ErrorView />,
  ...route,
})));

export default router;
