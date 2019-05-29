import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import App from './App'
import {LocaleProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

const Root = ({ store }) => (
    <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </LocaleProvider>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root