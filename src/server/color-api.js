import { Router } from 'express'
import ACTIONS from '../constants'
import Project from './Entities/Project'
import dispatchAndRespond from './dispatchAndRespond'
import { v4 } from 'uuid'

const router = Router()

/*router.post("/projects",  (req, res) => {
    //if(req.session.passport && req.session.passport !== {}) {
        /*let project = new Project({
            title: req.body.title, description: req.body.description, manager: '5a5f51db120d991d18f1c905',
            timestamp: new Date().toString()
        })
        project.save(function (err) {
            return err ?
                console.error(err) :
                dispatchAndRespond(req, res, {
                    type: ACTIONS.ADD_PROJECT,
                    id: project._id,
                    title: project.title,
                    description: project.description,
                    timestamp: project.timestamp
                })
        })*/
   /* res.setHeader('Access-Control-Allow-Credentials', 'true')
    if(req.session.passport && req.session.passport !== {})
        console.log(`User: ${req.session.passport.user}`)
    else
        console.log('Unauthorized')
    res.redirect("/")
        //Project.
        /*findOne({ title: 'sdf' }).
        populate('manager').
        exec(function (err, project) {
            if (err) return handleError(err);
            console.log('The author is %s', project.manager);
        });*/
    /*} else {
        res.redirect("/")
    }*/
//})*/

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
