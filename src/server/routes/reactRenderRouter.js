import { Router } from 'express'
import  {ROLES, URLS} from '../../constants'
import {getDeveloperProjectsDB, getManagerProjectsDB } from './../data/data'

const router = Router()

const projectsToStore = (req, res) => {
    switch (req.session.passport.user.role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(req, res, true)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(req, res, true)
            break
        default:
            break
    }
}


router.get(`${URLS.APP_TASKS}/:id`, (req, res) => {
    projectsToStore(req, res)
})

router.get(URLS.APP_MANAGER, (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER)
        getManagerProjectsDB(req, res, true)
    else
        res.redirect(URLS.APP)
})

router.get(`${URLS.APP_MANAGER_TASKS}/:id`, (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER)
        getManagerProjectsDB(req, res, true)
    else
        res.redirect(URLS.APP)
})

router.get(URLS.APP, (req, res) => {
    projectsToStore(req, res)
})

export default router