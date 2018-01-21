/**
 * project colors
 */
import { Router } from 'express'
import User from '../entities/User'
import passport from 'passport'
import dispatchAndRespond from '../dispatchAndRespond'
import {MESSAGES, URLS, ROLES } from '../../constants'
import {authSuccess, authError} from '../serverActions/serverActions'

const router = Router()



export const registerError = (req, res, err) =>
    dispatchAndRespond(req, res, authError(err, MESSAGES.REGISTER_ERROR))

export const loginError = (req, res, err) =>
    dispatchAndRespond(req, res, authError(err, MESSAGES.LOGIN_ERROR))

export const authorizationSuccess = (req, res, {_id, role}) => {
    dispatchAndRespond(req, res, authSuccess(_id, role))
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



export default router