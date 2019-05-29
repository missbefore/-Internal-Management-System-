import React, { PureComponent } from 'react'
import LoginComponent from '../components/Login'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {loginInAction} from '../actions/common'
import {renovateErrorState} from "../actions/public";


class Login extends PureComponent {
    static propTypes = {
        isLogin: PropTypes.object
    }
    render() {

        return (
            <div>
                <LoginComponent
                    landingResult = {this.props.isLogin}
                    loginInSystem={this.props.loginIn}
                    errorMessage={this.props.error}
                    successMessage={this.props.success}
                    renovateErrorState={this.props.renovateErrorState}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.common.isLogin,
    error: state.message.errorMessage,
    success:state.message.successMessage
})

const mapDispatchToProps = (dispatch) => ({
    loginIn: (object)=>loginInAction(object)(dispatch),
    renovateErrorState: ()=>renovateErrorState()(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)