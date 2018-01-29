import ACTIONS from '../constants'

export const user = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.AUTHENTICATION:
            return {
                auth: action.auth,
                id: action.id,
                role: action.role,
                messageDetails: action.messageDetails
            }
        case ACTIONS.EMAIL_SENT:
            return {
                ...state,
                auth: action.type
            }
        default:
            return state
    }
}

