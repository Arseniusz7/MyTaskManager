export const URL_DOMAIN = "http://localhost:3000"
export const SESSION_SECRET = "SECRET"
export const ANONYMOUS_ID = "-1"

export const ACTIONS = {
    // project
    ADD_PROJECT: "ADD_PROJECT",
    ADD_PROJECTS: "ADD_PROJECTS",
    ADD_TASK: "ADD_TASK",
    ADD_TASKS: "ADD_TASKS",
    // user
    AUTHENTICATION: "AUTHENTICATION",
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
    // task manager
    PROJECT: "/project",
    PROJECTS: "/projects",
    TASK: "/task"
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