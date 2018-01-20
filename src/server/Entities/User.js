/**
 * project colors
 */
import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    firstName: String,
    lastName: String
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);