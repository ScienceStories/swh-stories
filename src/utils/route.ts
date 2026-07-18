export type APICollectionLike = {
  id?: number | string;
  collection_id?: number | string;
  name?: string;
  title?: string;
  label?: string;
};

export const slugifyCollectionName = (collectionName: string) => collectionName
  .trim()
  .replace(/^the\s+/iu, '')
  .replace(/\s+collection$/iu, '')
  .replace(/[^a-z0-9]+/giu, '-')
  .replace(/^-+/u, '')
  .replace(/-+$/u, '')
  .replace(/-{2,}/gu, '-')
  .toLowerCase();

export const extractAPICollectionId = (collection: APICollectionLike): string | null => {
  const rawId = collection.id ?? collection.collection_id;
  if (rawId === undefined || rawId === null) {
    return null;
  }

  return String(rawId);
};

export const extractAPICollectionName = (collection: APICollectionLike): string | null => {
  const rawName = collection.name ?? collection.title ?? collection.label;
  if (!rawName || typeof rawName !== 'string') {
    return null;
  }

  const trimmedName = rawName.trim();
  return trimmedName || null;
};
