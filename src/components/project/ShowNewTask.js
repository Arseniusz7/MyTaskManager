import {NewTask} from '../containersProject'

export const ShowNewTask = ({show_id, projectID, isNewTask=f=>f}) => {

    const showNewTask = e => {
        e.preventDefault()
        isNewTask(projectID)
    }

    const hideNewTask = e => {
        e.preventDefault()
        isNewTask("-1")
    }

    return (show_id.newTask === projectID) ?
        <div>
            <a href="#" onClick={hideNewTask}>Cancel</a>
            <NewTask projectID={projectID}/>
        </div> :
        <div>
            <a href="#" onClick={showNewTask}>Add task</a>
        </div>
}