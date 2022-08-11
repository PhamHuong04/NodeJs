const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'User must name !'],
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      require: [true, 'User must email !'],
      unique: true,
      validate: [
        function (email) {
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email);
        },
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      minLength: 8,
    },
    address: [
      {
        type: String,
      },
    ],
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;