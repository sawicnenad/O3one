import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Assessment from '../components/exposure/Assessment';
import ExposureSituation from '../components/exposure/ExposureSituation';
import Overview from '../components/exposure/Overview';

/*
    Exposure view
    Calculation of exposure using different models:
    * Advanced REACH Tool
    * Stoffenmanager
    * ECETOC TRAv3
    * O3-protect
    
    Exposure input parameters - numeric/select fields
    split into different groups:
    * General - name, date, additional information of exposure situation
    * Substance properties
    * Activity task (for ART easy switch between different tasks)
    * Controls
    * Results - calculated exposure, risk (if substance selected), graph...
*/
function Exposure() {
    const { path } = useRouteMatch();

    return(
        <div>
            <Switch>
                <Route exact path={`${path}`} component={Overview} />
                <Route exact path={`${path}/exposure-situation/:id`} component={ExposureSituation} />
                <Route exact path={`${path}/exposure-situation/:id/:model`} component={Assessment} />
            </Switch>
        </div>
    )
}
export default Exposure;