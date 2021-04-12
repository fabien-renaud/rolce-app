import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const ContractList = () => {
    const menuItems = [
        {
            id: 'NET-2878',
            text: 'Mise à jour de la politique de mot de passe',
            href: '/contract/netflix/NET-2878'
        },
        {
            id: 'NET-2879',
            text: 'Ajout de la page mes commandes',
            href: '/contract/netflix/NET-2879'
        }
    ];

    return (
        <Menu mode="vertical" theme="light">
            {menuItems.map((menuItem) => {
                const {id, text, href} = menuItem;
                return (
                    <>
                        <Menu.Item>
                            <Link to={href} key={text}>
                                <span>{id}</span>
                                <p>{text}</p>
                            </Link>
                        </Menu.Item>
                        <Menu.Divider />
                    </>
                );
            })}
        </Menu>
    );
};

export default ContractList;
