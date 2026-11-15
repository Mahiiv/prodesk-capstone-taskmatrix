// user model for taskmatrix, email + password + name
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }
});

// this runs right BEFORE a user gets saved
// so the plain password never reaches mongodb
// newer mongoose has no next(), we just return the promise
userSchema.pre('save', function () {
  var user = this;

  // if password didnt change (like editing the name) skip hashing
  // otherwise we would hash an already hashed password
  if (!user.isModified('password')) {
    return;
  }

  // salt = random extra text mixed into the password
  return bcrypt.genSalt(10).then(function (salt) {
    return bcrypt.hash(user.password, salt);
  }).then(function (hashedPassword) {
    user.password = hashedPassword;
  });
});

module.exports = mongoose.model('User', userSchema);