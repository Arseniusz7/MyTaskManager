import {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Task} from './Task'
import {NewTask, DevFilters, SearchDevelopers, Developers} from '../containersProject'
import {URLS} from './../../constants'

import {ProjectDetails} from './Project'

export const TaskList = ({projectID, tasks}) =>
    <div>
        <NavLink to={URLS.APP}>Go back to projects</NavLink>
        <NewTask projectID={projectID}/>
        <h3>Tasks:</h3>
        {
            tasks.map(task =>
                <Task key={task._id} {...task}/>
            )
        }
    </div>

export const TaskListDetails = ({project, tasks, children}) =>
    <div>
        <h1>Project:</h1>
        {children}
        <TaskList projectID={project._id} tasks={tasks}/>
        <DevFilters/>
    </div>


export class TaskListLoadDetails extends Component {

    componentDidMount() {
        let {loadTasks, match, tasks} = this.props
        if(!(tasks && tasks.length !== 0))
            loadTasks(match.params.id)
    }

    render() {
        let {tasks, children} = this.props
        if(tasks) {
            return children
        }
        else
            return null
    }
}


export const TaskListLoad = ({project, tasks, match, loadTasks=f=>f}) =>
    <TaskListLoadDetails tasks={tasks} match={match} loadTasks={loadTasks}>
        <TaskListDetails project={project} tasks={tasks}>
            <ProjectDetails {...project}/>
        </TaskListDetails>
    </TaskListLoadDetails>

export const TaskListManagerLoad = ({project, tasks, match, loadTasks=f=>f}) =>
    <TaskListLoadDetails project={project} tasks={tasks} match={match} loadTasks={loadTasks}>
        <TaskListDetails project={project} tasks={tasks}>
            <ProjectDetails {...project}>
                <SearchDevelopers id={project._id}/>
                <Developers projectID={project._id}/>
            </ProjectDetails>
        </TaskListDetails>
    </TaskListLoadDetails>