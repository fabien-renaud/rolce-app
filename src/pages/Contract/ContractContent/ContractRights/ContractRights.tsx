import {Button, Form, Space, Table, Typography} from 'antd';
import {useState} from 'react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {FormDrawer} from '../../../../components/FormDrawer';
import {RightForm} from '../../../Right';
import {ContractType} from '../../../../features/contracts';
import {SavingStatus} from '../../../../utils';

type ContractRightProps = {
    contract: {reference: string; name: string; type: ContractType};
};

const ContractRights = ({contract: {reference, name, type}}: ContractRightProps) => {
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
    const [saving, setSaving] = useState<SavingStatus>('Initial');
    const onClickNew = () => setVisible(true);
    const onCancel = () => setVisible(false);
    const [form] = Form.useForm();
    const onSubmit = async () =>
        form
            .validateFields()
            .then(() => {
                form.submit();
                setVisible(false);
            })
            .catch(console.error);

    return (
        <>
            <FormDrawer
                cancelText="Annuler"
                submitText="Valider"
                title="Création de droits"
                visible={visible}
                onCancel={onCancel}
                onSubmit={onSubmit}
                saving={saving}>
                <RightForm contract={{reference, name, type}} form={form} setSaving={setSaving} />
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
