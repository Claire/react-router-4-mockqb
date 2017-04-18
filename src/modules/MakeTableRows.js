import React from 'react';
import _ from 'lodash';
import Chance from 'chance';
import {Link} from 'react-router-dom';
let chance = new Chance();

function handleLinkTo(theHistory, prefix, stateProps) {
    theHistory.push(`${prefix}`, stateProps);
}

function getRows(theHistory, prefix, recordLinks, numRows, stateProps) {
    let tableRows =  _.map(_.range(numRows), (id) => {
        let first = chance.first();
        let last = chance.last();
        let target =  prefix + '/' + recordLinks  + id;
        return (
            <tr style={{paddingTop:0, paddingLeft:10}} key={id} onClick={() => handleLinkTo(theHistory, target, stateProps)}>
                {/*<Link to={target}> */}
                <td>{first}</td>
                <td>{last}</td>
                <td><Link to={target}>{id}</Link></td>
                {/*</Link>*/}
            </tr>);
    });
    return tableRows;
}
export default getRows;
