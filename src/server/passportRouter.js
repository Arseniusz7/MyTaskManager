/**
 * project colors
 */
import { Router } from 'express'
import User from './Entities/User'
import passport from 'passport'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
import dispatchAndRespond from './dispatchAndRespond'
import ACTIONS, {MESSAGES, URLS, ROLES, JWT_SECRET, ANONYMOUS_ID} from './../constants'

const router = Router()

const authError = (err, auth=MESSAGES.LOGIN_ERROR) => ({
    type: ACTIONS.AUTHENTICATION,
    auth: auth,
    id: ANONYMOUS_ID,
    role: ROLES.ANONYMOUS,
    messageDetails: err.toString()
})

export const registerError = (req, res, err) =>
    dispatchAndRespond(req, res, authError(err, MESSAGES.REGISTER_ERROR))

export const loginError = (req, res, err) =>
    dispatchAndRespond(req, res, authError(err, MESSAGES.LOGIN_ERROR))

export const authorizationSuccess = (req, res, {_id, role}) => {
    dispatchAndRespond(req, res, {
        type: ACTIONS.AUTHENTICATION,
        auth: MESSAGES.SUCCESS,
        id: _id,
        role: role,
        messageDetails: MESSAGES.SUCCESS
    })
}

router.post(URLS.REGISTER,
    (req, res) => {
        let user = new User({ username: req.body.email, password: req.body.password, lastName: req.body.lastName,
        firstName: req.body.firstName, role: ((req.body.manager == true) ? ROLES.MANAGER : ROLES.DEVELOPER) });
        user.save(function(err) {
            return err
                ? registerError(req, res, err)
                : req.logIn(user, function(err) {
                    if(err) {
                        return registerError(req, res, err)
                    }
                    authorizationSuccess(req, res, user)
                });
        });
    }
)

router.get(URLS.LOGOUT,
    (req, res) => {
        req.logout()
        res.redirect('/')
    }
)


router.post(URLS.LOGIN,
    (req, res, next) => {
        passport.authenticate('local',
            function(err, user) {
                return err
                    ? loginError(req, res, err)
                    : req.logIn(user, function(err) {
                        if(err) {
                            return loginError(req, res, err)
                        }
                        authorizationSuccess(req, res, user)
                    });
            }
        )(req, res, next);
    })


// deprecated jwt
export const authorize = (req, res, _id, role) => {
    console.log(`UserId: ${_id}. Role: ${role}`)
    let token = jwt.sign({_id, role}, JWT_SECRET, {
        expiresIn: 2400000
    });
    new Cookies(req,res).set('access_token',token,{
        httpOnly: true,
        secure: false, // for your production environment
    });
}

export const isAuthorize = (req, res, next) => {
    let token = new Cookies(req,res).get('access_token')
    console.log(`Got a token: ${token}`)
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                let err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                console.log(decoded)
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
            }
        });
    }
}


export default router