
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilepic: {
        type: String,
        default: ""
    }
})

// module.exports = mongoose.model('user', UserSchema); change to ES6 export
export default mongoose.model('User', UserSchema);