import {ReactNode} from 'react';
import {Layout} from 'antd';
import {Header} from '../Header';
import {Sidebar} from '../Sidebar';

type BasicLayoutProps = {
    children: ReactNode;
};

const BasicLayout = (props: BasicLayoutProps) => {
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

export default BasicLayout;
