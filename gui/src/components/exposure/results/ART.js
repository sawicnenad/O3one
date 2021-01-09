import { Descriptions, Tabs } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';


const { TabPane } = Tabs;

/*
    ART exposure results
    (not risk results)
*/
function ART(props) {
    const { t } = useTranslation();
    const values = props.values;
    const data = {
        p50: 5
    }

    return(
        <div>
            <Tabs defaultActiveKey="basic" type="card">
                <TabPane 
                    key="basic"
                    tab={t('exposure.assessment.results.tabs.basic')}
                >
                    <Descriptions title="Exposure results">
                        <Descriptions.Item label="Median">5.02</Descriptions.Item>
                    </Descriptions>
                </TabPane>

                <TabPane
                    key="regulatory"
                    tab={t('exposure.assessment.results.tabs.regulatory')}
                >
                    test
                </TabPane>

                <TabPane 
                    key="scientific"
                    tab={t('exposure.assessment.results.tabs.scientific')}
                >
                    test
                </TabPane>
            </Tabs>
        </div>
    )
}
export default ART;