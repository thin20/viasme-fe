import React, { useState } from 'react';
import { Dropdown } from 'antd';
import InputNumber from '@components/VIASM/InputNumber.jsx'

function Pagination(props) {
    const [pagination, setPagination] = props && props.pagination ? useState(props.pagination) : useState({
        current: 0,
        total: 0,
        pageSize: 10,
        totalPages: 0
    })
    const items = [
        {
            key: 1,
            label: 'Trang đầu tiên'
        },
        {
            key: 2,
            label: 'Trang cuối cùng'
        }
    ]
    const onPaginationChange = (value) => {
        const current = value ? value : 1
        setPagination(pagination => ({...pagination, current: current}))
        props && props.onChange && props.onChange({ ...pagination })
    }
    const menuProps = {
        items: items,
        onClick: onPaginationChange,
    }

    return (
        <div className="viasm-table--pagination">
            <div className="viasm-table--pagination-dropdown">
                <Dropdown menu={menuProps}>
                    {
                        pagination.total ?
                            <span>
                                { (pagination.current - 1) * pagination.pageSize + 1 } - { pagination.current * ( pagination.pageSize + 1) > pagination.total ? pagination.total : pagination.current * (pagination.pageSize + 1) } trong { pagination.total }
                            </span>
                            : <span>Không tìm thấy dữ liệu</span>
                    }
                </Dropdown>
            </div>
            <div className="viasm-table--pagination-current">
                <InputNumber value={pagination.current} style={{width: '100px'}} onChange={onPaginationChange} placeholder={''}></InputNumber>
            </div>
        </div>
    );
}

export default Pagination;
