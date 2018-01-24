import {FILTERS_DEVELOPER} from './../../../constants'

export const DefaultFilter = ({onFilterSelect=f=>f}) => {

    const onSelect = (e) => {
        e.preventDefault()
        onFilterSelect(FILTERS_DEVELOPER.NONE, -1)
    }

    return (
        <a href="#" onClick={onSelect}>
            Show all tasks
        </a>
    )
}