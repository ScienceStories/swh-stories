import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    maxHeight: 200,
    position: 'relative',
    zIndex: -1,
    [theme.breakpoints.down('md')]: {
      maxHeight: 100,
    },
  },
  divider: {
    margin: theme.spacing(1),
  },
  logo: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '55%',
    },
  },
  root: {
    borderRightColor: theme.palette.primary.main,
    borderRightStyle: 'solid',
    borderRightWidth: 25,
    textAlign: 'left',
  },
  title: {
    fontWeight: 100,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.h5.fontSize,
      paddingTop: theme.spacing(3),
    },
  },
  titleContainer: {
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      paddingBottom: theme.spacing(5),
    },
  },
}));

export default useStyles;
