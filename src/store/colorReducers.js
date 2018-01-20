import ACTIONS from '../constants'

export const color = (state = {}, action={ type: null }) => {
    switch (action.type) {
        case ACTIONS.ADD_COLOR:
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case ACTIONS.RATE_COLOR:
            return (state.id !== action.id) ? state :
            {
                ...state,
                rating: action.rating
            }
        default:
            return state
    }
}

export const colors = (state = [], action={ type: null }) => {
    switch (action.type) {
        case ACTIONS.ADD_COLOR :
            return [
                ...state,
                color({}, action)
            ]
        case ACTIONS.RATE_COLOR:
            return state.map(
                c => color(c, action)
            )
        case ACTIONS.REMOVE_COLOR:
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state
    }
}

