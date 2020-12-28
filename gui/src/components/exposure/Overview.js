import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Table, Tag, Button, Row, Col } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';


/*
    Lists all saved exposure situations (i.e. exposure assessment entities)
    End-user creates a new exposure situation
*/
function Overview() {
    const { t } = useTranslation();
    const esData = require('../../json/sample.json').es;
    const settings = require('../../json/sample.json').settings;


    // Table data
    const columns = [
        {
            title: t('exposure.overview.name'),
            dataIndex: "name",
            key: "name"
        }, {
            title: t('exposure.overview.created'),
            dataIndex: "created",
            key: "created",
            render: text => <span className="text-muted">{text}</span>
        }, {
            title: t('exposure.overview.chemical'),
            dataIndex: "chemical",
            key: "chemical"
        }, {
            title: <span>{t('exposure.overview.exposure')}, mg/m<sup>3</sup></span>,
            dataIndex: "exposure",
            key: "exposure"
        }, {
            title: t('exposure.overview.risk'),
            dataIndex: "risk",
            key: "risk"
        }, {
            title: t('exposure.overview.action'),
            dataIndex: "action",
            key: "action",
            render: id => (
                <Space>
                    <Button type="primary" shape="round">
                        {t('open')}
                    </Button>
                    <Button type="primary" danger shape="circle">
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ]

    // exposure only shows exposure calculated by preferred model
    // user defines this in settings
    const dataSource = esData.map(
        es => ({
            key: es.id,
            name: es.name,
            created: es.created,
            chemical: es.chemical ? es.chemical.name : t("unspecified"),
            exposure: (
                es[settings.exposure.preferredModel].status === "calculated"
                ? es[settings.exposure.preferredModel].exposure
                : <Tag color="orange">{t('unknown')}</Tag>
            ),
            risk: <Tag color="magenta">{t('exposure.risk.high')}</Tag>,
            action: es.id
        })
    )

    return(
        <div>
            <Row>
                <Col md={{ span: 12 }}>
                    <h1 className="my-page-title">{t('exposure-situations')}</h1>
                </Col>
                <Col md={{ span: 12 }} style={{ textAlign: "right" }}>
                    <Button
                        type="primary" 
                        shape="round" size="large"
                        className="success-button"
                    >
                        <PlusOutlined /> {t('create-new')}
                    </Button>
                </Col>
            </Row>
            

            <Table
                style={{ marginTop: 25 }}
                columns={columns}
                dataSource={dataSource} 
            />
        </div>
    )
}
export default Overview;