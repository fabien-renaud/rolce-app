import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Contract, Search} from './pages';
import './App.less';
import {RightModal} from './components';

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/contracts/:reference" component={Contract} />
                    <Route path="/contracts" component={Contract} />
                    <Route path="/search" component={Search} />
                    <Redirect to={{pathname: '/contracts'}} />
                </Switch>
            </Router>
            <RightModal visible />
        </>
    );
};

export default App;
