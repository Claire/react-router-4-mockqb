import React from 'react';
import {withRouter} from 'react-router-dom';
import Chance from 'chance';
let chance = new Chance();
import RouteWithSubroutes from './RouteWithSubroutes';
// import DrawerRecord from "./DrawerRecord";
import getRows from './MakeTableRows';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let recordSubRoutes = [
/*    {
        path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:childRec',
        component: withRouter(DrawerRecord),
        exact: true,
        props:  {header: 'Record'},
        // routes: [
        //     {
        //         path:'app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
        //         component: withRouter(DrawerRecord),
        //         props:  {
        //             header: 'traversing relationship records',
        //             recordLinks: 'record/'
        //         }
        //     },
        // ]
    },*/ /*{
        path: '/app-table/report/:rptId/record/:recId/navChild_:childTable/:prevChildRec/:nestChild_childRec*!/nestChild_:childRec',
        component: withRouter(DrawerRecord),
        exact: true,
        props:  {header: 'Child of Child Record'},
    }*/
];


let withTransition = (Component) => {
    const C = (props) => (
    <ReactCSSTransitionGroup
        transitionName="slidyrighty"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
    >
            <Component {...props} />
    </ReactCSSTransitionGroup>
    );

    C.displayName = `withTransition(${Component.displayName || Component.name})`;

    return C;
};



export default React.createClass({

    render() {
        let {recId, rptId} = this.props.match.params;
        console.count("ReCord called for match:" + JSON.stringify(this.props.match));

        let {history: theHistory, parentReportName} = this.props;
        let prefix = `${this.props.location.pathname}`;
        let childTableReportName = chance.first({gender:"male"});
        let histprops = {parentMatch:this.props.match, parentLocation:this.props.location, parentReportName:parentReportName};
        return (
            <div className="record">
            <hr/>
                <h3>Record {recId} of report #{rptId} named: {parentReportName}</h3>
                <p>Name: {chance.name()}</p>
                <p>Age : {chance.age()}</p>
                <p>Notes: {chance.paragraph()}</p>
                { this.props.numChildTableRecs ? (
                    <div>
                        <h4>Child Table {childTableReportName} </h4>
                        <h5> {this.props.numChildTableRecs} records</h5>
                        <h5>parent table: {parentReportName} </h5>
                        <table>
                            <tbody>
                                <tr style={{paddingTop: 0, paddingLeft: 10}}>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>id</th>
                                </tr>
                            {getRows(theHistory, prefix, "navChild_" + childTableReportName + "/", this.props.numChildTableRecs, histprops)}
                            </tbody>
                        </table>
{
                        this.props.routes.map((route, i) => {
                            route.props = Object.assign({}, {
                                numChildTableRecs: chance.integer({min:4, max:8}),
                                parentReportName : parentReportName,
                            }, route.props);
                            route.component = withTransition(route.component);
                            return (
                                <div key={i}>
                                    {<RouteWithSubroutes key={i} {...route} />}
                                </div>
                            );
                        })
}
                    </div>
                    ) : null}
            </div>
        );
    }
});
