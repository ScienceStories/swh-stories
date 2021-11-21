import React from 'react';

import { Images } from '../../../constants';
import useStyles from './useStyles';

const Header = () => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <img
        alt="Heading Banner Graphic"
        className={classes.bannerImage}
        src={Images.collectionHeader}
      />
    </section>
  );
};

export default Header;
