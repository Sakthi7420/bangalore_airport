import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType,
    sequelize
} from 'node-server-engine';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import {
    ATTENDANCE_GET_ERROR,
    ATTENDANCE_CREATION_ERROR,
    ATTENDANCE_NOT_FOUND,
    ATTENDANCE_DELETION_ERROR,
    ATTENDANCE_UPDATE_ERROR,
    USER_NOT_FOUND,
    BATCH_NOT_FOUND,
    MODULE_NOT_FOUND
} from './attendance.const';
import { Attendance, User, Batch, Module, Audit, Role } from 'db';


function isValidBase64File(base64String: string): boolean {
    // Regular expression to match base64 strings for allowed MIME types
    const base64Regex = /^data:(application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|application\/msword|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel);base64,/;
    return base64Regex.test(base64String);
  }


//Get all Attendance
export const getAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {
        const attendance = await Attendance.findAll({
            include: [
                {
                    model: User, as: 'user',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Batch, as: 'batch',
                    attributes: ['id', 'batchName']
                },
                {
                    model: Module, as: 'module',
                    attributes: ['id', 'moduleName']
                },
                {
                    model: User, as: 'trainer',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if(attendance.length === 0) {
            res.status(404).json({ message: "Attendance Not found" });
            return;
        }

        res.status(200).json({ attendance: attendance });
    } catch (error) {
        res.status(500).json({ message: ATTENDANCE_GET_ERROR });
    }
};


export const createAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { user } = req;
  const { batchId, moduleId, trainerId, excelFile } = req.body;

  if (!trainerId) {
    res.status(404).json({ message: USER_NOT_FOUND })
    return;
  }
  if (!batchId) {
    res.status(404).json({ message: BATCH_NOT_FOUND })
    return;
  }
  if (!moduleId) {
    res.status(404).json({ message: MODULE_NOT_FOUND })
    return;
  }
  if (!excelFile) {
    res.status(400).json({ message: "Excel file is required" })
    return;
  }

  try {
    let fileBuffer: Buffer;

    // Decode the Excel file if it's base64-encoded
    if (excelFile.startsWith('data:')) {
      const base64Data = excelFile.split(';base64,').pop();
      fileBuffer = Buffer.from(base64Data, 'base64');
    } else {
      fileBuffer = Buffer.from(excelFile);
    }

    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    // Check if the workbook contains any sheets
    if (!workbook.SheetNames.length) {
      res.status(400).json({ message: "Uploaded file is invalid or empty" });
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Check if the worksheet has content
    if (!worksheet || Object.keys(worksheet).length === 0) {
      res.status(400).json({ message: "No valid data found in the Excel file" });
      return;
    }

    const excelData: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet);

    // Check if the data is empty
    if (excelData.length === 0) {
      res.status(400).json({ message: "Excel file is empty or improperly formatted" });
      return;
    }

    const attendancePromises: Promise<any>[] = [];

    // Iterate through each row in the parsed Excel data
    for (let i = 0; i < excelData.length; i++) {
      const row = excelData[i];

      const name = row['Name']?.trim();
      const firstJoin= row['First Join']?.trim();
      const lastLeave= row['Last Leave']?.trim();
      const duration = row['In-Meeting Duration']?.trim();
      const email = row['Email']?.trim();
      const role = row['Role']?.trim();
      const attendanceValue = row['Attendance']?.trim();

      // Validate required fields
      if (!email || !duration || !role || attendanceValue === undefined) {
        console.warn(`Missing required data in row ${i + 1}`);
        continue;
      }

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        console.warn(`User with email ${email} not found in row ${i + 1}`);
        continue;
      }

      // Create attendance record for the user
      const attendancePromise = Attendance.create({
        userId: foundUser.id,
        batchId: batchId,
        moduleId: moduleId,
        trainerId: trainerId,
        firstJoin: firstJoin,
        lastLeave: lastLeave,
        email: email,
        duration: duration,
        role: role,
        attendance: attendanceValue,
      }).then(async (newAttendance) => {
        console.log('Attendance Created:', newAttendance);

        // Create an audit record for the attendance creation
        await Audit.create({
          entityType: 'Attendance',
          entityId: newAttendance.id,
          action: 'CREATE',
          newData: newAttendance,
          performedBy: user?.id,
        });
      }).catch((error) => {
        console.error(`Error creating attendance for row ${i + 1}:`, error);
      });

      attendancePromises.push(attendancePromise);
    }

    // Wait for all attendance creation promises to resolve
    await Promise.all(attendancePromises);

    res.status(201).json({ message: 'Attendances created successfully', attendancePromises });
  } catch (error) {
    console.error('Error during attendance creation:', error);
    res.status(500).json({ message: ATTENDANCE_CREATION_ERROR, error });
  }
};

//Update Attendance
export const updateAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params
  const { user } = req;
  const { batchId, moduleId, trainerId, excelFile } = req.body;

  try {

    const updateAttendance = await Attendance.findByPk(id, {
      include: [
        {
          model: User, as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Batch, as: 'batch',
          attributes: ['id', 'batchName'],
        },
        {
          model: Module, as: 'module',
          attributes: ['id', 'moduleName'],
        },
        {
          model: User, as: 'trainer',
          attributes: ['id', 'firstName', 'lastName'],
        }
      ]
    })

  if (!trainerId) {
    res.status(404).json({ message: USER_NOT_FOUND });
    return;
  }
  if (!batchId) {
    res.status(404).json({ message: BATCH_NOT_FOUND });
    return;
  }
  if (!moduleId) {
    res.status(404).json({ message: MODULE_NOT_FOUND });
    return;
  }
  if (!excelFile) {
    res.status(400).json({ message: "Excel file is required" });
    return;
  }

 
    let fileBuffer: Buffer;

    // Decode the Excel file if it's base64-encoded
    if (excelFile.startsWith('data:')) {
      const base64Data = excelFile.split(';base64,').pop();
      fileBuffer = Buffer.from(base64Data, 'base64');
    } else {
      fileBuffer = Buffer.from(excelFile);
    }

    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    // Check if the workbook contains any sheets
    if (!workbook.SheetNames.length) {
      res.status(400).json({ message: "Uploaded file is invalid or empty" });
      return;
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Check if the worksheet has content
    if (!worksheet || Object.keys(worksheet).length === 0) {
      res.status(400).json({ message: "No valid data found in the Excel file" });
      return;
    }

    const excelData: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet);

    // Check if the data is empty
    if (excelData.length === 0) {
      res.status(400).json({ message: "Excel file is empty or improperly formatted" });
      return;
    }

    const attendancePromises: Promise<any>[] = [];

    // Iterate through each row in the parsed Excel data
    for (let i = 0; i < excelData.length; i++) {
      const row = excelData[i];

      const name = row['Name']?.trim();
      const firstJoin = row['First Join']?.trim();
      const lastLeave = row['Last Leave']?.trim();
      const duration = row['In-Meeting Duration']?.trim();
      const email = row['Email']?.trim();
      const role = row['Role']?.trim();
      const attendanceValue = row['Attendance']?.trim();

      // Validate required fields
      if (!email || !duration || !role || attendanceValue === undefined) {
        console.warn(`Missing required data in row ${i + 1}`);
        continue;
      }

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        console.warn(`User with email ${email} not found in row ${i + 1}`);
        continue;
      }

      // Find the existing attendance record to update
      const existingAttendance = await Attendance.findOne({
        where: {
          userId: foundUser.id,
          batchId: batchId,
          moduleId: moduleId,
          trainerId: trainerId,
        },
      });

      if (!existingAttendance) {
        console.warn(`Attendance record not found for user with email ${email}`);
        continue;
      }

      // Update the attendance record
      const updateAttendance = existingAttendance.update({
        firstJoin: firstJoin,
        lastLeave: lastLeave,
        duration: duration,
        role: role,
        attendance: attendanceValue,
      }).then(async (updatedAttendance) => {
        console.log('Attendance Updated:', updatedAttendance);

        // Create an audit record for the attendance update
        await Audit.create({
          entityType: 'Attendance',
          entityId: updatedAttendance.id,
          action: 'UPDATE',
          newData: updatedAttendance,
          performedBy: user?.id,
        });
      }).catch((error) => {
        console.error(`Error updating attendance for row ${i + 1}:`, error);
      });

      attendancePromises.push(updateAttendance);
    }

    // Wait for all attendance update promises to resolve
    await Promise.all(attendancePromises);

    res.status(200).json({ message: 'Attendances updated successfully', attendancePromises });
  } catch (error) {
    console.error('Error during attendance update:', error);
    res.status(500).json({ message: ATTENDANCE_UPDATE_ERROR, error });
  }
};


//Delete Attendance
export const deleteAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {
        const deleteAttendance = await Attendance.findByPk(id);

        if (!deleteAttendance) {
            res.status(404).json({ message: ATTENDANCE_NOT_FOUND });
            return;
        }

        await Audit.create({
            entityType: 'Attendance',
            entityId: deleteAttendance.id,
            action: 'DELETE',
            oldData: deleteAttendance,
            performedBy: user?.id
        });

        await deleteAttendance.destroy();

        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: ATTENDANCE_DELETION_ERROR, error });
    }
};
