import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from './ui/Menu'
import Whoops404 from './ui/Whoops404'
import { Colors, Color, NewColor } from './containers'
import {NewProject} from './project/containersProject'
import {Register, Login} from './entry/containersEntry'
import {URLS} from './../constants'
//import Entry from './entry/Entry'
import '../stylesheets/APP.scss'

const isAuthorize = () =>
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

const App = () =>
    <Switch>
        <Route exact path="/app/:id" component={Color} />
        <Route path="/app"
               component={({match, location}) => (
                   <div className="app">
                       <a href={URLS.LOGOUT}>Log out</a>
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
        <Redirect from={URLS.LOGIN} to="/"/>
        <Route path={URLS.REGISTER} component={Register}/>
        <Route exact path="/" component={Login}/>
    </Switch>

export default App
