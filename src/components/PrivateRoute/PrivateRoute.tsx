import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = (props) => {
    const {path, component: Component} = props;
    const authenticated = true;

    return <Route path={path} render={() => (authenticated ? <Component /> : <Redirect to={{pathname: '/'}} />)} />;
};

export default PrivateRoute;
