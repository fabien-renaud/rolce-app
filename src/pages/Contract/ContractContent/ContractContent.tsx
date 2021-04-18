import {Link} from 'react-router-dom';
import {PageHeader, Typography} from 'antd';
import {Contract} from 'features/contracts/contractType';
import {ContractDetail} from './ContractDetail';
import {ContractRights} from './ContractRights';

type ContractContentProps = {
    contract: Contract;
};

const ContractContent = (props: ContractContentProps) => {
    const {contract} = props;

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
                title={<Typography>{`[${contract.reference}] ${contract.name}`}</Typography>}
                avatar={{src: 'https://avatars.githubusercontent.com/u/23161632?v=4'}}
                breadcrumb={breadcrumb}
            />
            <ContractDetail contract={contract} />
            <ContractRights />
        </>
    );
};

export default ContractContent;
