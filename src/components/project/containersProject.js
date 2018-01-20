/**
 * project colors
 */
import { connect } from 'react-redux'
import AddProjectForm from './AddProjectForm'
import {addProject} from './../../actions'

export const NewProject = connect(
    null,
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(AddProjectForm)
