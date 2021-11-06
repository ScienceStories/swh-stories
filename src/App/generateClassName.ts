import { createGenerateClassName } from '@material-ui/core';
import { CLASSNAME_PRODUCTION_PREFIX, CLASSNAME_SEED } from '../constants';

const generateClassName = createGenerateClassName({
  productionPrefix: CLASSNAME_PRODUCTION_PREFIX,
  seed: CLASSNAME_SEED,
});

export default generateClassName;
