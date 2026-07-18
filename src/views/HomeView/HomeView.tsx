/* eslint-disable react/jsx-props-no-spreading */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { ParallaxBanner } from 'react-scroll-parallax';

import CollectionsSection from '../../components/containers/CollectionsSection/CollectionsSection';
import AppLayout from '../../components/layout/AppLayout/AppLayout';
import { APP_NAME, Images } from '../../constants';
import styles from './HomeView.styles';

const baseFadeInProps = {
  'data-aos': 'fade-up',
  'data-aos-delay': '500',
  'data-aos-duration': '1000',
  'data-aos-once': 'true',
};

const HomeView = observer(() => (
  <AppLayout title="Home">
    <Grid
      container
      sx={styles.root}
    >
      <Grid size={12}>
        <ParallaxBanner
          layers={[{
            image: Images.homeHeader,
            opacity: [1, 0, 'easeIn'],
            shouldAlwaysCompleteAnimation: true,
            scale: [1.3, 1, 'easeIn'],
            translateY: [0, 70, 'easeIn'],
            speed: -5,
          }]}
          style={{ height: 300, width: '100vw' }}
        />
      </Grid>
      <Grid
        {...baseFadeInProps}
        size={12}
        sx={styles.titleSection}
      >
        <Box sx={styles.brandRow}>
          <img
            alt="Software Heritage"
            className="softwareHeritageLogo"
            src={Images.swh}
          />
          <span className="brandSeparator">|</span>
          <Typography
            className="brandTitle"
            color="primary"
            variant="h1"
          >
            {APP_NAME}
          </Typography>
        </Box>
      </Grid>
      <Grid
        {...baseFadeInProps}
        id="collection"
        size={12}
      >
        <CollectionsSection />
      </Grid>
    </Grid>
  </AppLayout>
));

export default HomeView;
