import { useEffect, useState } from 'react';
import './App6.css';
import { Input, Space, Table, Popconfirm } from 'antd';
const { Search } = Input;


function App() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'do',
            key: 'do',
            render: (_, record) => (
                dataSource.length >=1 ?(
                <Space size="middle">
                    <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.id)}>
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
                ) : null
            ),
        }
    ];

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/data",{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setDataSource(data)
        })
    }, [])

    function onSearch(name) {
        fetch(`http://localhost:3001/data/?name=${name}`, {
            method:'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setDataSource(data)
        })
    }

    function onDelete(id) {
        fetch(`http://localhost:3001/data/${id}`, {
            method: 'DELETE'
        }).then(() => {
            const newData = dataSource.filter(item => item.id !== id)
            setDataSource(newData)
        })
    }

    return (
        <div className="container">
            <div className="search-box">
                <Search
                    placeholder='请输入关键词'
                    enterButton="搜索"
                    size="large"
                    allowClear
                    onSearch={onSearch}
                />
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default App;