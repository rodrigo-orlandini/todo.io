import { useContext } from 'react';

import { RealmContext, RealmContextDataProps } from '../contexts/RealmContext';

export const useRealm = (): RealmContextDataProps => {
    const context = useContext(RealmContext);
    
    return context;
}