import { createStore, combineReducers, applyMiddleware } from 'redux'
import {projects} from './projectReducers'
import {user} from './userReducers'
import {developers} from './developerReducers'
import {taskFilter} from './taskFilterReducers'
import thunk from 'redux-thunk'

const clientLogger = store => next => action => {
    if (action.type) {
        let result
        console.groupCollapsed("dispatching", action.type)
        console.log('prev state', store.getState())
        console.log('action', action)
        result = next(action)
        console.log('next state', store.getState())
        console.groupEnd()
        return result
    } else {
        return next(action)
    }
}

const serverLogger = store => next => action => {
    console.log('\n  dispatching server action\n')
    console.log(action)
    console.log('\n')
    return next(action)
}

const middleware = server => [
    (server) ? serverLogger : clientLogger,
    thunk
]

const storeFactory = (server = false, initialState = {}) =>
    applyMiddleware(...middleware(server))(createStore)(
        combineReducers({projects, user, developers, taskFilter}),
        initialState
    )

export default storeFactory
