import React from 'react';
import {Route, Switch} from 'react-router-dom';
import getRows from './MakeTableRows';
import _ from 'lodash';
import Chance from 'chance';
let chance = new Chance();
import RouteWithSubroutes from './RouteWithSubroutes';


const Drawer = ({back, children, title}) => {
    return (
        <div
            onClick={back}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.15)'
            }}
        >
            <div className="modal" style={{
                position: 'absolute',
                background: '#fff',
                top: 25,
                left: '10%',
                right: '10%',
                padding: 15,
                border: '2px solid #444'
            }}>
                <h1>{title}</h1>
                {children}
                <button type="button" onClick={back}>
                    Close
                </button>
            </div>
        </div>
    );
};

const DrawerRecord = React.createClass({
    render() {
        let {match, history: theHistory, location} = this.props;
        console.count("DrawerRecord called for match:" + JSON.stringify(match));
        let reportName = match.params.reportName;
        let numChildTableRecs = this.props.numChildTableRecs;
        let prefix = `${location.pathname}`;
        let recordLinks = 'nestChild_';
        let parentReportName = _.get(location.state, 'parentReportName', 'Millie');
        let histprops = {parentMatch:this.props.match, parentLocation:this.props.location, parentReportName:reportName};

        const back = (e) => {
            e.stopPropagation();
            this.props.history.goBack();
        };
        console.log('match = ' + JSON.stringify(this.match));

        let title = `Record ${match.params.childRec} of report named: ${match.params.childTable} parent: ${parentReportName} ${match.params.recId}`;
        return (
            <Drawer back={back} title={title}>
                <div className="record">
                    <hr/>
                    <p>Name: {chance.name()}</p>
                    <p>Age : {chance.age()}</p>
                    <p>Notes: {chance.paragraph()}</p>
                    <h4>Drawer Child Table {reportName} </h4>
                    <table>
                        <tbody>
                        <tr style={{paddingTop: 0, paddingLeft: 10}}>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>id</th>
                        </tr>
                        {getRows(theHistory, prefix, recordLinks, numChildTableRecs, histprops)}
                        </tbody>
                    </table>
            {/*
                    <Switch>
                        <Route exact path={`${match.url}/nestChild_:id`} location={{state:{reportName:reportName}}} component={DrawerRecord}/>
                         <Route path="*\/nestChild_:id" location={{state:{reportName:reportName}}} component={DrawerRecord}/>
                    </Switch>
            */}
                    {this.props.routes.map((route, i) => {
                        route.props = Object.assign({}, {
                            numChildTableRecs: chance.integer({min:1, max:25}),
                            parentReportName : reportName,
                        }, route.props);
                        return (<div key={i}>{/*`<RouteWithSubroutes key=${i} ${route.path} />:`*/}
                            <RouteWithSubroutes  key={i} {...route} /></div>);
                    })}
                </div>
            </Drawer>
        );
    }
});
export default DrawerRecord;
