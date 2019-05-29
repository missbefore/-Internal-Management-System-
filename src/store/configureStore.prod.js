import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const configureStore = preloadedState => createStore(
    preloadedState,
    applyMiddleware(thunk)
)

export default configureStore