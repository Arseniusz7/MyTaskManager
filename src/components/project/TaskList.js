import {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {ShowNewTaskContainer, DevFilters, ShowFindDevContainer, DevelopersTask, Developers, TaskContainer} from '../containersProject'
import {URLS} from './../../constants'

import {ProjectDetails} from './Project'

export const TaskListHeader = ({projectID}) =>
    <div>
        <ShowNewTaskContainer projectID={projectID}/>
        <h3>Tasks:</h3>
    </div>

export const TaskListDev = ({project, tasks }) =>
    <div>
        <NavLink to={URLS.APP}>Go back to projects</NavLink>
        <h1>Project:</h1>
        <ProjectDetails {...project}/>
        <div>
            <TaskListHeader projectID={project._id}/>
            {
                tasks.map(task =>
                    <div>
                        <TaskContainer key={task._id} {...task}/>
                        <NavLink to={`${URLS.APP}/${project._id}${URLS.TASK}/${task._id}`}>
                            Go to tasks details
                        </NavLink>
                    </div>
                )
            }
        </div>
        <DevFilters/>
    </div>

export const TaskListManager = ({project, tasks }) =>
    <div>
        <NavLink to={URLS.APP}>Go back to projects</NavLink>
        <h1>Project:</h1>
        <ProjectDetails {...project}>
            <ShowFindDevContainer _id={project._id}/>
            <Developers projectID={project._id}/>
        </ProjectDetails>
        <div>
            <TaskListHeader projectID={project._id}/>
            {
                tasks.map(task =>
                    <div>
                        <TaskContainer key={task._id} {...task}/>
                        <NavLink to={`${URLS.APP}/${project._id}${URLS.TASK}/${task._id}`}>
                            Go to tasks details
                        </NavLink>
                        <ShowFindDevContainer _id={task._id}/>
                        <DevelopersTask taskID={task._id} projectID={project._id}/>
                    </div>
                )
            }
        </div>
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
        <TaskListDev project={project} tasks={tasks}/>
    </TaskListLoadDetails>

export const TaskListManagerLoad = ({project, tasks, match, loadTasks=f=>f}) =>
    <TaskListLoadDetails project={project} tasks={tasks} match={match} loadTasks={loadTasks}>
        <TaskListManager project={project} tasks={tasks}/>
    </TaskListLoadDetails>