import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import {Contract, Search} from './pages';
import './App.less';
import {RightForm} from './pages/Right';
import {FormDrawer} from './components/FormDrawer';

const App = () => {
    return (
        <ConfigProvider locale={frFR}>
            <FormDrawer cancelText="Annuler" submitText="Valider" title="Création de droits" visible onCancel={() => {}} onSubmit={() => {}}>
                <RightForm contract={{reference: 'id', name: 'contract'}} />
            </FormDrawer>
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
