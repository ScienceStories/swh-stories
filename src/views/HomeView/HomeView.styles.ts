const styles = {
  brandRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 1.5, md: 2 },
    justifyContent: 'center',
    mb: 2,
  },
  root: {
    mb: 15,
  },
  titleSection: {
    alignSelf: 'center',
    maxWidth: 1000,
    mx: 'auto',
    pb: { xs: 0 },
    pt: { xs: 3, md: 6 },
    px: 3,
    textAlign: 'center',

    '.brandSeparator': {
      color: 'text.secondary',
      display: { xs: 'none', sm: 'inline' },
      fontSize: { xs: '1.8rem', md: '2.2rem' },
      fontWeight: 400,
      lineHeight: 1,
    },

    '.brandTitle': {
      fontSize: { xs: '2.1rem', md: '3.4rem' },
      fontWeight: 400,
      lineHeight: 1.1,
    },

    '.softwareHeritageLogo': {
      display: 'block',
      height: 'auto',
      maxWidth: '100%',
      mt: { xs: 1, md: 1 },
      width: { xs: 184, md: 290 },
    },
  },
};

export default styles;
