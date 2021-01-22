import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';
import {
    Row,
    Col,
    Statistic,
    Space,
    Button
} from 'antd';
import {
    DownOutlined
} from '@ant-design/icons';

function Data(){
    const [ state, setState ] = useState({dataLink: 'suppliers'});
    const { t } = useTranslation();

    // data: suppliers, substances, mixtures, workplaces
    const dataLinks = ['suppliers', 'substances', 'mixtures', 'workplaces'];

    return(
        <div>
            <Row gutter="12">{
                dataLinks.map(
                    item => (
                        <Col key={item} span="6">
                            <div
                                style={{ padding: "0px 10px", backgroundColor: "white" }}
                                onClick={() => setState({...state, dataLink: item})}
                                className={
                                    state.dataLink === item 
                                    ? "div-as-button div-as-button-active" 
                                    : "div-as-button"
                                }
                            >
                                <Space size="middle" align="baseline">
                                    <Statistic 
                                        title={t(`data.${item}`)} 
                                        value={Math.round(Math.random()*10)}
                                        suffix="/10"
                                    />
                                    <DownOutlined />
                                </Space>
                            </div>
                        </Col>
                    )
                )
            }</Row>

            <br />
            <div>
                <Row justify="space-between">
                    <Col>
                        <h1 className="my-page-title">{t(`data.${state.dataLink}`)}</h1>
                    </Col>
                    <Col>
                        <Button className="success-button" type="primary" size="large">
                            {t('create-new')}
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Data;