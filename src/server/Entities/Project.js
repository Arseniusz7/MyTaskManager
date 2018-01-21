/**
 * project colors
 */
import mongoose from 'mongoose'

let ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    developers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    timestamp: String
});

export default mongoose.model('Project', ProjectSchema);