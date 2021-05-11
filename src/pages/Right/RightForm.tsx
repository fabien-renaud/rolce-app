import {Col, DatePicker, Empty, Form, FormInstance, Input, InputNumber, Radio, Row, Select, Spin, TreeSelect} from 'antd';
import React, {useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';
import {Nature, useNatures} from '../../features/natures';
import {Activity} from '../../features/activities';
import {createDataTree, currencyFormatter, currencyParser, DataTree} from '../../utils';
import {useLanguages} from '../../features/languages';
import {useArtworks} from '../../features/artworks';
import {ContractMetadata} from '../../features/contractMetadata';

const {SHOW_PARENT} = TreeSelect;

type BillingTerm = {
    activityId: string;
    artworkId: string;
    price: number;
};

type TerritoryTree = DataTree & Partial<Territory>;
type NatureTree = DataTree & Partial<Nature>;

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
        setTerritoriesTree(createDataTree<Territory>(territories));
    }, [territories]);

    useEffect(() => {
        setNaturesTree(createDataTree<Nature>(natures));
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
        fetchArtworks(0, 10, ['id', 'value:title'], [{key: 'title', value: `ilike.*${value}*`}], [{key: 'title', value: 'asc'}]);

    const handleOnLanguageSearch = (value: string) =>
        fetchLanguages(0, 10, ['id', 'value'], [{key: 'value', value: `ilike.*${value}*`}], [{key: 'value', value: 'asc'}]);

    const onFinish = () => {
        const price = form.getFieldValue('price');
        const billingTerms: BillingTerm[] = [];
        form.getFieldValue('activities').forEach((activity: string) => {
            form.getFieldValue('artworks').forEach((artwork: string) => {
                billingTerms.push({activityId: activity, artworkId: artwork, price});
            });
        });
        const rightDto = {
            contratId: form.getFieldValue('contract'),
            type: form.getFieldValue('contract'),
            billingTerms,
            beginAt: form.getFieldValue('dateStart'),
            endAt: form.getFieldValue('dateEnd'),
            hasExclusivity: form.getFieldValue('hasExclusivity'),
            languagesId: new Set(form.getFieldValue('languages')),
            naturesId: new Set(form.getFieldValue('languages')),
            territoriesId: new Set(form.getFieldValue('languages'))
        };
        console.log(rightDto);
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
            }}
            initialValues={{
                hasExclusivity: 1,
                type: 'Acquisition',
                contract: contract.name
            }}
            onFinish={onFinish}>
            <Row key="Artworks">
                <Col span={12} key="ArtworksAndContract">
                    <Form.Item label="Oeuvres" name="artworks" rules={[{required: true, message: 'Merci de sélectionner au moins une oeuvre'}]}>
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
                            optionFilterProp="label"
                            options={artworks.sort((aa, ab) => aa.value.localeCompare(ab.value)).map((artwork) => ({label: artwork.value, value: artwork.id}))}
                            maxTagCount="responsive"
                        />
                    </Form.Item>
                </Col>
                <Col span={12} key="Contract">
                    <Form.Item label="Contract" name="contract" rules={[{required: true, message: 'Un contrat doit être spécifié'}]}>
                        <Input key={contract.reference} disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="DateRange">
                <Col span={12} key="DateStart">
                    <Form.Item label="Date de début" name="dateStart" rules={[{required: true, message: 'Une date de début doit être renseignée'}]}>
                        <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
                <Col span={12} key="DateEnd">
                    <Form.Item label="Date de fin" name="dateEnd" rules={[{required: true, message: 'Une date de fin doit être renseignée'}]}>
                        <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
            </Row>
            <Row key="Details">
                <Col span={12} key="Price">
                    <Form.Item label="Prix" name="price" rules={[{required: true, message: 'Un prix doit être spécifié'}]}>
                        <InputNumber formatter={currencyFormatter} parser={currencyParser} />
                    </Form.Item>
                </Col>
                <Col span={12} key="HasExclusivity">
                    <Form.Item
                        label="Exclusivité"
                        name="hasExclusivity"
                        rules={[{required: true, message: 'Merci de sélectionner si le droit est exclusif ou non'}]}>
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
                    <Form.Item label="Type" name="type" rules={[{required: true, message: 'Merci de préciser le type de droit'}]}>
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
                    <Form.Item label="Langues" name="languages" rules={[{required: true, message: 'Merci de sélectionner au moins une langue'}]}>
                        <Select
                            mode="multiple"
                            allowClear
                            onSearch={handleOnLanguageSearch}
                            placeholder="Rechercher une langue"
                            style={{width: '100%'}}
                            notFoundContent={
                                fetchingLanguages ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Pas de données" />
                            }
                            optionFilterProp="label"
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
                    <Form.Item label="Territoires" name="territories" rules={[{required: true, message: 'Merci de sélectionner au moins un territoire'}]}>
                        <TreeSelect
                            treeData={territoriesTree}
                            treeCheckable
                            treeNodeLabelProp="label"
                            treeNodeFilterProp="label"
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
                    <Form.Item
                        label="Modes d'exploitation"
                        name="natures"
                        rules={[{required: true, message: "Merci de sélectionner au moins un mode d'exploitation"}]}>
                        <TreeSelect
                            treeData={naturesTree}
                            treeCheckable
                            treeNodeLabelProp="label"
                            treeNodeFilterProp="label"
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
                    <Form.Item label="Activités" name="activities" rules={[{required: true, message: 'Merci de sélectionner au moins une activité'}]}>
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
