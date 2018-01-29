
import ACTIONS from '../constants'

export const comment = (state = {}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_COMMENT:
            return {
                _id: action.commentID,
                task: action.taskID,
                text: action.text,
                author: action.author,
                timestamp: action.timestamp
            }
        case ACTIONS.EDIT_COMMENT:
            return (state._id !== action.commentID) ?
                state :
                {
                    ...state,
                    text: action.text
                }
        default:
            return state
    }

}

export const comments = (state = [], action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_COMMENT:
            return [
                ...state,
                comment({}, action)
            ]
        case ACTIONS.DELETE_COMMENT:
            return state.filter(comment => comment._id !== action.commentID)
        case ACTIONS.EDIT_COMMENT:
            return state.map(comm => comment(comm, action))
        default:
            return state
    }
}

export const task = (state = {}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return {
                _id: action.taskID,
                project: action.id,
                title: action.title,
                description: action.description,
                status: action.status,
                developer: action.developer,
                comments: [],
                timestamp: action.timestamp
            }
        case ACTIONS.UPDATE_TASK_STATUS:
            return (state._id !== action.taskID) ?
                state :
                {
                    ...state,
                    status: action.status
                }
        case ACTIONS.UPDATE_TASK_DEVELOPER:
            return (state._id !== action.taskID) ?
                state :
                {
                    ...state,
                    developer: action.developer
                }
        case ACTIONS.ADD_COMMENTS:
            return (state._id !== action.taskID) ?
                state :
                {
                    ...state,
                    comments: action.comments
                }
        case ACTIONS.ADD_COMMENT:
        case ACTIONS.DELETE_COMMENT:
        case ACTIONS.EDIT_COMMENT:
            return (state._id !== action.taskID) ?
                state :
                {
                    ...state,
                    comments: comments(state.comments, action)
                }
        default:
            return state
    }
}


export const tasks = (state = [], action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return [
                ...state,
                task({}, action)
            ]
        case ACTIONS.UPDATE_TASK_STATUS:
        case ACTIONS.UPDATE_TASK_DEVELOPER:
        case ACTIONS.ADD_COMMENT:
        case ACTIONS.ADD_COMMENTS:
        case ACTIONS.DELETE_COMMENT:
        case ACTIONS.EDIT_COMMENT:
            return state.map(t => task(t, action))
        default:
            return state
    }
}

export const project = (state = {}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return {
                _id: action.id,
                title: action.title,
                description: action.description,
                developers: [],
                tasks: [],
                timestamp: action.timestamp
            }
        case ACTIONS.ADD_TASKS:
            return (state._id !== action.id) ?
                state :
                {
                    ...state,
                    tasks: action.tasks
                }
        case ACTIONS.ADD_TASK:
        case ACTIONS.UPDATE_TASK_STATUS:
        case ACTIONS.UPDATE_TASK_DEVELOPER:
        case ACTIONS.ADD_COMMENT:
        case ACTIONS.ADD_COMMENTS:
        case ACTIONS.DELETE_COMMENT:
        case ACTIONS.EDIT_COMMENT:
            return (state._id !== action.id) ?
                state :
                {
                    ...state,
                    tasks: tasks(state.tasks, action)
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
        case ACTIONS.ADD_TASK:
        case ACTIONS.ADD_TASKS:
        case ACTIONS.UPDATE_TASK_STATUS:
        case ACTIONS.UPDATE_TASK_DEVELOPER:
        case ACTIONS.ADD_COMMENT:
        case ACTIONS.ADD_COMMENTS:
        case ACTIONS.DELETE_COMMENT:
        case ACTIONS.EDIT_COMMENT:
            return state.map(proj => project(proj, action))
        default:
            return state
    }
}