import {TASK_STATUS_ARRAY} from './../../constants'

export const AddTask = ({projectID=-1, onNewTask = f=>f}) => {
    let title
    let description
    let option

    const submit = (e) => {
        e.preventDefault()
        onNewTask(title.value, description.value, option.value, projectID)
        option.value = TASK_STATUS_ARRAY[0]
        title.value = ''
        description.value = ''
    }

    return (
        <form onSubmit={submit}>
            <h3>Create new Task</h3>
            <div>
                <input ref={(input) => title = input } type="text" placeholder="Title" required/>
            </div>
            <div>
                <span>
                    <span>Status: </span>
                    <select ref={(select) => option = select}>
                        <option disabled>Choose status</option>
                        {
                            TASK_STATUS_ARRAY.map(item =>
                                <option>{item}</option>
                            )
                        }
                    </select>
                </span>
            </div>
            <div>
                <input ref={(input) => description = input } type="text" placeholder="Description"/>
            </div>
            <button className="btn btn-primary">Add Task</button>
        </form>
    )
}