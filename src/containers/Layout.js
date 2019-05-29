import React, { PureComponent } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LeftMenu from '../components/LeftMenu'
import Header from '../components/Header'
import {
    toggleCollapsedAction,
    changeThemeAction,
    showDrawerAction,
    onCloseHeaderAction,
    renovateSuccessState,
    renovateErrorState
} from '../actions/public'
import {changeAdminPassword} from '../actions/common'

class Layout extends PureComponent {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
        theme: PropTypes.string.isRequired,
        loginName: PropTypes.string,
        childNode: PropTypes.object.isRequired,
    }


    render() {
        return (
            <div>
                <Header
                    showDrawer={this.props.showDrawer}
                    onClose={this.props.onCloseHeader}
                    visible={this.props.visibleHeader}
                    errorMessage={this.props.errorMessage}
                    successMessage={this.props.successMessage}
                    changeAdminPassword={this.props.changeAdminPassword}
                    renovateSuccessState={this.props.renovateSuccessState}
                    renovateErrorState={this.props.renovateErrorState}
                />
                <div style={{display: 'flex'}}>
                    <LeftMenu
                        collapsed={this.props.collapsed}
                        toggleCollapsed={this.props.toggleCollapsed}
                        changeTheme={this.props.changeTheme}
                        theme={this.props.theme}
                        rightNowVisit={this.props.location.pathname.split("/")[1]===""?"merchant":
                            this.props.location.pathname.split("/")[1]}
                    />
                    {this.props.childNode}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    collapsed: state.common.collapsed,
    theme: state.common.theme,
    loginName: state.common.isLogin['LoginName'],
    visibleHeader: state.common.visibleHeader,
    errorMessage: state.message.errorMessage,
    successMessage: state.message.successMessage
})

const mapDispatchToProps = (dispatch) => ({
    toggleCollapsed: () => toggleCollapsedAction()(dispatch),
    changeTheme: () => changeThemeAction()(dispatch),
    showDrawer: ()=> showDrawerAction()(dispatch),
    onCloseHeader: ()=> onCloseHeaderAction()(dispatch),
    changeAdminPassword: (values) => changeAdminPassword(values)(dispatch),
    renovateSuccessState: ()=>renovateSuccessState()(dispatch),
    renovateErrorState: ()=>renovateErrorState()(dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))