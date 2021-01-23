import React, { useContext, useState } from 'react';
import {useTranslation} from 'react-i18next';
import {
    Row,
    Col,
    Statistic
} from 'antd';
import Suppliers from '../components/data/Suppliers';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Context } from '../context/Context';
import WhileLoading from '../components/WhileLoading';





// Data view linking to chemical products, suppliers ...etc
function Data(){

    const [ state, setState ] = useState({dataLink: 'suppliers'});
    const { t } = useTranslation();
    const { url, path } = useRouteMatch();
    const context = useContext(Context);



    // while loading -> spin
    if (!context.data.loaded) {
        return <WhileLoading />;
    }


    // data: suppliers, substances, mixtures, workplaces
    const dataLinks = ['suppliers', 'substances', 'mixtures', 'workplaces'];

    return(
        <div>
            <Row gutter="12">{
                dataLinks.map(
                    item => (
                        <Col key={item} span="6">
                            <Link to={`${url}/${item}`}>
                                <div
                                    style={{ padding: "0px 10px", backgroundColor: "white" }}
                                    onClick={() => setState({...state, dataLink: item})}
                                    className={
                                        state.dataLink === item 
                                        ? "div-as-button div-as-button-active" 
                                        : "div-as-button"
                                    }
                                > 
                                    <Statistic 
                                        title={t(`data.${item}`)} 
                                        value={Math.round(Math.random()*10)}
                                        suffix="/10"
                                    />
                                </div>
                            </Link>
                        </Col>
                    )
                )
            }</Row>


            <Switch>
                <Route exact path={`${path}/suppliers`} component={Suppliers} />
            </Switch>
        </div>
    )
}
export default Data;