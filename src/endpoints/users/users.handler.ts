import {
  EndpointAuthType,
  EndpointRequestType,
  EndpointHandler,
} from 'node-server-engine';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { User, Audit, Role } from 'db';
import {
  USER_NOT_FOUND,
  USER_CREATION_ERROR,
  USER_UPDATE_ERROR,
  USER_DELETION_ERROR,
  USER_GET_ERROR
} from './users.const';
import { profile } from 'console';

function isValidBase64(base64String: string): boolean {
  // Regular expression to check if the string is a valid base64 image string (with a data URI scheme)
  const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
  return base64Regex.test(base64String);
}


//create new User 
export const createUserHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    password,
    dateOfJoining,
    roleId
  } = req.body;
  const { user } = req; // Getting the authenticated user

  try {

    const roleRecord = await Role.findOne({ where: { id: roleId } });

    if (!roleRecord) {
      res.status(400).json({ message: 'Invalid roleId' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      phoneNumber,
      password: hashedPassword,
      dateOfJoining,
      roleId,
      createdBy: user?.id
    });

    res.status(200).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: USER_CREATION_ERROR, error });
  }
};


//get all user
export const getAllUsersHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
) => {
  try {

    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });

    if (!users) {
      res.status(404).json({ message: USER_NOT_FOUND });
      return;
    }

    const usersWithRole = users.map(user => ({
      ...user.toJSON(),
      roleName: user.role?.name
    }));

    res.status(200).json({ Users: usersWithRole });


  } catch (error) {
    res.status(500).json({ message: USER_GET_ERROR, error });
  }
};



export const getUserByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;

  try {

    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({ message: USER_NOT_FOUND });
      return;
    }

    res.status(200).json({ user })
  } catch {
    res.status(500).json({ message: USER_GET_ERROR });
  }
};

export const updateUserHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req; // Authenticated user
  let {
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    address,
    qualification,
    profilePic,
    dateOfJoining,
    roleId,
    accountStatus,
  } = req.body;

  try {
    const updateUser = await User.findByPk(id);

    if (!updateUser) {
      res.status(404).json({ message: USER_NOT_FOUND });
      return;
    }

    // **Role-based validation**
    if (user.role === 'trainee' && user.id !== updateUser.id) {
      res.status(403).json({ message: "Permission denied. You can only update your own profile." });
      return;
    }

    // Admin can edit all fields
    if (user.role === 'admin') {
      updateUser.set({
        firstName,
        lastName,
        email,
        dateOfBirth,
        phoneNumber,
        address,
        qualification,
        dateOfJoining,
        roleId,
        accountStatus,
        updatedBy: user?.id
      });
    } 
    // Trainees can only edit specific fields
    else if (user.role === 'trainee') {
      updateUser.set({
        dateOfBirth,
        phoneNumber,
        address,
        profilePic,
        qualification,
        updatedBy: user?.id
      });
    }

    await updateUser.save();

    // Log the audit trail
    await Audit.create({
      entityType: 'User',
      entityId: updateUser.id,
      action: 'UPDATE',
      OldData: {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        dateOfBirth: updateUser.dateOfBirth,
        phoneNumber: updateUser.phoneNumber,
        address: updateUser.address,
        qualification: updateUser.qualification,
        profilePic: updateUser.profilePic,
        dateOfJoining: updateUser.dateOfJoining,
        roleId: updateUser.roleId,
        accountStatus: updateUser.accountStatus,
      },
      newData: updateUser,
      performedBy: user?.id
    });

    res.status(200).json({ message: 'User updated successfully', user: updateUser });

  } catch (error) {
    res.status(500).json({ message: USER_UPDATE_ERROR, error });
  }
};


// //delete user
export const deleteUserHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;

  try {

    const deleteUser = await User.findByPk(id);

    if (!deleteUser) {
      res.status(404).json({ message: USER_NOT_FOUND });
      return;
    }

    await Audit.create({
      entityType: 'User',
      entityId: deleteUser.id,
      action: 'DELETE',
      oldData: deleteUser, // Old data before deletion
      performedBy: user?.id
    })

    await deleteUser.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: USER_DELETION_ERROR, error });
  }
};