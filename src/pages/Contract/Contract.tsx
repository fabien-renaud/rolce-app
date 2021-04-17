import {useEffect, useMemo} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {EntityId} from '@reduxjs/toolkit';
import {Layout} from 'antd';
import {useContractMetadata} from '../../features/contractMetadata/useContractMetadata';
import {useContracts} from '../../features/contracts/useContracts';
import {BasicLayout} from '../../components';
import {ContractFilter} from './ContractFilter';
import {ContractList} from './ContractList';
import {ContractContent} from './ContractContent';

type ContractParams = {
    reference?: string;
};

const Contract = () => {
    const {reference} = useParams<ContractParams>();
    const {contractMetadata, contractMetadataIds, fetchContractMetadata} = useContractMetadata();
    const {selectedContract, fetchContract} = useContracts(reference as EntityId);

    // Fetch contract at page loading
    useEffect(() => {
        fetchContractMetadata();
    }, []);

    // Fetch contract content when a new reference is given
    useEffect(() => {
        if (reference) fetchContract();
    }, [reference]);

    // Redirect to the first contract of the list if no reference is given
    const redirectIfNoReference = useMemo(() => {
        return !reference && contractMetadataIds.length > 0 ? <Redirect to={`/contracts/${contractMetadataIds[0]}`} /> : null;
    }, [reference, contractMetadataIds]);

    return (
        <>
            {redirectIfNoReference}
            <BasicLayout>
                <section>
                    <Layout>
                        <Layout.Header>
                            <ContractFilter />
                        </Layout.Header>
                        <Layout>
                            <Layout.Sider width={300}>
                                <ContractList contractMetadata={contractMetadata} />
                            </Layout.Sider>
                            <Layout.Content>
                                <ContractContent contract={selectedContract} />
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </section>
            </BasicLayout>
        </>
    );
};

export default Contract;
