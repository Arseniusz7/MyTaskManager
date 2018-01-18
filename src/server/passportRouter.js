/**
 * project colors
 */
import { Router } from 'express'
import User from './Entities/User'
import passport from 'passport'

const router = Router()

router.post("/register",
    (req, res, next) => {
        console.warn(req.body)
        let user = new User({ username: req.body.email, password: req.body.password, lastName: req.body.lastName,
        firstName: req.body.firstName, manager: ((req.body.manager) ? req.body.manager : false) });
        user.save(function(err) {
            return err
                ? next(err)
                : req.logIn(user, function(err) {
                    console.warn("login " + user)
                    return err
                        ? next(err)
                        : res.redirect('/');
                });
        });
    }
)

router.get("/logout",
    (req, res) => {
        req.logout()
        res.redirect('/')
    }
)



router.post("/login",
    (req, res, next) => {
        passport.authenticate('local',
            function(err, user, info) {
                return err
                    ? next(err)
                    : user
                        ? req.logIn(user, function(err) {
                            console.warn("login " + user)
                            return err
                                ? next(err)
                                : res.redirect('/');
                        })
                        : res.redirect('/');
            }
        )(req, res, next);
    })



export default router