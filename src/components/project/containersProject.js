/**
 * project colors
 */
import { connect } from 'react-redux'
import {Component} from 'react'
import {ManagerAccess} from './ManagerAccess'
import {ProjectList} from './ProjectList'
import {AddTask} from './AddTask'
import {TaskList} from './TaskList'
import {addProject, getProjects, addTask, getTasks} from './../../actions'
import {findTasks} from '../../lib/selectors'


export const Manager = connect(
    ({user}) => ({ user}),
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(ManagerAccess)

export const Projects = connect(
    ({projects}) => ({projects}),
    null
) (ProjectList)


export const NewTask = connect(
    null,
    dispatch =>
        ({
            onNewTask(title, description, option, projectID) {
                dispatch(addTask(title, description, option, projectID))
            }
        })
) (AddTask)


export const Tasks = connect(
    ({ projects }, { match }) =>
        ({
            tasks: findTasks(projects, match.params.id),
            match
        }),
    dispatch =>
        ({
            loadTasks(projectID) {
                dispatch(getTasks(projectID))
            }
        })
)(TaskList)


class ProjectListLoad extends Component {
    componentDidMount () {
        this.props.loadProjects()
    }

    render() {
        return <Projects/>
    }
}

export const LoadProjects = connect(
    null,
    dispatch =>
        ({
            loadProjects() {
                dispatch(getProjects())
            }
        })
)(ProjectListLoad)