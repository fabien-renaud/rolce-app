import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from '@material-ui/core';
import App from './App';
import {themeLight} from './utils';

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={themeLight}>
            <App />
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
