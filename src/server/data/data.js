/**
 * project colors
 */
import Project from '../entities/Project'
import Task from '../entities/Task'
import {addProject, addProjects, addTask} from './../serverActions/serverActions'
import dispatchAndRespond from '../dispatchAndRespond'

const dumpCatch = err => console.error(err)

// methods for server rendering

export const getManagerProjectsToStore= (store, id, callback) => {
    Project.find({ manager : id})
        .then(projects => store.dispatch(addProjects(projects)))
        .then(callback)
        .catch(dumpCatch)
}

export const getDeveloperProjectsToStore = (store, id, callback) => {
    Project.find({ developers : id})
        .then(projects => store.dispatch(addProjects(projects)))
        .then(callback)
        .catch(dumpCatch)
}

// END

export const addProjectDB = (req, res, project) => {
    new Project(project).save()
        .then(project => dispatchAndRespond(req, res, addProject(project)))
        .catch(dumpCatch)
}

export const getManagerProjectsDB = (req, res) => {
    Project.find({ manager : req.session.passport.user.id})
        .then(projects => dispatchAndRespond(req, res, addProjects(projects)))
        .catch(dumpCatch)
}

export const getDeveloperProjectsDB = (req, res) => {
    Project.find({ developers : req.session.passport.user.id})
        .then(projects => dispatchAndRespond(req, res, addProjects(projects)))
        .catch(dumpCatch)
}

export const addTaskDB = (req, res, task, id) => {
    Project.findById(id)
        .then(project => {
                new Task(task).save()
                    .then(task => {
                        project.tasks = [...project.tasks, task._id]
                        project.save()
                            .then(() => dispatchAndRespond(req, res, addTask(task, id)))
                            .catch(dumpCatch)
                    })
                    .catch(dumpCatch)
            }
        )
        .catch(dumpCatch)
}


