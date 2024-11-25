import {
  EndpointAuthType,
  EndpointRequestType,
  EndpointHandler,
  generateJwtToken
} from '@gwcdata/node-server-engine';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { User } from 'db';

export const registerHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    password, 
    role,
   } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    password: hashedPassword, 
    role,
    });
    
    res
      .status(201)
      .json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};


const updateUserLastLogin = async (id: number): Promise<void> => {
  const user = await User.findByPk(id);
  if (user) {
    user.lastLogin = new Date();  // Set lastLogin to current date and time
    await user.save();
  }
};

export const loginHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'password'],
      raw: true
    });
    
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    await updateUserLastLogin(user.id);


    const tokenExpiry = Math.floor(Date.now() / 1000) + 60 * 60;
    const accessToken = generateJwtToken(user);


    const { password: _, ...userWithoutPassword } = user;

    res
      .status(200)
      .json({ accessToken, tokenExpiry, user: userWithoutPassword });

  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};

export const logoutHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
) => {
  // Here you might want to implement logic to blacklist the token or handle session
  res.status(200).json({ message: 'User logged out successfully' });
};


//get all user
export const getAllUsersHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {

  try {

    const users = await User.findAll();

    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have Permission' });
      return;
    }

    if (!users) {
      res.status(404).json({ message: 'No users found' });
      return;
    }

    res.status(200).json({ Users: users });
    return;

  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
    return;
  }
};


//create new User 
export const createUserHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {

    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber,
      password, 
      dateOfJoining, 
      role
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      password: hashedPassword,
      dateOfJoining, 
      role
    });

    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have an Permission to create a new user' });
      return;
    };

    res.status(200).json({ message: 'User created successfully', user });
    return;

  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
    return;
  }
};


//update a new user
export const updateUserHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {

  const { id } = req.params;

  const {
    firstName, 
    lastName, 
    email, 
    phoneNumber,
    address,
    qualification,
    profilePic,
    dateOfJoining, 
    role,
    accountStatus,
  } = req.body;

  try {

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (req.user?.role !== 'admin' || req.user?.id !== id) {
      res.status(403).json({ message: 'You do not have permission to update this user' });
      return;
    }

    const updatedBy = req.user?.id;

  user.set({
    firstName: firstName, 
    lastName: lastName, 
    email: email,  
    phoneNumber: phoneNumber,  
    address: address,
    qualification: qualification,
    profilePic: profilePic,
    dateOfJoining: dateOfJoining, 
    role: role,
    accountStatus: accountStatus,
    updatedBy: updatedBy
  });

  await user.save();

  res.status(200).json({ message: 'User updated successfully', user })
  return;

} catch (error) {
  res.status(500).json({ message: 'Error updating courseDetails', error });
  return;
}
};

//delete user
export const deleteUserHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {

  const { id } = req.params;

  try {

    const user = await User.findByPk(id);

    if(req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have Permission to delete the user' });
      return;
    }

    if (req.user?.id === id) {
      res.status(403).json({ message: 'Admin cannot delete their own account' });
      return;
    }
    

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
    return;

  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
    return;
  }
};