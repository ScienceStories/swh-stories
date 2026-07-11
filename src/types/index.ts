import type { Collection, Story } from 'react-stories-api/types';

export type ManifestCollectionId = string;
export type ManifestStoryId = string;

export type CollectionsManifestItem = {
  readonly id: ManifestCollectionId;
};

export type CollectionsManifest = {
  readonly collections: CollectionsManifestItem[];
};

export type CollectionManifest = {
  readonly collection: Collection;
  readonly collectionId: ManifestCollectionId;
};

export type StoryManifest = Story;

export class CollectionsDataError extends Error {
  readonly code?: number;

  readonly url: string;

  constructor(message: string, url: string, code?: number) {
    super(message);
    this.name = 'CollectionsDataError';
    this.code = code;
    this.url = url;
  }
}
