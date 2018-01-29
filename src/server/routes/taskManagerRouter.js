import { Router } from 'express'
import  {ROLES, URLS, TASK_STATUS_ARRAY } from '../../constants'
import {addProjectDB, getDeveloperProjectsDB, getManagerProjectsDB, addTaskDB,
    getTasksDB, findDevelopersDB, addDeveloperToProjectDB, addDeveloperToTaskDB,
    updateTaskStatusDB, addCommentDB, getCommentsDB, deleteCommentDB, updateCommentDB} from './../data/data'

const router = Router()

const permissionError = () => console.error("You don't have permits")

const cheaterError = (id) => console.error(`Cheater: ${id}`)

export const checkStatus = (status) => (TASK_STATUS_ARRAY.indexOf(status) !== -1) ? status : TASK_STATUS_ARRAY[0]

router.post(URLS.PROJECT,  (req, res) => {
    let {role, id} = req.session.passport.user
    if(role === ROLES.MANAGER) {
        let project = {
            title: req.body.title, description: req.body.description, manager: id,
            tasks: [], developers: [], timestamp: new Date().toString()
        }
        addProjectDB(res, project)
    } else {
        permissionError()
    }
})

router.post(URLS.COMMENT, (req, res) => {
    let {text, userID, taskID, projectID } = req.body
    let comment = { task: taskID, text: text, author: userID, timestamp: new Date().toString() }
    addCommentDB(res, comment, projectID)
})

router.put(URLS.COMMENT, (req, res) => {
    let {editText, _id, author, taskID, projectID} = req.body
    let {id} = req.session.passport.user
    if(id === author)
        updateCommentDB(res, editText, _id, taskID, projectID)
    else
        cheaterError(id)
})

router.delete(URLS.COMMENT, (req, res) => {
    let {_id, author, taskID, projectID}= req.body
    let {id} = req.session.passport.user
    if(id === author)
        deleteCommentDB(res, _id, taskID, projectID)
    else
        cheaterError(id)
})

router.get(`${URLS.COMMENT}/:id${URLS.TASK}/:task_id`, (req, res) => {
    let {id, task_id} = req.params
    getCommentsDB(res, id, task_id)
})


router.post(URLS.DEVELOPERS, (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER) {
        findDevelopersDB(res, req.body.firstName, req.body.lastName, req.body.id)
    } else {
        permissionError()
    }
})

router.post(URLS.DEVELOPER, (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER) {
        addDeveloperToProjectDB(res, req.body.projectID, req.body.developerID)
    } else {
        permissionError()
    }
})

router.post(URLS.DEVELOPER_TASK, (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER) {
        addDeveloperToTaskDB(res, req.body.taskID, req.body.projectID, req.body.developer)
    } else {
        permissionError()
    }
})

router.post(URLS.TASK,  (req, res) => {
    let task = {
        project: req.body.projectID, title: req.body.title, description: req.body.description,
        status: req.body.status, comments: [], timestamp: new Date().toString()
    }
    if(req.session.passport.user.role === ROLES.MANAGER)
        addTaskDB(res, task)
    else
        permissionError()
})

router.put(URLS.TASK,  (req, res) => {
    let status = checkStatus(req.body.status)
    updateTaskStatusDB(res, status, req.body.taskID, req.body.projectID)
})

router.get(`${URLS.TASK}/:id`, (req, res) => {
    getTasksDB(res, req.params.id)
})

router.get(URLS.PROJECTS,  (req, res) => {
    let {role, id} = req.session.passport.user
    switch (role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(res, id)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(res, id)
            break
        default:
            break
    }
})


export default router
