'use strict';

var { Route, DefaultRoute, NotFoundRoute } = require('react-router');

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="home" handler={Home}/>
        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound} />
    </Route>
);

class NotFound extends React.Component {
    constructor (props) {
        super(props);
    }
    
    render () {
        return (
            <div>
                <h1>404 Not Found</h1>
            </div>
        );
    }
}


export default routes;