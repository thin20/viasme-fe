import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Pagination from './Pagination.jsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ViasmTable(props, component) {
    const dataTable = props && props["dataTable"] ? props["dataTable"] : []
    const columns = props && props["columns"] ? props["columns"] : []
    const title = props && props["title"] ? props["title"] : null
    const showPagination = props && props["showPagination"] ? props["showPagination"] : false
    const [ pagination, setPagination ] = props && props["pagination"] ? useState(props["pagination"]) : useState(null)
    const tableStyle = props && props["tableStyle"] ? props["tableStyle"] : {}
    const isCreate = props && props["isCreate"] ? props["isCreate"] : false
    const showGridlines = props && props["showGridlines"] ? props["showGridlines"] : true
    const handleCreate = () => {
        props.onCreate()
    }
    const renderTemplateFilter = () => {
        return props && props?.templateFilter ? props?.templateFilter : null
    }

    const currentPageChange = (pagi) => {
        console.log('currentPageChange table: ', pagi)
        setPagination(pagination => ({ ...pagination, ...pagi }))
        props && props.onChange && props.onChange(pagination)
    }

    return (
        <div className="viasm-table">
            <div className="viasm-table--filter">
                {renderTemplateFilter()}
            </div>
            <div className="viasm-table--container">
                <div className="viasm-table--header">
                    <div className="viasm-table--title">{title}</div>
                    {
                        showPagination ?
                            <div><Pagination pagination={pagination} onChange={currentPageChange}></Pagination></div>
                            : null
                    }

                </div>
                <div className="viasm-table--content">
                    <div className="viasm-table--extend">
                        <Button label="Primary" text label="Thêm mới" icon={<FontAwesomeIcon icon={faPlus} />} onClick={handleCreate} className="button-create" />
                    </div>
                    <div className="viasm-table--table">
                        <DataTable value={dataTable} stripedRows tableStyle={tableStyle} showGridlines={showGridlines}>
                            {
                                columns.map((column, index) => {
                                    return <Column field={column.field} header={column.title} key={index} style={column.style}></Column>
                                })
                            }
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViasmTable;
