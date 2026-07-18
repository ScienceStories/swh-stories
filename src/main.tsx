/* eslint-disable react/jsx-props-no-spreading */
import 'aos/dist/aos.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { StoriesAPIProvider } from 'react-stories-api';

import storiesAPIConfig from './configs/storiesAPIConfig';
import router from './router';
import RootStore from './state/rootStore';

const startApp = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  const rootStore = RootStore.initContext();
  const RootStoreContext = RootStore.contextInstance;
  await rootStore.init();
  root.render(
    <React.StrictMode>
      <RootStoreContext.Provider value={rootStore}>
        <ParallaxProvider>
          <StoriesAPIProvider {...storiesAPIConfig}>
            <RouterProvider router={router} />
          </StoriesAPIProvider>
        </ParallaxProvider>
      </RootStoreContext.Provider>
    </React.StrictMode>,
  );
};

startApp();
