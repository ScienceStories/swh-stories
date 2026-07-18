import type { Theme } from '@mui/material/styles';

const styles = {
  appName: {
    display: 'block',
    fontFamily: 'Alegreya, serif',
    fontSize: '0.9rem',
    letterSpacing: '0.12em',
    lineHeight: 1,
  },
  logo: {
    display: 'block',
    width: 30,
  },
  root: ({ palette }: Theme) => ({
    alignItems: 'center',
    color: `${palette.text.primary} !important`,
    display: 'inline-flex',
    gap: 1.25,
    textDecoration: 'none !important',
  }),
  subtitle: {
    display: 'block',
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    lineHeight: 1.2,
    textTransform: 'uppercase',
  },
};

export default styles;
