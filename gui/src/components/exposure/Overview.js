import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';



/*
    Lists all saved exposure situations (i.e. exposure assessment entities)
    End-user creates a new exposure situation
*/
function Overview() {
    const { t } = useTranslation();

    return(
        <div>
            <header>
                <Button>{ t('create-new') }</Button>
            </header>

            <section>
                <div className="es-item">
                    <div 
                        style={{
                            border: "1px solid silver",
                            height: "200px",
                            marginTop: 15
                        }}
                    >
                        <Row style={{ borderBottom: "1px solid silver" }}>
                            <Col span="16">
                                <h3>
                                    Exposure Situation #1
                                </h3>
                            </Col>
                       
                            <Col span="8">
                                <div style={{
                                    textAlign: "right"
                                }}>
                                    <Button>
                                        {t('edit')}
                                    </Button>

                                    <Button>
                                        {t('delete')}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Overview;