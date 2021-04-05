import {Link} from 'react-router-dom';
import {Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from '@material-ui/core';
import {Book, Search} from '@material-ui/icons';
import './Sidebar.scss';

const Sidebar = () => {
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
        <Drawer className="sidebar" variant="permanent">
            <Toolbar className="toolbar" />
            <List className="sidebar-items">
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
    );
};

export default Sidebar;
