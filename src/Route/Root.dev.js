import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch , withRouter} from 'react-router-dom'

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';


import {nextUrl} from '../actions/public'
import Merchant from '../containers/Merchant'
import Schedules from '../containers/Schedules'
import Payment from '../containers/Payment'
import Login from '../containers/Login'
import Layout from '../containers/Layout'

moment.locale('zh-cn');


class Root extends  PureComponent{

    static propTypes = {
        store: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        props.store.subscribe(()=> {
            if (props.store.getState().common.nextUrl!=='') {
                this.props.history.push(props.store.getState().common.nextUrl)
            }
        })
    }

    componentWillMount() {
        let nextUrlSting = this.props.location.pathname
        let isLogin = localStorage.getItem('is_login')
        if (isLogin !== 'true' && nextUrlSting !== '/login'){
            nextUrl(nextUrlSting)
            this.props.history.replace('/login');
        }
        
        if (isLogin === true && nextUrlSting !== '/login') {
            this.props.history.replace('/')
        }

        let title
        switch(nextUrlSting){
            case '/':
                title="wc-首页";
                break;
            case '/login':
                title = "wc-登陆页面"
                break
            case '/merchant':
                title = "wc-商户"
                break
            case '/schedules':
                title = "wc-商户进件"
                break
            default:
                title="wc-内部系统";
                break;
        }
        document.title = title
    }

    render() {
        let routeLists = null
        let isLogin = localStorage.getItem('is_login')
        if (isLogin === 'true') {
            let routerComponent = (
                <Switch>
                    <Route exact path="/" component={Merchant}/>
                    <Route exact path="/schedules" component={Schedules}/>
                    <Route exact path="/merchant"
                           component={Merchant}/>
                    <Route exact path="/payment" component={Payment}/>
                </Switch>
            )
            routeLists = (
                <div>
                    <Layout childNode={routerComponent}/>
                </div>
            )
        } else {
            routeLists = (
                <Switch>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            )
        }
        return (
            <Provider store={this.props.store}>
                <LocaleProvider locale={zh_CN}>
                    {routeLists}
                </LocaleProvider>
            </Provider>
        )
    }
}

export default withRouter(Root)