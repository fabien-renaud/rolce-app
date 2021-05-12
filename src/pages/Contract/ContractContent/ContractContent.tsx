import {Link} from 'react-router-dom';
import {Empty, PageHeader, Spin, Typography} from 'antd';
import React, {useEffect} from 'react';
import {EntityId} from '@reduxjs/toolkit';
import {ContractDetail} from './ContractDetail';
import {ContractRights} from './ContractRights';
import {useContracts} from '../../../features/contracts';

type ContractContentProps = {
    contractRef: EntityId;
};

const ContractContent = ({contractRef}: ContractContentProps) => {
    const {loading, selectedContract: contract, fetchContract} = useContracts(contractRef);

    useEffect(() => {
        fetchContract();
    }, [contractRef]);

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

    if (contract) {
        return (
            <>
                <PageHeader
                    title={<Typography>{`[${contract.reference}] ${contract.name}`}</Typography>}
                    avatar={{src: 'https://avatars.githubusercontent.com/u/23161632?v=4'}}
                    breadcrumb={breadcrumb}
                />
                <ContractDetail contract={contract} />
                <ContractRights contract={contract} />
            </>
        );
    }
    return loading ? (
        <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Spin size="large" />
        </div>
    ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />
    );
};

export default ContractContent;
