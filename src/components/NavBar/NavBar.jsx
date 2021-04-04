import {Link} from 'react-router-dom';
import {AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from '@material-ui/core';
import {Book, Search} from '@material-ui/icons';
import './NavBar.scss';

const NavBar = () => {
    const menuItems = [
        {
            text: 'Contract',
            href: '/contract',
            Icon: Book
        },
        {
            text: 'Search',
            href: '/search',
            Icon: Search
        }
    ];

    return (
        <>
            <AppBar id="appbar" position="fixed" color="secondary">
                <Toolbar className="toolbar">
                    <Typography variant="h6">Rolce</Typography>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer variant="permanent">
                    <Toolbar className="toolbar" />
                    <List id="sidebar">
                        {menuItems.map(({text, href, Icon}) => (
                            <Link to={href} key={text}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText>{text}</ListItemText>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </nav>
        </>
    );
};

export default NavBar;
