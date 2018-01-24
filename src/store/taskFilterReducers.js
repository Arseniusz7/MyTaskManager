import ACTIONS from '../constants'

export const taskFilter = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.CHANGE_TASK_FILTERS:
            return {
                taskFilter: action.taskFilter,
                keyFilter: action.keyFilter
            }
        default:
            return state
    }
}