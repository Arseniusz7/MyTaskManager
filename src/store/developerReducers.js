export const developer = (state = {}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return {
                _id: action.id,
                title: action.title,
                description: action.description,
                developers: action.developers,
                tasks: [],
                timestamp: action.timestamp
            }
        case ACTIONS.ADD_TASK:
            return (state._id !== action.id) ?
                state :
                {
                    ...state,
                    tasks: tasks(state.tasks, action)
                }
        case ACTIONS.ADD_TASKS:
            return (state._id !== action.id) ?
                state :
                {
                    ...state,
                    tasks: action.tasks
                }
        default:
            return state
    }
}

export const developers = (state=[], action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_PROJECT:
            return [
                ...state,
                project({}, action)
            ]
        case ACTIONS.ADD_PROJECTS:
            return [...state, ...action.projects]
        case ACTIONS.ADD_TASK:
            return state.map(proj => project(proj, action))
        case ACTIONS.ADD_TASKS:
            return state.map(proj => project(proj, action))
        default:
            return state
    }
}