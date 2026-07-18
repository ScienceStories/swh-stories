import type { Theme } from '@mui/material/styles';

const styles = {
  button: ({ breakpoints, palette }: Theme) => ({
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    color: 'text.primary',
    fontSize: 11,
    fontWeight: 'bold',
    mr: 2,
    py: 0,
    textTransform: 'initial',

    '&.--active': {
      borderColor: palette.primary.main,
    },
    '&:hover': {
      borderColor: palette.primary.main,
      color: 'text.primary',
    },
    [breakpoints.up('sm')]: {
      fontSize: 13,
      fontWeight: 'inherit',
    },
  }),
  content: ({ breakpoints }: Theme) => ({
    alignItems: 'flex-end',
    flexGrow: 1,
    justifyContent: 'space-between',
    p: 1,

    [breakpoints.down('sm')]: {
      alignItems: 'center',
      justifyContent: 'space-between',
      p: 1,
    },
  }),
  controls: {
    alignItems: 'center',
    display: 'flex',
    gap: 1,
  },
  localeButton: ({ breakpoints }: Theme) => ({
    color: 'primary.main',

    [breakpoints.down('sm')]: {
      fontSize: '1em',
    },
  }),
  navLinks: ({ breakpoints }: Theme) => ({
    '.logo': {
      ml: { xs: 0, sm: 2 },
      mr: { xs: 1, sm: 2 },
      width: 27,
    },

    '> div': {
      alignItems: 'center',
      display: 'none',

      [breakpoints.up('xs')]: {
        display: 'flex',
      },
    },

    a: {
      alignItems: 'center',
      display: 'inline-flex',
      textDecoration: 'none',
    },
  }),
  previewChip: ({ breakpoints }: Theme) => ({
    cursor: 'pointer',
    fontSize: 10,
    fontWeight: 700,
    height: 22,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
    transition: 'opacity 0.2s ease',

    '&:hover': {
      opacity: 0.92,
    },
    [breakpoints.down('sm')]: {
      fontSize: 9,
      height: 20,
      px: 0.5,
    },
  }),
  root: {
    backdropFilter: 'saturate(180%) blur(20px)',
    background: 'rgba(255, 255, 255, .7)',
  },
};

export default styles;
