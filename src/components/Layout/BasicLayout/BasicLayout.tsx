import {ReactNode} from 'react';
import {Header} from '../../Header';
import {Sidebar} from '../../Sidebar';
import './BasicLayout.scss';

type BasicLayoutProps = {
    children: ReactNode;
};

const BasicLayout = (props: BasicLayoutProps) => {
    const {children} = props;

    return (
        <div id="root">
            <Header />
            <Sidebar />
            <div className="content">{children}</div>
        </div>
    );
};

export default BasicLayout;
