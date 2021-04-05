import {Redirect, Route} from 'react-router-dom';

type BasicLayoutProps = {
    path: string;
    component: any;
};

const PrivateRoute = (props: BasicLayoutProps) => {
    const {path, component: Component} = props;
    const authenticated = true;

    return <Route path={path} render={() => (authenticated ? <Component /> : <Redirect to={{pathname: '/'}} />)} />;
};

export default PrivateRoute;
