import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { When } from 'react-if';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import CollectionSection from '../../components/containers/CollectionSection/CollectionSection';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import useStore from '../../hooks/useStore';
import styles from './CollectionView.styles';

const CollectionView = observer(() => {
  const { collectionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    contentSourceIsAPI,
    contentSourceIsBucket,
    data,
    nav,
  } = useStore();
  const collectionRouteIsKnown = nav.hasCollectionRoute(collectionId);
  const collectionRouteLookupPending = Boolean(collectionId)
    && !collectionRouteIsKnown
    && !data.orderedCollectionsState.error
    && (data.orderedCollectionsState.loading || !data.orderedCollectionsState.data);
  const resolvedCollectionId = collectionRouteIsKnown
    ? nav.resolveCollectionId(collectionId)
    : undefined;
  const collectionManifestState = data.getCollectionManifestState(resolvedCollectionId);
  const {
    data: collectionManifest,
    error,
    loading,
  } = collectionManifestState;

  const canonicalCollectionSlug = nav.getCollectionSlug(resolvedCollectionId);

  useEffect(() => {
    if (
      !collectionId
      || !resolvedCollectionId
      || !canonicalCollectionSlug
      || collectionId === canonicalCollectionSlug
    ) {
      return;
    }

    navigate(`/${canonicalCollectionSlug}${location.search}${location.hash}`, { replace: true });
  }, [
    canonicalCollectionSlug,
    collectionId,
    location.hash,
    location.search,
    navigate,
    resolvedCollectionId,
  ]);

  useEffect(() => {
    if (!contentSourceIsBucket || !resolvedCollectionId) {
      return;
    }

    data.loadCollectionManifest(resolvedCollectionId).catch(() => undefined);
  }, [resolvedCollectionId, contentSourceIsBucket, data, data.previewEnabled]);

  return (
    <AppLayout
      animation="fade-right"
      hasScrollRestored
      title={collectionManifest?.collection.name || 'Explore Stories'}
    >
      <Box sx={styles.root}>
        {collectionRouteLookupPending ? <LinearProgress color="secondary" /> : null}
        <When condition={Boolean(contentSourceIsBucket)}>
          {loading ? <LinearProgress color="secondary" /> : null}
          {error ? (
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          ) : null}
        </When>
        {contentSourceIsAPI && resolvedCollectionId ? (
          <CollectionSection collectionId={resolvedCollectionId} />
        ) : null}
        {contentSourceIsBucket && resolvedCollectionId ? (
          <CollectionSection collectionId={resolvedCollectionId} />
        ) : null}
      </Box>
    </AppLayout>
  );
});

export default CollectionView;
