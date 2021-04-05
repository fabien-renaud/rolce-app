import {Container} from '@material-ui/core';
import './FilterLayout.scss';

const FilterLayout = (props) => {
    const {children} = props;

    return (
        <>
            <Container className="container">{children}</Container>
        </>
    );
};

export default FilterLayout;
