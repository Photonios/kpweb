import useMediaQuery from './useMediaQuery';

interface MediaQueryBreakpoints {
  isLarge: boolean;
  isMedium: boolean;
  isSmall: boolean;
}

const useMediaQueryBreakpoints = (): MediaQueryBreakpoints => {
  const isLarge = useMediaQuery('(min-width: 1200px)');
  const isMedium = useMediaQuery('(min-width: 900px)');

  return { isLarge, isMedium, isSmall: !isLarge && !isMedium };
};

export default useMediaQueryBreakpoints;
