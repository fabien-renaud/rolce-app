import {Container} from '@material-ui/core';
import {NavBar} from '../NavBar';
import './BasicLayout.scss';

const BasicLayout = (props) => {
    const {children} = props;

    return (
        <>
            <NavBar />
            <Container className="container">{children}</Container>
        </>
    );
};

export default BasicLayout;
