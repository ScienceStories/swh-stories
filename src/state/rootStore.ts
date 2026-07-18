import React from 'react';
import type { ReactStoriesAPIStore } from 'react-stories-api';

import { STORIES_CONTENT_SOURCE } from '../constants';
import DataStore from './dataStore';
import NavStore from './navStore';

export default class RootStore {
  contentSourceIsAPI: boolean;

  contentSourceIsBucket: boolean;

  data: DataStore;

  nav: NavStore;

  reactStoriesAPIStore?: ReactStoriesAPIStore;

  constructor() {
    this.contentSourceIsAPI = STORIES_CONTENT_SOURCE === 'API';
    this.contentSourceIsBucket = STORIES_CONTENT_SOURCE === 'BUCKET';
    this.data = new DataStore(this);
    this.nav = new NavStore(this);
  }

  static instance: RootStore = new RootStore();

  static contextInstance: React.Context<RootStore>;

  static initContext(instance?: RootStore) {
    RootStore.instance = instance || new RootStore();
    RootStore.contextInstance = React.createContext<RootStore>(RootStore.instance);
    return RootStore.instance;
  }

  async init() {
    this.data.init();
  }

  setReactStoriesAPIStore(store: ReactStoriesAPIStore) {
    if (this.reactStoriesAPIStore === store) {
      return;
    }

    this.reactStoriesAPIStore = store;

    if (this.contentSourceIsAPI) {
      this.data.init();
    }
  }
}
