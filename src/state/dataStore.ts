import { makeAutoObservable, runInAction } from 'mobx';
import type { Collection } from 'react-stories-api/types';

import { PREVIEW_STORAGE_KEY, STORIES_SERVICES_PROJECT_ID } from '../constants';
import type {
  CollectionManifest,
  CollectionsManifest,
  ManifestCollectionId,
  ManifestStoryId,
  StoryManifest,
} from '../types';
import {
  getCollectionManifest,
  getCollectionsManifest,
  getStoryManifest,
} from '../utils/bucketUtils';
import {
  type APICollectionLike,
  extractAPICollectionId,
  extractAPICollectionName,
} from '../utils/route';
import type RootStore from './rootStore';

export type AsyncState<T> = {
  readonly data: T | null;
  readonly error: Error | null;
  readonly loading: boolean;
};

const idleState = <T>(): AsyncState<T> => ({
  data: null,
  error: null,
  loading: false,
});

const loadingState = <T>(): AsyncState<T> => ({
  data: null,
  error: null,
  loading: true,
});

const accessDeniedMessage = (
  'Content is not available. Enable preview with ?preview=true to view preview content.'
);

const normalizeStatus = (status?: string | null) => (status || '').toUpperCase();

const isStatusVisible = (status: string | undefined, previewEnabled: boolean) => {
  const normalizedStatus = normalizeStatus(status);

  if (normalizedStatus === 'PUBLISHED') {
    return true;
  }

  if (previewEnabled && (normalizedStatus === 'PREVIEW' || normalizedStatus === 'UNLISTED')) {
    return true;
  }

  return false;
};

const sanitizeCollection = (
  collection: Collection,
  previewEnabled: boolean,
): Collection => {
  const stories = collection.stories?.filter((story) => (
    isStatusVisible(story.status, previewEnabled)
  ));
  const featuredStories = collection.featured_stories?.filter((story) => (
    isStatusVisible(story.status, previewEnabled)
  ));

  return {
    ...collection,
    featured_stories: featuredStories,
    stories,
    total_stories_count: stories ? stories.length : collection.total_stories_count,
  };
};

export default class DataStore {
  collections: AsyncState<ManifestCollectionId[]> = idleState();

  collectionsManifestState: AsyncState<CollectionsManifest> = idleState();

  orderedCollectionsState: AsyncState<CollectionManifest[]> = idleState();

  previewEnabled = false;

  private rootStore: RootStore;

  private collectionManifestStates = new Map<
  ManifestCollectionId,
  AsyncState<CollectionManifest>
  >();

  private storyManifestStates = new Map<string, AsyncState<StoryManifest>>();

  private orderedCollectionsRequest?: Promise<void>;

  private orderedCollectionsRequestKey?: string;

