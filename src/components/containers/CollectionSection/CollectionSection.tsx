import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { When } from 'react-if';
import { Collection, StoriesAPICollection } from 'react-stories-api';

import { COLLECTION_SECTION_CACHE_KEY } from '../../../constants';
import useStore from '../../../hooks/useStore';
import CollectionHeaderTitle from '../../presentational/CollectionHeaderTitle/CollectionHeaderTitle';

interface Props {
  readonly collectionId: string;
}

const collectionSlots = {
  CollectionHeaderTitle,
};

function CollectionSection({ collectionId }: Props) {
  const {
    contentSourceIsAPI,
    contentSourceIsBucket,
    data,
  } = useStore();
  const collectionManifestState = data.getCollectionManifestState(collectionId);

  useEffect(() => {
    if (!contentSourceIsBucket) {
      return;
    }

    data.loadCollectionManifest(collectionId).catch(() => undefined);
  }, [collectionId, contentSourceIsBucket, data, data.previewEnabled]);

  const { data: collectionManifest, error, loading } = collectionManifestState;

  return (
    <>
      <When condition={contentSourceIsAPI}>
        <StoriesAPICollection
          cacheKey={COLLECTION_SECTION_CACHE_KEY}
          collectionId={Number(collectionId)}
          connectRouter
          layout="minimal"
          showStoriesListHeader={false}
          showStoryId
          slots={collectionSlots}
        />
      </When>
      <When condition={contentSourceIsBucket}>
        <When condition={loading}>
          <LinearProgress color="secondary" />
        </When>
        <When condition={Boolean(error)}>
          <Typography color="error" variant="body2">
            {error?.message}
          </Typography>
        </When>
        <When condition={Boolean(collectionManifest?.collection)}>
          {() => (
            <Collection
              collection={collectionManifest!.collection}
              layout="minimal"
              showStoriesListHeader={false}
              showStoryId
              slots={collectionSlots}
            />
          )}
        </When>
      </When>
    </>
  );
}

export default CollectionSection;
