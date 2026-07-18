import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Animation } from 'react-stories-api';

import { APP_NAME, Images, RoutePaths } from '../../../constants';
import styles from './CollectionHeaderTitle.styles';

export default function CollectionHeaderTitle() {
  return (
    <Animation
      animation="fade"
      persist
      speed={700}
    >
      <Box
        component={Link}
        sx={styles.root}
        to={RoutePaths.Home}
      >
        <Box
          alt="Software Heritage"
          component="img"
          src={Images.swhIcon}
          sx={styles.logo}
        />
        <Box>
          <Typography sx={styles.appName} variant="overline">
            {APP_NAME}
          </Typography>
          <Typography sx={styles.subtitle} variant="caption">
            Software Heritage
          </Typography>
        </Box>
      </Box>
    </Animation>
  );
}
