import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { FooterLinks, SCIENCE_STORIES_URL, SWH_URL } from '../../../constants';
import useStyles from './useStyles';

const Footer = () => {
  const classes = useStyles();
  const copyDate = `© ${new Date().getFullYear()}`;
  return (
    <footer className={classes.root}>
      <Grid
        alignItems="center"
        className={classes.container}
        container
        justify="center"
      >
        {FooterLinks.map(({ logo, name, url }) => (
          <Grid
            item
            key={`footer-${name}`}
            lg={4}
            md={6}
            sm={12}
          >
            <Button
              className={classes.button}
              href={url}
              target="_blank"
            >
              <img
                alt={name}
                className={classes.logo}
                src={logo}
              />
            </Button>
          </Grid>
        ))}
        <Grid
          className={classes.credit}
          item
          xs={7}
        >
          <Typography variant="caption">
            { copyDate }
            <Button
              className={classes.creditBtn}
              color="primary"
              href={SWH_URL}
              size="small"
              target="_blank"
              variant="text"
            >
              Software Heritage
            </Button>
            in collaboration with
            <Button
              className={classes.creditBtn}
              color="primary"
              href={SCIENCE_STORIES_URL}
              size="small"
              target="_blank"
              variant="text"
            >
              The ScienceStories.io Team
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
