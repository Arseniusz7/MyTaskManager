import { Router } from 'express'
import  {ROLES, URLS} from '../../constants'
import {getDeveloperProjectsDB, getManagerProjectsDB, getManagerProjectsAndTasksDB,
    getDeveloperProjectsAndTasksDB, getDeveloperProjectsTasksCommentsDB,
    getManagerProjectsTasksCommentsDB } from './../data/data'

const router = Router()

export const IgnoreList_id = ['favicon.ico', 'bundle.map', 'bundle.js', 'bundle.css']


router.get(`${URLS.APP}/:project_id${URLS.TASK}/:task_id`, (req, res) => {
    let {project_id, task_id} = req.params
    let {role, id} = req.session.passport.user
    if(IgnoreList_id.indexOf(task_id) === -1)
        if(role === ROLES.MANAGER)
            getManagerProjectsTasksCommentsDB(res, id, project_id, task_id, req.server)
        else
            getDeveloperProjectsTasksCommentsDB(res, id, project_id, task_id, req.server)
})

router.get(`${URLS.APP_TASKS}/:id`, (req, res) => {
    let {role, id} = req.session.passport.user
    if(IgnoreList_id.indexOf(req.params.id) === -1)
        if(role === ROLES.MANAGER)
            getManagerProjectsAndTasksDB(res, id, req.params.id, req.server)
        else
            getDeveloperProjectsAndTasksDB(res, id, req.params.id, req.server)
})

router.get(URLS.APP_MANAGER, (req, res) => {
    let {role, id} = req.session.passport.user
        if(role === ROLES.MANAGER)
            getManagerProjectsDB(res, id, req.server)
        else
            res.redirect(URLS.APP)
})

router.get(`${URLS.APP_MANAGER_TASKS}/:id`, (req, res) => {
    let {role, id} = req.session.passport.user
    if(IgnoreList_id.indexOf(req.params.id) === -1)
        if(role === ROLES.MANAGER)
            getManagerProjectsAndTasksDB(res, id, req.params.id, req.server)
        else
            res.redirect(URLS.APP)
})

router.get(URLS.APP, (req, res) => {
    let {role, id} = req.session.passport.user
    switch (role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(res, id, req.server)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(res, id, req.server)
            break
        default:
            res.redirect('/')
            break
    }
})

export default router