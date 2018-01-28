import ACTIONS from '../constants'



export const show_id = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                replyComment: "-1",
            }
        case ACTIONS.EDIT_COMMENT:
            return {
                ...state,
                editComment: "-1",
            }
        case ACTIONS.UPDATE_TASK_STATUS:
            return {
                ...state,
                changeStatusTask: "-1",
            }
        case ACTIONS.ADD_PROJECT:
            return {
                ...state,
                addProject:"-1",
            }
        case ACTIONS.ADD_TASK:
            return {
                ...state,
                newTask: "-1",
            }
        case ACTIONS.SHOW_REPLY_COMMENT:
            return {
                ...state,
                replyComment: action.id,
            }
        case ACTIONS.SHOW_EDIT_COMMENT:
            return {
                ...state,
                editComment: action.id,
            }
        case ACTIONS.SHOW_FIND_DEV:
            return {
                ...state,
                findDev: action.id,
            }
        case ACTIONS.SHOW_CHANGE_STATUS_TASK:
            return {
                ...state,
                changeStatusTask: action.id,
            }
        case ACTIONS.SHOW_ADD_PROJECT:
            return {
                ...state,
                addProject: action.id,
            }
        case ACTIONS.SHOW_NEW_TASK:
            return {
                ...state,
                newTask: action.id,
            }
        default:
            return state
    }
}