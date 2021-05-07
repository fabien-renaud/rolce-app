import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ConfigProvider} from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import {Contract, Search} from './pages';
import './App.less';
import Modal from './components/Modal/Modal';
import {RightForm} from './pages/Right';

const App = () => {
    return (
        <ConfigProvider locale={frFR}>
            <Modal cancelText="Annuler" okText="Valider" title="Création de droits" visible>
                <RightForm />
            </Modal>
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
