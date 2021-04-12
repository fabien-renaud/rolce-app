import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {ProjectOutlined, SearchOutlined} from '@ant-design/icons';

const Sidebar = () => {
    const menuItems = [
        {
            text: 'Contrats',
            href: '/contract',
            icon: <ProjectOutlined />
        },
        {
            text: 'Rechercher',
            href: '/search',
            icon: <SearchOutlined />
        }
    ];

    return (
        <Menu mode="vertical" theme="light">
            {menuItems.map(({text, href, icon}) => (
                <Menu.Item icon={icon} key={text}>
                    <Link to={href}>{text}</Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default Sidebar;
