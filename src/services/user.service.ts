// services/userService.ts
import User from '../models/user.model';

const registeredUsers: User[] = []; 

class UserService {
  static registerUser(user: User): User {
    registeredUsers.push(user);
    return user;
  }

  static isUserAlreadyRegistered(email: string, username: string, mobNumber: string): boolean {
    return registeredUsers.some((user) => user.email === email || user.username === username || user.mobNumber ===mobNumber);
  }
}

export default UserService;
