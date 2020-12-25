import React from 'react';
import { Form, Input, Checkbox, Divider } from 'antd';
import { useTranslation } from 'react-i18next';


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

    const tailLayout = {
        wrapperCol: {md: {offset: 4}}
    }

    return(
        <div>
            <h1>{t('exposure.es.new-es')}</h1>
            <Form
                labelCol={{ md: { span: 4 }}}
                wrapperCol={{ md: { span: 16 } }}
            >
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

                <Form.Item label={t('exposure.es.description')} name="description">
                    <Input.TextArea />
                </Form.Item>

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
                    <Checkbox>O<sub>3</sub></Checkbox>
                </Form.Item>
            </Form>
        </div>
    )
}
export default ExposureSituation;