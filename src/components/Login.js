import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Style from './Login.scss'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {
    Form, Icon, Input, Button, message
} from 'antd';


class Login extends PureComponent {
    static propTypes = {
        landingResult : PropTypes.object,
        errorMessage: PropTypes.object,
        successMessage: PropTypes.object,
        loginInSystem: PropTypes.func.isRequired,
        renovateErrorState: PropTypes.func,
    }


    componentWillReceiveProps(nextProps, nextContext) {
        let errorMessage = nextProps.errorMessage
        let successMessage = nextProps.successMessage

        if (errorMessage !== undefined && errorMessage.message !== undefined) {
            message.error(errorMessage.message, 5);
            this.props.renovateErrorState()
        }

        if (successMessage !== undefined && successMessage.message !== undefined) {
            this.getLoginStatus = setInterval(()=> {
                let token = Cookies.get("token")
                if (token) {
                    clearInterval(this.getLoginStatus)
                    this.props.history.replace('/')
                    message.success(successMessage.message, 2);
                }
            }, 1000)
        }
    }

    loginIn = (e) => {
        e.preventDefault()
        let obj = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                 obj = values
            } else {
                 obj = err
            }
        })

        if (!obj){return false}
        if (obj.userName && obj.password) {
            message.loading('Action in progress..', 3)
            this.props.loginInSystem(obj)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={Style["login-box"]}>
                <div className={Style["login-header-box"]}>
                    <img className={Style["login-image"]} alt="logo" src="https://t-bj-public-1.oss-cn-shanghai.aliyuncs.com/logo/wc-logo.png"/>
                    <h1 className={Style["title-h1"]}>登陆运营系统</h1>
                    <p>请注意保管好自己的权限，你的权限就是公司的资产</p>
                </div>
                <Form onSubmit={this.loginIn} className={Style["login-form"]}>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入你的账号!' }],
                        })(
                            <Input className={Style["input-style"]} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账户名称" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入你的密码!' }],
                        })(
                            <Input className={Style["input-style"]} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={Style["login-form-button"]}>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Login = Form.create({name: 'login'})(withRouter(Login))