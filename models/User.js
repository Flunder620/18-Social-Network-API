const { Schema, model } = require('mongoose');

const emailValidate = (email) => {
    const regexValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexValidate.test(email);
  };

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: [emailValidate, "Must be a valid email adress"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please submit a valid email address",
              ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
)
// friendCount Virtual
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('user', userSchema)

module.exports = User;