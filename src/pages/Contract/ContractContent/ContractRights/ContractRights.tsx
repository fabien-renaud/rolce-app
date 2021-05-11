import {Button, Form, Space, Table, Typography} from 'antd';
import {useState} from 'react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {FormDrawer} from '../../../../components/FormDrawer';
import {RightForm} from '../../../Right';

type BillingTerm = {
    activityId: string;
    artworkId: string;
    price: number;
};

const ContractRights = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe'
                },
                {
                    text: 'Jim',
                    value: 'Jim'
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green'
                        },
                        {
                            text: 'Black',
                            value: 'Black'
                        }
                    ]
                }
            ],
            onFilter: (value: string, record: any) => record.name.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.name.length - b.name.length,
            sortDirections: ['descend']
        },
        {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a: any, b: any) => a.age - b.age
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London'
                },
                {
                    text: 'New York',
                    value: 'New York'
                }
            ],
            filterMultiple: false,
            onFilter: (value: string, record: any) => record.address.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend']
        }
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        },
        {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park'
        }
    ];

    const [visible, setVisible] = useState(false);
    const onClickNew = () => setVisible(true);
    const onCancel = () => setVisible(false);
    const [form] = Form.useForm();

    const onSubmit = () => {
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
            naturesId: new Set(form.getFieldValue('natures')),
            territoriesId: new Set(form.getFieldValue('territories'))
        };
        console.log(rightDto);
    };

    return (
        <>
            <FormDrawer cancelText="Annuler" submitText="Valider" title="Création de droits" visible={visible} onCancel={onCancel} onSubmit={onSubmit}>
                <RightForm contract={{reference: 'id', name: 'contract'}} form={form} />
            </FormDrawer>
            <Space style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8, marginRight: 24, marginLeft: 24}}>
                <Typography.Text strong>Droits</Typography.Text>
                <Button icon={<PlusCircleOutlined />} onClick={onClickNew}>
                    Nouveau
                </Button>
            </Space>
            <Table
                style={{marginLeft: 24, marginRight: 24}}
                // @ts-ignore
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

export default ContractRights;
