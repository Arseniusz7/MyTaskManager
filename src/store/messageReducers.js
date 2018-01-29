import ACTIONS, {MESSAGES} from '../constants'
import {toast} from 'react-toastify'

export const message = (state={}, action={type: null}) => {
    switch (action.type) {
        case ACTIONS.DEVELOPER_ADDED_TO_PROJECT:
            toast.success(MESSAGES.DEVELOPER_ADDED_TO_PROJECT, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            return MESSAGES.DEVELOPER_ADDED_TO_PROJECT
        case ACTIONS.DEVELOPER_IS_NOT_IN_PROJECT:
            toast.error(MESSAGES.DEVELOPER_IS_NOT_IN_PROJECT, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            return MESSAGES.DEVELOPER_IS_NOT_IN_PROJECT
        default:
            return ""
    }
}

