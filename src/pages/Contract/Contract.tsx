import {useEffect} from 'react';
import {Layout} from 'antd';
import {BasicLayout} from '../../components';
import {ContractFilter} from './ContractFilter';
import {ContractList} from './ContractList';
import {ContractContent} from './ContractContent';
import {useContract} from '../../features/contract/useContract';

const Contract = () => {
    const {fetchContractsMeta} = useContract();

    useEffect(() => {
        fetchContractsMeta();
    }, []);

    return (
        <BasicLayout>
            <section>
                <Layout>
                    <Layout.Header>
                        <ContractFilter />
                    </Layout.Header>
                    <Layout>
                        <Layout.Sider width={300}>
                            <ContractList />
                        </Layout.Sider>
                        <Layout.Content>
                            <ContractContent />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </section>
        </BasicLayout>
    );
};

export default Contract;
