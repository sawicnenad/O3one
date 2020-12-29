import React from 'react';
import { Form, Input, Checkbox, Divider, Collapse, Alert, Radio, Select, Button, Row, Col, Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

/*
    Create new or edit an existing exposure situation
    * ES name
    * Date
    * Additional information
    * Substance/Product
    * Exposure models
    * Overview of exposure results
*/
function ExposureSituation() {
    const { t } = useTranslation();
    const { params } = useParams();
    console.log(params)

    const { Panel } = Collapse;
    const { Option } = Select;

    const tailLayout = {
        wrapperCol: {md: { offset: 4, span: 16 }}
    }

    return(
        <div>
            <h1>{t('exposure.es.new-es')}</h1>
            <div 
                style={{ textAlign: 'right', marginBottom: 10 }}
            >
                <Space>
                    <Link to='/exposure'>
                        <Button type="default" danger shape="round">
                            {t('cancel')}
                        </Button>
                    </Link>
                    <Button type="primary" shape="round">
                        {t('save')}
                    </Button>
                </Space>
            </div>
            <Form
                labelCol={{ md: { span: 4 }}}
                wrapperCol={{ md: { span: 16 } }}
            >
                <Collapse defaultActiveKey="general" accordion>
                    <Panel key="general" header={t('exposure.es.general')}>
                        <Form.Item 
                            label={t('exposure.es.name')}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: t('messages.required')
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label={t('workplace')} name="workplace">
                            <Select>
                                <Option value="wp-1">workplace-1</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label={t('exposure.es.description')} name="description">
                            <Input.TextArea />
                        </Form.Item>

                        <Row>
                            <Col md={{ span: 4 }} style={{ textAlign: "right", paddingRight: 10 }}>
                                {t('date-created')}:
                            </Col>
                            <Col md={{ span: 16 }}>
                                25-12-2020
                            </Col>
                        </Row>
                            <br/>
                        <Row>
                            <Col md={{ span: 4 }} style={{ textAlign: "right", paddingRight: 10 }}>
                                {t('last-modified')}:
                            </Col>
                            <Col md={{ span: 16 }}>
                                25-12-2020
                            </Col>
                        </Row>
                    </Panel>

                    <Panel key="product" header={t('exposure.es.product')}>
                        <Form.Item label={t('exposure.es.substance-or-product')} name="chemtype">
                            <Radio.Group>
                                <Radio value="substance">{t('substance')}</Radio>
                                <Radio value="product">{t('product')}</Radio>
                                <Radio value="none">{t('exposure.es.none')}</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label={t('substance')} name="substance">
                            <Select placeholder={t('please-select')}>
                                <Option value="sub-a">Sub-A</Option>
                                <Option value="sub-a">Sub-B</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label={t('product')} name="product">
                            <Select placeholder={t('please-select')}>
                                <Option value="pro-a">Product-A</Option>
                                <Option value="pro-a">Product-B</Option>
                            </Select>
                        </Form.Item>
                    </Panel>

                    <Panel key="models" header={t('exposure.es.exposure-models')}>
                        <Row>
                            <Col {...tailLayout.wrapperCol}>
                                <Alert 
                                    type="info"
                                    message={t('exposure.es.models-info')}
                                    showIcon
                                />
                            </Col>
                        </Row>

                        <Divider plain>{t('exposure.es.reach-models')}</Divider>
                        <Form.Item
                            name="art"
                            {...tailLayout}
                        >
                            <Checkbox>{t('models.art')}</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="stoffenmanager"
                            {...tailLayout}
                        >
                            <Checkbox>{t('models.stoffenmanager')}</Checkbox>
                        </Form.Item>

                        <Form.Item
                            name="ecetoc"
                            {...tailLayout}
                        >
                            <Checkbox>{t('models.ecetoc')}</Checkbox>
                        </Form.Item>

                        <Divider plain>{t('exposure.es.ozone-models')}</Divider>

                        <Form.Item
                            name="o3"
                            {...tailLayout}
                            
                        >
                            <Checkbox><span>O<sub>3</sub> </span>
                                <Tooltip title={t('models.o3-description')}>
                                    <QuestionCircleOutlined style={{color:"#1890ff"}} />
                                </Tooltip>
                            </Checkbox>
                        </Form.Item>
                    </Panel>
                </Collapse>      
            </Form>
        </div>
    )
}
export default ExposureSituation;