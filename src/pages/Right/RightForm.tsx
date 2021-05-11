import {Button, Col, DatePicker, Divider, Empty, Form, InputNumber, Radio, Row, Select, Spin, TreeSelect} from 'antd';
import {JSXElementConstructor, ReactElement, useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';
import {Nature, useNatures} from '../../features/natures';
import {Activity} from '../../features/activities';
import {currencyFormatter, currencyParser} from '../../utils';
import {useLanguages} from '../../features/languages';

const {SHOW_PARENT} = TreeSelect;

type DataTree = {
    children: DataTree[];
    value: string;
};

type TerritoryTree = DataTree & Partial<Territory>;
type NatureTree = DataTree & Partial<Nature>;

const createDataTree = (dataset: Territory[] | Nature[]) => {
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
    const [territoriesTree, setTerritoriesTree] = useState<TerritoryTree[]>([]);
    const {natures, fetchNatures} = useNatures();
    const [naturesTree, setNaturesTree] = useState<NatureTree[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const {contentRange, fetching, languages, fetchLanguages} = useLanguages();
    const [fetchingMoreLanguages, setFetchingMoreLanguages] = useState(false);

    useEffect(() => {
        fetchTerritories(undefined, undefined, ['id', 'code', 'label', 'parentId']);
        fetchNatures(undefined, undefined, ['id', 'code', 'label', 'parentId', 'nature_activity(id, label)']);
        fetchLanguages(0, 5, ['id', 'value'], [], [{key: 'value', value: 'asc'}]);
    }, []);

    useEffect(() => {
        setTerritoriesTree(createDataTree(territories));
    }, [territories]);

    useEffect(() => {
        setNaturesTree(createDataTree(natures));
    }, [natures]);

    useEffect(() => {
        if (!fetching) setFetchingMoreLanguages(false);
    }, [fetching]);

    const displayLanguageDropdownRender = (menu: ReactElement<any, string | JSXElementConstructor<any>>) => {
        if (contentRange) {
            const [current, total] = contentRange.split('/');
            const totalNumber = parseInt(total, 10);
            const [, max] = current.split('-');
            const maxNumber = parseInt(max, 10);
            const offset = maxNumber + 1;
            if (totalNumber > offset && totalNumber > languages.length) {
                return (
                    <div>
                        {menu}
                        <Divider style={{margin: '4px 0'}} />
                        <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8, justifyContent: 'center'}}>
                            <Button
                                type="primary"
                                loading={fetchingMoreLanguages}
                                onClick={() => {
                                    setFetchingMoreLanguages(true);
                                    fetchLanguages(
                                        offset,
                                        5,
                                        ['id', 'value'],
                                        [],
                                        [
                                            {
                                                key: 'value',
                                                value: 'asc'
                                            }
                                        ]
                                    );
                                }}>
                                Charger plus
                            </Button>
                        </div>
                    </div>
                );
            }
        }
        return menu;
    };

    const handleOnChangeNaturesTree = (naturesId: string[]) => {
        const uniqueActivities: Activity[] = [];
        natures
            .filter((nature) => naturesId.includes(nature.id))
            .map(({nature_activity}) => ({
                ...nature_activity,
                value: nature_activity.label
            }))
            .forEach((activity) => {
                if (!uniqueActivities.find((a) => a.id === activity.id)) uniqueActivities.push(activity);
            });
        setActivities(uniqueActivities);
    };

    const handleOnLanguageSearch = (value: string) => {
        fetchLanguages(0, 5, ['id', 'value'], [{key: 'value', value: `like.*${value}*`}], [{key: 'value', value: 'asc'}]);
    };

    return (
        <Form
            form={form}
            labelCol={{
                xs: {span: 24},
                sm: {span: 8}
            }}
            wrapperCol={{
                xs: {span: 24},
                sm: {span: 16}
            }}>
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
            <Row key="Details">
                <Col span={12} key="Price">
                    <Form.Item label="Prix">
                        <InputNumber formatter={currencyFormatter} parser={currencyParser} />
                    </Form.Item>
                </Col>
                <Col span={12} key="HasExclusivity">
                    <Form.Item label="Exclusivité">
                        <Radio.Group
                            defaultValue={1}
                            options={[
                                {label: 'Exclusif', value: 1},
                                {label: 'Non exclusif', value: 0}
                            ]}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="TypeAndLanguages">
                <Col span={12} key="RightType">
                    <Form.Item label="Type">
                        <Select
                            defaultValue="Acquisition"
                            options={[
                                {
                                    value: 'Acquisition'
                                },
                                {
                                    value: 'Vente'
                                },
                                {
                                    value: 'Holdback'
                                },
                                {
                                    value: 'Suspension'
                                }
                            ]}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} key="LanguagesSelection">
                    <Form.Item label="Langues">
                        {naturesTree.length ? (
                            <Select
                                labelInValue
                                mode="multiple"
                                allowClear
                                autoClearSearchValue={false}
                                onSearch={handleOnLanguageSearch}
                                placeholder="Rechercher une langue"
                                style={{width: '100%'}}
                                notFoundContent={fetching ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />}
                                options={languages.sort((la, lb) => la.value.localeCompare(lb.value))}
                                dropdownRender={displayLanguageDropdownRender}
                                maxTagCount="responsive"
                            />
                        ) : null}
                    </Form.Item>
                </Col>
            </Row>
            <Row key="Territories">
                <Col span={12} key="TerritoriesSelection">
                    <Form.Item label="Territoires">
                        {territoriesTree.length ? (
                            <TreeSelect
                                treeData={territoriesTree}
                                treeCheckable
                                treeNodeLabelProp="label"
                                treeNodeFilterProp="id"
                                placeholder="Rechercher un territoire"
                                showCheckedStrategy={SHOW_PARENT}
                                style={{width: '100%'}}
                                maxTagCount="responsive"
                                notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />}
                            />
                        ) : null}
                    </Form.Item>
                </Col>
            </Row>
            <Row key="NaturesAndActivity">
                <Col span={12} key="NaturesSelection">
                    <Form.Item label="Modes d'exploitation">
                        {naturesTree.length ? (
                            <TreeSelect
                                treeData={naturesTree}
                                treeCheckable
                                treeNodeLabelProp="label"
                                treeNodeFilterProp="id"
                                placeholder="Rechercher un mode d'exploitation"
                                showCheckedStrategy={SHOW_PARENT}
                                style={{width: '100%'}}
                                onChange={handleOnChangeNaturesTree}
                                maxTagCount="responsive"
                                notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />}
                            />
                        ) : null}
                    </Form.Item>
                </Col>
                <Col span={12} key="ActivityLabel">
                    <Form.Item label="Activités">
                        <Select
                            labelInValue
                            mode="multiple"
                            disabled
                            placeholder="Activités"
                            style={{width: '100%'}}
                            options={activities}
                            value={activities}
                            maxTagCount="responsive"
                            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default RightForm;
