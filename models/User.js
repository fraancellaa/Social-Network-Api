const { kStringMaxLength } = require('buffer');
const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought')

const UserSchema = new Schema({

    username: {
        type: String, 
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    thought: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }
    ],
    friends: [this]
},
{
    toJSON: {
        virtuals: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;