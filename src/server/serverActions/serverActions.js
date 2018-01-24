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

export const addTask = (task, id) => ({
    id: id,
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

export const addTasksWithProject = (project) => ({
    type: ACTIONS.ADD_PROJECTS,
    projects: [project]
})

export const addProjects = (projects) => ({
    type: ACTIONS.ADD_PROJECTS,
    projects: projects
})

export const pickManagerProjects = (projects) => ({
    type: ACTIONS.PICK_MANAGER_PROJECT,
    projects: projects
})

export const pickDeveloperProjects = (projects) => ({
    type: ACTIONS.PICK_DEVELOPER_PROJECT,
    projects: projects
})


export const addDevelopers = (developers, id) => ({
    type: ACTIONS.ADD_DEVELOPERS,
    id: id,
    developers: developers
})