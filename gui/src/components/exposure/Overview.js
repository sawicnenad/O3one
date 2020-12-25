import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col, Space, Divider } from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    CheckCircleOutlined,
    CheckOutlined,
    ExperimentOutlined,
    CodepenOutlined
} from '@ant-design/icons';


/*
    Lists all saved exposure situations (i.e. exposure assessment entities)
    End-user creates a new exposure situation
*/
function Overview() {
    const { t } = useTranslation();
    const esData = require('../../json/sample.json').es;


    const innerCardLayout = {
        md: { span: 8 },
        xs: { span: 24 }
    }

    return(
        <div>
            {
                esData.map(
                    es => (
                        <Card 
                            key={es.id}
                            title={es.name}
                            style={{ marginTop: 15 }}
                            actions={[
                                <DeleteOutlined key="delete" />,
                                <EditOutlined key="edit" />
                            ]}
                        >
                            
                            <Row>
                                <Col {...innerCardLayout}>
                                    {
                                        es.substance ?
                                        <Space>
                                            <CheckOutlined />
                                            {t('substance')}
                                        </Space>
                                        : <Space>
                                            <CheckCircleOutlined />
                                            {t('product')}
                                        </Space>
                                    }
                                </Col>

                                <Col {...innerCardLayout}>
                                    <Space>
                                        <ExperimentOutlined />
                                        {es.substance ? es.substance.name : ""}
                                        {es.product ? es.product.name : ""}
                                        {!es.product && !es.substance ? <i>{t('unspecified')}</i> : ""}
                                    </Space>
                                </Col>

                                <Col {...innerCardLayout}>
                                    <Space>
                                        <CodepenOutlined />
                                        {es.workplace ? es.workplace.name : <i>{t('unspecified')}</i>}
                                    </Space>
                                </Col>
                            </Row>
                            <Divider orientation="left">{t('exposure-models')}</Divider>
                        </Card>
                    )
                )
            }
        </div>
    )
}
export default Overview;