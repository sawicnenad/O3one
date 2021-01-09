import React, { createContext } from 'react';


export const ApiContext = createContext({});

function ApiContextProvider(props) {

    // check if dev or production
    const isProduction = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return false;
        }
        return true;
    }

    // API URL
    const api = isProduction() ? 'http://api.pro-code.ch' : 'http://localhost:8000';

    return (
        <ApiContext.Provider 
            value={{
                api: api
            }}
        >{ props.children }
        </ApiContext.Provider>
    )
}
export default ApiContextProvider;