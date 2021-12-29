import React from 'react';

const useMediaQuery = (mediaQuery: string): boolean => {
  const [isVerified, setIsVerified] = React.useState(
    !!window.matchMedia(mediaQuery).matches
  );

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const onMediaQueryChange = () => setIsVerified(!!mediaQueryList.matches);

    try {
      mediaQueryList.addEventListener('change', onMediaQueryChange);
    } catch (e) {
      // Safari doesn't support mediaQueryList.addEventListener
      mediaQueryList.addListener(onMediaQueryChange);
    }

    onMediaQueryChange();
    return () => {
      try {
        mediaQueryList.removeEventListener('change', onMediaQueryChange);
      } catch (e) {
        // Safari doesn't support mediaQueryList.removeEventListener
        mediaQueryList.removeListener(onMediaQueryChange);
      }
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
