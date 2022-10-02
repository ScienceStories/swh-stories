import { APP_BROWSE_URL } from '../constants';

export const formatStoryURL = (id: string, base = APP_BROWSE_URL) => `${base}/${id}`;

export default formatStoryURL;
