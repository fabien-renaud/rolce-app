import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {ContractMetadata} from 'features/contractMetadata';

type ContractListProps = {
    contractMetadata: ContractMetadata[];
    defaultReference?: string;
};

const ContractList = (props: ContractListProps) => {
    const {contractMetadata, defaultReference} = props;

    return (
        <Menu mode="vertical" theme="light" defaultSelectedKeys={[defaultReference ?? '']}>
            {contractMetadata.map((metadata) => {
                const {reference, name} = metadata;
                return (
                    <>
                        <Menu.Item key={reference}>
                            <Link to={`/contracts/${reference}`}>
                                <span>{reference}</span>
                                <p>{name}</p>
                            </Link>
                        </Menu.Item>
                        <Menu.Divider />
                    </>
                );
            })}
        </Menu>
    );
};

export default ContractList;
