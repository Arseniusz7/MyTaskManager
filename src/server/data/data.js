/**
 * project colors
 */
import Project from '../entities/Project'
import Task from '../entities/Task'
import User from '../entities/User'
import {addProject, addProjects, addTask, addTasks, addDevelopers, pickDeveloperProjects,
    pickManagerProjects, addTasksWithProject} from './../serverActions/serverActions'
import dispatchAndRespond, {dispatchOrRespond} from '../dispatchAndRespond'
import {ROLES} from './../../constants'

const dumbCatch = err => console.error(err)

const dumbSuccess = (item) => console.log("Done " + item)

export const findDevelopersDB = (req, res, server, firstName, lastName, id) => {
    let query = {role: ROLES.DEVELOPER}
    if(firstName !== undefined && firstName.length !== 0)
        query = {...query, firstName: firstName}
    if(lastName !== undefined && lastName.length !== 0)
        query = {...query, lastName: lastName}
    User.find(query)
        .select('-password -role')
        .then(developers => dispatchAndRespond(req, res, addDevelopers(developers, id), server))
        .catch(dumbCatch)
}

export const addDeveloperToProjectDB = (req, res, server, projectID, developerID) => {
    Project.update(
        { _id: projectID },
        { $addToSet: {developers: developerID } }
    )
        .then(dumbSuccess)
        .catch(dumbCatch)
}

export const addProjectDB = (req, res, server, project) => {
    new Project(project).save()
        .then(project => dispatchAndRespond(req, res, addProject(project), server))
        .catch(dumbCatch)
}

export const getManagerProjectsDB = (req, res, server) => {
    Project.find({ manager : req.session.passport.user.id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(req, res, addProjects(projects), server))
        .catch(dumbCatch)
}

export const getDeveloperProjectsDB = (req, res, server) => {
    Project.find({ developers : req.session.passport.user.id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(req, res, addProjects(projects), server))
        .catch(dumbCatch)
}

export const addTaskDB = (req, res, server, task, id) => {
    Project.findById(id)
        .then(project => {
                new Task(task).save()
                    .then(task => {
                        project.tasks = [...project.tasks, task]
                        project.save()
                            .then(() => dispatchAndRespond(req, res, addTask(task, id), server))
                            .catch(dumbCatch)
                    })
                    .catch(dumbCatch)
            }
        )
        .catch(dumbCatch)
}

export const getTasksDB = (req, res, server, id) => {
    Project.findById(id)
        .populate({ path: 'tasks', select: '-comments' })
        .exec()
        .then(project => dispatchAndRespond(req, res, addTasks(project.tasks, id), server))
        .catch(dumbCatch)
}





