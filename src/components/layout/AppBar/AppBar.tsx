import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { useLocale } from 'react-stories-api';

import { Images } from '../../../constants';
import useStore from '../../../hooks/useStore';
import HideOnScroll from '../../transitions/HideOnScroll/HideOnScroll';
import styles from './AppBar.styles';

const AppBar = observer(() => {
  const location = useLocation();
  const { t } = useLocale();
  const { data, nav } = useStore();

  const activeRoute = (path: string) => location.pathname === path;
  const linkClass = (path: string) => (activeRoute(path) ? '--active' : '');

  useEffect(() => {
    nav.handleSetCurrentPathname(location.pathname);
  }, [location.pathname, nav]);

  return (
    <HideOnScroll>
      <MuiAppBar
        color="inherit"
        elevation={0}
        sx={styles.root}
      >
        <Grid
          container
          sx={styles.content}
        >
          <Grid sx={styles.navLinks}>
            <div>
              <NavHashLink
                smooth
                to="/#"
              >
                <img
                  alt="Software Heritage"
                  className="logo"
                  src={Images.swhIcon}
                />
              </NavHashLink>
              {nav.navLinks.map(({ path, title }) => (
                <NavHashLink
                  key={title}
                  smooth
                  to={path}
                >
                  <Button
                    className={linkClass(path)}
                    color="primary"
                    sx={styles.button}
                  >
                    {t(title)}
                  </Button>
                </NavHashLink>
              ))}
              <Button
                className={nav.exploreRouteIsActive ? '--active' : ''}
                color="primary"
                onClick={nav.handleOpenExploreMenu}
                sx={styles.button}
              >
                {t('nav.explore')}
              </Button>
              <Menu
                anchorEl={nav.exploreAnchorEl}
                onClose={nav.handleCloseExploreMenu}
                open={nav.exploreMenuIsOpen}
              >
                {nav.collectionsAreLoading ? (
                  <MenuItem disabled>
                    Loading collections...
                  </MenuItem>
                ) : null}
                {!nav.collectionsAreLoading && nav.orderedCollections?.length === 0 ? (
                  <MenuItem disabled>
                    No collections available
                  </MenuItem>
                ) : null}
                {!nav.collectionsAreLoading
                  ? nav.orderedCollections?.map(({ collection, collectionId }) => (
                    <MenuItem
                      key={collectionId}
                      component={NavLink}
                      onClick={nav.handleCloseExploreMenu}
                      to={`/${nav.getCollectionSlug(collectionId) || collectionId}`}
                    >
                      {collection.name}
                    </MenuItem>
                  ))
                  : null}
              </Menu>
            </div>
          </Grid>
          <Grid sx={styles.controls}>
            {data.previewEnabled ? (
              <Chip
                clickable
                color="warning"
                label={nav.previewChipIsHovered ? 'Disable preview' : 'Preview On'}
                onClick={nav.handleDisablePreview}
                onMouseEnter={() => nav.handleSetPreviewChipIsHovered(true)}
                onMouseLeave={() => nav.handleSetPreviewChipIsHovered(false)}
                size="small"
                sx={styles.previewChip}
                variant="filled"
              />
            ) : null}
          </Grid>
        </Grid>
      </MuiAppBar>
    </HideOnScroll>
  );
});

export default AppBar;
