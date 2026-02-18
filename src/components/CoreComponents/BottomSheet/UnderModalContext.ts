import {createContext, useContext} from 'react';

export const UnderModalContext = createContext<boolean>(false);

export const useUnderModalContext = () => useContext(UnderModalContext);
