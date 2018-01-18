/**
 * project colors
 */
import mongoose from 'mongoose'

let ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }

});

export default mongoose.model('Project', ProjectSchema);