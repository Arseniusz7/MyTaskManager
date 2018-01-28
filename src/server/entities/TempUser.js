import mongoose from 'mongoose'

let TempUserSchema = new mongoose.Schema({
    hash: {
        type: String,
        unique: true,
        required: true
    },
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
    lastName: String,
    timestamp: String
});

export default mongoose.model('TempUser', TempUserSchema);