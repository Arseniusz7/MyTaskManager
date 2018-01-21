/**
 * project colors
 */
import mongoose from 'mongoose'

let CommentSchema = new mongoose.Schema({
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