import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import {Manager, LoadProjects, Tasks, ManagerTasks, TaskDetailsContainer} from './containersProject'
import {Register, Login} from './containersEntry'
import {URLS, ROLES} from './../constants'
import {ToastContainer} from 'react-toastify'
import Tie from 'react-icons/lib/fa/black-tie'
import '../stylesheets/bootstrap.scss'
import '../stylesheets/custom.scss'

import {Component} from 'react'

export class MainApp extends Component {

    static defaultProps = {
        user: {},
        location: {}
    }

    render() {
        let {user, location} = this.props
        return (
            <div>
                <a href={URLS.LOGOUT}>Log out</a>
                <h4>Welcome {user.role}</h4>
                <ToastContainer/>
                {
                    (user.role === ROLES.MANAGER)
                        ? (location.pathname === URLS.APP_MANAGER)
                            ? <NavLink to={URLS.APP}>Go back to projects</NavLink>
                            : <NavLink to={URLS.APP_MANAGER}><Tie/> Go to manager panel</NavLink>
                    : null
                }
                <Route path={`${URLS.APP}/:id${URLS.TASK}/:task_id`} component={TaskDetailsContainer}/>
                <Route path={`${URLS.APP_MANAGER_TASKS}/:id`} component={ManagerTasks}/>
                <Route path={URLS.APP_MANAGER} component={Manager}/>
                <Route path={`${URLS.APP_TASKS}/:id`} component={Tasks}/>
                <Route exact path={URLS.APP} component={LoadProjects}/>
            </div>)
    }
}

import { connect } from 'react-redux'

export const IsAuthorize = connect(
    ({user}, {location}) => ({ user, location }),
    null
)(MainApp)

const App = () =>
    <div className="container">
        <div className="row">
            <Switch>
                <Route path={URLS.APP} component={IsAuthorize} />
                <Redirect from={URLS.LOGIN} to="/"/>
                <Route path={URLS.REGISTER} component={Register}/>
                <Route exact path="/" component={Login}/>
            </Switch>
        </div>
    </div>

export default App
