import {Layout} from 'antd';
import {BasicLayout} from '../../components';
import {ContractFilter} from './ContractFilter';
import {ContractList} from './ContractList';
import {ContractContent} from './ContractContent';

const Contract = () => {
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
