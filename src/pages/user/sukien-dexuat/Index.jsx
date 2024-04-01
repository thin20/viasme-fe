import React, { useState, useEffect } from "react";
import ViasmTable from "@components/VIASM/Table.jsx";
import { Select } from 'antd';
import columns from './columns/columns.js'
import { Dialog } from 'primereact/dialog';

function SuKienDeXuat() {
    const [dataTable, setDataTable] = useState([
        {
            ten: 'Minh Phuong',
            tuoi: 22,
            sdt: '092341341234'
        },
        {
            ten: 'thin',
            tuoi: 24,
            sdt: '098140912348'
        }
    ])
    const [pagination, setPagination] = useState({
        current: 1,
        total: dataTable.length,
        pageSize: 10,
        totalPage: 1
    })
    const [visibleForm, setVisibleForm] = useState(false)
    const [titleForm, setTitleForm] = useState('')
    const year = [];
    for(let i = 2019; i <= 2026; i++) {
        year.push({ value: i, label: i})
    }
    const handleChangeYear = (value) => {
        console.log(value)
    }
    const templateFilter = () => {
        return (
            <div>
                <Select
                    style={{ width: 200 }}
                    defaultValue={2024}
                    onChange={handleChangeYear}
                    options={year}
                ></Select>
            </div>
        )
    }

    const onCreate = () => {
        setTitleForm('Thêm mới đề xuất tổ chức sự kiện khoa học')
        setVisibleForm(true)
    }

    const onUpdate = () => {
        setTitleForm('Cập nhật đề xuất tổ chức sự kiện khoa học')
        setVisibleForm(true)
    }

    const onCloseForm = () => {
        setVisibleForm( false)
    }

    const currentPageChange = (pagi) => {
        console.log('currentPageChange')
        setPagination({...pagination, ...pagi})
    }

    return (
        <div>
            <ViasmTable
                title="Danh sách đề xuất tổ chức sự kiện khoa học"
                dataTable={dataTable}
                columns={columns}
                templateFilter={templateFilter()}
                isCreate={true}
                onCreate={onCreate}
                showPagination={true}
                pagination={pagination}
                currentPageChange={currentPageChange}
            ></ViasmTable>
            <Dialog
                header={titleForm}
                visible={visibleForm}
                style={{width: '100vw', height: '100vh'}}
                onHide={() => setVisibleForm(false)}>
            </Dialog>
        </div>
    )
}

export default SuKienDeXuat;
