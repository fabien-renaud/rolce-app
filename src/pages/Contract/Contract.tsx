import {useEffect, useMemo} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {Layout} from 'antd';
import {useContractMetadata} from 'features/contractMetadata';
import {FilterLayout} from 'components';
import {EntityId} from '@reduxjs/toolkit';
import {ContractFilter} from './ContractFilter';
import {ContractList} from './ContractList';
import {ContractContent} from './ContractContent';

type ContractParams = {
    reference?: string;
};

const Contract = () => {
    const {reference} = useParams<ContractParams>();
    const {contractMetadata, contractMetadataIds, fetchContractMetadata} = useContractMetadata();

    // Fetch contract at page loading
    useEffect(() => {
        fetchContractMetadata(undefined, undefined, ['reference', 'name', 'account(name)'], [], [{key: 'name', value: 'asc'}]);
    }, []);

    // Redirect to the first contract of the list if no reference is given
    const redirectIfNoReference = useMemo(() => {
        return !reference && contractMetadataIds.length > 0 ? <Redirect to={`/contracts/${contractMetadataIds[0]}`} /> : null;
    }, [reference, contractMetadataIds]);

    return (
        <>
            {redirectIfNoReference}
            <FilterLayout>
                <section>
                    <Layout>
                        <Layout.Header>
                            <ContractFilter />
                        </Layout.Header>
                        <Layout>
                            <Layout.Sider width={300} style={{maxHeight: '86vh', overflow: 'auto'}}>
                                <ContractList contractMetadata={contractMetadata} defaultReference={reference} />
                            </Layout.Sider>
                            <Layout.Content>
                                <ContractContent contractRef={reference as EntityId} />
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </section>
            </FilterLayout>
        </>
    );
};

export default Contract;
