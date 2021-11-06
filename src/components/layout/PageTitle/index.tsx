import React from 'react';
import Helmet from 'react-helmet';

import { DEFAULT_PAGE_TITLE } from '../../../constants';

interface Props {
  title?: string;
}

const buildTitle = (title: string | undefined) => (
  title ? `${title} | ${DEFAULT_PAGE_TITLE}` : DEFAULT_PAGE_TITLE
);

const PageTitle = ({ title }: Props) => (
  <Helmet>
    <title>
      {buildTitle(title)}
    </title>
  </Helmet>
);

PageTitle.defaultProps = {
  title: undefined,
};

export default PageTitle;
