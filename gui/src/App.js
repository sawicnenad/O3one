import React, { Suspense } from 'react';
import Exposure from './views/Exposure';


function App() {
    return(
        <Suspense fallback="loading">
            <Exposure />
        </Suspense>
    );
}
export default App;
