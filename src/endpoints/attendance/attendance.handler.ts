import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType,
} from 'node-server-engine';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import {
  ATTENDANCE_GET_ERROR,
  ATTENDANCE_CREATION_ERROR,
  ATTENDANCE_NOT_FOUND,
  ATTENDANCE_DELETION_ERROR,
  ATTENDANCE_UPDATE_ERROR,
  BATCH_NOT_FOUND,
  COURSE_NOT_FOUND,
  MODULE_NOT_FOUND,
  CLASS_NOT_FOUND,
  ATTENDANCEFILE_CREATION_ERROR,
  ATTENDANCEFILE_GET_ERROR,
  ATTENDANCEFILE_UPDATE_ERROR,
  ATTENDANCEFILE_DELETE_ERROR,
  ATTENDANCEFILE_NOT_FOUND
} from './attendance.const';
import { Attendance, User, Batch, Module, Audit, Course, Class } from 'db';
import { AttendanceFile } from 'db/models/AttendanceFile';

function isValidBase64File(base64String: string): boolean {
  // Regular expression to match base64 strings for allowed MIME types
  const base64Regex = /^data:(application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|application\/msword|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel|text\/csv);base64,/;
  return base64Regex.test(base64String);
}

//GET file
export const getAttendanceFileHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  try {
    const attendanceFile = await AttendanceFile.findAll();

    if (attendanceFile.length === 0) {
      res.status(404).json({ message: "Attendancefile Not found" });
      return;
    }

    res.status(200).json({ message: 'Attendance file found', attendanceFile })
  } catch (error) {
    res.status(500).json({ message: ATTENDANCEFILE_GET_ERROR, error })
  }
};


//CREATE attendanceFile
export const createAttendanceFileHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { user } = req;
  const { teamsAttendanceFile } = req.body;

  if (!teamsAttendanceFile) {
    res.status(404).json({ message: "Attendance file required" });
    return;
  }

  if (!isValidBase64File(teamsAttendanceFile)) {
    res.status(400).json({ message: 'Invalid base64 documents format.' });
    return;
  }

  try {

    const existingFile = await AttendanceFile.findOne({
      where: { teamsAttendanceFile }, // Check for an exact match of the base64 string
    });

    if (existingFile) {
      res.status(400).json({ message: 'This attendance file has already been uploaded.' });
      return;
    }

    const newAttendanceFile = await AttendanceFile.create({
      teamsAttendanceFile,
      attendanceDate: new Date(),
      createdBy: user?.id,
    });

    await Audit.create({
      entityType: 'Attendance',
      entityId: newAttendanceFile.id,
      action: 'CREATE',
      newData: newAttendanceFile,
      performedBy: user?.id
    });

    res.status(201).json({ message: 'AttendanceFile created successfully', newAttendanceFile })
  } catch (error) {
    res.status(500).json({ message: ATTENDANCEFILE_CREATION_ERROR, error })
  }
};


//GETBYID attendancefile 
export const getAttendanceFileByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;

  try {
    const attendanceFile = await AttendanceFile.findByPk(id);

    if (!attendanceFile) {
      res.status(404).json({ message: ATTENDANCEFILE_NOT_FOUND });
      return;
    }

    res.status(200).json({ messge: 'AttendanceFile found', attendanceFile });
  } catch (error) {
    res.status(404).json({ message: ATTENDANCEFILE_GET_ERROR, error });
  }
};


//UPDATE AttendanceFile
export const updateAttendanceFileHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;
  const { teamsAttendanceFile } = req.body;

  if (!isValidBase64File(teamsAttendanceFile)) {
    res.status(400).json({ message: 'Invalid base64 documents format.' });
    return;
  }

  try {

    const updateAttendanceFile = await AttendanceFile.findByPk(id);

    if (!updateAttendanceFile) {
      res.status(404).json({ message: ATTENDANCEFILE_NOT_FOUND });
      return;
    }

    const previousData = updateAttendanceFile;

    updateAttendanceFile.set({
      teamsAttendanceFile,
      attendanceDate: new Date(),
      updatedBy: user?.id,
    });

    await Audit.create({
      entityType: 'Attendance',
      entityId: updateAttendanceFile.id,
      action: 'UPDATE',
      oldData: previousData,
      newData: updateAttendanceFile,
      performedBy: user?.id
    });

    await updateAttendanceFile.save();

    res.status(200).json({ message: 'AttendanceFile updated successfully', updateAttendanceFile });
  } catch (error) {
    res.status(500).json({ message: ATTENDANCEFILE_UPDATE_ERROR, error });
  }
};

