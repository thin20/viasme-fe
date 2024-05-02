import React, { useState, useEffect } from "react";
import ViasmTable from "@components/VIASM/Table.jsx";
import { Select, Tooltip, Modal, message } from 'antd';
import columns from './columns/columns.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { store } from '@/store/store.js'
import FormCommon from './form/FormCommon.jsx'
import { searchSuKienDeXuat, deleteSuKienDeXuat } from "@/services/suKienDeXuat";
import { mergePaginationViasm } from "@utils/util";

function SuKienDeXuat(props) {
    const [dataTable, setDataTable] = useState([])
    // chờ gửi duyệt, đã gửi duyệt, đã duyệt
    const [pagination, setPagination] = useState({
        current: 1,
        total: dataTable.length,
        pageSize: 10,
        totalPage: 1
    })
    const [visibleForm, setVisibleForm] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [titleForm, setTitleForm] = useState('')
    const [currentId, setCurrentId] = useState()
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

    const getData = async () => {
        try {
            const params = {
                page: pagination.current > 0 ? pagination.current - 1 : 0,
                size: pagination.pageSize
            }
            const rs = await searchSuKienDeXuat(params)
            if (rs) {
                rs.content.forEach((item, index) => {
                    item.tt = rs.number + index + 1
                })
                setDataTable(rs.content || [])
                setPagination(mergePaginationViasm(pagination, rs))
                console.log(pagination)
                console.log(rs.content)
            }
        } catch(err) {
            console.log('err: ', err)
        }
    }

    const onCreate = () => {
        setTitleForm('Thêm mới đề xuất tổ chức sự kiện khoa học')
        setIsCreate(true)
        setIsUpdate(false)
        setVisibleForm(true)
        setCurrentId(null)
    }

    const onUpdate = (record) => {
        setTitleForm('Cập nhật đề xuất tổ chức sự kiện khoa học')
        setIsCreate(false)
        setIsUpdate(true)
        setVisibleForm(true)
        setCurrentId(record.idSuKienDeXuat)
    }

    const onDelete = (record) => {
        Modal.confirm({
            content: 'Bạn có chắc chắn muốn xóa sự kiện đề xuất này?',
            onOk: async () => {
                try {
                    await deleteSuKienDeXuat({ id: record.idSuKienDeXuat })
                    message.success("Xóa sự kiện đề xuất thành công")
                    getData()
                } catch {
                    message.error("Xóa sự kiện đề xuất thất bại")
                }
            }
        })
    }

    const onCloseForm = () => {
        setVisibleForm( false)
        getData()
    }

    const currentPageChange = (pagi) => {
        console.log('currentPageChange')
        setPagination({...pagination, ...pagi})
    }

    const templateColumns = [
        // {
        //     key: 'tt',
        //     template: (rowData, index) => {
        //         console.log('index', index)
        //         return (<span>{index}</span>)
        //     }
        // },
        {
            key: 'thoiGianDuKien',
            template: (rowData) => {
                return (<span>{rowData.thoiGianDuKienTu} - {rowData.thoiGianDuKienDen}</span>)
            }
        },
        {
            key: 'chucnang',
            template: (rowData, index) => {
                return (
                    <div className="viasm-table-operator">
                        <Tooltip placement="top" title="Sửa" >
                            <FontAwesomeIcon icon={faPen} style={{ cursor: "pointer", color: "var(--primary-color-viasm-active-color)", margin: "0 6px" }} onClick={(e) => onUpdate(rowData)} />
                        </Tooltip>
                        <Tooltip placement="top" title="Xóa" >
                            <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer", color: "var(--primary-color-viasm-danger)", margin: "0 6px" }} onClick={(e) => onDelete(rowData)} />
                        </Tooltip>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        getData()
    }, [])

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
            { visibleForm ?  <FormCommon id={currentId} titleForm={titleForm} visibleForm={visibleForm} isCreate={isCreate} isUpdate={isUpdate} onClose={() => onCloseForm()} /> : null }
        </div>
    )
}

export default SuKienDeXuat;
