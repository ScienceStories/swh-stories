import type { Theme } from '@mui/material/styles';

const styles = {
  appLink: ({ breakpoints }: Theme) => ({
    alignItems: 'center',
    color: 'inherit',
    columnGap: 1,
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: 0.75,
    textDecoration: 'none',

    [breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  }),
  appName: {
    fontFamily: 'Alegreya, serif',
    fontSize: { xs: '0.98rem', md: '1.1rem' },
    lineHeight: 1.05,
  },
  appText: {
    flex: '1 1 140px',
    minWidth: 0,
  },
  backLink: ({ palette }: Theme) => ({
    alignItems: 'center',
    color: `${palette.text.secondary} !important`,
    display: 'inline-flex',
    gap: 0.5,
    m: 1,
    mb: 0,
    textDecoration: 'none',
    transition: 'color 0.2s ease',

    '&:hover': {
      color: `${palette.primary.main} !important`,
    },
  }),
  collectionBlock: ({ palette }: Theme) => ({
    backgroundColor: palette.common.white,
    border: '1px solid',
    borderColor: palette.divider,
    borderRadius: 2,
    color: 'inherit',
    display: 'block',
    padding: 1.25,
    textDecoration: 'none',
    transition: 'border-color 0.2s ease, transform 0.2s ease',

    '&:hover': {
      borderColor: palette.primary.main,
      transform: 'translateY(-1px)',
    },
  }),
  collectionLabel: ({ palette }: Theme) => ({
    color: palette.text.secondary,
    display: 'block',
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    mb: 0.5,
    textTransform: 'uppercase',
  }),
  collectionName: ({ palette }: Theme) => ({
    color: palette.text.primary,
    fontFamily: 'Alegreya, serif',
    fontSize: { xs: '0.96rem', md: '1.04rem' },
    lineHeight: 1.15,
  }),
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
  },
  logo: {
    display: 'block',
    flexShrink: 0,
    height: 22,
    objectFit: 'contain',
    width: '22px !important',
  },
  root: ({ palette }: Theme) => ({
    background: `linear-gradient(180deg, ${palette.common.white} 0%, ${palette.grey[50]} 100%)`,
    border: '1px solid',
    borderColor: palette.divider,
    borderRadius: 2,
    boxSizing: 'border-box',
    color: palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.75,
    m: 1,
    mb: 2,
    p: 1,
  }),
};

export default styles;
