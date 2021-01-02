import React, { useEffect, useState } from 'react';
import { 
    Form,
    Input,
    Divider,
    Collapse,
    Alert,
    Radio,
    Select,
    Button,
    Row,
     Col,
    Space,
    Tooltip
} from 'antd';
import { useTranslation } from 'react-i18next';
import { 
    DownOutlined,
    EditOutlined,
    QuestionCircleOutlined,
    SaveOutlined 
} from '@ant-design/icons';
import { Link, useRouteMatch } from 'react-router-dom';

/*
    Create new or edit an existing exposure situation
    * ES name
    * Date
    * Additional information
    * Substance/Product
    * Exposure models
    * Overview of exposure results
*/
function ExposureSituation(props) {
    const [ state, setState ] = useState({});
    const { t } = useTranslation();
    const { url } = useRouteMatch();

    const esid = parseInt(props.match.params.id);
    let es = {};
    const [testForm] = Form.useForm();


    if (esid !== 0) {
        const data = JSON.parse(localStorage.getItem('es'));
        es = data.find(o => o.id === esid);
    }
    console.log(es)
    useEffect(() => {
        
        if (!es.chemtype) es.chemtype = "none"
        testForm.setFieldsValue(es);
    }, [])
        

    // the fields of form are grouped in few collapse panels
    const { Panel } = Collapse;
    const { Option } = Select;

    const tailLayout = {
        wrapperCol: {md: { offset: 4, span: 16 }}
    }


    // exposure assessment / exposure models / risk scaling
    const scaling = {
        model: {
            xs: { span: 16},
            sm: { span: 12},
            lg: { offset: 4, span: 6}
        }, 
        exposure: {
            xs: { span: 0},
            sm: { span: 6},
            lg: { span: 6}
        },
        more : {
            xs: { span: 8},
            sm: { span: 4},
            lg: { span: 4}
        }
    }

    



    return(
        <div>
            <h1>{esid === 0 ? t('exposure.es.new-es') : es.name}</h1>
            <Form
                form={testForm}
                name="newSituationForm"
                labelCol={{ md: { span: 4 }}}
                wrapperCol={{ md: { span: 16 } }}
                onFinish={values => {
                    let es = values;
                    es.id = Math.round(Math.random() * 100);
                    let date = new Date( Date.now() );
                    es.created = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                    let fromLocalStorage = (localStorage.getItem('es') ? 
                        JSON.parse(localStorage.getItem('es')) : []);
                    fromLocalStorage.push(es);
                    fromLocalStorage = JSON.stringify(fromLocalStorage);
                    localStorage.setItem('es', fromLocalStorage);
                }}
                
                onFinishFailed={
                    ({ values, errorFields }) => {
                        setState({...state, errors: errorFields, values: values})
                        console.log(values)
                }}
            >
                <Form.Item 
                    key="buttons"
                    style={{ textAlign: 'right', marginBottom: 10 }}
                    wrapperCol={{ md: {span: 24} }}
                >
                    <Space>
                        <Link to='/exposure'>
                            <Button type="default" shape="round" size="large">
                                {t('cancel')}
                            </Button>
                        </Link>
                        <Button type="primary" shape="round"
                            htmlType="submit" size="large"
                            className="success-button"
                        >
                            <SaveOutlined /> {t('save')}
                        </Button>
                    </Space>
                </Form.Item> 

                {
                    state.errors ? 
                    <div>
                        { state.errors.map((e, inx) => (
                            <Alert 
                                style={{ marginBottom: 10 }} key={inx}
                                showIcon message={e.errors[0]} type="error" 
                            />
                        ))}
                    </div> : <div />
                }

                <Collapse defaultActiveKey="general" accordion>
                    <Panel key="general" header={t('exposure.es.general')}>
                        <Form.Item 
                            label={t('exposure.es.name')}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: `${t('exposure.es.name')} ${t('messages.required')}`
                                }, {
                                    min: 3,
                                    message: `${t('exposure.es.name')} ${t('messages.too-short')}`
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

                        {/* no need to show date created/mod if not saved yet */
                            esid === 0 ?
                            <div />
                            : <div>
                                <Row>
                                    <Col md={{ span: 4 }} style={{ textAlign: "right", paddingRight: 10 }}>
                                        {t('date-created')}:
                                    </Col>
                                    <Col md={{ span: 16 }}>
                                        {es.created}
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
                            </div>
                        }
                    </Panel>

                    <Panel key="product" header={t('exposure.es.product')}>
                        <Form.Item label={t('exposure.es.substance-or-product')} name="chemtype">
                            <Radio.Group>
                                <Radio value="substance">{t('substance')}</Radio>
                                <Radio value="product">{t('product')}</Radio>
                                <Radio value="none">
                                    <Space>
                                        <span>{t('exposure.es.none')}</span>
                                        <Tooltip title={t('exposure.es.none-tooltip')}>
                                            <QuestionCircleOutlined style={{color:"#1890ff"}} />
                                        </Tooltip>
                                    </Space>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item 
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.chemtype !== currentValues.chemtype}
                        >
                            {({getFieldValue}) => {
                                switch(getFieldValue('chemtype')) {
                                    case 'substance':
                                        return(
                                            <Form.Item label={t('substance')} name="substance">
                                                <Select placeholder={t('please-select')}>
                                                    <Option value="sub-a">Sub-A</Option>
                                                    <Option value="sub-b">Sub-B</Option>
                                                </Select>
                                            </Form.Item>
                                        )
                                    case 'product':
                                        return(
                                            <Form.Item label={t('product')} name="product">
                                                <Select placeholder={t('please-select')}>
                                                    <Option value="pro-a">Product-A</Option>
                                                    <Option value="pro-b">Product-B</Option>
                                                </Select>
                                            </Form.Item>
                                        )
                                    default: return(
                                        <Row style={{ marginTop: 25 }}>
                                            <Col {...tailLayout.wrapperCol}>
                                                <Alert type="warning" showIcon 
                                                    message={t('exposure.es.none-info')} 
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                            }}
                        </Form.Item>
                    </Panel>

                    <Panel key="models" header={t('exposure.es.exposure-risk-assessment')}>
                        <Row>
                            <Col {...tailLayout.wrapperCol}>
                                <Alert 
                                    type="info"
                                    message={t('exposure.es.exposure-models')}
                                    description={t('exposure.es.models-info')}
                                    showIcon
                                />
                            </Col>
                        </Row>

                        <Divider plain>{t('exposure.es.reach-models')}</Divider>
                        {['art', 'stoffenmanager', 'ecetoc'].map(
                               model => (
                                   <div key={model} style={{ marginTop: 15 }}>
                                       <Row className="hover-effect">
                                            <Col {...scaling.model}>
                                                <Link to={`${url}/${model}`}>
                                                    <Button type="link" style={{ borderLeft: "3px solid #1890ff" }}>
                                                        <EditOutlined /> {t(`models.${model}`)}
                                                    </Button>
                                                </Link>
                                            </Col>

                                            <Col {...scaling.exposure}>
                                                <Space align="center">
                                                    exposure / risk
                                                </Space>
                                            </Col>

                                            <Col {...scaling.more} style={{ textAlign: "right" }}>
                                                <Button type="link">
                                                    <DownOutlined /> {t('more')}
                                                </Button>
                                            </Col>
                                       </Row>
                                   </div>
                               ) 
                        )}
                        

                        <Divider plain>{t('exposure.es.ozone-models')}</Divider>
                        <Row className="hover-effect">
                            <Col {...scaling.model}>
                                <Button type="link" style={{ borderLeft: "3px solid #1890ff" }}>
                                    <Space align="center">
                                        <EditOutlined />
                                        <span>O<sub>3</sub></span>
                                        <Tooltip title={t('models.o3-description')}>
                                            <QuestionCircleOutlined />
                                        </Tooltip>
                                    </Space>
                                </Button>
                            </Col>
                            <Col {...scaling.exposure}>
                                <Space align="center">
                                    exposure / risk
                                </Space>
                            </Col>
                            <Col {...scaling.more} style={{ textAlign: "right" }}>
                                <Button type="link">
                                    <DownOutlined /> {t('more')}
                                </Button>
                            </Col>
                        </Row>
                    </Panel>
                </Collapse>      
            </Form>
        </div>
    )
}
export default ExposureSituation;