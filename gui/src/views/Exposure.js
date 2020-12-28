import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
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
function Exposure(props) {
    const { t } = useTranslation();

    console.log(props)

    const url = props.location.pathname;
    return(
        <div>
            <Route path={`${location}`} />
        </div>
    )
}
export default Exposure;