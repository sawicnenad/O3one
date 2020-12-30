import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space, Table, Tag, Button, Row, Col, Popconfirm } from 'antd';
import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';


/*
    Lists all saved exposure situations (i.e. exposure assessment entities)
    End-user creates a new exposure situation
*/
function Overview() {
    const { t } = useTranslation();

    // for development mode: exposure situations stored in local storage
    const fromLocalStorage = localStorage.getItem('es');
    const esData = fromLocalStorage ? JSON.parse(fromLocalStorage) : [];
    const settings = require('../../json/sample.json').settings;
    const { url } = useRouteMatch();


    // delete a situation
    const handleSituationDelete = id => {
        console.log(id)
        console.log(esData)
        let data = esData.filter(o => o.id !== id);
        console.log(data)
        localStorage.setItem('es', JSON.stringify(data));
    }


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
                    <Link to={`${url}/exposure-situation/${id}`}>
                        <Button type="primary" shape="round">
                            {t('open')}
                        </Button>
                    </Link>
                   
                    <Popconfirm 
                        title={t('messages.are-you-sure-to-delete')}
                        onConfirm={() => handleSituationDelete(id)}
                        okText={t('yes')}
                        cancelText={t('no')}
                    >
                        <Button type="primary" shape="circle" danger>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    // exposure only shows exposure calculated by preferred model
    // user defines this in settings
    const dataSource = esData.map(
        (es, inx) => ({
            key: inx,
            id: es.id,
            name: es.name,
            created: es.created,
            chemical: es.chemical ? es.chemical.name : <Tag color="orange">{t('unspecified')}</Tag>,
            exposure: <Tag color="orange">{t('unknown')}</Tag>,
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
                    <Link to={`${url}/exposure-situation/0`}>
                        <Button
                            type="primary" 
                            shape="round" size="large"
                            className="success-button"
                        >
                            <PlusOutlined /> {t('create-new')}
                        </Button>
                    </Link>
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