/**
 * project colors
 */
import ACTIONS, {MESSAGES, ROLES, ANONYMOUS_ID} from '../../constants'


export const authError = (err, auth=MESSAGES.LOGIN_ERROR) => ({
    type: ACTIONS.AUTHENTICATION,
    auth: auth,
    id: ANONYMOUS_ID,
    role: ROLES.ANONYMOUS,
    messageDetails: err.toString()
})

export const emailSent = () => ({
    type: ACTIONS.EMAIL_SENT
})

export const authSuccess = (_id, role) => ({
    type: ACTIONS.AUTHENTICATION,
    auth: MESSAGES.SUCCESS,
    id: _id,
    role: role,
    messageDetails: MESSAGES.SUCCESS
})

export const addProject = (project) => ({
    type: ACTIONS.ADD_PROJECT,
    id: project._id,
    title: project.title,
    description: project.description,
    timestamp: project.timestamp
})

export const addTask = (task) => ({
    id: task.project,
    type: ACTIONS.ADD_TASK,
    taskID: task._id,
    title: task.title,
    developer: task.developer,
    description: task.description,
    status: task.status,
    timestamp: task.timestamp
})

export const addTasks = (tasks, id) => ({
    id: id,
    type: ACTIONS.ADD_TASKS,
    tasks: tasks
})

export const addComment = (comment, projectID) => ({
    id: projectID,
    type: ACTIONS.ADD_COMMENT,
    taskID: comment.task,
    commentID: comment._id,
    text: comment.text,
    author: comment.author,
    timestamp: comment.timestamp
})

export const deleteComment = (_id, taskID, projectID) => ({
    id: projectID,
    type: ACTIONS.DELETE_COMMENT,
    taskID: taskID,
    commentID: _id,
})

export const updateComment = (text, _id, taskID, projectID) => ({
    id: projectID,
    type: ACTIONS.EDIT_COMMENT,
    taskID: taskID,
    commentID: _id,
    text: text
})

export const addComments = (comments, projectID, taskID) => ({
    id: projectID,
    type: ACTIONS.ADD_COMMENTS,
    taskID: taskID,
    comments: comments
})

export const updateStatusTasks = (status, taskID, projectID) => ({
    id: projectID,
    type: ACTIONS.UPDATE_TASK_STATUS,
    taskID: taskID,
    status: status
})

export const updateDeveloperTasks = (developer, taskID, projectID) => ({
    id: projectID,
    type: ACTIONS.UPDATE_TASK_DEVELOPER,
    taskID: taskID,
    developer: developer
})

export const addProjects = (projects) => ({
    type: ACTIONS.ADD_PROJECTS,
    projects: projects
})


export const addDevelopers = (developers, id) => ({
    type: ACTIONS.ADD_DEVELOPERS,
    id: id,
    developers: developers
})