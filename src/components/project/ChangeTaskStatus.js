import {TASK_STATUS_ARRAY} from './../../constants'

export const ChangeTaskStatus = ({ _id, project, onChangeStatus=f=>f}) => {

    let option

    const onChooseStatus = e => {
        e.preventDefault()
        onChangeStatus(option.value, _id, project)
        option.value = TASK_STATUS_ARRAY[0]
    }

    return (
    <span>
        <a href="#" onClick={onChooseStatus}> Change Status </a>
        <select ref={(select) => option = select}>
            <option disabled>Choose status</option>
            {
                TASK_STATUS_ARRAY.map(item =>
                    <option>{item}</option>
                )
            }
        </select>
    </span>)
}