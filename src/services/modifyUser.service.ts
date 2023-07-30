import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';

const findUserByUsername = async (username: string) => {
  return await UserModel.findOne({ where: { username } });
};

const deleteUserById = async (id: string) => {
  return await UserModel.destroy({ where: { id } });
};

const updateUserById = async (
  id: string,
  {
    username,
    password,
    address,
    profile_photo,
    mobNumber,
    gender,
    dob,
    firstName,
    lastName,
  }: any
) => {
  const user = await UserModel.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }

  // Update the user's fields
  user.username = username || user.username;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }
  user.address = address || user.address;
  user.profile_photo = profile_photo || user.profile_photo;
  user.mobNumber = mobNumber || user.mobNumber;
  user.gender = gender || user.gender;
  user.dob = dob || user.dob;
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;

  await user.save();

  return user;
};

export { findUserByUsername, deleteUserById, updateUserById };
