import { Route, Switch, Redirect } from 'react-router-dom'
import Whoops404 from './ui/Whoops404'
import {Manager, Projects, LoadProjects} from './project/containersProject'
import {Register, Login} from './entry/containersEntry'
import {URLS, MESSAGES} from './../constants'
import '../stylesheets/APP.scss'

import {Component} from 'react'

class MainApp extends Component {

    static defaultProps = {
        user: { auth: null }
    }

    componentDidUpdate() {
        let {user, history} = this.props
        if(user.auth !== MESSAGES.SUCCESS)
            history.push('/')
    }

    render() {
        let {user} = this.props
        return (
            <div className="app">
                <a href={URLS.LOGOUT}>Log out</a>
                <p>{user.id}</p>
                <p>{user.role}</p>
                <Manager/>
                <Route path="/app/projects" component={LoadProjects}/>
                <Route exact path="/app" component={Projects}/>
            </div>)
    }
}

import { connect } from 'react-redux'

const userStateToProps = ({user}, {history}) => ({ user, history })

export const IsAuthorize = connect(
    userStateToProps,
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
