import React from 'react';
import {Route as MyRoute} from 'react-router-dom';
import _ from 'lodash';

const RouteWithSubroutes = (routeConfig) => {
    let exact = _.get(routeConfig, 'exact', false) ? {exact:true} : {};
    return (

            <MyRoute path={routeConfig.path} {...exact} location={routeConfig.location}
                   render={props => {
                        // pass the sub-routes down to keep nesting
                        // props is passed to all routes (history, location, match),
                       return <routeConfig.component {...props} {...routeConfig.props} routes={routeConfig.routes}/>;
                   }}
            />);
};

export default RouteWithSubroutes;

