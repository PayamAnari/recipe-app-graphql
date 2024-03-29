import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    following: {
      type: [String],
      required: true,
    },
    recipes: [{
      type: Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);
export default UserModel;
