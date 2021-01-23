
import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';





// when no data (e.g. substances)
// this component is rendered
function NoData() {
    const { t } = useTranslation();

    const styling = {
        color: "#8c8c8c",
        fontSize: 16,
        textAlign: 'center',
        padding: "50px 0px",
        backgroundColor: "#fafafa",
        margin: "5px 0px"
    }

    return(
        <div style={styling}>
            <Space>
                <InboxOutlined style={{ fontSize: 50 }} />
                <div>{t('messages.no-data')}</div>
            </Space>
        </div>
    )
}
export default NoData;