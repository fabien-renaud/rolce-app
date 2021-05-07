import {Col, DatePicker, Form, Row, TreeSelect} from 'antd';
import {useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';

const {SHOW_PARENT} = TreeSelect;

type TerritoryTree = {
    children: Territory[];
    value: string;
} & Territory;

const createDataTree = (dataset: Territory[]) => {
    const hashTable = Object.create(null);
    dataset.forEach((aData) => {
        hashTable[aData.id] = {...aData, children: [], value: aData.id};
    });
    const dataTree: TerritoryTree[] = [];
    dataset.forEach((aData) => {
        if (aData.parent?.id) hashTable[aData.parent.id].children.push(hashTable[aData.id]);
        else dataTree.push(hashTable[aData.id]);
    });
    return dataTree;
};

const RightForm = () => {
    const [form] = Form.useForm();
    const {territories, fetchTerritories} = useTerritories();
    const [territoriesTree, setTerritoriesTree] = useState<TerritoryTree[]>([]);

    useEffect(() => {
        fetchTerritories(undefined, undefined, ['id', 'code', 'label', 'parent(id)']);
    }, []);

    useEffect(() => {
        setTerritoriesTree(createDataTree(territories));
    }, [territories]);

    return (
        <Form form={form}>
            <Row key="DateRange">
                <Col span={12} key="DateStart">
                    <Form.Item label="Date de début">
                        <DatePicker />
                    </Form.Item>
                </Col>
                <Col span={12} key="DateEnd">
                    <Form.Item label="Date de fin">
                        <DatePicker />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="Territories">
                <Col span={24} key="TerritoriesSelection">
                    {territoriesTree.length ? (
                        <TreeSelect
                            treeData={territoriesTree}
                            treeCheckable
                            treeNodeLabelProp="label"
                            treeNodeFilterProp="id"
                            placeholder="Rechercher un territoire"
                            showCheckedStrategy={SHOW_PARENT}
                            style={{width: '100%'}}
                        />
                    ) : null}
                </Col>
            </Row>
        </Form>
    );
};

export default RightForm;
