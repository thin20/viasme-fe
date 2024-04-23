import React, { useEffect, useState } from 'react'
import { Col, Row, Input, Form, DatePicker, Select, Modal, Button, Spin } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { createSuKienDeXuat } from '@/services/suKienDeXuat/index.js'
import dayjs from "dayjs";

function FormCommon(props) {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const [lstLoaiHinhHoatDong, setLstLoaiHinhHoatDong] = useState([])
    const [lstNhomNhiemVu, setLstNhomNhiemVu] = useState([]);
    const [titleForm, setTitleForm] = useState(props.titleForm)
    const [visibleForm, setVisibleForm] = useState(props.visibleForm)

    function initialValue() {
        return {
            tenSuKienDeXuatTiengViet: null,
            tenSuKienDeXuatTiengAnh: null,
            tenSuKienDeXuatVietTat: null,
            thoiGianDuKienTu: null,
            thoiGianDuKienDen: null,
            loaiHinhHoatDong: null,
            nhomNhiemVu: null,
            diaDiemToChuc: null,
            idNguoiDeXuat: 1,
            tenNguoiDeXuat: 'Phan Minh Phuong',
            quyMoToChuc: null
        }
    }

    function onSubmit(formValue) {
        form.validateFields()
        console.log('onSubmit: ', formValue)
        console.log('form: ', form)
        console.log('getFieldsValue; ', form.getFieldsValue())
    }

    function getLoaiHinhHoatDong() {
        setLstLoaiHinhHoatDong([
            { value: '1', label: 'Bài đại hội chúng' },
            { value: '2', label: 'Hội nghị' },
            { value: '3', label: 'Hội thảo' },
            { value: '4', label: 'Seminar' }
        ])
    }

    function handleChangeLoaiHinhHoatDong(value, option) {
        console.log('handleChangeLoaiHinhHoatDong: ', value, option)
    }

    function getNhomNhiemVu() {
        setLstNhomNhiemVu([
            { value: '1', label: 'Chương trình toán' },
            { value: '2', label: 'Thường xuyên' }
        ])
    }

    function handleChangeNhomNhiemVu(value, option) {
        console.log('handChangeNhomNhiemVu: ', value, option)
    }

    function handleCloseForm() {
        props.onClose()
    }

    function handleSubmit() {
        console.log('form: ', form)
        console.log('getFieldsValue: ', form.getFieldsValue())
        form.validateFields().then(() => {
            // TODO CALL FUNCTION SAVE
            const params = {
                ...form.getFieldsValue()
            }
            try {
                if (props.isCreate) {
                    console.log('params: ', params)
                    createSuKienDeXuat(params).then(rs => {
                        console.log(rs)
                    })
                } else {
                    // TO DO: EDIT
                }
            } catch (err) {
                console.log(err)
            } finally {
                // handleCloseForm()
            }
        })
    }

    useEffect(() => {
        getLoaiHinhHoatDong()
        getNhomNhiemVu()
    }, [])

    return (
        <Modal
            className="modal-full"
            title={titleForm}
            open={visibleForm}
            style={{ width: '100vw', height: '100vh', top: 0, maxWidth: '100vw' }}
            width={'100vw'}
            destroyOnClose={true}
            footer={null}
            onCancel={handleCloseForm}
        >
            <Spin spinning={loading}>
                <div style={{ color: '#3a5cb1', marginBottom: '16px', fontWeight: 700 }}>1. Tên hoạt động - loại hình hoạt động </div>
                <Form onFinish={onSubmit} form={form} layout="vertical" initialValues={initialValue}>
                    <Row gutter={[12, 12]}>
                        <Col span={24}>
                            <Form.Item name="tenNguoiDeXuat" label="Tên người đề xuất">
                                <Input disabled={true}></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12, 12]}>
                        <Col span={8}>
                            <Form.Item name="tenSuKienDeXuatTiengViet" label="Tên sự kiện tiếng Việt" rules={[
                                {
                                    required: true,
                                    message: 'Tên sự kiện tiếng Việt bắt buộc nhập'
                                }
                            ]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="tenSuKienDeXuatTiengAnh" label="Tên sự kiện tiếng Anh" rules={[
                                {
                                    required: true,
                                    message: 'Tên sự kiện tiếng Việt bắt buộc nhập'
                                }
                            ]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="tenSuKienDeXuatVietTat" label="Tên sự kiện viết tắt" rules={[
                                {
                                    required: true,
                                    message: 'Tên sự kiện viết tắt bắt buộc nhập'
                                }
                            ]}>
                                <Input></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12, 12]}>
                        <Col span={8}>
                            <Form.Item name="loaiHinhHoatDong" label="Loại hình hoạt động" rules={[
                                {
                                    required: true,
                                    message: 'Loại hình hoạt động bắt buộc nhập'
                                }
                            ]}>
                                <Select
                                    onChange={() => handleChangeLoaiHinhHoatDong}
                                    style={{ width: '100$' }}
                                    options={lstLoaiHinhHoatDong}
                                    placeholder="Chọn"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="thoiGianDuKienTu" label="Thời gian dự kiến từ" rules={[
                                {
                                    required: true,
                                    message: 'Thời gian dự kiến từ bắt buộc nhập'
                                }
                            ]}>
                                <DatePicker style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="thoiGianDuKienDen" label="Thời gian dự kiến đến" rules={[
                                {
                                    required: true,
                                    message: 'Thời gian dự kiến đến bắt buộc nhập'
                                }
                            ]}>
                                <DatePicker style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Form.Item name="nhomNhiemVu" label="Nhóm nhiệm vụ" rules={[
                                {
                                    required: true,
                                    message: 'Nhóm nhiệm vụ bắt buộc nhập'
                                }
                            ]}>
                                <Select
                                    onChange={handleChangeNhomNhiemVu}
                                    style={{ width: '100$' }}
                                    options={lstNhomNhiemVu}
                                    placeholder="Chọn"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="diaDiemToChuc" label="Địa điểm tổ chức" rules={[
                                {
                                    required: true,
                                    message: 'Địa điểm tổ chức bắt buộc nhập'
                                }
                            ]}>
                                <Select
                                    onChange={() => handleChangeNhomNhiemVu}
                                    style={{ width: '100$' }}
                                    options={lstNhomNhiemVu}
                                    placeholder="Chọn"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="modal-footer">
                    <div className="modal-footer--action">
                        <Button type="text" icon={<FontAwesomeIcon icon={faFloppyDisk} />} style={{ color: 'var(--primary-color-viasm-active-color)' }} onClick={handleSubmit}>Lưu</Button>
                        <Button type="text" icon={<FontAwesomeIcon icon={faArrowRotateLeft} />} onClick={handleCloseForm}>Đóng</Button>
                    </div>
                </div>
            </Spin>
        </Modal>
    )
}

export default FormCommon
