
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Collapse,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space 
} from 'antd';
import { useTranslation } from 'react-i18next';
import { CalculatorOutlined, SaveOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';


/*
    This component will be shared by different exposure models
    Different models use different JSON files containing field data
    JSON is actually a list of fields' details (e.g. labels, names etc.)
    Every field is then generated in function 'OneField'
    Following each change of values for a field, the change is stored
    in 'data' using 'setData' as a React state
*/

function Assessment() {

    // data is in format {field: value}
    const [ state, setState ] = useState({});
    const [ data, setData ] = useState({});
    const [ visibility, setVisibility ] = useState([]);
    const { t } = useTranslation();
    const model = 'stoffenmanager';
    const myjson = require(`../../json/exposure/${model}.json`);


    const { Option, OptGroup } = Select;
    const { Panel } = Collapse;



    // some fields must be shown in initial state
    // e.g. physical form must be always displayed
    // other fields, e.g. dustiness, is only displayed
    // if specific values are selected for others
    useEffect(() => {
        // initially default fields must be displayed
        // those with visible: default in JSON
        let initial = myjson.map(
            field => field.visible === 'default' ? field.name : null
        )
        initial = initial.filter(o => o !== null);

        // on change of values in data
        for (let i in myjson) {
            let field = myjson[i];
            let visible = true;
            let conditions = field.conditions;

            // if no conditions
            if (!conditions) continue;
            
            for (let c in conditions) {
                let condition = conditions[c];
                if (!eval(condition)) visible = false;
            }

            // if all conditions fulfilled
            if (visible) {
                initial.push(field.name);
            }
        }

        setVisibility(initial);
    }, [data])





    // because one field may have different types
    // elegant way to do it is using switch 
    // fields are split into several panels (of collapse - antd component)
    const OneField = (item) => {
        let options = item.options;

        switch(item.type) {
            // select and select fields with a list of options defined by value of another field
            // below 'link' is the name of field that dictates the list of options
            // if link is unknown from JSON, the field is treated as a simple select field
            case "select":
                
                const link = item.link;      // get value of the linked field

                if (link) {
                    const linkVal = data[link];  // using it, we filter options 
                    options = linkVal ? item.options[linkVal] : [];
                }

                // if field empty no need to display it
                // this usually corresponds the initial state
                if (options.length === 0) {
                    return (
                        <Alert 
                            showIcon
                            type="warning"
                            message={t('exposure.assessment.alerts.field-no-option')}
                        />
                    )
                }

                return (
                    <Select>
                        {
                            options.map(
                                option => (
                                    option.options ?

                                    <OptGroup
                                        key={option.value}
                                        value={option.value}
                                        label={t(option.label)}
                                    >
                                        {
                                            option.options.map(
                                                item => (
                                                    <Option key={item.value} value={item.value}>
                                                        { t(item.label) }
                                                    </Option>
                                                )
                                            )
                                        }
                                    </OptGroup>

                                    : <Option key={option.value} value={option.value}>
                                        { t(option.label) }
                                    </Option>
                                )
                            )
                        }
                    </Select>
                );
            
            // input but accepting numbers only
            case "numeric":
                /*parser={item.unit ? value => value.replace(item.unit, ''): false}
                        formatter={item.unit ? value => `${value}${item.unit}`: false}*/
                return (
                    <Space align="center">
                        <InputNumber {...item.props}/>
                        <span style={{ color: "#595959"}}>
                            {item.unit}
                        </span>
                    </Space>
                )
            // radio buttons
            case "radio":
                return(
                    <Radio.Group>
                        {
                            options.map(
                                option => (
                                    <Radio key={option.value} value={option.value}>
                                        {t(option.label)}
                                    </Radio>
                                )
                            )
                        }
                    </Radio.Group>
                )
            // checkbox
            case "checkbox":
                return(
                    <Checkbox>{t(item.label)}</Checkbox>
                )
            // default is simple textual input
            default:
                return(<Input />);
        }
    }
    






    // panels of collaps
    // this is what is used for REACH models: ART, Stoffenmanager and ECETOC TRA
    // but may differ for others (e.g. if physical-chemical are considered)
    const panels = ['product', 'activity', 'controls', 'results'];


    // important to set checkbox values to false on initial state
    // otherwise on submit validation error
    const initialValues = {};
    for (let i = 0; i < myjson.length; i++) {
        if (myjson[i].type === 'checkbox') {
            initialValues[ myjson[i].name ] = false;
        }
    }


    return(
        <div>
            <Form 
                onValuesChange={(_, values) => setData(values)}
                labelCol={{ md: {span: 4} }}
                wrapperCol={{ md: {span: 16} }}
                onFinish={values => console.log(values)}
                initialValues={initialValues}
                scrollToFirstError
                onFinishFailed={() => setState({ failedToSubmit: true })}
            >
                <Form.Item
                    key="controls"
                    style={{ textAlign: "right" }}
                    wrapperCol={{ span: 24 }}
                >
                    <Space>
                        <Button 
                            shape="round" size="large"
                            onClick={() => console.log("cancel")}
                        >
                            {t('cancel')}
                        </Button>
                        <Button 
                            type="primary" className="success-button"
                            shape="round" size="large" htmlType="submit"
                            onClick={() => console.log("save")}
                        >
                            <SaveOutlined /> {t('save')}
                        </Button>
                    </Space>
                </Form.Item>

                <Collapse
                    defaultActiveKey={['product', 'activity', 'controls']}
                >{ 
                    panels.map(
                        panel => (
                            <Panel
                                key={panel}
                                header={ <Space>
                                    { panel === 'results' ? <CalculatorOutlined /> : '' }
                                    <span>{ t(`exposure.assessment.var-groups.${panel}`) }</span>
                                </Space>}
                            >
                                {require(`../../json/exposure/${model}.json`).map(
                                    item => (
                                        item.group === panel && visibility.includes(item.name) ?
                                        <Form.Item
                                            key={item.name}
                                            name={item.name}
                                            label={item.type === 'checkbox' ? "" : t(item.label)}
                                            wrapperCol={
                                                item.type === 'checkbox' ? 
                                                    { md: { offset: 4 } } : ''
                                                }
                                            {...item.props}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('messages.required-general')
                                                }
                                            ]}
                                        >{ OneField(item) }
                                        </Form.Item> : ""
                                    )
                                )}
                            </Panel>
                        )
                    )
                }</Collapse>
            </Form>
        </div>
    )
}
export default Assessment;