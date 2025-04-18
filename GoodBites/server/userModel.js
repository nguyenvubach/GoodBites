import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields like name, age, etc. if needed
});

const User = mongoose.model('User', userSchema);
export default User;
