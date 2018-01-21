/**
 * project colors
 */
import { connect } from 'react-redux'
import {Component} from 'react'
import {ManagerAccess} from './ManagerAccess'
import {ProjectList} from './ProjectList'
import {addProject, getProjects} from './../../actions'
import {userStateToProps} from './../userStateToProps'


export const Manager = connect(
    userStateToProps,
    dispatch =>
        ({
            onNewProject(title, description) {
                dispatch(addProject(title, description))
            }
        })
)(ManagerAccess)

export const Projects = connect(
    ({projects}) => ({projects}),
    null
) (ProjectList)

class ProjectListLoad extends Component {
    componentDidMount () {
        this.props.loadProjects()
    }

    render() {
        return <Projects/>
    }
}

export const LoadProjects = connect(
    null,
    dispatch =>
        ({
            loadProjects() {
                dispatch(getProjects())
            }
        })
)(ProjectListLoad)