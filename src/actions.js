//import fetch from 'isomorphic-fetch'
import IsomorphicFetch from './real-isomorphic-fetch/index'
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

export const addColor = (title, color) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/colors',
        'POST',
        JSON.stringify({title, color})
    )

export const removeColor = id => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/color/${id}`,
        'DELETE'
    )

export const rateColor = (id, rating) => dispatch =>
    fetchThenDispatch(
        dispatch,
        `/color/${id}`,
        'PUT',
        JSON.stringify({rating})
    )

export const addProject = (title, description) => dispatch =>
    fetchThenDispatch(
        dispatch,
        '/projects',
        'POST',
        JSON.stringify({title, description})
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
