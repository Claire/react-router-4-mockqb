import React from 'react';
import {Router} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import RouteWithSubroutes from './modules/RouteWithSubroutes';
import routes from './modules/routes';
import history from './history';
let App = () => (
    <div>
        <Router history={history}>
            <div className="app">
                <h1>Spike on route navigation relationships</h1>
                <ul role="doc-toc">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/app-table">AppX tableY</NavLink></li>
                    <li><NavLink to="/app-table/report/1">AppX tableY Report 1</NavLink></li>
                    {/*
                    <li><NavLink to="/app-table/OtherPage">OtherPage</NavLink></li>
                    <li><NavLink to="/app-table/facebook/react">React</NavLink></li>
                    <li><NavLink to="/app-table/Builder">Builder</NavLink></li>
                    <li><NavLink to="/app-table/report/2">Report 2</NavLink></li>
                    <li><NavLink to="/app-table/report/3">Report 3</NavLink></li>
                    <li><NavLink to="/app-table/report/14">Report 14</NavLink></li>
                    <li><NavLink to="/app-table/report/5">Report 5</NavLink></li>
                    <li><NavLink to="/app-table/report/test/claire/">Claire</NavLink></li>
                    <li><NavLink to="/app-table/report/test/claire/nest/other">other</NavLink></li>
                    <li><NavLink to="/app-table/report/test/claire/nest/other/nest/final">Final</NavLink></li>
                    */}
                </ul>
                {routes.map((route, i) => (
                    <RouteWithSubroutes key={i} {...route} />
                    )
                )}
            </div>
        </Router>
    </div>
);

export default App;
