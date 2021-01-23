
import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import NoData from '../../components/NoData';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    InputNumber,
    Space
} from 'antd';
import { useTranslation } from 'react-i18next';
import { CalculatorFilled } from '@ant-design/icons';





function Suppliers() {
    const [ state, setState ] = useState({})
    const {t} = useTranslation();
    const context = useContext(Context);



    // form: new supplier
    const newSupForm = (
        <Form {...context.scaling} labelAlign="left" style={{ marginTop: 25 }}>
            <Form.Item 
                name="name"
                label={t('data.supplier.name')}
                rules={[
                    {
                        required: true,
                        message: t('messages.required-general')
                    }, {
                        max: 25,
                        message: t('messages.too-long')
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item 
                label={t('data.supplier.street-nr')}
                style={{ margin: 0 }}
            >
                <Form.Item
                    name="street"
                    style={{ display: "inline-block", width: 'calc(50% - 12px)' }}
                    rules={[
                        {
                            max: 25,
                            message: t('messages.too-long')
                        }
                    ]}
                >
                    <Input placeholder={t('data.supplier.street')} />
                </Form.Item>
                <span> </span>
                <Form.Item
                    name="nr"
                    style={{ display: "inline-block", width: 'calc(50% - 12px)' }}
                >
                    <InputNumber placeholder={t('data.supplier.nr')} max={9999}/>
                </Form.Item>
            </Form.Item>

            <Form.Item 
                label={t('data.supplier.city-zip')}
                style={{ margin: 0 }}
            >
                <Form.Item
                    name="city"
                    style={{ display: "inline-block", width: 'calc(50% - 12px)' }}
                    rules={[
                        {
                            max: 25,
                            message: t('messages.too-long')
                        }
                    ]}
                >
                    <Input placeholder={t('data.supplier.city')}/>
                </Form.Item>
                <span> </span>
                <Form.Item
                    name="zip"
                    style={{ display: "inline-block", width: 'calc(50% - 12px)' }}
                >
                    <InputNumber placeholder={t('data.supplier.zip')} max={999999}/>
                </Form.Item>
            </Form.Item>

            <Form.Item 
                name="country"
                label={t('data.supplier.country')}
                rules={[
                    {
                        max: 25,
                        message: t('messages.too-long')
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={context.scaling.tailedCol}>
                <Form.Item style={{ display: "inline-block", width: 'calc(50% - 2px)' }}>
                    <Button style={{ width: "100%" }}>
                        {t('cancel')}
                    </Button>
                </Form.Item>
                <span> </span>
                <Form.Item style={{ display: "inline-block", width: 'calc(50% - 2px)' }}>
                    <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
                        {t('save')}
                    </Button>
                </Form.Item>
            </Form.Item>
        </Form>
    )



    const content = (
        <div>
            {!context.data.suppliers ? <NoData /> : ''}
        </div>
    )

    

    return(
        <div>
            <Row justify="space-between" style={{ marginTop: 25 }}>
                <Col>
                    <h1 className="my-page-title">{t(`data.suppliers`)}</h1>
                </Col>
                <Col>
                    <Button 
                        className="success-button"
                        type="primary"
                        size="large"
                        onClick={() => setState({...state, form: true})}
                    >
                        {t('create-new')}
                    </Button>
                </Col>
            </Row>

            {state.form ? newSupForm : content}
        </div>
    )
}
export default Suppliers;