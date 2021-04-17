import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {ContractMetadata} from '../../../features/contractMetadata/contractMetadataType';

type ContractListProps = {
    contractMetadata: ContractMetadata[];
};

const ContractList = (props: ContractListProps) => {
    const {contractMetadata} = props;

    return (
        <Menu mode="vertical" theme="light">
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
