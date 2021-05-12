import {Link, useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import {ProjectOutlined, SearchOutlined} from '@ant-design/icons';

const Sidebar = () => {
    const location = useLocation();
    const route: string = /^(?<route>\/\w+)/.exec(location.pathname)?.groups?.route ?? '';
    const menuItems = [
        {
            text: 'Contrats',
            href: '/contracts',
            icon: <ProjectOutlined />
        },
        {
            text: 'Rechercher',
            href: '/search',
            icon: <SearchOutlined />
        }
    ];

    return (
        <Menu mode="inline" theme="light" defaultSelectedKeys={[route]}>
            {menuItems.map(({text, href, icon}) => (
                <Menu.Item icon={icon} key={href}>
                    <Link to={href}>{text}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default Sidebar;
