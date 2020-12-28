import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Exposure from './views/Exposure';
import './styling/app.css';
import Navigation from './components/Navigation';
import { Layout } from 'antd';

function App() {

    const { Header, Content } = Layout;

    return(
        <Suspense fallback="loading">
            <BrowserRouter>

                <Layout>
                    <Header>
                        <Navigation />
                    </Header>
                    
                    <Content style={{ minHeight: "90vh" }}>
                        <Switch>
                            <Route path="/exposure/$" component={Exposure} />
                        </Switch>
                    </Content>
                </Layout>

            </BrowserRouter>
        </Suspense>
    );
}
export default App;
