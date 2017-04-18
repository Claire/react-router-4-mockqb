import React from 'react';

export default React.createClass({
    render() {
        return (
      <div>
        <h2>OtherPage </h2>
        <div>{this.props.location.pathname}</div>
      </div>
        );
    }
});
