import {useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {ConfigProvider, Form} from 'antd';
import frFR from 'antd/lib/locale/fr_FR';
import {Contract, Search} from './pages';
import './App.less';
import {RightForm} from './pages/Right';
import {FormDrawer} from './components/FormDrawer';

type BillingTerm = {
    activityId: string;
    artworkId: string;
    price: number;
};

const App = () => {
    const [visible, setVisible] = useState(true);
    const onCancel = () => setVisible(false);
    const [form] = Form.useForm();

    const onSubmit = () => {
        const price = form.getFieldValue('price');
        const billingTerms: BillingTerm[] = [];
        form.getFieldValue('activities').forEach((activity: string) => {
            form.getFieldValue('artworks').forEach((artwork: string) => {
                billingTerms.push({activityId: activity, artworkId: artwork, price});
            });
        });
        const rightDto = {
            contratId: form.getFieldValue('contract'),
            type: form.getFieldValue('contract'),
            billingTerms,
            beginAt: form.getFieldValue('dateStart'),
            endAt: form.getFieldValue('dateEnd'),
            hasExclusivity: form.getFieldValue('hasExclusivity'),
            languagesId: new Set(form.getFieldValue('languages')),
            naturesId: new Set(form.getFieldValue('languages')),
            territoriesId: new Set(form.getFieldValue('languages'))
        };
        console.log(rightDto);
    };

    return (
        <ConfigProvider locale={frFR}>
            <FormDrawer cancelText="Annuler" submitText="Valider" title="Création de droits" visible={visible} onCancel={onCancel} onSubmit={onSubmit}>
                <RightForm contract={{reference: 'id', name: 'contract'}} form={form} />
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
