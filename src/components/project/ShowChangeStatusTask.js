import {ChangeTaskStatus} from './ChangeTaskStatus'

export const ShowChangeStatusTask = ({show_id, _id, project, onChangeStatus=f=>f, isChangeStatusTask=f=>f}) => {

    const showChangeStatusTask = e => {
        e.preventDefault()
        isChangeStatusTask(_id)
    }

    const hideChangeStatusTask = e => {
        e.preventDefault()
        isChangeStatusTask("-1")
    }

    return (show_id.changeStatusTask === _id) ?
        <div>
            <a href="#" onClick={hideChangeStatusTask}>Cancel</a>
            <div>
                <ChangeTaskStatus _id={_id} project={project} onChangeStatus={onChangeStatus}/>
            </div>
        </div> :
        <div>
            <a href="#" onClick={showChangeStatusTask}>Change Status</a>
        </div>
}