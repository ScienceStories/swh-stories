const styles = {
  pageContainer: {
    flexGrow: 1,
    height: '100%',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    a: {
      '&:not(.MuiButton-root)': {
        color: 'primary.main',
      },
    },
  },
  spacer: {
    height: 150,
    width: '100%',
  },
};

export default styles;
