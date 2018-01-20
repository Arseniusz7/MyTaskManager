/**
 * project colors
 */
import ACTIONS from '../constants'

export const user = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.AUTHENTICATION:
            return {
                auth: action.auth,
                role: action.role,
                messageDetails: action.messageDetails
            }
        default:
            return state
    }
}

