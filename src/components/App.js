import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { Colors, Color, NewColor } from './containers'
import {NewProject} from './project/containersProject'
import {Register} from './entry/containersEntry'
import Entry from './entry/Entry'
import '../stylesheets/APP.scss'

const App = () =>
    [
        <a href="/logout" key={0}>Log out</a>,
        <Switch key={1}>
            <Route exact path="/app/:id" component={Color} />
            <Route path="/app"
                component={({match, location}) => (
                    <div className="app">
                        <NewProject/>
                        <Menu sort={location.pathname.replace('/sort/', '')} />
                        <NewColor />
                        <Switch>
                            <Route exact path="/app" component={Colors} />
                            <Route path="/app/sort/:sort" component={Colors} />
                            <Route component={Whoops404} />
                        </Switch>
                    </div>
                )} />
            <Redirect from="/login" to="/"/>
            <Route path="/register" component={Register}/>
            <Route exact path="/" component={Entry}/>
        </Switch>
    ]
export default App
