import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { When } from 'react-if';

import useStore from '../../../hooks/useStore';
import CollectionSection from '../CollectionSection/CollectionSection';
import styles from './CollectionsSection.styles';

const CollectionsSection = observer(() => {
  const { data } = useStore();
  const { data: collectionIds, error, loading } = data.collections;

  return (
    <Grid
      container
      sx={styles.root}
    >
      <Grid size={12}>
        <When condition={loading}>
          <LinearProgress color="secondary" />
        </When>
        <When condition={Boolean(error)}>
          <Typography color="error" variant="body2">
            {error?.message}
          </Typography>
        </When>
        <When condition={Boolean(collectionIds?.length)}>
          {collectionIds?.map((collectionId) => (
            <Box key={collectionId} sx={styles.collectionBlock}>
              <CollectionSection collectionId={collectionId} />
            </Box>
          ))}
        </When>
      </Grid>
    </Grid>
  );
});

export default CollectionsSection;
