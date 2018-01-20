/**
 * project colors
 */
import { Router } from 'express'
import User from './Entities/User'
import passport from 'passport'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
import dispatchAndRespond from './dispatchAndRespond'
import ACTIONS, {MESSAGES, URLS, ROLES, JWT_SECRET} from './../constants'

const router = Router()

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

export const registerError = (req, res, err) =>
    dispatchAndRespond(req, res, {
        type: ACTIONS.AUTHENTICATION,
        auth: MESSAGES.REGISTER_ERROR,
        role: "",
        messageDetails: err.toString()
    })

export const registerSuccess = (req, res, {_id, role}) => {
    authorize(req, res, _id, role)
    dispatchAndRespond(req, res, {
        type: ACTIONS.AUTHENTICATION,
        auth: MESSAGES.SUCCESS,
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
                    registerSuccess(req, res, user)
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
                    ? next(err)
                    : user
                        ? req.logIn(user, function(err) {
                            let token = jwt.sign(user.toJSON(), '12345-67890-09876-54321', {
                                expiresIn: 24000
                            });
                            new Cookies(req,res).set('access_token',token,{
                                httpOnly: true,
                                secure: false, // for your production environment
                            });
                            console.log(token)
                            return err
                                ? next(err)
                                : res.redirect('/app');
                        })
                        : res.redirect('/');
            }
        )(req, res, next);
    })



export default router