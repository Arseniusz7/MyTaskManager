export const URL_DOMAIN = "http://localhost:3000"
export const DB_CONNECTION = 'mongodb://localhost/TaskManager'
export const SESSION_SECRET = "SECRET"
export const ANONYMOUS_ID = "-1"

export const ACTIONS = {
    // project
    ADD_PROJECT: "ADD_PROJECT",
    ADD_PROJECTS: "ADD_PROJECTS",
    ADD_TASK: "ADD_TASK",
    ADD_TASKS: "ADD_TASKS",
    // developer
    ADD_DEVELOPER: "ADD_DEVELOPER",
    ADD_DEVELOPERS: "ADD_DEVELOPERS",
    // user
    AUTHENTICATION: "AUTHENTICATION",
    // filters
    CHANGE_TASK_FILTERS: "CHANGE_TASK_FILTERS",
    ADD_DEVELOPER_TO_PROJECT: "ADD_DEVELOPER_TO_PROJECT"
}

export const ADD_DEVELOPER_TO_PROJECT = {
    SHOW: "SHOW",
    HIDE: "HIDE"
}

export const FILTERS_DEVELOPER = {
    NONE: "NONE",
    MY_TASKS: "MY_TASKS"
}

export const MESSAGES = {
    SUCCESS: "SUCCESS",
    ANONYMOUS: "ANONYMOUS",
    REGISTER_ERROR: "REGISTER_ERROR",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT_ERROR: "LOGOUT_ERROR"
}

export const URLS = {
    //passport
    LOGIN: "/login",
    LOGOUT: "/logout",
    REGISTER: "/register",
    // REACT
    APP: "/app",
    APP_MANAGER: "/app/manager",
    APP_MANAGER_TASKS: "/app/manager_tasks",
    APP_TASKS: "/app/tasks",
    // task manager
    PROJECT: "/project",
    PROJECTS: "/projects",
    TASK: "/task",
    DEVELOPERS: "/developers",
    DEVELOPER: "/developer"
}


export const TASK_STATUS = {
    WAITING: "waiting",
    IMPLEMENTATION: "implementation",
    VERIFYING: "verifying",
    RELEASING: "releasing"
}

export const ROLES = {
    MANAGER: "MANAGER",
    DEVELOPER: "DEVELOPER",
    ANONYMOUS: MESSAGES.ANONYMOUS
}


export default ACTIONS