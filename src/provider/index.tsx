import React, { createContext, useContext } from 'react';
import { SapliyConfig } from '../types';

interface SapliyContextValue {
    config: SapliyConfig;
}

const SapliyContext = createContext<SapliyContextValue | undefined>(undefined);

export const SapliyProvider = ({ config, children }: { config: SapliyConfig; children: React.ReactNode }) => {
    return (
        <SapliyContext.Provider value={{ config }}>
            {children}
        </SapliyContext.Provider>
    );
};

export const useSapliy = () => {
    const context = useContext(SapliyContext);
    if (!context) {
        throw new Error('useSapliy must be used within a SapliyProvider');
    }
    return context;
};