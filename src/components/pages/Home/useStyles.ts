import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  collectionContainer: {
    boxShadow: '0px -5px 15px 5px #00000054',
    paddingBottom: theme.spacing(10),
  },
  divider: {
    background: 'linear-gradient(90deg, rgb(255, 201, 58) 0%, rgb(226, 0, 38) 100%)',
    boxShadow: '0px 6px 4px 0px #cc6e6e6b',
    height: 10,
    marginBottom: 50,
    marginTop: 50,
    width: '100%',
  },
}));

export default useStyles;
