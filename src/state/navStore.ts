import { makeAutoObservable } from 'mobx';
import type { MouseEvent } from 'react';

import { NavLinks } from '../constants';
import type { ManifestCollectionId } from '../types';
import { slugifyCollectionName } from '../utils/route';
import type RootStore from './rootStore';

export default class NavStore {
  private rootStore: RootStore;

  currentPathname = '/';

  exploreAnchorEl: HTMLElement | null = null;

  previewChipIsHovered = false;

  private collectionSlugById = new Map<ManifestCollectionId, string>();

  private collectionIdBySlug = new Map<string, ManifestCollectionId>();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get exploreMenuIsOpen() {
    return Boolean(this.exploreAnchorEl);
  }

  get orderedCollections() {
    return this.rootStore.data.orderedCollectionsState.data;
  }

  get collectionsAreLoading() {
    return this.rootStore.data.orderedCollectionsState.loading;
  }

  get exploreRouteIsActive() {
    return !!this.orderedCollections?.some(({ collectionId }) => {
      const collectionSlug = this.getCollectionSlug(collectionId) || collectionId;
      return this.currentPathname === `/${collectionSlug}`;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  get navLinks() {
    return NavLinks.filter(({ title }) => title !== 'nav.explore');
  }

  handleSetCurrentPathname(pathname: string) {
    this.currentPathname = pathname;
  }

  resetCollectionRoutes() {
    this.collectionSlugById.clear();
    this.collectionIdBySlug.clear();
  }

  registerCollectionRoute(
    collectionId: ManifestCollectionId,
    collectionName?: string | null,
  ) {
    const normalizedCollectionId = String(collectionId);
    const baseSlug = collectionName
      ? slugifyCollectionName(collectionName)
      : normalizedCollectionId;
    const fallbackSlug = normalizedCollectionId.toLowerCase();
    const preferredSlug = baseSlug || fallbackSlug;

    let slug = preferredSlug;
    let suffix = 2;
    while (
      this.collectionIdBySlug.has(slug)
      && this.collectionIdBySlug.get(slug) !== normalizedCollectionId
    ) {
      slug = `${preferredSlug}-${suffix}`;
      suffix += 1;
    }

    const existingSlug = this.collectionSlugById.get(normalizedCollectionId);
    if (existingSlug && existingSlug !== slug) {
      this.collectionIdBySlug.delete(existingSlug);
    }

    this.collectionSlugById.set(normalizedCollectionId, slug);
    this.collectionIdBySlug.set(slug, normalizedCollectionId);
  }

  resolveCollectionId(routeCollectionId?: string) {
    if (!routeCollectionId) {
      return undefined;
    }

    if (this.collectionSlugById.has(routeCollectionId)) {
      return routeCollectionId;
    }

    const normalizedSlug = routeCollectionId.toLowerCase();
    return this.collectionIdBySlug.get(normalizedSlug) || routeCollectionId;
  }

  hasCollectionRoute(routeCollectionId?: string) {
    if (!routeCollectionId) {
      return false;
    }

    if (this.collectionSlugById.has(routeCollectionId)) {
      return true;
    }

    const normalizedSlug = routeCollectionId.toLowerCase();

    if (this.collectionIdBySlug.has(normalizedSlug)) {
      return true;
    }

    if (this.rootStore.data.collections.data?.includes(routeCollectionId)) {
      return true;
    }

    if (
      this.rootStore.data.orderedCollectionsState.data?.some(
        ({ collectionId }) => collectionId === routeCollectionId,
      )
    ) {
      return true;
    }

    return this.rootStore.data.hasCollectionManifestState(routeCollectionId);
  }

  getCollectionSlug(collectionId?: string) {
    if (!collectionId) {
      return undefined;
    }

    return this.collectionSlugById.get(collectionId);
  }

  handleOpenExploreMenu(event: MouseEvent<HTMLElement>) {
    this.exploreAnchorEl = event.currentTarget;
  }

  handleCloseExploreMenu() {
    this.exploreAnchorEl = null;
  }

  handleSetPreviewChipIsHovered(isHovered: boolean) {
    this.previewChipIsHovered = isHovered;
  }

  handleDisablePreview() {
    this.rootStore.data.setPreviewEnabled(false);
  }

  handleEnablePreview() {
    this.rootStore.data.setPreviewEnabled(true);
  }
}
