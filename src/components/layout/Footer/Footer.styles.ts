const styles = {
  button: {
    color: 'inherit',
    my: 2,

    '& img': {
      height: '100%',
      maxHeight: '3rem',
      maxWidth: '100%',
    },
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: 600,
    width: '100%',
  },
  credit: {
    p: 1,

    '& .poweredByLink': {
      color: 'inherit !important',
    },
  },
  root: {
    background: '#f6f4f3',
    maxWidth: '100%',
    p: 5,
    textAlign: 'center',
  },
};

export default styles;
