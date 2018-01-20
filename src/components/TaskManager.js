/**
 * project colors
 */
import App from './App'
import { connect } from 'react-redux'

const userStateToProps = ({user}) => ({ user })

export const TaskManager = connect(
    userStateToProps,
    null
)(App)

export default TaskManager