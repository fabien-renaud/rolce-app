import {Collapse, Table, Typography} from 'antd';

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

    return (
        <Collapse defaultActiveKey={['rights']} ghost>
            <Collapse.Panel key="rights" header={<Typography.Text strong>Droits</Typography.Text>}>
                <Table
                    // @ts-ignore
                    columns={columns}
                    dataSource={data}
                />
            </Collapse.Panel>
        </Collapse>
    );
};

export default ContractRights;
