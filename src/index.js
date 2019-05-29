import React from 'react'
import { render } from 'react-dom'
import {BrowserRouter as Router } from 'react-router-dom'
import Root from './Route/Root'
import configureStore from './store/configureStore'


export const store = configureStore()

render(
    <Router>
        <Root store={store}/>
    </Router>,
    document.getElementById('root')
)