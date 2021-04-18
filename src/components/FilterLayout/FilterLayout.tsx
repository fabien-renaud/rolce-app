import {ReactNode} from 'react';
import {Layout} from 'antd';
import {Header, Sidebar} from 'components';

type FilterLayoutProps = {
    children: ReactNode;
};

const FilterLayout = (props: FilterLayoutProps) => {
    const {children} = props;

    return (
        <Layout>
            <Layout.Header>
                <Header />
            </Layout.Header>
            <Layout>
                <Layout.Sider collapsible theme="light">
                    <Sidebar />
                </Layout.Sider>
                <Layout.Content>{children}</Layout.Content>
            </Layout>
        </Layout>
    );
};

export default FilterLayout;
