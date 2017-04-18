import React from 'react';
import getRows from './MakeTableRows';

const ReportTable = (props) => (
    <div>
        <h4>Table {props.reportName} </h4>
        <h5> {props.numChildRecs} records</h5>
        <table>
            <tbody>
                <tr style={{paddingTop: 0, paddingLeft: 10}}>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>id</th>
                </tr>
                {getRows(props.theHistory, props.prefix, props.recordLinks, props.numChildRecs, props.reportName, props.parentProps)}
            </tbody>
        </table>
    </div>
);

export default ReportTable;
