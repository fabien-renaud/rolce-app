import {Header} from '../../Header';
import {Sidebar} from '../../Sidebar';
import './BasicLayout.scss';

const BasicLayout = (props) => {
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
