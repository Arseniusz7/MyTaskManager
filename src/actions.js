//import fetch from 'isomorphic-fetch'
import IsomorphicFetch from './lib/fetch'
import fetch from 'node-fetch'
import {URL_DOMAIN, URLS, ACTIONS, HTTP} from './constants'
const fetchInstance = new IsomorphicFetch(fetch)

const parseResponse = response => response.json()

const logError = error => console.error(error)

const fetchThenDispatch = (dispatch, url, method, body) =>
    fetchInstance(`${URL_DOMAIN}${url}`, {
        method,
        body,
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    })
        .then(parseResponse)
        .then(dispatch)
        .catch(logError)

export const addProject = (title, description) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.PROJECT,
        HTTP.POST,
        JSON.stringify({title, description})
    )

export const getProjects = () => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.PROJECTS,
        HTTP.GET,
    )

export const getDevelopers = (firstName, lastName, id) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.DEVELOPERS,
        HTTP.POST,
        JSON.stringify({firstName, lastName, id})
    )

export const addTask = (title, description, status, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.TASK,
        HTTP.POST,
        JSON.stringify({title, description, status, projectID})
    )

export const getTasks = (projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `${URLS.TASK}/${projectID}`,
        HTTP.GET
    )

export const getComments = (projectID, taskID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `${URLS.COMMENT}/${projectID}${URLS.TASK}/${taskID}`,
        HTTP.GET
    )

export const addComment = (text, userID, taskID, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.COMMENT,
        HTTP.POST,
        JSON.stringify({text, userID, taskID, projectID})
    )

export const deleteComment = (_id, author, taskID, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.COMMENT,
        HTTP.DELETE,
        JSON.stringify({_id, author, taskID, projectID})
    )

export const editComment = (editText, _id, author, taskID, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.COMMENT,
        HTTP.PUT,
        JSON.stringify({editText, _id, author, taskID, projectID})
    )

export const addDeveloperToProject = (projectID, developerID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.DEVELOPER,
        HTTP.POST,
        JSON.stringify({projectID, developerID})
    )

export const addDeveloperToTask = (taskID, projectID, developerID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.DEVELOPER_TASK,
        HTTP.POST,
        JSON.stringify({taskID, projectID, developerID})
    )


export const updateTaskStatus = (status, taskID, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.TASK,
        HTTP.PUT,
        JSON.stringify({status, taskID, projectID})
    )

export const changeTaskFilter = (filter, key) => ({
    type: ACTIONS.CHANGE_TASK_FILTERS,
    taskFilter: filter,
    keyFilter: key
})

export const showEditComment = (_id) => ({
    type: ACTIONS.SHOW_EDIT_COMMENT,
    id: _id,
})

export const showReplyComment = (_id) => ({
    type: ACTIONS.SHOW_REPLY_COMMENT,
    id: _id,
})

export const showNewTask = (_id) => ({
    type: ACTIONS.SHOW_NEW_TASK,
    id: _id,
})

export const showAddProject = (_id) => ({
    type: ACTIONS.SHOW_ADD_PROJECT,
    id: _id,
})

export const showFindDev = (_id) => ({
    type: ACTIONS.SHOW_FIND_DEV,
    id: _id,
})

export const showChangeStatusTask = (_id) => ({
    type: ACTIONS.SHOW_CHANGE_STATUS_TASK,
    id: _id,
})


export const register = (email, password, firstName, lastName, manager) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.REGISTER,
        HTTP.POST,
        JSON.stringify({email, password, firstName, lastName, manager})
    )

export const login = (email, password) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.LOGIN,
        HTTP.POST,
        JSON.stringify({email, password})
    )
