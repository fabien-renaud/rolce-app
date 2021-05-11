import {Col, DatePicker, Empty, Form, FormInstance, Input, InputNumber, Radio, Row, Select, Spin, TreeSelect} from 'antd';
import React, {useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';
import {Nature, useNatures} from '../../features/natures';
import {Activity} from '../../features/activities';
import {currencyFormatter, currencyParser} from '../../utils';
import {useLanguages} from '../../features/languages';
import {useArtworks} from '../../features/artworks';
import {ContractMetadata} from '../../features/contractMetadata';

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

type RightFormProps = {
    contract: ContractMetadata;
    form: FormInstance;
};

const RightForm = ({contract, form}: RightFormProps) => {
    const {territories, fetchTerritories} = useTerritories();
    const [territoriesTree, setTerritoriesTree] = useState<TerritoryTree[]>([]);
    const {natures, fetchNatures} = useNatures();
    const [naturesTree, setNaturesTree] = useState<NatureTree[]>([]);
    const {fetching: fetchingLanguages, languages, fetchLanguages} = useLanguages();
    const {fetching: fetchingArtworks, artworks, fetchArtworks} = useArtworks();

    useEffect(() => {
        fetchArtworks(0, 10, ['id', 'value:title'], [], [{key: 'title', value: 'asc'}]);
        fetchTerritories(undefined, undefined, ['id', 'code', 'label', 'parentId']);
        fetchNatures(undefined, undefined, ['id', 'code', 'label', 'parentId', 'nature_activity(id, label)']);
        fetchLanguages(0, 10, ['id', 'value'], [], [{key: 'value', value: 'asc'}]);
    }, []);

    useEffect(() => {
        setTerritoriesTree(createDataTree(territories));
    }, [territories]);

    useEffect(() => {
        setNaturesTree(createDataTree(natures));
    }, [natures]);

    const handleOnChangeNaturesTree = (naturesId: string[]) => {
        const activities: Activity[] = [];
        natures
            .filter((nature) => naturesId.includes(nature.id))
            .map(({nature_activity}) => ({
                ...nature_activity,
                value: nature_activity.label
            }))
            .forEach((activity) => {
                if (!activities.find((a) => a.id === activity.id)) activities.push(activity);
            });
        form.setFieldsValue({
            activities
        });
    };

    const handleOnArtworkSearch = (value: string) =>
        fetchArtworks(0, 10, ['id', 'value:title'], [{key: 'title', value: `like.*${value}*`}], [{key: 'title', value: 'asc'}]);

    const handleOnLanguageSearch = (value: string) =>
        fetchLanguages(0, 10, ['id', 'value'], [{key: 'value', value: `like.*${value}*`}], [{key: 'value', value: 'asc'}]);

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
            }}
            initialValues={{
                hasExclusivity: 1,
                type: 'Acquisition',
                contract: contract.name
            }}>
            <Row key="Artworks">
                <Col span={12} key="ArtworksAndContract">
                    <Form.Item label="Oeuvres" name="artworks">
                        <Select
                            labelInValue
                            mode="multiple"
                            allowClear
                            onSearch={handleOnArtworkSearch}
                            placeholder="Rechercher une oeuvre"
                            style={{width: '100%'}}
                            notFoundContent={
                                fetchingArtworks ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />
                            }
                            options={artworks.sort((aa, ab) => aa.value.localeCompare(ab.value)).map((artwork) => ({label: artwork.value, value: artwork.id}))}
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                </Col>
                <Col span={12} key="Contract">
                    <Form.Item label="Contract" name="contract">
                        <Input key={contract.reference} disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="DateRange">
                <Col span={12} key="DateStart">
                    <Form.Item label="Date de début" name="dateStart">
                        <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
                <Col span={12} key="DateEnd">
                    <Form.Item label="Date de fin" name="dateEnd">
                        <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="Details">
                <Col span={12} key="Price">
                    <Form.Item label="Prix" name="price">
                        <InputNumber formatter={currencyFormatter} parser={currencyParser} />
                    </Form.Item>
                </Col>
                <Col span={12} key="HasExclusivity">
                    <Form.Item label="Exclusivité" name="hasExclusivity">
                        <Radio.Group
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
                    <Form.Item label="Type" name="type">
                        <Select
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
                    <Form.Item label="Langues" name="languages">
                        <Select
                            mode="multiple"
                            allowClear
                            onSearch={handleOnLanguageSearch}
                            placeholder="Rechercher une langue"
                            style={{width: '100%'}}
                            notFoundContent={
                                fetchingLanguages ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />
                            }
                            options={languages
                                .sort((la, lb) => la.value.localeCompare(lb.value))
                                .map((language) => ({label: language.value, value: language.id}))}
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="Territories">
                <Col span={12} key="TerritoriesSelection">
                    <Form.Item label="Territoires" name="territories">
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
                    </Form.Item>
                </Col>
            </Row>
            <Row key="NaturesAndActivity">
                <Col span={12} key="NaturesSelection">
                    <Form.Item label="Modes d'exploitation" name="natures">
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
                    </Form.Item>
                </Col>
                <Col span={12} key="ActivityLabel">
                    <Form.Item label="Activités" name="activities">
                        <Select
                            labelInValue
                            mode="multiple"
                            disabled
                            placeholder="Activités"
                            style={{width: '100%'}}
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
