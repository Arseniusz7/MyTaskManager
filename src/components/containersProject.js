/**
 * project colors
 */
import { connect } from 'react-redux'
import {Component} from 'react'
import {ManagerAccess} from './project/ManagerAccess'
import {ProjectListLoad} from './project/ProjectList'
import {AddTask} from './project/AddTask'
import {TaskListLoad, TaskListManagerLoad} from './project/TaskList'
import {DeveloperList} from './project/DeveloperList'
import {MyTaskFilter} from './project/filters/MyTasksFilter'
import {DeveloperFilters} from './project/filters/DeveloperFilters'
import {DefaultFilter} from './project/filters/DefaultTaskFilter'
import {SearchDevelopersForm} from './project/SearchDevelopersForm'
import {addProject, getProjects, addTask, getTasks, getDevelopers, changeTaskFilter,
    addDeveloperToProject} from '../actions'
import {findTasks, filterTasks, getItem} from '../lib/selectors'


export const Manager = connect(
    ({user, projects}) => ({user, projects}),
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(ManagerAccess)

export const SearchDevelopers = connect(
    null,
    dispatch =>
        ({
            onFind(firstName, lastName, id) {
                dispatch(getDevelopers(firstName, lastName, id))
            }
        })

)(SearchDevelopersForm)

export const Developers = connect(
    ({developers}) => ({developers}),
    dispatch =>
        ({
            assignDeveloper(projectID, id) {
                dispatch(addDeveloperToProject(projectID, id))
            }
        })
)(DeveloperList)

export const DevFilters = connect(
    ({user}) => ({user}),
    null
)(DeveloperFilters)

export const MyTasksFilter = connect(
    null,
    dispatch =>
        ({
            onFilterSelect(filter, key) {
                dispatch(changeTaskFilter(filter, key))
            },
        })
)(MyTaskFilter)

export const DefaultTasksFilter = connect(
    null,
    dispatch =>
        ({
            onFilterSelect(filter, key) {
                dispatch(changeTaskFilter(filter, key))
            },
        })
)(DefaultFilter)



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
    ({ projects, taskFilter }, { match }) => {
        let project = getItem(projects, match.params.id)
        return ({
            project: project,
            tasks: filterTasks(project.tasks, taskFilter),
            match
        })
    },
    dispatch =>
        ({
            loadTasks(projectID) {
                dispatch(getTasks(projectID))
            }
        })
)(TaskListLoad)

export const ManagerTasks = connect(
    ({ projects, taskFilter }, { match }) => {
        let project = getItem(projects, match.params.id)
        return ({
            project: project,
            tasks: filterTasks(project.tasks, taskFilter),
            match
        })
    },
    dispatch =>
        ({
            loadTasks(projectID) {
                dispatch(getTasks(projectID))
            }
        })
)(TaskListManagerLoad)


export const LoadProjects = connect(
    ({projects}) => ({projects}),
    dispatch =>
        ({
            loadProjects() {
                dispatch(getProjects())
            }
        })
)(ProjectListLoad)