//DELETE attendanceFile
export const deleteAttendanceFileHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;

  try {
    const attendanceFile = await AttendanceFile.findByPk(id);

    if (!attendanceFile) {
      res.status(404).json({ message: ATTENDANCEFILE_NOT_FOUND });
      return;
    }

    await Audit.create({
      entityType: 'Attendance',
      entityId: attendanceFile.id,
      action: 'DELETE',
      oldData: attendanceFile,
      performedBy: user?.id
    });

    await attendanceFile.destroy();

  } catch (error) {
    res.status(500).json({ message: ATTENDANCEFILE_DELETE_ERROR, error });
  }
};


//GET Attendance
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
          model: Course, as: 'course',
          attributes: ['id', 'courseName']
        },
        {
          model: Class, as: 'class',
          attributes: ['id', 'classTitle']
        },
        {
          model: AttendanceFile, as: 'attendanceFile',
          attributes: ['id', 'attendanceDate', 'teamsAttendanceFile']
        }
      ]
    });

    if (attendance.length === 0) {
      res.status(404).json({ message: "Attendance Not found" });
      return;
    }

    res.status(200).json({ attendance: attendance });
  } catch (error) {
    res.status(500).json({ message: ATTENDANCE_GET_ERROR, error });
  }
};

//GETBYID
export const getAttendanceByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  
  const { userId, batchId, courseId, classId } = req.query; 
  
  const whereClause: any = {}; 

  if (userId) whereClause.userId = userId;
  if (batchId) whereClause.batchId = batchId;
  if (courseId) whereClause.courseId = courseId;
  if (classId) whereClause.classId = classId;

  try {
    const attendanceRecords = await Attendance.findAll({
      where: whereClause,
      include: [
        {
          model: Batch,
          as: 'batch',
          attributes: ['id', 'batchName'],
        },
        {
          model: Module,
          as: 'module',
          attributes: ['id', 'moduleName'],
        },
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'courseName'],
        },
        {
          model: Class,
          attributes: ['id', 'classTitle']
        },
        {
          model: AttendanceFile,
          as: 'attendanceFile',
          attributes: ['id', 'teamsAttendanceFile', 'attendanceDate'],
        }
      ],
    });

    if (attendanceRecords.length === 0) {
      res.status(404).json({ message: 'No attendance records found for the given filters' });
      return;
    }

    res.status(200).json({
      message: 'Attendance records fetched successfully',
      attendanceRecords,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};



//CREATE attendance
export const createAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { user } = req;
  const { batchId, courseId, moduleId, classId, excelFile, attendanceFileId } = req.body;

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
  if (!courseId) {
    res.status(404).json({ message: COURSE_NOT_FOUND })
    return;
  }
  if (!classId) {
    res.status(404).json({ message: CLASS_NOT_FOUND })
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
      const firstJoin = row['First Join']?.trim();
      const lastLeave = row['Last Leave']?.trim();
      const percentage = row['Participation Rate'].trim();
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

      console.log("Creating attendance with data:", {
        userId: foundUser.id,
        batchId,
        courseId,
        moduleId,
        firstJoin,
        lastLeave,
        email,
        percentage,
        duration,
        teamsRole: role,
        attendance: attendanceValue,
        attendanceFileId,
        createdBy: user?.id
      });
      

      // Create attendance record for the user
      const attendancePromise = Attendance.create({
        userId: foundUser.id,
        batchId: batchId,
        courseId: courseId,
        moduleId: moduleId,
        classId: classId,
        firstJoin: firstJoin,
        lastLeave: lastLeave,
        email: email,
        percentage: percentage,
        duration: duration,
        teamsRole: role,
        attendance: attendanceValue,
        attendanceFileId: attendanceFileId,
        createdBy: user?.id
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


//UPDATE Attendance
export const updateAttendanceHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params
  const { user } = req;
  const { batchId, moduleId, courseId, classId, excelFile, attendanceFileId } = req.body;

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
          model: Course, as: 'course',
          attributes: ['id', 'courseName'],
        }
      ]
    })

    if (!updateAttendance) {
      res.status(404).json({ message: "Attendance not found!" });
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
          courseId: courseId,
          classId: classId,
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
        attendanceFileId: attendanceFileId,
        updatedBy: user?.id
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
    res.status(500).json({ message: ATTENDANCE_UPDATE_ERROR, error });
  }
};


//DELETE Attendance
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
