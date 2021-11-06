import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import StoriesAPIStory from 'react-stories-api';

import {
  APP_BROWSE_URL,
  APP_NAME,
  STORIES_API_COLLECTION_ID,
  STORIES_API_ENDPOINT,
  STORIES_API_PUBLIC_KEY, SWH_LOGO,
} from '../../../constants';
import { Story } from '../../../types';
import PageTitle from '../../layout/PageTitle';
import useStyles from './useStyles';

interface Props extends RouteComponentProps {
}

interface MatchParams {
  storyId: number;
}

const StoryPage = ({ match }: Props) => {
  const classes = useStyles();
  const { storyId } = match.params as MatchParams;
  const [story, setStory] = useState({} as Story);
  const { label } = story;
  return (
    <>
      <PageTitle title={`${label || storyId}`} />
      <StoriesAPIStory
        apiKey={STORIES_API_PUBLIC_KEY}
        collection={STORIES_API_COLLECTION_ID}
        endpoint={STORIES_API_ENDPOINT}
        id={storyId}
        onLoad={setStory}
        options={{
          logo: (
            <Button
              href={APP_BROWSE_URL}
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
