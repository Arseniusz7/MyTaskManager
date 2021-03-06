
import mongoose from 'mongoose'

let TaskSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    timestamp: String
});

export default mongoose.model('Task', TaskSchema);