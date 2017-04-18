import React from 'react';

export default React.createClass({
    render() {
        let x = (JSON.stringify(this.props.match.params) === "{}") ? "" : ("match.params " + JSON.stringify(this.props.match.params));
        let currentR = this.props.match.params.rptId ?
            <div>This is the report id #{this.props.match.params.rptId} data</div> :
            "";
        return (
      <div>
          <hr/>In Report component {this.props.myLocalProp}
        <h2>Report {x}</h2>
        {currentR}
        User: {this.props.user}
      </div>
        );
    }
});
