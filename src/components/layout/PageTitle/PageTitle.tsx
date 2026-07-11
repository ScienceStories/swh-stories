import Helmet from 'react-helmet';

import { DEFAULT_PAGE_TITLE } from '../../../constants';

interface Props {
  readonly title?: string;
}

function PageTitle({ title = undefined }: Props) {
  return (
    <Helmet titleTemplate={`%s - ${DEFAULT_PAGE_TITLE}`}>
      <title>
        {title}
      </title>
    </Helmet>
  );
}

export default PageTitle;
