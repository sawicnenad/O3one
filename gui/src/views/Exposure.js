import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    return(
        <div>
            <Overview />
        </div>
    )
}
export default Exposure;