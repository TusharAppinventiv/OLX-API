import { Request, Response } from 'express';
import {
  findUserByUsername,
  deleteUserById,
  updateUserById,
} from '../services/modifyUser.service';

  
  const getUserByName = async (req: Request, res: Response) => {
    const { username } = req.params;
  
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    // Find the user by their username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { email, mobNumber } = user;
    await deleteUserById(user.id.toString());

    return res.status(200).json({ message: 'User deleted', email, mobNumber });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    username,
    password,
    address,
    profile_photo,
    mobNumber,
    gender,
    dob,
    firstName,
    lastName,
  } = req.body;

  try {
    const user = await updateUserById(id, {
      username,
      password,
      address,
      profile_photo,
      mobNumber,
      gender,
      dob,
      firstName,
      lastName,
    });

    return res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { deleteUser, updateUser, getUserByName };
