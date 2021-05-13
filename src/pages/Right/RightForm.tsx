import {Col, DatePicker, Empty, Form, FormInstance, Input, InputNumber, Radio, Row, Select, Spin, TreeSelect, message} from 'antd';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Territory, useTerritories} from '../../features/territories';
import {Nature, useNatures} from '../../features/natures';
import {Activity} from '../../features/activities';
import {createDataTree, currencyFormatter, currencyParser, DataTree, geAllNestedChildrenIds} from '../../utils';
import {useLanguages} from '../../features/languages';
import {useArtworks} from '../../features/artworks';
import {CONTRACT_TYPE, ContractType} from '../../features/contracts';
import {BillingTerm, RightDto} from '../../features/rights/rightType';
import {createRight} from '../../features/rights/rightService';

const {SHOW_PARENT} = TreeSelect;

type TerritoryTree = DataTree & Partial<Territory>;
type NatureTree = DataTree & Partial<Nature>;

type RightFormProps = {
    contract: {reference: string; name: string; type: ContractType};
    form: FormInstance;
    setSaving: SetStateAction<any>;
};

const RightForm = ({contract, form, setSaving}: RightFormProps) => {
    const {territories, fetchTerritories} = useTerritories();
    const [territoriesTree, setTerritoriesTree] = useState<TerritoryTree[]>([]);
    const {natures, fetchNatures} = useNatures();
    const [naturesTree, setNaturesTree] = useState<NatureTree[]>([]);
    const {fetching: fetchingLanguages, languages, fetchLanguages} = useLanguages();
    const {fetching: fetchingArtworks, artworks, fetchArtworks} = useArtworks();
    const contractTypeOptions =
        contract.type === CONTRACT_TYPE.ACQUISITION ? [{value: 'Acquisition'}, {value: 'Suspension'}] : [{value: 'Vente'}, {value: 'Holdback'}];

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

    const onFinish = async () => {
        setSaving('Saving');
        const price = form.getFieldValue('price');
        const billingTerms: BillingTerm[] = [];
        form.getFieldValue('activities').forEach(({id: activityId}: {id: string}) => {
            form.getFieldValue('artworks').forEach(({value: artworkId}: {value: string}) => {
                billingTerms.push({activityId, artworkId, price});
            });
        });
        const formTerritories: string[] = [...new Set(form.getFieldValue('territories'))] as string[];
        const territoriesId: string[] = formTerritories.reduce(
            (acc, territory) => [...acc, ...geAllNestedChildrenIds(territoriesTree, territory)],
            formTerritories
        );
        const formNatures: string[] = [...new Set(form.getFieldValue('natures'))] as string[];
        const naturesId: string[] = formNatures.reduce((acc, nature) => [...acc, ...geAllNestedChildrenIds(naturesTree, nature)], formNatures);
        const rightDto: RightDto = {
            name: form.getFieldValue('name'),
            contractId: form.getFieldValue('contract'),
            type: form.getFieldValue('type'),
            billingTerms,
            beginAt: form.getFieldValue('dateStart'),
            endAt: form.getFieldValue('dateEnd'),
            hasExclusivity: !!form.getFieldValue('hasExclusivity'),
            languagesId: form.getFieldValue('languages'),
            naturesId,
            territoriesId
        };
        createRight(rightDto)
            .then((rights: string[]) => {
                message.success(`${rights.length} droits créés avec succès !`);
                form.resetFields();
            })
            .catch((error) => message.error(`Une erreur est survenue lors de la création de droits => ${error.message}`))
            .finally(() => setSaving('Done'));
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
                name: contract.name,
                hasExclusivity: 1,
                type: contract.type === CONTRACT_TYPE.ACQUISITION ? 'Acquisition' : 'Vente',
                contract: contract.name
            }}
            onFinish={onFinish}>
            <Row key="ArtworksAndContract">
                <Col span={12} key="RightName">
                    <Form.Item label="Nom" name="name" rules={[{required: true, message: 'Un nom est obligatoire'}]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12} key="Contract">
                    <Form.Item label="Contrat" name="contract" rules={[{required: true, message: 'Un contrat doit être spécifié'}]}>
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
                        <Select options={contractTypeOptions} style={{width: '100%'}} />
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
                <Col span={12} key="Artworks">
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
