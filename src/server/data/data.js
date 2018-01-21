/**
 * project colors
 */
import {addProject} from './../serverActions/serverActions'
import dispatchAndRespond from '../dispatchAndRespond'

export const addProjectDB = (req, res, project) => {
    let projectPromise = project.save()
    projectPromise
        .then((project) => dispatchAndRespond(req, res, addProject(project)))
        .catch((err) => console.error(err))
}