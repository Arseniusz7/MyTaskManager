import {FILTERS_DEVELOPER} from '../../../constants'

export const MyTaskFilter = ({userID=-1, onFilterSelect=f=>f}) => {

    const onSelect = (e) => {
        e.preventDefault()
        onFilterSelect(FILTERS_DEVELOPER.MY_TASKS, userID)
    }

    return (
        <a href="#" onClick={onSelect}>
            Show my tasks
        </a>
    )
}