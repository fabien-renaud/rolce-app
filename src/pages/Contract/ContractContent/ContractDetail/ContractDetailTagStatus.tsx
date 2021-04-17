import {Tag} from 'antd';
import {ContractStatus} from '../../../../features/contracts/contractType';
import {CONTRACT_STATUS} from '../../../../features/contracts/contractConstants';

type ContractDetailStatusProps = {
    status: ContractStatus;
};

const ContractDetailTagStatus = (props: ContractDetailStatusProps) => {
    const {status} = props;
    switch (status) {
        case CONTRACT_STATUS.INTEREST:
            return <Tag color="magenta">Intérêt</Tag>;
        case CONTRACT_STATUS.IN_PROGRESS:
            return <Tag color="cyan">Négociation</Tag>;
        case CONTRACT_STATUS.SIGNED:
            return <Tag color="lime">Signé</Tag>;
        default:
            return null;
    }
};

export default ContractDetailTagStatus;
