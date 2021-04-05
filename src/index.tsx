import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core';
import App from './App';
import store from './store';
import {themeLight} from './utils';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <MuiThemeProvider theme={themeLight}>
                <App />
            </MuiThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
