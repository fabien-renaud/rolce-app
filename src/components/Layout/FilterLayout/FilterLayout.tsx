import {ReactNode} from 'react';
import './FilterLayout.scss';

type BasicLayoutProps = {
    children: ReactNode;
};

const FilterLayout = (props: BasicLayoutProps) => {
    const {children} = props;

    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default FilterLayout;
