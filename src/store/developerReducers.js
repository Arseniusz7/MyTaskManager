import ACTIONS from '../constants'



export const developers = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.ADD_DEVELOPERS:
            return {
                _id: action.id,
                developers: action.developers
            }
        default:
            return state
    }
}

