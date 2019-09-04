const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String,
        enum: ['doctor'],
        default: 'doctor'
    }
});

UserSchema.pre('save', function(next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
            if (err) {
                next(err);
            }
            else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
      next();
    }
});

module.exports = mongoose.model('User', UserSchema);