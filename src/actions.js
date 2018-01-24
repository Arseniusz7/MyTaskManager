//import fetch from 'isomorphic-fetch'
import IsomorphicFetch from './lib/fetch'
import fetch from 'node-fetch'
import {URL_DOMAIN, URLS, ACTIONS} from './constants'
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
        'POST',
        JSON.stringify({title, description})
    )

export const getProjects = () => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.PROJECTS,
        'GET',
    )

export const getDevelopers = (firstName, lastName, id) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.DEVELOPERS,
        'POST',
        JSON.stringify({firstName, lastName, id})
    )

export const addTask = (title, description, status, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.TASK,
        'POST',
        JSON.stringify({title, description, status, projectID})
    )

export const getTasks = (projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `${URLS.TASK}/${projectID}`,
        'GET'
    )

export const addDeveloperToProject = (projectID, developerID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.DEVELOPER,
        'POST',
        JSON.stringify({projectID, developerID})
    )

export const changeTaskFilter = (filter, key) => ({
    type: ACTIONS.CHANGE_TASK_FILTERS,
    taskFilter: filter,
    keyFilter: key
})



export const addToProject = (show) => ({
    type: ACTIONS.ADD_DEVELOPER_TO_PROJECT,
    show: show
})


export const register = (email, password, firstName, lastName, manager) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.REGISTER,
        'POST',
        JSON.stringify({email, password, firstName, lastName, manager})
    )

export const login = (email, password) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.LOGIN,
        'POST',
        JSON.stringify({email, password})
    )
