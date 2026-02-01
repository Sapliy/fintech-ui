import React, { createContext, useContext } from 'react';
import { FintechConfig } from '../types';

interface FintechContextValue {
    config: FintechConfig;
}

const FintechContext = createContext<FintechContextValue | undefined>(undefined);

export const FintechProvider = ({ config, children }: { config: FintechConfig; children: React.ReactNode }) => {
    return (
        <FintechContext.Provider value={{ config }}>
            {children}
        </FintechContext.Provider>
    );
};

export const useFintech = () => {
    const context = useContext(FintechContext);
    if (!context) {
        throw new Error('useFintech must be used within a FintechProvider');
    }
    return context;
};
