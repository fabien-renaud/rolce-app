import {Col, DatePicker, Form, Row, Select, Spin, TreeSelect} from 'antd';
import {useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';
import {Nature, useNatures} from '../../features/natures';
import {useLanguages} from '../../features/languages';

const {SHOW_PARENT} = TreeSelect;

type DataTree = {
    children: Territory[];
    value: string;
} & (Territory | Nature);

const createDataTree = (dataset: Territory[]) => {
    const hashTable = Object.create(null);
    dataset.forEach((aData) => {
        hashTable[aData.id] = {...aData, children: [], value: aData.id};
    });
    const dataTree: DataTree[] = [];
    dataset.forEach((aData) => {
        if (aData.parentId) hashTable[aData.parentId].children.push(hashTable[aData.id]);
        else dataTree.push(hashTable[aData.id]);
    });
    return dataTree;
};

const RightForm = () => {
    const [form] = Form.useForm();
    const {territories, fetchTerritories} = useTerritories();
    const [territoriesTree, setTerritoriesTree] = useState<DataTree[]>([]);
    const {natures, fetchNatures} = useNatures();
    const [naturesTree, setNaturesTree] = useState<DataTree[]>([]);
    const {fetching, languages, fetchLanguages} = useLanguages();

    useEffect(() => {
        fetchTerritories(undefined, undefined, ['id', 'code', 'label', 'parentId']);
        fetchNatures(undefined, undefined, ['id', 'code', 'label', 'parentId']);
        fetchLanguages(0, 5, ['id', 'value'], [], [{key: 'value', value: 'asc'}]);
    }, []);

    useEffect(() => {
        setTerritoriesTree(createDataTree(territories));
    }, [territories]);

    useEffect(() => {
        setNaturesTree(createDataTree(natures));
    }, [natures]);

    const handleOnLanguageSearch = (value: string) => {
        fetchLanguages(0, 5, ['id', 'value'], [{key: 'value', value: `like.*${value}*`}], [{key: 'value', value: 'asc'}]);
    };

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
            <Row key="Natures">
                <Col span={24} key="NaturesSelection">
                    {naturesTree.length ? (
                        <TreeSelect
                            treeData={naturesTree}
                            treeCheckable
                            treeNodeLabelProp="label"
                            treeNodeFilterProp="id"
                            placeholder="Rechercher un mode d'exploitation"
                            showCheckedStrategy={SHOW_PARENT}
                            style={{width: '100%'}}
                        />
                    ) : null}
                </Col>
            </Row>
            <Row key="Languages">
                <Col span={24} key="LanguagesSelection">
                    {naturesTree.length ? (
                        <Select
                            labelInValue
                            mode="multiple"
                            allowClear
                            onSearch={handleOnLanguageSearch}
                            placeholder="Rechercher une langue"
                            style={{width: '100%'}}
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            options={languages}
                        />
                    ) : null}
                </Col>
            </Row>
        </Form>
    );
};

export default RightForm;
