import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import StoriesAPIStory from 'react-stories-api';

import {
  APP_NAME,
  STORIES_API_INRIA_COLLECTION_ID,
  STORIES_API_PISA_COLLECTION_ID,
  STORIES_API_ENDPOINT,
  STORIES_API_PUBLIC_KEY, SWH_LOGO,
} from '../../../constants';
import { Story } from '../../../types';
import PageTitle from '../../layout/PageTitle';
import useStyles from './useStyles';

interface Props extends RouteComponentProps {
}

interface MatchParams {
  baseUrl: string;
  storyId: number;
}

const RouteCollectionIdMap: Record<string, number> = {
  inria: STORIES_API_INRIA_COLLECTION_ID,
  pisa: STORIES_API_PISA_COLLECTION_ID,
};

const StoryPage = ({ match }: Props) => {
  const classes = useStyles();
  const { baseUrl, storyId } = match.params as MatchParams;
  const [story, setStory] = useState({} as Story);
  const { label } = story;
  const collection = RouteCollectionIdMap[baseUrl];
  return (
    <>
      <PageTitle title={`${label || storyId}`} />
      <StoriesAPIStory
        apiKey={STORIES_API_PUBLIC_KEY}
        collection={collection}
        endpoint={STORIES_API_ENDPOINT}
        id={storyId}
        onLoad={setStory}
        options={{
          logo: (
            <Button
              href={`/${baseUrl}`}
              size="small"
            >
              <img
                alt={`${APP_NAME} Logo`}
                className={classes.logo}
                src={SWH_LOGO}
              />
            </Button>
          ),
        }}
      />
    </>
  );
};

export default StoryPage;
