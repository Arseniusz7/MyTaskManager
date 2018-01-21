/**
 * project colors
 */
import ACTIONS from '../constants'

export const project = (state = {}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return {
                id: action.id,
                title: action.title,
                description: action.description,
                developers: action.developers,
                tasks: action.tasks,
                timestamp: action.timestamp
            }
        default:
            return state
    }
}

export const projects = (state=[], action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return [
                ...state,
                project({}, action)
            ]
        case ACTIONS.ADD_PROJECTS:
            return [...state, ...action.projects]
        default:
            return state
    }
}