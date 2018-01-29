/**
 * project colors
 */
import { Router } from 'express'
import User from '../entities/User'
import TempUser from '../entities/TempUser'
import passport from 'passport'
import dispatchAndRespond from '../dispatchAndRespond'
import {MESSAGES, URLS, ROLES, URL_DOMAIN } from '../../constants'
import {authSuccess, authError, emailSent} from '../serverActions/serverActions'
import {IgnoreList_id} from './reactRenderRouter'
import crypt from 'bcrypt-nodejs'

const router = Router()

import nodemailer from 'nodemailer'

const mailSender = 'fabuloustaskmanager@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailSender,
        pass: 'not$ecure127'
    },
    tls: { rejectUnauthorized: false }
});

const generateRegisterMessage = href => `
<!DOCTYPE html>
<div>
    <p>If you want to activate your account. Please click the link below. 
       If unfortunately this message goes to the spam and the link does not work,
       try to unmark it as spam.</p>
    <a href=${href}>Link: Task Manager</a>
</div>
`


export const registerError = (res, err) =>
    dispatchAndRespond(res, authError(err, MESSAGES.REGISTER_ERROR))

export const loginError = (res, err) =>
    dispatchAndRespond(res, authError(err, MESSAGES.LOGIN_ERROR))

export const authorizationSuccess = (res, {_id, role}) => {
    dispatchAndRespond(res, authSuccess(_id, role))
}


export const hashUrl = (length=16) => {
    const Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let hashInit = ''
    return [... new Array(length)].reduce((arg) => {
        arg += Chars.charAt(Math.floor(Math.random() * Chars.length))
        return arg
    }, hashInit);
}

router.post(URLS.REGISTER,
    (req, res) => {
        let {email, password, lastName, firstName, manager} = req.body
        let hash = hashUrl()
        let hashPassword = crypt.hashSync(password)
        let tempUser = new TempUser({ hash: hash, username: email, password: hashPassword, lastName: lastName,
            firstName: firstName, timestamp: new Date().toString(),
            role: ((manager == true) ? ROLES.MANAGER : ROLES.DEVELOPER) })
        let mailOptions = {
            from: mailSender,
            to: email,
            subject: 'Do not reply',
            html: generateRegisterMessage(`${URL_DOMAIN}${URLS.REGISTER}/${hash}`)

        }
        tempUser.save(function(err) {
            return err
                ? registerError(res, MESSAGES.USED_EMAIL_ERROR)
                : transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                        registerError(res, MESSAGES.SEND_MESSAGE_ERROR)
                    } else {
                        console.log(info)
                        dispatchAndRespond(res, emailSent());
                    }
                });
        });
    }
)

router.get(`${URLS.REGISTER}/:hash`,
    (req, res) => {
        let {hash} = req.params
        if(IgnoreList_id.indexOf(hash) === -1) {
            TempUser.findOne({hash: hash})
                .then(tempUser => {
                    let user = new User({username: tempUser.username, password: tempUser.password,
                        lastName: tempUser.lastName, firstName: tempUser.firstName, role: tempUser.role})
                    user.save(err => {
                        return err ?
                            res.redirect(URLS.REGISTER) :
                            res.redirect('/')
                    })
                })
                .catch(()=>console.log("There is no such a temp user"))
        }
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
                    ? loginError(res, MESSAGES.LOGIN_ERROR_DETAILS)
                    : req.logIn(user, function(err) {
                        if(user)
                            authorizationSuccess(res, user)
                        else
                            loginError(res, MESSAGES.LOGIN_ERROR_DETAILS)
                    });
            }
        )(req, res, next);
    })



export default router