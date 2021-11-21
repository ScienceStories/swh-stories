import React from 'react';
import { StoriesAPICollection } from 'react-stories-api';

import {
  STORIES_API_COLLECTION_ID,
  STORIES_API_ENDPOINT,
  STORIES_API_PUBLIC_KEY,
} from '../../../constants';
import { formatStoryURL } from '../../../utils/url';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import PageTitle from '../../layout/PageTitle';
import useStyles from './useStyles';

const urlFormatter = formatStoryURL('$id');

const CollectionPage = () => {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Browse Stories" />
      <Header />
      <div className={classes.collectionContainer}>
        <StoriesAPICollection
          apiKey={STORIES_API_PUBLIC_KEY}
          endpoint={STORIES_API_ENDPOINT}
          id={STORIES_API_COLLECTION_ID}
          urlFormatter={urlFormatter}
        />
      </div>
      <Footer />
    </>
  );
};

export default CollectionPage;
