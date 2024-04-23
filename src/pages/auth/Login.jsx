import React from 'react';
import { Form, Row, Col, Input, Checkbox, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { login } from '@/services/user/index.js'

function Login() {
    const [form] = Form.useForm();

    async function handleLogin() {
        try {
            const params = {
                ...form.getFieldsValue()
            }
            const rs = await login(params)
            if (rs) {
                // TODO: SAVE TOKEN TO LOCALSTORAGE
            }
        } catch {}
    }

    return (
        <div className="auth-login">
            <div className="login-wrapper">
                <div className="login-title">
                    <span className="login-title--title">VIỆN NGHIÊN CỨU CAO CẤP VỀ TOÁN</span>
                </div>
                <div className="login-form">
                    <div className="login-form--header">
                        <div className="login-form--image"></div>
                        <Form form={form} layout="vertical" className="login-form--login">
                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                    <Form.Item name="username" label="" rules={[
                                        {
                                            required: true,
                                            message: 'Tên đăng nhập hoặc Email bắt buộc nhập'
                                        }
                                    ]}>
                                        <Input
                                            placeholder="Tên đăng nhập hoặc Email"
                                            size="large"
                                            prefix={<FontAwesomeIcon icon={faUser} />}
                                        >
                                        </Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form.Item name="password" label="" rules={[
                                        {
                                            required: true,
                                            message: 'Mật khẩu bắt buộc nhập'
                                        }
                                    ]}>
                                        <Input.Password
                                            placeholder="Mật khẩu"
                                            size="large"
                                            prefix={<FontAwesomeIcon icon={faKey} size="large" />}
                                        ></Input.Password>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Checkbox style={{ color: 'white' }}>Ghi nhớ đăng nhập</Checkbox>
                                </Col>
                                <Col span={12} style={{ textAlign: "end" }}>
                                    <span style={{textDecoration: "underline", cursor: 'pointer'}}>Quên mật khẩu?</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Button className="button-login" size="large" onClick={() => handleLogin}>Đăng nhập</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: "center" }}>
                                    <span style={{textDecoration: "underline", cursor: 'pointer'}}>Đăng ký</span>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
