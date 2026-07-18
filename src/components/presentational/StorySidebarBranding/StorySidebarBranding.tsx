import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { APP_NAME, Images, RoutePaths } from '../../../constants';
import styles from './StorySidebarBranding.styles';

interface StorySidebarBrandingProps {
  readonly backLabel: string;
  readonly backTo: string;
  readonly collectionName: string;
}

export default function StorySidebarBranding({
  backLabel,
  backTo,
  collectionName,
}: StorySidebarBrandingProps) {
  return (
    <>
      <Box component={Link} sx={styles.backLink} to={backTo}>
        <ArrowBackRounded fontSize="small" />
        <Typography variant="caption">
          {backLabel}
        </Typography>
      </Box>
      <Box sx={styles.root}>

        <Box sx={styles.header}>

          <Box component={Link} sx={styles.appLink} to={RoutePaths.Home}>
            <Box
              alt="Software Heritage"
              component="img"
              src={Images.swhIcon}
              sx={styles.logo}
            />
            <Box sx={styles.appText}>
              <Typography sx={styles.appName}>
                {APP_NAME}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box component={Link} sx={styles.collectionBlock} to={backTo}>
          <Typography component="span" sx={styles.collectionLabel}>
            Collection
          </Typography>
          <Typography sx={styles.collectionName}>
            {collectionName}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
