import { compose } from 'redux'
import {FILTERS_DEVELOPER} from './../constants'

export const findBy_id = (items, id) =>
    (items) ?
        items.filter(item => item._id === id) :
        []


export const selectItem = (items=[]) => {
    if(items.length !== 0)
        return items[0]
    else
        return []
}


export const selectTasks = (project={}) => {
    if(project)
        return project.tasks
    else
        return []
}

export const getItem = compose(
    selectItem,
    findBy_id
)

export const findTasks = compose(
    selectTasks,
    selectItem,
    findBy_id
)

export const filterTasks = (tasks, taskFilter) => {
    switch (taskFilter.taskFilter) {
        case FILTERS_DEVELOPER.NONE:
            return tasks
        case FILTERS_DEVELOPER.MY_TASKS:
            return tasks.filter(task => task.developer === taskFilter.keyFilter)
        default:
            return tasks
    }
}
