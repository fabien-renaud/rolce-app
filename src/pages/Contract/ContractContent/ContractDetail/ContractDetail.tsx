import {Col, Collapse, Descriptions, Row, Typography} from 'antd';
import {Contract, CONTRACT_TYPE} from 'features/contracts';
import {dateToDateReadable} from 'utils/date';
import ContractDetailTagStatus from './ContractDetailTagStatus';

type ContractDetailProps = {
    contract: Contract;
};

const ContractDetail = (props: ContractDetailProps) => {
    const {
        contract: {type, status, beginAt, endAt, accountName, comment, createdAt, updatedAt}
    } = props;

    return (
        <Row>
            <Col span={12}>
                <Collapse defaultActiveKey={['detail', 'comment']} ghost>
                    <Collapse.Panel key="detail" header={<Typography.Text strong>Détail</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Statut">
                                <ContractDetailTagStatus status={status} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Date de début">{dateToDateReadable(new Date(beginAt))}</Descriptions.Item>
                            <Descriptions.Item label="Date de fin">{dateToDateReadable(new Date(endAt))}</Descriptions.Item>
                            <Descriptions.Item label="Type">{type === CONTRACT_TYPE.ACQUISITION ? 'Acquisition' : 'Vente'}</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                    <Collapse.Panel key="comment" header={<Typography.Text strong>Commentaire</Typography.Text>}>
                        <Typography.Text>{comment}</Typography.Text>
                    </Collapse.Panel>
                </Collapse>
            </Col>
            <Col span={6}>
                <Collapse defaultActiveKey={['user', 'dates']} ghost>
                    <Collapse.Panel key="user" header={<Typography.Text strong>Utilisateur</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Responsable">{accountName}</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                    <Collapse.Panel key="dates" header={<Typography.Text strong>Dates</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Créé le">{dateToDateReadable(new Date(createdAt))}</Descriptions.Item>
                            <Descriptions.Item label="Mis à jour le">{dateToDateReadable(new Date(updatedAt))}</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export default ContractDetail;
