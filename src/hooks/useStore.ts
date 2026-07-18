import { useContext } from 'react';

import RootStore from '../state/rootStore';

export default function useStore() {
  if (!RootStore.contextInstance) {
    throw new Error('RootStore context is not initialized');
  }

  return useContext(RootStore.contextInstance);
}
