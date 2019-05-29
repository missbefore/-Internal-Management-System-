import React, { PureComponent } from 'react'
import HomeComponent from '../components/Login'
import { connect } from 'react-redux'
import {loginInAction} from "../actions/common";


class App extends PureComponent {

    render() {

        return (
            <div>
                <HomeComponent
                    loginInSystem = {this.props.loginIn}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.common.isLogin,
})


const mapDispatchToProps = (dispatch) => ({
    loginIn: (object)=>loginInAction(object)(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)