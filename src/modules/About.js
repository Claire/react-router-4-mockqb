import React from 'react';

export default React.createClass({
    render() {
        let curProps = JSON.stringify(this.props, null, 2);

        return <div>
            <h3>About</h3>
            <div>about props is: <pre><code>{curProps}</code></pre>
            </div>
    </div>;
    }
});
