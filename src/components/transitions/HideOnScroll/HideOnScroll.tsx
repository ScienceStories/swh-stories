import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface HideOnScrollProps {
  readonly children: React.ReactElement;
}

// TODO: Move this to component library
export default function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger({
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  );
}
