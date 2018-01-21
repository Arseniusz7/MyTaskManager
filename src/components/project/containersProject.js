/**
 * project colors
 */
import { connect } from 'react-redux'
import AddProjectForm from './AddProjectForm'
import {addProject} from './../../actions'
import {userStateToProps} from './../userStateToProps'

export const NewProject = connect(
    userStateToProps,
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(AddProjectForm)
