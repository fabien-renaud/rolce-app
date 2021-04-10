import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Contract, Search} from './pages';
import './App.scss';

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/contract" component={Contract} />
                    <Route path="/search" component={Search} />
                    <Redirect to={{pathname: '/contract'}} />
                </Switch>
            </Router>
        </>
    );
};

export default App;