  private orderedCollectionsRequestId = 0;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
    this.previewEnabled = DataStore.getPreviewFromStorage();
  }

  init() {
    if (this.rootStore.contentSourceIsAPI && !this.rootStore.reactStoriesAPIStore) {
      return;
    }

    this.loadCollections().catch(() => undefined);
    this.loadOrderedCollections().catch(() => undefined);
  }

  private getOrderedCollectionsRequestKey() {
    return `${this.rootStore.contentSourceIsAPI ? 'API' : 'BUCKET'}:${this.previewEnabled}`;
  }

  private static getPreviewFromStorage() {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(PREVIEW_STORAGE_KEY) === 'true';
  }

  private persistPreviewToStorage() {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(PREVIEW_STORAGE_KEY, String(this.previewEnabled));
  }

  setPreviewEnabled(enabled: boolean) {
    this.previewEnabled = enabled;
    this.persistPreviewToStorage();
    this.loadOrderedCollections().catch(() => undefined);
  }

  syncPreviewFromQuery(search: string) {
    const params = new URLSearchParams(search);
    const previewParam = params.get('preview');

    if (previewParam === null) {
      return;
    }

    const normalizedPreview = previewParam.toLowerCase();
    if (normalizedPreview === 'true') {
      this.setPreviewEnabled(true);
      return;
    }

    if (normalizedPreview === 'false') {
      this.setPreviewEnabled(false);
    }
  }

  getCollectionManifestState(collectionId?: ManifestCollectionId) {
    if (!collectionId) {
      return idleState<CollectionManifest>();
    }
    return this.collectionManifestStates.get(collectionId) || idleState<CollectionManifest>();
  }

  getStoryManifestState(collectionId?: ManifestCollectionId, storyId?: ManifestStoryId) {
    if (!collectionId || !storyId) {
      return idleState<StoryManifest>();
    }
    const key = `${collectionId}:${storyId}`;
    return this.storyManifestStates.get(key) || idleState<StoryManifest>();
  }

  hasCollectionManifestState(collectionId?: ManifestCollectionId) {
    if (!collectionId) {
      return false;
    }

    return this.collectionManifestStates.has(collectionId);
  }

  async loadCollections() {
    runInAction(() => {
      this.collections = loadingState();
    });

    this.rootStore.nav.resetCollectionRoutes();

    try {
      if (this.rootStore.contentSourceIsAPI) {
        const client = this.rootStore.reactStoriesAPIStore;
        const projectId = client?.projectId ?? STORIES_SERVICES_PROJECT_ID;

        if (!client || projectId === undefined) {
          throw new Error('Stories API client is not ready.');
        }

        const response = await client.api.getCollections({ project_id: projectId });
        const collectionIds = response.collections
          .map((item) => extractAPICollectionId(item as APICollectionLike))
          .filter((id): id is string => Boolean(id));

        response.collections.forEach((item) => {
          const collection = item as APICollectionLike;
          const collectionId = extractAPICollectionId(collection);
          if (!collectionId) {
            return;
          }

          this.rootStore.nav.registerCollectionRoute(
            collectionId,
            extractAPICollectionName(collection),
          );
        });

        runInAction(() => {
          this.collections = {
            data: collectionIds,
            error: null,
            loading: false,
          };
        });
        return;
      }

      const manifest = await getCollectionsManifest();
      const collectionIds = manifest.collections.map(({ id }) => id);

      manifest.collections.forEach(({ id }) => {
        this.rootStore.nav.registerCollectionRoute(id, null);
      });

      runInAction(() => {
        this.collectionsManifestState = { data: manifest, error: null, loading: false };
        this.collections = {
          data: collectionIds,
          error: null,
          loading: false,
        };
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.collections = {
          data: null,
          error: error as Error,
          loading: false,
        };
      });
    }
  }

  async loadCollectionsManifest() {
    runInAction(() => {
      this.collectionsManifestState = loadingState();
    });

    try {
      const data = await getCollectionsManifest();
      runInAction(() => {
        this.collectionsManifestState = { data, error: null, loading: false };
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.collectionsManifestState = {
          data: null,
          error: error as Error,
          loading: false,
        };
      });
    }
  }

  async loadCollectionManifest(collectionId?: ManifestCollectionId) {
    if (!collectionId) {
      return;
    }

    runInAction(() => {
      this.collectionManifestStates.set(collectionId, loadingState());
    });

    try {
      const data = await getCollectionManifest(collectionId);
      const collectionIsVisible = isStatusVisible(data.collection.status, this.previewEnabled);

      if (!collectionIsVisible) {
        throw new Error(accessDeniedMessage);
      }

      const sanitizedData: CollectionManifest = {
        ...data,
        collection: sanitizeCollection(data.collection, this.previewEnabled),
      };

      this.rootStore.nav.registerCollectionRoute(collectionId, sanitizedData.collection.name);

      runInAction(() => {
        this.collectionManifestStates.set(collectionId, {
          data: sanitizedData,
          error: null,
          loading: false,
        });
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.collectionManifestStates.set(collectionId, {
          data: null,
          error: error as Error,
          loading: false,
        });
      });
    }
  }

  async loadStoryManifest(collectionId?: ManifestCollectionId, storyId?: ManifestStoryId) {
    if (!collectionId || !storyId) {
      return;
    }

    const key = `${collectionId}:${storyId}`;

    runInAction(() => {
      this.storyManifestStates.set(key, loadingState());
    });

    try {
      const data = await getStoryManifest(collectionId, storyId);

      if (!isStatusVisible(data.status, this.previewEnabled)) {
        throw new Error(accessDeniedMessage);
      }

      runInAction(() => {
        this.storyManifestStates.set(key, {
          data,
          error: null,
          loading: false,
        });
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.storyManifestStates.set(key, {
          data: null,
          error: error as Error,
          loading: false,
        });
      });
    }
  }

  async loadOrderedCollections() {
    const requestKey = this.getOrderedCollectionsRequestKey();

    if (
      this.orderedCollectionsRequest
      && this.orderedCollectionsRequestKey === requestKey
    ) {
      return this.orderedCollectionsRequest;
    }

    const requestId = this.orderedCollectionsRequestId + 1;
    this.orderedCollectionsRequestId = requestId;
    this.orderedCollectionsRequestKey = requestKey;

    runInAction(() => {
      this.orderedCollectionsState = loadingState();
    });

    const request = (async () => {
      try {
        let manifest = this.collectionsManifestState.data;
        if (this.rootStore.contentSourceIsAPI) {
          const client = this.rootStore.reactStoriesAPIStore;
          const projectId = client?.projectId ?? STORIES_SERVICES_PROJECT_ID;

          if (!client || projectId === undefined) {
            throw new Error('Stories API client is not ready.');
          }

          const response = await client.api.getCollections({ project_id: projectId });
          const orderedCollections = response.collections
            .map((item) => {
              const collection = item as APICollectionLike;
              const collectionId = extractAPICollectionId(collection);
              if (!collectionId) {
                return null;
              }

              const collectionName = extractAPICollectionName(collection) || collectionId;
              this.rootStore.nav.registerCollectionRoute(collectionId, collectionName);

              return {
                collection: {
                  name: collectionName,
                } as Collection,
                collectionId,
              } as CollectionManifest;
            })
            .filter((item): item is CollectionManifest => Boolean(item));

          if (requestId !== this.orderedCollectionsRequestId) {
            return;
          }

          runInAction(() => {
            this.orderedCollectionsState = {
              data: orderedCollections,
              error: null,
              loading: false,
            };
          });
          return;
        }

        if (!manifest) {
          manifest = await getCollectionsManifest();
          runInAction(() => {
            this.collectionsManifestState = { data: manifest!, error: null, loading: false };
          });
        }

        const data = await Promise.all(
          manifest.collections.map(({ id }) => getCollectionManifest(id)),
        );

        const filteredData = data
          .filter(({ collection }) => isStatusVisible(collection.status, this.previewEnabled))
          .map((item) => ({
            ...item,
            collection: sanitizeCollection(item.collection, this.previewEnabled),
          }));

        filteredData.forEach((item) => {
          this.rootStore.nav.registerCollectionRoute(item.collectionId, item.collection.name);
        });

        if (requestId !== this.orderedCollectionsRequestId) {
          return;
        }

        runInAction(() => {
          this.orderedCollectionsState = { data: filteredData, error: null, loading: false };
        });
      } catch (error: unknown) {
        if (requestId !== this.orderedCollectionsRequestId) {
          return;
        }

        runInAction(() => {
          this.orderedCollectionsState = {
            data: null,
            error: error as Error,
            loading: false,
          };
        });
      } finally {
        if (requestId === this.orderedCollectionsRequestId) {
          this.orderedCollectionsRequest = undefined;
          this.orderedCollectionsRequestKey = undefined;
        }
      }
    })();

    this.orderedCollectionsRequest = request;
    return request;
  }
}
