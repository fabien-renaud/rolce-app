import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import {Contract, Search} from './pages';
import './App.less';

const App = () => {
    return (
        <ConfigProvider locale={frFR}>
            <Router>
                <Switch>
                    <Route path="/contracts/:reference" component={Contract} />
                    <Route path="/contracts" component={Contract} />
                    <Route path="/search" component={Search} />
                    <Redirect to={{pathname: '/contracts'}} />
                </Switch>
            </Router>
        </ConfigProvider>
    );
};

export default App;
