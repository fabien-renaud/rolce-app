import {Link} from 'react-router-dom';
import {PageHeader} from 'antd';
import {ContractDetail} from './ContractDetail';
import {ContractRights} from './ContractRights';

const ContractContent = () => {
    const breadcrumb = {
        itemRender: ({path, breadcrumbName}: any) => <Link to={path}>{breadcrumbName}</Link>,
        routes: [
            {
                path: '/contracts/netflix',
                breadcrumbName: 'Netflix'
            },
            {
                path: '/contracts/netflix/NET-2878',
                breadcrumbName: 'NET-2878'
            }
        ]
    };

    return (
        <>
            <PageHeader
                title="[NET-2878] Mise à jour de la politique de mot de passe"
                avatar={{src: 'https://avatars.githubusercontent.com/u/23161632?v=4'}}
                breadcrumb={breadcrumb}
            />
            <ContractDetail />
            <ContractRights />
        </>
    );
};

export default ContractContent;
