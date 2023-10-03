const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/images/SoneDefaultPFP.png"
  }
});

const User_ = mongoose.model("User", UserSchema);
module.exports = User_; // prevent redeclaration