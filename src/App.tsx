import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {CssBaseline} from '@material-ui/core';
import {Contract, Search} from './pages';
import './App.scss';

const App = () => {
    return (
        <>
            <Router>
                <main role="main">
                    <Switch>
                        <Route path="/contract" component={Contract} />
                        <Route path="/search" component={Search} />
                        <Redirect to={{pathname: '/contract'}} />
                    </Switch>
                </main>
            </Router>
            <CssBaseline />
        </>
    );
};

export default App;
