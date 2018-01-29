
import { connect } from 'react-redux'
import {Component} from 'react'
import {ManagerProjects} from './project/ManagerAccess'
import {ProjectListLoad} from './project/ProjectList'
import {AddTask} from './project/AddTask'
import {TaskListLoad, TaskListManagerLoad} from './project/TaskList'
import {DeveloperList, TaskDeveloperList} from './project/DeveloperList'
import {AddProjectForm} from './project/AddProjectForm'
import {MyTaskFilter} from './project/filters/MyTasksFilter'
import {DeveloperFilters} from './project/filters/DeveloperFilters'
import {DefaultFilter} from './project/filters/DefaultTaskFilter'
import {SearchDevelopersForm} from './project/SearchDevelopersForm'
import {TaskDetails} from './project/TaskDetails'
import {CommentList} from './project/CommentList'
import {Comment} from './project/Comment'
import {ShowCommentEdit} from './project/ShowCommentEdit'
import {ShowChangeStatusTask} from './project/ShowChangeStatusTask'
import {ShowFindDev} from './project/ShowFindDevProject'
import {ShowAddComment} from './project/ShowAddComment'
import {ShowNewTask} from './project/ShowNewTask'
import {ShowNewProject} from './project/ShowNewProject'
import {addProject, getProjects, addTask, getTasks, getDevelopers, changeTaskFilter,
    addDeveloperToProject, addDeveloperToTask, updateTaskStatus, addComment,
    getComments, deleteComment, editComment, showEditComment, showChangeStatusTask,
    showFindDev, showReplyComment, showNewTask, showAddProject } from '../actions'
import { filterTasks, getItem, findTasks} from '../lib/selectors'


export const Manager = connect(
    ({projects}) => ({projects}),
    null
)(ManagerProjects)

export const NewProject = connect(
    null,
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(AddProjectForm)

export const Comments = connect(
    ({projects}, {match, userID}) => ({
        comments: getItem(findTasks(projects, match.params.id), match.params.task_id).comments,
        match,
        userID
    }),
    dispatch =>
        ({
            loadComments(projectID, taskID) {
                dispatch(getComments(projectID, taskID))
            }
        })
)(CommentList)

export const ShowCommentEditContainer = connect(
    ({show_id}, {text, _id, author, taskID, projectID}) => ({
        show_id, text, _id, author, taskID, projectID
    }),
    dispatch =>
        ({
            onCommentEdit(editText, _id, author, taskID, projectID) {
                dispatch(editComment(editText, _id, author, taskID, projectID))
            },
            isEditComment(_id) {
                dispatch(showEditComment(_id))
            }
        })
)(ShowCommentEdit)

export const ShowChangeStatusTaskContainer = connect(
    ({show_id}) => ({show_id}),
    dispatch =>
        ({
            isChangeStatusTask(_id) {
                dispatch(showChangeStatusTask(_id))
            },
            onChangeStatus(option, _id, projectID) {
                dispatch(updateTaskStatus(option, _id, projectID))
            }

        })
)(ShowChangeStatusTask)

export const ShowAddCommentContainer = connect(
    ({show_id}) => ({show_id}),
    dispatch =>
        ({
            isAddComment(_id) {
                dispatch(showReplyComment(_id))
            }
        })
)(ShowAddComment)

export const ShowNewTaskContainer = connect(
    ({show_id}) => ({show_id}),
    dispatch =>
        ({
            isNewTask(_id) {
                dispatch(showNewTask(_id))
            }
        })
)(ShowNewTask)

export const ShowNewProjectContainer = connect(
    ({show_id}) => ({show_id}),
    dispatch =>
        ({
            isNewProject(_id) {
                dispatch(showAddProject(_id))
            }
        })
)(ShowNewProject)

export const ShowFindDevContainer = connect(
    ({show_id}) => ({show_id}),
    dispatch =>
        ({
            isFindDevProject(_id) {
                dispatch(showFindDev(_id))
            }
        })
)(ShowFindDev)

export const CommentContainer = connect(
    null,
    dispatch =>
        ({
            onCommentDelete(_id, author, taskID, projectID) {
                dispatch(deleteComment(_id, author, taskID, projectID))
            }
        })
)(Comment)

export const TaskDetailsContainer = connect(
    ({user, projects}, {match}) => ({
        user: user,
        task: getItem(findTasks(projects, match.params.id), match.params.task_id),
        match
    }),
    dispatch =>
        ({
            onReply(text, userID, taskID, projectID) {
                dispatch(addComment(text, userID, taskID, projectID))
            }
        })
)(TaskDetails)

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
    ({developers, show_id}) => ({developers, show_id}),
    dispatch =>
        ({
            assignDeveloper(projectID, id) {
                dispatch(addDeveloperToProject(projectID, id))
            }
        })
)(DeveloperList)

export const DevelopersTask = connect(
    ({developers, show_id}) => ({developers, show_id}),
    dispatch =>
        ({
            assignDeveloper(taskID, projectID, id) {
                dispatch(addDeveloperToTask(taskID, projectID, id))
            }
        })
)(TaskDeveloperList)

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