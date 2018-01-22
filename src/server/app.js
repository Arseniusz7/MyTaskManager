import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import api from './routes/taskManagerRouter'
import authorization from './routes/authRouter'
import {authSuccess} from './serverActions/serverActions'
import {htmlResponse} from './htmlResponse'
import storeFactory from '../store'
import initialState from '../../data/initialState.json'
import {URLS, SESSION_SECRET, ROLES} from './../constants'
import {getDeveloperProjectsDB, getManagerProjectsDB} from './data/data'

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



const dispatchAuthorize = (req, res) => {
    let { id, role } = req.session.passport.user
    // NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO !!!
    // I HOPE THIS LINE HAS BEEN NEVER APPEARED
    // BUT TIME IS TICKING
    // ONE DAY THE CHOSEN WILL DESTROY IT
    req.url = '/app'
    // NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO !!!
    req.store.dispatch(authSuccess(id, role))
    switch (role) {
        case ROLES.MANAGER:
            getManagerProjectsDB(req, res, true)
            break
        case ROLES.DEVELOPER:
            getDeveloperProjectsDB(req, res, true)
            break
        default:
            break
    }

}

const redirectAuth = (req, res) =>
    (req.url === '/' || req.url === URLS.REGISTER || req.url === URLS.LOGIN || req.url === "/app/projects") ?
        res.redirect('/app') :
        dispatchAuthorize(req, res)

const redirectUnauth = (req, res) =>
    (req.url !== '/' && req.url !== URLS.REGISTER && req.url !== URLS.LOGIN) ?
        res.redirect(303, '/') :
        res.status(200).send(htmlResponse(req))


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
        console.log(`UserID: ${req.session.passport.user.id}`)
    else
        console.log('Unauthorized')
    next()
}

const addStoreToRequestPipeline = (req, res, next) => {
    req.store = storeFactory(true, initialState)
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
    .use(authorization)
    .use(isAuthorize)
    .use(api)
    .use(respond)


