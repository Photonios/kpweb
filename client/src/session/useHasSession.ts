import { useRecoilValue } from 'recoil';

import { hasSessionState } from './state';

const useHasSession = () => useRecoilValue(hasSessionState);

export default useHasSession;
