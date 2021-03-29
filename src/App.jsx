import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Home} from './pages';
import './App.scss';

const App = () => {
    return (
        <Router>
            <main role="main">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Redirect to={{pathname: '/'}} />
                </Switch>
            </main>
        </Router>
    );
};

export default App;
