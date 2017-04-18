import React from 'react';
import NavNew from './NavNew';

/* doest the flux init stuff */
export default React.createClass({
    render() {
        return (
        <NavNew {...this.props}/>
        );
    }
});
