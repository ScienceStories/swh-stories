import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Images } from '../../../constants';
import useStyles from './useStyles';

const Header = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid
          item
          xs={3}
        >
          <img
            alt="Heading Banner Graphic"
            className={classes.bannerImage}
            src={Images.collectionHeader}
          />
        </Grid>
        <Grid
          item
          className={classes.titleContainer}
          md={4}
          xs={9}
        >
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h4"
          >
            Software Stories
          </Typography>
          <Divider className={classes.divider} />
          <img
            alt="Software Heritage"
            className={classes.logo}
            src={Images.swh}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export default Header;
