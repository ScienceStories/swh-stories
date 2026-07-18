import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { StatusPage, type StatusPageProps, useLocale } from 'react-stories-api';

import { RoutePaths } from '../../constants';
import styles from './ErrorView.styles';

function ErrorView({ message = 'Something went wrong' }: StatusPageProps) {
  const { t } = useLocale();

  return (
    <StatusPage
      isFullscreen
      message={message}
    >
      <Button
        component={Link}
        size="small"
        sx={styles.button}
        to={RoutePaths.Home}
        variant="contained"
      >
        {t('error.fallbackButton')}
      </Button>
    </StatusPage>
  );
}

export default ErrorView;
