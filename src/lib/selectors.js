import { compose } from 'redux'

export const findBy_id = (items, id) =>
    items.filter(item => item._id === id)

export const selectTasks = (projects) => {
    return projects[0].tasks
}

export const findTasks = compose(
    selectTasks,
    findBy_id
)