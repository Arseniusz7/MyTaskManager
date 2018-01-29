import Project from '../entities/Project'
import Task from '../entities/Task'
import User from '../entities/User'
import Comment from '../entities/Comment'
import {addProject, addProjects, addTask, addTasks, addDevelopers, updateStatusTasks,
    addComment, addComments, deleteComment, updateComment, updateDeveloperTasks,
    devAddedToProject, devIsNotInProject} from './../serverActions/serverActions'
import dispatchAndRespond from '../dispatchAndRespond'
import {ROLES} from './../../constants'

const dumbCatch = err => console.error(err)

const dumbSuccess = (item) => console.log("Done " + item)

export const findDevelopersDB = (res, firstName, lastName, id, server) => {
    let query = {role: ROLES.DEVELOPER}
    if(firstName !== undefined && firstName.length !== 0)
        query = {...query, firstName: firstName}
    if(lastName !== undefined && lastName.length !== 0)
        query = {...query, lastName: lastName}
    return User.find(query)
        .select('-password -role')
        .then(developers => dispatchAndRespond(res, addDevelopers(developers, id), server))
        .catch(dumbCatch)
}

export const addDeveloperToProjectDB = (res, projectID, developerID, server) =>
    Project.update(
        { _id: projectID },
        { $addToSet: {developers: developerID } }
    )
        .then(dispatchAndRespond(res, devAddedToProject(), server))
        .catch(dumbCatch)

export const addDeveloperToTaskDB = (res, taskID, projectID, developer, server) =>
    Project.findById(projectID)
        .then(projects => (projects.developers.indexOf(developer._id) !== -1) ?
                Task.update(
                { _id: taskID },
                { $set: {developer: developer._id } }
                )
                .then(() => dispatchAndRespond(res, updateDeveloperTasks(developer, taskID, projectID), server))
                .catch(dumbCatch)
            : dispatchAndRespond(res, devIsNotInProject(), server)
        )
        .catch(dumbCatch)


export const addProjectDB = (res, project, server) =>
    new Project(project).save()
        .then(project => dispatchAndRespond(res, addProject(project), server))
        .catch(dumbCatch)


export const getManagerProjectsDB = (res, id, server) =>
    Project.find({ manager : id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)


export const getDeveloperProjectsDB = (res, id, server) =>
    Project.find({ developers : id})
        .select('-tasks')
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)

export const addCommentDB = (res, comment, projectID, server) =>
    Task.findById(comment.task)
        .then(task => {
                new Comment(comment).save()
                    .then(comment => {
                        task.comments = [...task.comments, comment]
                        task.save()
                            .then(() => dispatchAndRespond(res, addComment(comment, projectID), server))
                            .catch(dumbCatch)
                    })
                    .catch(dumbCatch)
            }
        )
        .catch(dumbCatch)

export const updateCommentDB = (res, text, _id, taskID, projectID, server) =>
    Comment.update(
        {_id: _id},
        {$set: {text: text }}
    )
        .then(() => dispatchAndRespond(res, updateComment(text, _id, taskID, projectID), server))
        .catch(dumbCatch)

export const deleteCommentDB = (res, _id, taskID, projectID, server) => {
    Task.update({ _id: taskID }, { $pullAll: { comments: [ _id ] }})
        .catch(dumbCatch)
    Comment.remove({_id: _id})
        .then(() => dispatchAndRespond(res, deleteComment(_id, taskID, projectID), server))
        .catch(dumbCatch)
}


export const addTaskDB = (res, task, server) =>
    Project.findById(task.project)
        .then(project => {
                new Task(task).save()
                    .then(task => {
                        project.tasks = [...project.tasks, task]
                        project.save()
                            .then(() => dispatchAndRespond(res, addTask(task), server))
                            .catch(dumbCatch)
                    })
                    .catch(dumbCatch)
            }
        )
        .catch(dumbCatch)


export const getTasksDB = (res, id, server) =>
    Project.findById(id)
        .populate({ path: 'tasks', select: '-comments', populate: { path: 'developer' } })
        .exec()
        .then(project => dispatchAndRespond(res, addTasks(project.tasks, id), server))
        .catch(dumbCatch)

export const getCommentsDB = (res, projectID, taskID, server) =>
    Task.findById(taskID)
        .populate({ path: 'comments'})
        .exec()
        .then(task => dispatchAndRespond(res, addComments(task.comments, projectID, taskID), server))
        .catch(dumbCatch)

export const updateTaskStatusDB = (res, status, taskID, projectID, server) =>
    Task.update(
        {_id: taskID},
        {$set: {status: status}}
    )
        .then(() => dispatchAndRespond(res, updateStatusTasks(status, taskID, projectID), server))
        .catch(dumbCatch)


// server methods

export const getManagerProjectsAndTasksDB = (res, managerID, projectID, server) =>
    Project.find({ manager : managerID})
        .populate({ path: 'tasks', match: {project: projectID}, select: '-comments', populate: { path: 'developer' } })
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)


export const getDeveloperProjectsAndTasksDB = (res, devID, projectID, server) =>
    Project.find({ developers : devID})
        .populate({ path: 'tasks', match: {project: projectID}, select: '-comments', populate: { path: 'developer' }})
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)

export const getManagerProjectsTasksCommentsDB = (res, managerID, projectID, taskID, server) =>
    Project.find({ manager : managerID})
        .populate({ path: 'tasks', match: {project: projectID},
            populate: [{ path: 'comments', match: {task: taskID}}, { path: 'developer' }] })
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)


export const getDeveloperProjectsTasksCommentsDB = (res, devID, projectID, taskID, server) =>
    Project.find({ developers : devID})
        .populate({ path: 'tasks', match: {project: projectID},
            populate: [{ path: 'comments', match: {task: taskID}}, { path: 'developer' }] })
        .then(projects => dispatchAndRespond(res, addProjects(projects), server))
        .catch(dumbCatch)



