import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { Colors, Color, NewColor } from './containers'
import {NewProject} from './project/containersProject'
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
        let {location, user} = this.props
        return (
            <div className="app">
                <a href={URLS.LOGOUT}>Log out</a>
                <p>{user.id}</p>
                <p>{user.role}</p>
                <NewProject/>
                <Menu sort={location.pathname.replace('/sort/', '')} />
                <NewColor />
                <Switch>
                    <Route exact path="/app" component={Colors} />
                    <Route path="/app/sort/:sort" component={Colors} />
                    <Route component={Whoops404} />
                </Switch>
            </div>)
    }
}

import { connect } from 'react-redux'

const userStateToProps = ({user}, {match, location}) => ({ user, match, location })

export const IsAuthorize = connect(
    userStateToProps,
    null
)(MainApp)

const App = () =>
    <Switch>
        <Route exact path="/app/:id" component={Color} />
        <Route path="/app" component={IsAuthorize} />
        <Redirect from={URLS.LOGIN} to="/"/>
        <Route path={URLS.REGISTER} component={Register}/>
        <Route exact path="/" component={Login}/>
    </Switch>

export default App
