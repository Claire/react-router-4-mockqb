import React from 'react';
import Chance from 'chance';
import _ from 'lodash';
import Record from './Record';
import RouteWithSubroutes from './RouteWithSubroutes';
import {Route, withRouter} from 'react-router-dom';
import ReportTable from "./ReportTable";
import DrawerRecord from "./DrawerRecord";

let chance = new Chance();

// let reportSubRoutes = [
//     {
//         path: '/app-table/report/:rptId/record/:recId',
//         component: withRouter(Record),
//         props:  {header: 'Record'}
//     },
//     {
//         path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:childRec',
//         exact: true,
//         component: withRouter(DrawerRecord),
//         props: {
//             header: 'traversing relationship records',
//             recordLinks: 'record/'
//         },
//         routes: [
//             {
//                 //path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:priorChildRec/nestChild_:childRec',
//                 path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
//                 component: withRouter(DrawerRecord),
//                 exact: true,
//                 props: {
//                     header: 'traversing relationship records deeper',
//                     recordLinks: 'record/'
//                 }
//             }
//         ]
//     }
// ];

const Report = React.createClass({

    render() {
        console.count("Report called for match:" + JSON.stringify(this.props.match));

        let theHistory = this.props.history;

        let content = (<div className="report"><h3>Report no report specifed</h3></div>);
        if (_.has(this.props.match.params, 'rptId')) {
            let state = _.get(this.props.location, 'state');
            let reportName = "Report-" + chance.first({gender:'female'});
            if (state) {
                if (typeof state === 'string') {
                    reportName = state;
                } else if (_.has(state.parentReportName)) {
                    reportName = state.parentReportName;
                }
            }
            let prefix = `${this.props.location.pathname}`;
            content = (
                    <div className="report">
                        <hr/>
                        <h3>Report {this.props.match.params.rptId}</h3>
                        <div>This is the report id #{this.props.match.params.rptId}'s data</div>
                        <dl>
                           <dt>Date:</dt>
                            <dd>{this.props.date.toString()}</dd>
                        </dl>
                        <div>
                            {this.props.routes.map((route, i) => {
                                route.props = Object.assign({}, {
                                    numChildTableRecs: chance.integer({min:1, max:25}),
                                    parentReportName : reportName,
                                    reportName : reportName,
                                    theHistory : theHistory,
                                    prefix : prefix,
                                    numChildRecs : this.props.numChildRecs,
                                    parentProps:this.props
                                }, route.props);
                                return (<div key={i}>{/*`<RouteWithSubroutes key=${i} ${route.path} />:`*/}
                                    <RouteWithSubroutes  key={i} {...route} /></div>);
                            })}
                        </div>
                    </div>
            );
        }
        return content;
    }
});
export default Report;
