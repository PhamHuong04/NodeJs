const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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


UserSchema.pre('save', async function (next) {
  // Only run this func if password was actually modified
  if (!this.isModified('password')) {
    return next();
  }
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  return next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  const result = await bcrypt.compare(candidatePassword, userPassword);

  return result;
};


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;