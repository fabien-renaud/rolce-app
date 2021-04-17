import {Col, Collapse, Descriptions, Row, Tag, Typography} from 'antd';

const ContractDetail = () => {
    return (
        <Row>
            <Col span={12}>
                <Collapse defaultActiveKey={['detail', 'comment']} ghost>
                    <Collapse.Panel key="detail" header={<Typography.Text strong>Détail</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Statut">
                                <Tag color="cyan">Négociation</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Date de début">01/01/2022</Descriptions.Item>
                            <Descriptions.Item label="Date de fin">31/12/2022</Descriptions.Item>
                            <Descriptions.Item label="Type">Acquisition</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                    <Collapse.Panel key="comment" header={<Typography.Text strong>Commentaire</Typography.Text>}>
                        <Typography.Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum, mauris a tempus ultricies, neque risus pellentesque
                            elit, tincidunt vehicula lorem odio eu nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus at mi ut metus
                            interdum molestie vitae nec sapien. Sed ultrices pharetra lobortis.
                        </Typography.Text>
                    </Collapse.Panel>
                </Collapse>
            </Col>
            <Col span={6}>
                <Collapse defaultActiveKey={['user', 'dates']} ghost>
                    <Collapse.Panel key="user" header={<Typography.Text strong>Utilisateur</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Responsable">Fabien RENAUD</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                    <Collapse.Panel key="dates" header={<Typography.Text strong>Dates</Typography.Text>}>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Créé le">11/04/2021</Descriptions.Item>
                            <Descriptions.Item label="Mis à jour le">11/04/2021</Descriptions.Item>
                        </Descriptions>
                    </Collapse.Panel>
                </Collapse>
            </Col>
        </Row>
    );
};

export default ContractDetail;
