import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Exposure from './views/Exposure';
import './styling/app.css';
import Navigation from './components/Navigation';
import { Layout } from 'antd';
import ApiContextProvider from './context/ApiContext';

function App() {

    const { Header, Content } = Layout;

    return(
        <Suspense fallback="loading">
            <ApiContextProvider>
                <BrowserRouter>
                    <Layout className="layout-wrapper">
                        <Header style={{ background: "white" }}>
                            <Navigation />
                        </Header>
                        
                        <Content 
                            style={{ 
                                minHeight: "90vh",
                                padding: "25px 65px" 
                            }}
                        >
                            <Switch>
                                <Route path={`/exposure`} component={Exposure} />
                            </Switch>
                        </Content>
                    </Layout>

                </BrowserRouter>
            </ApiContextProvider>
        </Suspense>
    );
}
export default App;
