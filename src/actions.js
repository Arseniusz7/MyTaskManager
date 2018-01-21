//import fetch from 'isomorphic-fetch'
import IsomorphicFetch from './real-isomorphic-fetch/fetch'
import fetch from 'node-fetch'
import {URL_DOMAIN, URLS} from './constants'
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

export const addTask = (title, description, status, projectID) => dispatch =>
    fetchThenDispatch(
        dispatch,
        URLS.TASK,
        'POST',
        JSON.stringify({title, description, status, projectID})
    )


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
