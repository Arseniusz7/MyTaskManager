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
    UPDATE_TASK_STATUS: "UPDATE_TASK_STATUS",
    ADD_COMMENT: "ADD_COMMENT",
    ADD_COMMENTS: "ADD_COMMENTS",
    DELETE_COMMENT: "DELETE_COMMENT",
    EDIT_COMMENT: "EDIT_COMMENT",
    // SHOW
    SHOW_REPLY_COMMENT: "SHOW_REPLY",
    SHOW_EDIT_COMMENT: "SHOW_EDIT_COMMENT",
    SHOW_FIND_DEV: "SHOW_FIND_DEV",
    SHOW_CHANGE_STATUS_TASK: "SHOW_CHANGE_STATUS_TASK",
    SHOW_ADD_PROJECT: "SHOW_ADD_PROJECT",
    SHOW_NEW_TASK: "SHOW_NEW_TASK",
    // developer
    ADD_DEVELOPER: "ADD_DEVELOPER",
    ADD_DEVELOPERS: "ADD_DEVELOPERS",
    // user
    AUTHENTICATION: "AUTHENTICATION",
    EMAIL_SENT: "EMAIL_SENT",
    // filters
    CHANGE_TASK_FILTERS: "CHANGE_TASK_FILTERS",
    ADD_DEVELOPER_TO_PROJECT: "ADD_DEVELOPER_TO_PROJECT"
}


export const FILTERS_DEVELOPER = {
    NONE: "NONE",
    MY_TASKS: "MY_TASKS"
}

export const MESSAGES = {
    SUCCESS: "SUCCESS",
    EMAIL_SENT: "EMAIL_SENT",
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
    DEVELOPER: "/developer",
    DEVELOPER_TASK: "/developer/task",
    COMMENT: "/comment"
}

export const HTTP = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}


export const TASK_STATUS = {
    WAITING: "waiting",
    IMPLEMENTATION: "implementation",
    VERIFYING: "verifying",
    RELEASING: "releasing"
}

export const TASK_STATUS_ARRAY = [ TASK_STATUS.WAITING, TASK_STATUS.IMPLEMENTATION,
    TASK_STATUS.VERIFYING, TASK_STATUS.RELEASING]

export const ROLES = {
    MANAGER: "MANAGER",
    DEVELOPER: "DEVELOPER",
    ANONYMOUS: MESSAGES.ANONYMOUS
}


export default ACTIONS