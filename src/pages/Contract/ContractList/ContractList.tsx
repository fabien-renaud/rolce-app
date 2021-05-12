import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import {ContractMetadata} from 'features/contractMetadata';

type ContractListProps = {
    contractMetadata: ContractMetadata[];
    defaultReference?: string;
};

const ContractList = ({contractMetadata, defaultReference}: ContractListProps) => {
    return (
        <Menu mode="inline" theme="light" defaultSelectedKeys={[defaultReference ?? '']}>
            {contractMetadata.map(({reference, name}) => {
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
