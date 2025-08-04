/* eslint-disable react-refresh/only-export-components */
// import { CalculateContext } from './calculateContext';
import { createContext, useContext } from 'react';

export const CalculateContext = createContext(undefined);

export const useCalculate = () => {
  const useCalculateContext = useContext(CalculateContext);

  if (!useCalculateContext) {
    // console.error('You cannot use context outside of a context');
    throw new Error('You cannot use context outside of a context');
    // return;
  }

  return useCalculateContext;
};

export const CalculateContextProvider = ({ handleButtonClick, children }) => {
  return (
    <CalculateContext.Provider value={{ handleButtonClick }}>
      {children}
    </CalculateContext.Provider>
  );
};
