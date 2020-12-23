import React, { useState } from 'react';
import { Alert, Collapse, Form, Input, InputNumber, Menu, Select } from 'antd';
import { useTranslation } from 'react-i18next';



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
    const [ data, setData ] = useState({});
    const [ state, setState ] = useState({ menu: "product" });
    const { t } = useTranslation();


    const { Option } = Select;
    const { Panel } = Collapse;


    // because one field may have different types
    // elegant way to do it is using switch 
    // fields are split into several panels (of collapse - antd component)
    const OneField = (item, panel) => {

        switch(item.type) {
            // select and select fields with a list of options defined by value of another field
            // below 'link' is the name of field that dictates the list of options
            // if link is unknown from JSON, the field is treated as a simple select field
            case "select":
                const link = item.link;      // get value of the linked field
                let options = item.options;

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
                                option => 
                                    <Option key={option.value} value={option.value}>
                                        { t(option.label) }
                                    </Option>
                            )
                        }
                    </Select>
                );
            
            // input but accepting numbers only
            case "numeric":
                return (
                    <InputNumber {...item.props}/>
                )
            // default is simple textual input
            default:
                return(<Input />);
        }
    }
    

    // panels of collaps
    const panels = ['product', 'activity', 'controls', 'results'];

    return(
        <div>
            <Form onValuesChange={(chval, allVals) => setData(allVals)}>
                <Collapse defaultActiveKey="product">
                    {panels.map(
                        panel => (
                            <Panel 
                                key={panel}
                                header={ t(`exposure.assessment.var-groups.${panel}`) }
                            >
                                {
                                    require("../../json/exposure/art.json").map(
                                        item => (
                                            item.group === panel ?
                                            (<Form.Item 
                                                key={item.name} 
                                                label={ t(item.label) }
                                                name={item.name}
                                                > { OneField(item, panel) }
                                                </Form.Item>)
                                            : ""
                                        )
                                    )
                                }
                            </Panel>
                        )
                    )}
                </Collapse>
            </Form>
        </div>
    )
}
export default Assessment;