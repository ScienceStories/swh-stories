import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { When } from 'react-if';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StoriesAPIStory, Story, useLocale } from 'react-stories-api';

import AppLayout from '../../components/layout/AppLayout/AppLayout';
import StorySidebarBranding from '../../components/presentational/StorySidebarBranding/StorySidebarBranding';
import useStore from '../../hooks/useStore';
import styles from './StoryView.styles';

const StoryView = observer(() => {
  const { collectionId, storyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLocale();
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
  const storyManifestState = data.getStoryManifestState(resolvedCollectionId, storyId);
  const {
    data: storyManifest,
    error,
    loading,
  } = storyManifestState;
  const orderedCollection = data.orderedCollectionsState.data?.find((item) => (
    item.collectionId === resolvedCollectionId
  ));
  const collectionManifestState = data.getCollectionManifestState(resolvedCollectionId);
  const collectionName = collectionManifestState.data?.collection.name
    || orderedCollection?.collection.name
    || resolvedCollectionId
    || '';

  const canonicalCollectionSlug = nav.getCollectionSlug(resolvedCollectionId);
  const collectionPath = `/${canonicalCollectionSlug || resolvedCollectionId || ''}`;
  const storyBrandingKey = `${resolvedCollectionId || collectionId || ''}:${collectionName}`;

  useEffect(() => {
    if (!collectionId || !resolvedCollectionId || !canonicalCollectionSlug || !storyId) {
      return;
    }

    if (collectionId === canonicalCollectionSlug) {
      return;
    }

    navigate(`/${canonicalCollectionSlug}/${storyId}${location.search}${location.hash}`, {
      replace: true,
    });
  }, [
    canonicalCollectionSlug,
    collectionId,
    location.hash,
    location.search,
    navigate,
    resolvedCollectionId,
    storyId,
  ]);

  useEffect(() => {
    if (!contentSourceIsBucket || !resolvedCollectionId || !storyId) {
      return;
    }

    data.loadStoryManifest(resolvedCollectionId, storyId).catch(() => undefined);
  }, [resolvedCollectionId, contentSourceIsBucket, data, data.previewEnabled, storyId]);

  useEffect(() => {
    if (!contentSourceIsBucket || !resolvedCollectionId) {
      return;
    }

    data.loadCollectionManifest(resolvedCollectionId).catch(() => undefined);
  }, [resolvedCollectionId, contentSourceIsBucket, data, data.previewEnabled]);

  return (
    <AppLayout
      animationDelay="100"
      hasFooter={false}
      hasScrollRestored
      isFullscreen
      title={storyManifest?.label || storyId || 'Story'}
    >
      <Box sx={styles.root}>
        {collectionRouteLookupPending ? <LinearProgress color="secondary" /> : null}
        <When condition={contentSourceIsBucket}>
          {loading ? <LinearProgress color="secondary" /> : null}
          {error ? (
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          ) : null}
        </When>
        <When condition={Boolean(storyManifest && contentSourceIsBucket)}>
          <Story
            key={storyBrandingKey}
            branding={(
              <StorySidebarBranding
                backLabel={t('story.collectionLink')}
                backTo={collectionPath}
                collectionName={collectionName}
              />
            )}
            connectRouter
            fullscreen
            showLocaleSelector
            showStoryId
            story={storyManifest || undefined}
          />
        </When>
        <When condition={Boolean(contentSourceIsAPI && resolvedCollectionId && storyId)}>
          <StoriesAPIStory
            key={storyBrandingKey}
            branding={(
              <StorySidebarBranding
                backLabel={t('story.collectionLink')}
                backTo={collectionPath}
                collectionName={collectionName}
              />
            )}
            collectionId={Number(resolvedCollectionId)}
            connectRouter
            fullscreen
            showLocaleSelector
            showStoryId
            storyId={storyId}
          />
        </When>
      </Box>
    </AppLayout>
  );
});

export default StoryView;
