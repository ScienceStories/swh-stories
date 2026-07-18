import Box from '@mui/material/Box';
import AOS from 'aos';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { Unless, When } from 'react-if';
import { useLocation } from 'react-router-dom';
import { useStoriesAPI } from 'react-stories-api';

import useStore from '../../../hooks/useStore';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';
import PageTitle from '../PageTitle/PageTitle';
import styles from './AppLayout.styles';

interface Props extends PropsWithChildren {
  readonly animation?: string;
  readonly animationDuration?: string;
  readonly animationDelay?: string;
  readonly isFullscreen?: boolean;
  readonly hasScrollRestored?: boolean;
  readonly hasFooter?: boolean;
  readonly sx?: Record<string, unknown> | null;
  readonly title: string;
}

const AppLayout = observer(({
  animation = 'fade-up',
  animationDuration = '750',
  animationDelay = '100',
  children,
  hasFooter = true,
  hasScrollRestored = false,
  isFullscreen = false,
  sx = null,
  title,
}: Props) => {
  const reactStoriesAPIStore = useStoriesAPI();
  const { search } = useLocation();
  const store = useStore();

  useEffect(() => {
    store.setReactStoriesAPIStore(reactStoriesAPIStore);
    store.data.syncPreviewFromQuery(search);
    AOS.init({ once: true });
    if (hasScrollRestored) {
      window.scrollTo(0, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasScrollRestored]);

  return (
    <Box sx={{ ...styles.root, ...sx }}>
      <PageTitle title={title} />
      <Box
        data-aos={animation}
        data-aos-delay={animationDelay}
        data-aos-duration={animationDuration}
        data-aos-once="false"
        sx={styles.pageContainer}
      >
        <Unless condition={isFullscreen}>
          <AppBar />
        </Unless>
        {children}
      </Box>
      <When condition={hasFooter}>
        <Footer />
      </When>
    </Box>
  );
});

export default AppLayout;
