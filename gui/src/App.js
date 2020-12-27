import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Exposure from './views/Exposure';
import './styling/app.css';
import Navigation from './components/Navigation';

function App() {

    return(
        <Suspense fallback="loading">
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path="/exposure" component={Exposure} />
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}
export default App;
