import ACTIONS from '../constants'



export const developers = (state=[], action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_DEVELOPERS:
            return [...action.developers]
        default:
            return state
    }
}

