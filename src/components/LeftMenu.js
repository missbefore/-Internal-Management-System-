import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {Menu, Icon, Switch} from 'antd'
import Style from './LeftMenu.scss'

export default class LeftMenu extends PureComponent {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
        theme: PropTypes.string.isRequired,
        toggleCollapsed: PropTypes.func.isRequired,
        changeTheme: PropTypes.func.isRequired,
        rightNowVisit: PropTypes.string
    }

    handleClick = (e) => {
        console.log('click ', e);
    }

    render() {
        return(
            <div className={Style["menu-div"]}>
                <div className={Style["menu-div-inline"]}>
                    <Switch
                        checked={this.props.collapsed}
                        onChange={this.props.toggleCollapsed}
                        checkedChildren="收起"
                        unCheckedChildren="展开"
                    />

                    <span className="ant-divider" style={{ margin: '0 1em' }} />
                    <Switch
                        checked={this.props.theme === 'dark'}
                        onChange={this.props.changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </div>
                <br/>
                <br/>
                <Menu
                    theme = {this.props.theme}
                    onClick={this.handleClick}
                    mode="inline"
                    inlineCollapsed={this.props.collapsed}
                    className={Style["menu-list"]}
                    selectable={true}
                    selectedKeys={[this.props.rightNowVisit]}
                >
                    <Menu.Item key="merchant">
                        <a className={Style['menu-item']} href="/merchant">
                            <Icon type="shop" />
                            <span>商户</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="schedules">
                        <a className={Style['menu-item']} href="/schedules">
                            <Icon type="calculator" />
                            <span>进件</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="payment">
                        <a className={Style['menu-item']} href="/payment">
                            <Icon type="wallet" />
                            <span>支付</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item  key="refund">
                        <a className={Style['menu-item']} href="/refund">
                            <Icon type="undo" />
                            <span>退款</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="withdraw">
                        <a className={Style['menu-item']} href="/withdraw">
                            <Icon type="money-collect" />
                            <span>提现</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="agents">
                        <a className={Style['menu-item']} href="/agents">
                            <Icon type="reconciliation" />
                            <span>服务商</span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="balance">
                        <a className={Style['menu-item']} href="/balance">
                            <Icon type="pay-circle" />
                            <span>余额</span>
                        </a>

                    </Menu.Item>
                    <Menu.Item key="sharing">
                        <a className={Style['menu-item']} href="/sharing">
                            <Icon type="red-envelope" />
                            <span>分润</span>
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}