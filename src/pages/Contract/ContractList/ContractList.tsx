import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {useContractMetadata} from '../../../features/contractMetadata/useContractMetadata';

const ContractList = () => {
    const {contractMetadata} = useContractMetadata();

    return (
        <Menu mode="vertical" theme="light">
            {contractMetadata.map((metadata) => {
                const {reference, name} = metadata;
                return (
                    <>
                        <Menu.Item>
                            <Link to={`/contract/${reference}`} key={reference}>
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
