import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import {Manager, Projects, LoadProjects, Tasks} from './project/containersProject'
import {Register, Login} from './entry/containersEntry'
import {URLS, ROLES} from './../constants'

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
                <p>{user.id}</p>
                <p>Welcome {user.role}</p>
                {
                    (user.role === ROLES.MANAGER)
                        ? (location.pathname === "/app/manager")
                            ? <NavLink to="/app">Go back to projects</NavLink>
                            : <NavLink to="/app/manager">Go to manager panel</NavLink>
                    : null
                }
                <Route path="/app/manager" component={Manager}/>
                <Route path="/app/tasks/:id" component={Tasks}/>
                <Route path="/app/projects" component={LoadProjects}/>
                <Route exact path="/app" component={Projects}/>
            </div>)
    }
}

import { connect } from 'react-redux'

export const IsAuthorize = connect(
    ({user}, {location}) => ({ user, location }),
    null
)(MainApp)

const App = () =>
    <Switch>
        <Route path="/app" component={IsAuthorize} />
        <Redirect from={URLS.LOGIN} to="/"/>
        <Route path={URLS.REGISTER} component={Register}/>
        <Route exact path="/" component={Login}/>
    </Switch>

export default App
