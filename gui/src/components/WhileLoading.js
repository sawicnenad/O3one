import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';


// this is rendered while loading sth
// spinning centered 
function WhileLoading(){

    const styling = {
        color: '#1890ff',
        fontSize: 36,
        textAlign: 'center',
        padding: '50px 0px'
    }

    return(
        <div style={styling}>
            <LoadingOutlined />
        </div>
    )
}
export default WhileLoading;