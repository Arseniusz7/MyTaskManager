/**
 * project colors
 */
import mongoose from 'mongoose'

let CommentSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: String
});

export default mongoose.model('Comment', CommentSchema);