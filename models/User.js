const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email);
}


const userSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trimmed: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: true,
            validate: [validateEmail, 'Enter a valid email address'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;