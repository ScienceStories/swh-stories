import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    height: 200,
    position: 'relative',
    zIndex: -1,
  },
  root: {
    borderRightColor: theme.palette.primary.main,
    borderRightStyle: 'solid',
    borderRightWidth: 25,
    textAlign: 'left',
  },
}));

export default useStyles;
