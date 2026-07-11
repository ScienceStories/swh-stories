import {
  BUCKET_COLLECTIONS_ROOT_PATH,
  COLLECTIONS_BASE_URL,
} from '../constants';
import {
  type CollectionManifest,
  CollectionsDataError,
  type CollectionsManifest,
  type ManifestCollectionId,
  type ManifestStoryId,
  type StoryManifest,
} from '../types';

const requestCache = new Map<string, Promise<unknown>>();

const trimSlashes = (value: string) => value.replace(/\/+$/u, '').replace(/^\/+/, '');

const buildRootUrl = () => {
  const base = COLLECTIONS_BASE_URL.trim();
  const root = BUCKET_COLLECTIONS_ROOT_PATH.trim();

  if (!base) {
    return root;
  }

  return `${base.replace(/\/+$/u, '')}/${trimSlashes(root)}`;
};

const buildURL = (...parts: string[]) => {
  const [head, ...tail] = parts;
  if (!head) {
    return '';
  }

  return [head.replace(/\/+$/u, ''), ...tail.map(trimSlashes)]
    .filter(Boolean)
    .join('/');
};

const parseCollectionsManifest = (value: unknown): CollectionsManifest => {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid collections manifest payload');
  }

  const maybeCollections = (value as { collections?: unknown }).collections;
  if (!Array.isArray(maybeCollections)) {
    throw new Error('Root manifest must include a collections array');
  }

  const collections = maybeCollections.map((item) => {
    if (typeof item === 'string') {
      return { id: item };
    }

    if (!item || typeof item !== 'object') {
      throw new Error('Root manifest collection entries must be strings or objects');
    }

    const { id } = item as { id?: unknown };
    if (!id || typeof id !== 'string') {
      throw new Error('Each collection entry must include an id string');
    }

    return { id };
  });

  return { collections };
};

const parseCollectionManifest = (
  collectionId: ManifestCollectionId,
  value: unknown,
): CollectionManifest => {
  if (!value || typeof value !== 'object') {
    throw new Error(`Invalid collection manifest payload for ${collectionId}`);
  }

  const payload = value as {
    collection?: unknown;
    id?: unknown;
  };

  const collection = payload.collection ?? value;
  if (!collection || typeof collection !== 'object') {
    throw new Error(`Collection manifest for ${collectionId} must include a collection object`);
  }

  return {
    collection: collection as CollectionManifest['collection'],
    collectionId,
  };
};

const parseStoryManifest = (
  collectionId: ManifestCollectionId,
  storyId: ManifestStoryId,
  value: unknown,
): StoryManifest => {
  if (!value || typeof value !== 'object') {
    throw new Error(`Invalid story payload for ${collectionId}/${storyId}`);
  }

  return value as StoryManifest;
};

const fetchJSON = async <T>(url: string): Promise<T> => {
  const cached = requestCache.get(url);
  if (cached) {
    return cached as Promise<T>;
  }

  const request = (async () => {
    const response = await fetch(url);
    const body = await response.text();

    let data: unknown = null;
    if (body) {
      try {
        data = JSON.parse(body);
      } catch {
        throw new CollectionsDataError('Response is not valid JSON', url, response.status);
      }
    }

    if (!response.ok) {
      const message = typeof data === 'object' && data && 'message' in data
        ? String((data as { message: string }).message)
        : `Failed to fetch ${url}`;
      throw new CollectionsDataError(message, url, response.status);
    }

    return data as T;
  })();

  requestCache.set(url, request);
  return request;
};

export const clearCollectionsRequestCache = () => {
  requestCache.clear();
};

export const getCollectionsManifestURL = () => buildURL(buildRootUrl(), 'manifest.json');

export const getCollectionManifestURL = (collectionId: ManifestCollectionId) => (
  buildURL(buildRootUrl(), collectionId, 'manifest.json')
);

export const getStoryManifestURL = (
  collectionId: ManifestCollectionId,
  storyId: ManifestStoryId,
) => (
  buildURL(buildRootUrl(), collectionId, 'stories', `${storyId}.json`)
);

export const getCollectionsManifest = async (): Promise<CollectionsManifest> => {
  const url = getCollectionsManifestURL();
  const value = await fetchJSON<unknown>(url);
  return parseCollectionsManifest(value);
};

export const getCollectionManifest = async (
  collectionId: ManifestCollectionId,
): Promise<CollectionManifest> => {
  const url = getCollectionManifestURL(collectionId);
  const value = await fetchJSON<unknown>(url);
  return parseCollectionManifest(collectionId, value);
};

export const getStoryManifest = async (
  collectionId: ManifestCollectionId,
  storyId: ManifestStoryId,
): Promise<StoryManifest> => {
  const url = getStoryManifestURL(collectionId, storyId);
  const value = await fetchJSON<unknown>(url);
  return parseStoryManifest(collectionId, storyId, value);
};
