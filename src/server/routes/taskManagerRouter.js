import { Router } from 'express'
import ACTIONS, {ROLES, URLS} from '../../constants'
import dispatchAndRespond from '../dispatchAndRespond'
import {addProjectDB, getDeveloperProjectsDB, getManagerProjectsDB} from './../data/data'

import { v4 } from 'uuid'

const router = Router()


router.post(URLS.PROJECT,  (req, res) => {
    if(req.session.passport.user.role === ROLES.MANAGER) {
        let project = {
            title: req.body.title, description: req.body.description, manager: req.session.passport.user.id,
            tasks: [], developers: [], timestamp: new Date().toString()
        }
        addProjectDB(req, res, project)
    } else {
        console.log("You don't have permits")
    }
})

router.get(URLS.PROJECTS,  (req, res) => {
    switch (req.session.passport.user.role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(req, res)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(req, res)
            break
        default:
            break
    }
})




router.get("/colors", (req, res) =>
    res.status(200).json(req.store.getState().colors)
)

router.post("/colors", (req, res) =>
    dispatchAndRespond(req, res, {
        type: ACTIONS.ADD_COLOR,
        id: v4(),
        title: req.body.title,
        color: req.body.color,
        timestamp: new Date().toString()
    })
)

router.put("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: ACTIONS.RATE_COLOR,
        id: req.params.id,
        rating: parseInt(req.body.rating)
    })
)

router.delete("/color/:id", (req, res) =>
    dispatchAndRespond(req, res, {
        type: ACTIONS.REMOVE_COLOR,
        id: req.params.id
    })
)

export default router
