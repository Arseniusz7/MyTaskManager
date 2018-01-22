/**
 * project colors
 */
import Project from '../entities/Project'
import Task from '../entities/Task'
import {addProject, addProjects, addTask, addTasks} from './../serverActions/serverActions'
import dispatchAndRespond from '../dispatchAndRespond'

const dumpCatch = err => console.error(err)

export const addProjectDB = (req, res, server, project) => {
    new Project(project).save()
        .then(project => dispatchAndRespond(req, res, addProject(project), server))
        .catch(dumpCatch)
}

export const getManagerProjectsDB = (req, res, server) => {
    Project.find({ manager : req.session.passport.user.id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(req, res, addProjects(projects), server))
        .catch(dumpCatch)
}

export const getDeveloperProjectsDB = (req, res, server) => {
    Project.find({ developers : req.session.passport.user.id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(req, res, addProjects(projects), server))
        .catch(dumpCatch)
}

export const addTaskDB = (req, res, server, task, id) => {
    Project.findById(id)
        .then(project => {
                new Task(task).save()
                    .then(task => {
                        project.tasks = [...project.tasks, task._id]
                        project.save()
                            .then(() => dispatchAndRespond(req, res, addTask(task, id), server))
                            .catch(dumpCatch)
                    })
                    .catch(dumpCatch)
            }
        )
        .catch(dumpCatch)
}

export const getTasksDB = (req, res, server, id) => {
    Project.findById(id)
        .populate('tasks')
        .exec()
        .then(project => dispatchAndRespond(req, res, addTasks(project.tasks, id), server))
        .catch(dumpCatch)
}

