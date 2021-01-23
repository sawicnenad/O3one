import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';





export const Context = createContext({});

function ContextProvider(props) {
    const [ data, setData ] = useState({});

    // check if dev or production
    const isProduction = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return false;
        }
        return true;
    }
    // API URL
    const api = isProduction() ? 'http://api.pro-code.ch' : 'http://localhost:8000';

    const promises = [
        axios.get(`${api}/suppliers`)
    ]


    // on load
    useEffect(() => {
        Promise.all(promises)
        .then(
            res => setData({
                suppliers: res.data,
                loaded: true
            })
        ).catch(
            e => setData({
                loaded: true,
                error: e
            })
        )
    }, [])


    // form scaling
    const scaling = {
        wrapperCol: {
            md: { span: 12 }
        },
        labelCol: {
            sm: { span: 24 },
            md: { span: 4 },
            lg: { span: 3 }
        },
        tailedCol: {
            md: { offset: 4, span: 12 },
            lg: { offset: 3, span: 12 }
        }
    }


    return (
        <Context.Provider 
            value={{
                api: api,
                data: data,
                scaling: scaling
            }}
        >{ props.children }
        </Context.Provider>
    )
}
export default ContextProvider;