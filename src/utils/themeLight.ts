import {createMuiTheme} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';

export const themeLight = createMuiTheme({
    props: {MuiButtonBase: {disableRipple: true}},
    palette: {
        type: 'light',
        primary: {
            light: blue[200],
            main: blue[500],
            dark: blue[800],
            contrastText: '#000'
        },
        secondary: {
            main: '#fff'
        }
    }
});
