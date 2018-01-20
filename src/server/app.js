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
import {URLS, SESSION_SECRET} from './../constants'

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

const buildHTMLPage = ({html, state, url, css}) => `
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
        url: url,
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

const redirectAuth = (req, res) =>
    (req.url === '/' || req.url === URLS.REGISTER || req.url === URLS.LOGIN) ?
        res.redirect('/app') :
        res.status(200).send(htmlResponse(req.url))

const redirectUnauth = (req, res) =>
    (req.url !== '/' && req.url !== URLS.REGISTER && req.url !== URLS.LOGIN) ?
        res.redirect(303, '/') :
        res.status(200).send(htmlResponse(req.url))


const respond = (req, res, next) =>
    (!res.headersSent) ?
        redirectAuth(req, res) :
        null

const isAuthorize = (req, res, next) =>
    (req.session.passport && req.session.passport.user) ?
        next():
        redirectUnauth(req, res)

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'.`)
    if(req.session.passport && req.session.passport.user)
        console.log(`User: ${req.session.passport.user}`)
    else
        console.log('Unauthorized')
    next()
}

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = serverStore
    next()
}

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
    .use(session({ secret: SESSION_SECRET }))
    .use(logger)
    .use(fileAssets)
    .use(addStoreToRequestPipeline)
    .use(passport.initialize())
    .use(passport.session())
    .use(passportRouter)
    .use(isAuthorize)
    .use(api)
    .use(respond)


