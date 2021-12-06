import React, {createContext, useContext} from 'react';
import AssetsManager from "../services/AssetManager";

const initialState = {
    assetManager: new AssetsManager()
};

const Context = createContext(initialState);

export const StoreConsumer = Context.Consumer;
export const StoreConsumerHook = () => useContext(Context);

export const StoreProvider = ({children}) => (
    <Context.Provider value={initialState}>
        {children}
    </Context.Provider>
);
