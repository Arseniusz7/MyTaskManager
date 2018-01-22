import { Router } from 'express'
import  {ROLES, URLS} from '../../constants'
import {addProjectDB, getDeveloperProjectsDB, getManagerProjectsDB, addTaskDB, getTasksDB} from './../data/data'

const router = Router()

router.post(URLS.PROJECT,  (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER) {
        let project = {
            title: req.body.title, description: req.body.description, manager: req.session.passport.user.id,
            tasks: [], developers: [], timestamp: new Date().toString()
        }
        addProjectDB(req, res, false, project)
    } else {
        console.log("You don't have permits")
    }
})

router.post(URLS.TASK,  (req, res) => {
    let task = {
        title: req.body.title, description: req.body.description, status: req.body.status,
        comments: [], timestamp: new Date().toString()
    }
    let id = req.body.projectID
    addTaskDB(req, res, false, task, id)
})

router.get(`${URLS.TASK}/:id`, (req, res) => {
    let id = req.params.id
    getTasksDB(req, res, false, id)
})

router.get(URLS.PROJECTS,  (req, res) => {
    switch (req.session.passport.user.role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(req, res, false)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(req, res, false)
            break
        default:
            break
    }
})


export default router
