import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Cookies from 'js-cookie'

import {Row, Col, Drawer, Form, Input, Button, Icon, Modal, message} from 'antd';
import Style from './Header.scss'

const roleObject = {BUSINESS:'商务', FINANCE:'财务', RISKER:'风控', SECONDRISKER:'二级风控'}
export default class Header extends PureComponent{
    static propTypes = {
        showDrawer: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        visible: PropTypes.bool,
        changeAdminPassword: PropTypes.func.isRequired,
        errorMessage: PropTypes.object,
        successMessage: PropTypes.object,
        renovateErrorState: PropTypes.func.isRequired,
        renovateSuccessState: PropTypes.func.isRequired,
    }

    error = (title, message) =>{
        Modal.error({
            title: title,
            content: message,
            visible: true
        });
    }

    success = (title, message) => {
        Modal.success({
            title: title,
            content: message,
            visible: true
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeAdminPassword(values)
            } else {
                this.error('修改密码', '修改失败')
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let errorMessage = nextProps.errorMessage
        let successMessage = nextProps.successMessage

        if (errorMessage !== undefined && errorMessage.message !== undefined) {
            message.error(errorMessage.message, 5);
            this.props.renovateErrorState()
        }

        if (successMessage !== undefined && successMessage.message !== undefined) {
            message.success(successMessage.message, 2);
            this.props.renovateSuccessState()
        }
    }

    logout = () => {
        Cookies.remove('token')
        localStorage.clear()
    }

    render() {
        let loginInfo = localStorage.getItem("login_user_info")
        loginInfo = JSON.parse(loginInfo)
        return (
            <div className={Style["header-div"]}>
                <header>
                    <Row className={Style["row-header"]}>
                        <Col span={5} className={Style["row-right"]}>
                            <img className={Style["img-style"]} src='/img/logo_new.png' alt="logo"/>
                            <span className={Style["row-span"]}>WiseChshier 内部系统</span>
                        </Col>

                        <Col span={19}>
                            <div className={Style["header-right"]}>
                                <span>{roleObject[loginInfo.Role]}</span>
                                <span className={Style["right-span"]} onClick={this.props.showDrawer}>
                                    {loginInfo.RealName}
                                </span>
                                <span>
                                    <a href="/login" onClick={this.logout}>
                                        退出登录
                                    </a>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </header>
                <Drawer
                    title="修改密码"
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请在输入一次" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                确定修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}