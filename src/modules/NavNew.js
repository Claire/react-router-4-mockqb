import React from 'react';
import {withRouter} from 'react-router-dom';
import RouteWithSubroutes from './RouteWithSubroutes';
import Report from './Report';
import Record from './Record';
import Chance from 'chance';
import DrawerRecord from "./DrawerRecord";
let chance = new Chance();

const ReportBuilder = () => (<div>Report Builder</div>);
const ReportBuilderRecord = () => (<div>Report Builder Record</div>);
const maxRecords = 25;
const minRecords = 5;

/*const reportRoutes = [
    {
        path: '/app-table/report/:rptId/record/:recId',
        component: withRouter(Record),
        prop:  {header: 'Record'},
        routes: [
            {
                path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:childRec',
                exact:true,
                component: withRouter(DrawerRecord),
                props:  {
                    header: 'traversing relationship records',
                    recordLinks: 'record/'
                },
                routes: [
                    {
                        path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
                        component: withRouter(DrawerRecord),
                        exact: true,
                        props:  {header: 'Child of Child Record'},
                    }
                ]
            },

        ]
    },
];*/
const repoRoutes =  [
    {
        path: '/app-table/report',
        component: withRouter(Report),
        props:  {header: 'Report default'},
        exact: true
    },
    {
        path: '/app-table/report/:rptId',
        component: withRouter(Report),
        props:  {
            header: 'Table of records',
            recordLinks: 'record/'
        },
        //routes : reportRoutes
    },
    {
        path: '/app-table/builder/:rptId',
        component: ReportBuilder,
        props:  {header: 'Report builder'}
    },
    {
        path: '/app-table/builder/.*/:rptId/record/:recId',
        component: ReportBuilderRecord,
        props:  {header: 'Record'}
    }
];

// report main table
//report has links on each row to child routes which popup new table

export default React.createClass({
    render() {
        let date = new Date();
        return (
              <div className="nav">
                 <div>We are here: {this.props.location.pathname}</div>
                  <div className="mainContent" > <h2>Main Nav content</h2>
                      {this.props.routes.map((route, i) => {
                          let routeProps = Object.assign({}, {
                              numChildRecs: chance.integer({min:minRecords, max:maxRecords}),
                              date: date}, route.props);
                          return (<div key={i}>{/*`<RouteWithSubroutes key=${i} ${route.path} />:`*/}
                          <RouteWithSubroutes key={i} {...route} {...routeProps} /></div>);
                      })}
                  </div>
              </div>
        );
    }
});
