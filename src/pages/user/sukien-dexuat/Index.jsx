import React, { useState, useEffect } from "react";
import ViasmTable from "@components/VIASM/Table.jsx";
import { Select, Tooltip } from 'antd';
import columns from './columns/columns.js'
import { Dialog } from 'primereact/dialog';
import { getTableRowIndex } from '@/utils/util.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function SuKienDeXuat(props) {
    const [dataTable, setDataTable] = useState([
        {
            tt: '1',
            ten: 'Trường hè Dự bị Thạc sĩ năm 2024',
            loaihinhhoatdong: 'Trường chuyên biệt',
            thoigiandukien: '03/09/2024 - 05/09/2024',
            diadiemtochuc: 'Viện nghiên cứu cao cấp về toán',
            tennguoidexuat: 'Hoàng Ánh Ngọc',
            trangthai: 'Chờ gửi duyệt'
        },
        {
            tt: '2',
            ten: 'Lý thuyết Xác suất trong không gian nhiều chiều và ứng dụng',
            loaihinhhoatdong: 'Trường chuyên biệt',
            thoigiandukien: '19/03/2024 - 22/03/2024',
            diadiemtochuc: 'Viện Toán học, Viện Hàn lâm Khoa học Công nghệ Việt Nam, số 18B Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
            tennguoidexuat: 'Lê Thị Lan Anh - Văn phòng/Phòng chức năng',
            trangthai: 'Đã gửi duyệt'
        }
    ])
    // chờ gửi duyệt, đã gửi duyệt, đã duyệt
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
                    allowClear={true}
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

    const handleUpdate = (rowData) => {
        console.log('rowData: ', rowData)
    }

    const handleDelete = (rowData) => {
        console.log('rowData: ', rowData)
    }

    const templateColumns = [
        {
            key: 'tt',
            template: (rowData, index) => {
                console.log('index', index)
                return (<span>{index}</span>)
            }
        },
        {
            key: 'chucnang',
            template: (rowData, index) => {
                return (
                    <div className="viasm-table-operator">
                        <Tooltip placement="top" title="Sửa" >
                            <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "var(--primary-color-viasm-active-color)", margin: "0 6px" }} onClick={(e) => handleUpdate(rowData)} />
                        </Tooltip>
                        <Tooltip placement="top" title="Xóa" >
                            <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", color: "var(--primary-color-viasm-danger)", margin: "0 6px" }} onClick={(e) => handleDelete(rowData)} />
                        </Tooltip>
                    </div>
                )
            }
        }
    ]

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
                templateColumns={templateColumns}
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
