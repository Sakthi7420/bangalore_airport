import {
    EndpointAuthType,
    EndpointRequestType,
    EndpointHandler,
} from 'node-server-engine';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { User, Audit, Role, BatchModuleSchedules, Batch, Course, Module } from 'db';
import {
    USER_NOT_FOUND,
    USER_CREATION_ERROR,
    USER_UPDATE_ERROR,
    USER_DELETION_ERROR,
    USER_GET_ERROR
} from './users.const';
import { where } from 'sequelize';

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
      phoneNumber,
      password: hashedPassword,
      dateOfJoining,
      roleId: roleRecord.id,
      createdBy: user?.id
    });

    await Audit.create({
        entityType: 'User',
        entityId: newUser.id,
        action: 'CREATE',
        newData: newUser,
        performedBy: user?.id
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

    const user = await User.findByPk(id);

  //   const user = (
  //     await User.findOne({ where: { id },
  //     attributes: ['id', 'firstName', 'lastName'],
  //     include: [
  //       {
  //         model: Course, as: 'course',
  //         attributes: ['id', 'courseName']
  //       },
  //       {
  //         model: Batch, as: 'batch',
  //         attributes: ['id', 'batchName']
  //       },
  //       {
  //         model: Module, as: 'module',
  //         attributes: ['id', 'moduleName']
  //       },
  //       {
  //         model: BatchModuleSchedules, as: 'batchModuleSchedules',
  //         attributes: ['id', 'scheduleDateTime', 'duration']
  //       }
  //     ]
  //   })
  // )?.toJSON();

    if (!user) {
      res.status(404).json({ message: USER_NOT_FOUND });
      return;
    }

    // const transformedUser = {
    //   id: user.id,
    //   firstName: user.firstName,
    //   lastName: user.lastName,
    //   course: user.course.map((course: { courseName: string }) => course.courseName),
    //   batch: user.batch.map((batch: { batchName: string }) => batch.batchName),
    //   module: user.module.map((module: { moduleName: string }) => module.moduleName),
    //   batchModuleSchedules: user.batchModuleSchedules.map((batchModuleSchedule: { 
    //     scheduleDateTime: string, duration: string }) => 
    //       ({ scheduleDateTime: batchModuleSchedule.scheduleDateTime, duration: batchModuleSchedule.duration }))
    // }

    res.status(200).json({ user })
  } catch {
    res.status(500).json({ message: USER_GET_ERROR });
  }
};

// //update a new user
export const updateUserHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;
  const {
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

     //Validate base64 image format
     if (!isValidBase64(profilePic)) {
      res.status(400).json({ message: 'Invalid base64 image format.' });
      return;
  }


    const previousData = {
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
    }

    updateUser.set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      address: address,
      qualification: qualification,
      profilePic: profilePic,
      dateOfJoining: dateOfJoining,
      roleId: roleId,
      accountStatus: accountStatus,
      updatedBy: user?.id
    });

    await updateUser.save();

    await Audit.create({
        entityType: 'User',
        entityId: updateUser.id,
        action: 'UPDATE',
        OldData: previousData,
        newData: updateUser,
        performedBy: user?.id
      });

    res.status(200).json({ message: 'User updated successfully', user: updateUser })
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
