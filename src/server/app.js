import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import fs from 'fs'
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import api from './color-api'
import passportRouter from './passportRouter'
import App from '../components/App'
import storeFactory from '../store'
import initialState from '../../data/initialState.json'

const staticCSS = fs.readFileSync(path.join(__dirname, '../../dist/assets/bundle.css'))
const fileAssets = express.static(path.join(__dirname, '../../dist/assets'))

import mongoose from 'mongoose'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import {localStrategy, deserializeUser, serializeUser} from './passportLogic'


mongoose.connect('mongodb://localhost/TaskManager');
let db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(){
    console.warn("Db is open...");
});

const serverStore = storeFactory(true, initialState)

serverStore.subscribe(() =>
    fs.writeFile(
        path.join(__dirname, '../../data/initialState.json'),
        JSON.stringify(serverStore.getState()),
        error => (error) ? console.log("Error saving state!", error) : null
    )
)

const RegisterHtml = () =>`
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
    <meta charset="utf-8">
        <title>Register</title>
</head>
<body>
<h4>Register your account</h4>
<div>
    <form action="/register" method="post">
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="Your Email"/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Your Password"/>
        </div>
        <div>
            <label for="firstName">First name</label>
            <input type="text" name="firstName" placeholder="Your first name"/>
        </div>
        <div>
            <label for="lastName">Last name</label>
            <input type="text" name="lastName" placeholder="Your last name"/>
        </div>
        <div>
            <input type="checkbox" name="manager" value="true">
            <label for="manager">Are you manager?</label>
        </div>
        <input type="submit" value="Register"/>
    </form>
</div>
<h4>Log in</h4>
<div>
    <form action="/login" method="post">
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="Your Email"/>
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Your Password"/>
        </div>
        <input type="submit" value="Log in"/>
    </form>
</div>
</body>
</html>
`


const buildHTMLPage = ({html, state, css}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Universal Color Organizer</title>
        <style>${staticCSS}</style>
    </head>
    <body>
        <div id="react-container">${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
    </body>
</html>
`

const renderComponentsToHTML = ({url, store}) =>
    ({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    })

const makeClientStoreFrom = store => url =>
    ({
        url,
        store: storeFactory(false, store.getState())
    })

const htmlResponse = compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom(serverStore)
)

const resp7 = (req, res) => {
    console.warn(req.user)
    if(!res.headersSent)
        res.status(200).send(
            htmlResponse(req.url)
        )
}

const respond = (req, res, next) =>
    req.isAuthenticated() ?
        resp7(req, res) :
        res.status(200).send(RegisterHtml())



const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'.`)
    next()
}

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

import { Router } from 'express'

const routerMain = Router()

routerMain.get("/", (req, res) =>
    res.status(200).send(
        htmlResponse(req.url)
    )
)

passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, localStrategy))

passport.serializeUser(serializeUser)

passport.deserializeUser(deserializeUser)

export default express()
    .use(cookieParser())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(session({ secret: 'SECRET' }))
    .use(logger)
    .use(fileAssets)
    .use(addStoreToRequestPipeline)
    .use(passport.initialize())
    .use(passport.session())
    .use(passportRouter)
    .use(api)
    .use(respond)


