import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Exposure from './views/Exposure';
import './styling/app.css';
import Navigation from './components/Navigation';
import { Layout } from 'antd';
import ApiContextProvider from './context/ApiContext';
import Data from './views/Data';

function App() {

    const { Header, Content } = Layout;

    return(
        <Suspense fallback="loading">
            <ApiContextProvider>
                <BrowserRouter>
                    <Layout className="layout-wrapper" style={{ background: "none" }}>
                        <Header style={{ background: "none"  }}>
                            <Navigation />
                        </Header>
                        
                        <Content 
                            style={{ 
                                minHeight: "90vh",
                                padding: "25px 65px",
                                marginTop: 15,
                                backgroundColor: "white"
                            }}
                        >
                            <Switch>
                                <Route path={`/exposure`} component={Exposure} />
                                <Route path={`/data`} component={Data} />
                            </Switch>
                        </Content>
                    </Layout>

                </BrowserRouter>
            </ApiContextProvider>
        </Suspense>
    );
}
export default App;
