import {AppBar, Toolbar, Typography} from '@material-ui/core';
import './Header.scss';

const Header = () => {
    return (
        <AppBar id="appbar" position="fixed" color="secondary">
            <Toolbar className="toolbar">
                <Typography variant="h6">Rolce</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
