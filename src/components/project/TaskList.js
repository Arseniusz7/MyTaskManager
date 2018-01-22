import {Component} from 'react'
import {Task} from './Task'

export class TaskList extends Component {

    componentDidMount() {
        let {loadTasks, match} = this.props
        loadTasks(match.params.id)
    }

    render() {
        let {tasks} = this.props
        if(tasks)
            return tasks.map(task =>
                <Task key={task._id} {...task}/>
            )
        else
            return null
    }
}

