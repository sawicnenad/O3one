import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Exposure from './views/Exposure';


function App() {
    return(
        <Suspense fallback="loading">
            <BrowserRouter>
                <Switch>
                    <Route path="/exposure" component={Exposure} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}
export default App;
