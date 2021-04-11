import {Link} from 'react-router-dom';
import {PageHeader} from 'antd';
import {BasicLayout} from '../../components';
import {ContractDetail} from './ContractDetail';
import {ContractRights} from './ContractRights';

const Contract = () => {
    const breadcrumb = {
        itemRender: ({path, breadcrumbName}: any) => <Link to={path}>{breadcrumbName}</Link>,
        routes: [
            {
                path: '/contract/netflix',
                breadcrumbName: 'Netflix'
            },
            {
                path: '/contract/netflix/NET-2878',
                breadcrumbName: 'NET-2878'
            }
        ]
    };

    return (
        <BasicLayout>
            <section>
                <PageHeader
                    title="[NET-2878] Mise à jour de la politique de mot de passe"
                    avatar={{src: 'https://avatars.githubusercontent.com/u/23161632?v=4'}}
                    breadcrumb={breadcrumb}
                />
                <ContractDetail />
                <ContractRights />
            </section>
        </BasicLayout>
    );
};

export default Contract;
