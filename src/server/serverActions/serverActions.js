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

export const authSuccess = (_id, role) => ({
    type: ACTIONS.AUTHENTICATION,
    auth: MESSAGES.SUCCESS,
    id: _id.toString(),
    role: role,
    messageDetails: MESSAGES.SUCCESS
})

export const addProject = (project) => ({
    type: ACTIONS.ADD_PROJECT,
    id: project._id,
    title: project.title,
    description: project.description,
    developers: project.developers,
    tasks: project.tasks,
    timestamp: project.timestamp
})

export const addTask = (task, id) => ({
    id: id,
    type: ACTIONS.ADD_TASK,
    taskID: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    comments: task.comments,
    timestamp: task.timestamp
})

export const addTasks = (tasks, id) => ({
    id: id,
    type: ACTIONS.ADD_TASKS,
    tasks: tasks
})

export const addProjects = (projects) => ({
    type: ACTIONS.ADD_PROJECTS,
    projects: projects
})