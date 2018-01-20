/**
 * project colors
 */
import User from './Entities/User'

// SOME SALT AND HASHING WILL BE NICE

export const localStrategy = (username, password, done) => {
    User.findOne({ username : username},function(err,user){
        return err
            ? done(err)
            : user
                ? password === user.password
                    ? done(null, user)
                    : done(null, false, { message: 'Incorrect password.' })
                : done(null, false, { message: 'Incorrect username.' })
    })
}

export const serializeUser = (user, done) => {
    done(null, user.id)
}

export const deserializeUser = (id, done) => {
    User.findById(id, function (err, user) {
        err
            ? done(err)
            : done(null, user);
    })
}