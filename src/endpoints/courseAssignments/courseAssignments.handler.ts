import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from 'node-server-engine';
import {
    COURSEASSIGNMENTS_CREATION_ERROR,
    COURSEASSIGNMENTS_NOT_FOUND,
    COURSEASSIGNMENTS_UPDATE_ERROR,
    COURSEASSIGNMENTS_DELETION_ERROR,
    COURSEASSIGNMENTS_FETCH_ERROR,
    COURSE_NOT_FOUND,
    USER_NOT_FOUND,
    BATCH_NOT_FOUND
    COURSEASSIGNMENTS_FETCH_ERROR,
    COURSE_NOT_FOUND,
    USER_NOT_FOUND,
    BATCH_NOT_FOUND
} from './courseAssignments.const';

import { Audit, Batch, Course, CourseAssignment, User } from 'db';
import { Audit, Batch, Course, CourseAssignment, User } from 'db';
import { Response } from 'express';
  

  function isValidBase64File(base64String: string): boolean {
    // Regular expression to match base64 strings for allowed MIME types
    const base64Regex = /^data:(application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|application\/msword|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/vnd\.ms-excel);base64,/;
    return base64Regex.test(base64String);
  }

// Get CourseAssignment Record by Batch Id

export const getCourseAssignmentRecordsByBatchIdHandler: EndpointHandler<
EndpointAuthType.JWT
> = async (
req: EndpointRequestType[EndpointAuthType.JWT],
res: Response
): Promise<void> => {
try {
    // Log request params for debugging
    console.log('Request Params:', req.params);
    const { id } = req.params;
      console.log('Batch Id:', id);

      // Validate trainee ID
      if (!id) {
        res.status(400).json({ message: 'Batch ID is required' });
        return;
      }

      // Fetch all batch IDs for the given trainee ID
      const courseAssignmentRecords = await CourseAssignment.findAll({
            where: { batchId: id },
              attributes: ['id','courseAssignmentQuestionName','courseAssignmentQuestionFile','trainerId'] // Ensure only batchId is retrieved
        });

        // Log the retrieved records
      console.log('CourseAssignmentId:', courseAssignmentRecords);

       
      // If no records are found
      if (!courseAssignmentRecords || courseAssignmentRecords.length === 0) {
        res.status(404).json({ message: 'No courseAssignmentRecords found for the given Batch ID' });
        return;
      }
  
      // Extract courseAssignmentRecords from the records, filtering out null values
   
      const records = courseAssignmentRecords.map(record => record.dataValues);


      // Log extracted courseAssignmentRecords
      console.log('Extracted courseAssignmentRecords:', records);
  
      // If all courseAssignmentRecords are null
      if (records.length === 0) {
        res.status(404).json({ message: 'No valid courseAssignmentRecords found for the given Batch ID' });
        return;
      }
  
      // Return the list of courseAssignmentRecords
      res.status(200).json({ records });
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

// Get all CourseAssignments
export const getCourseAssignmentsHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {
        const courseAssignments = await CourseAssignment.findAll({
            include: [
                {
                    model: Batch,
                    as: 'batch',
                    attributes: ['id', 'batchName']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'courseName']
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'courseName']
                },
                {
                    model: User,
                    as: 'trainer',
                    as: 'trainer',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (courseAssignments.length === 0) {
            res.status(404).json({ message: COURSEASSIGNMENTS_NOT_FOUND });
            return;
        }

        res.status(200).json({ data: courseAssignments });
    } catch (error) {
        res.status(500).json({ message: COURSEASSIGNMENTS_FETCH_ERROR, error });
    }
};

// Create a CourseAssignment
export const createCourseAssignmentHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;
    const {
        batchId,
        courseId,
        courseId,
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        trainerId,
        totalMarks,
        assignStartDate,
        assignEndDate
    } = req.body;

    if (!isValidBase64File(courseAssignmentQuestionFile)) {
        res.status(400).json({ message: 'Invalid base64 documents format.' });
        return;
    }

    if (!batchId) {
        res.status(404).json({ message: BATCH_NOT_FOUND})
        return;
    }
    if (!courseId) {
        res.status(404).json({ message: COURSE_NOT_FOUND})
        return;
    }
    if (!trainerId) {
        res.status(404).json({ message: USER_NOT_FOUND})
        return;
    }
    

    if (!isValidBase64File(courseAssignmentQuestionFile)) {
        res.status(400).json({ message: 'Invalid base64 documents format.' });
        return;
    }

    if (!batchId) {
        res.status(404).json({ message: BATCH_NOT_FOUND})
        return;
    }
    if (!courseId) {
        res.status(404).json({ message: COURSE_NOT_FOUND})
        return;
    }
    if (!trainerId) {
        res.status(404).json({ message: USER_NOT_FOUND})
        return;
    }
    
    try {
        const newCourseAssignment = await CourseAssignment.create({
            batchId,
            courseId,
            courseId,
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            trainerId,
            totalMarks,
            assignStartDate,
            assignEndDate
        });

        await Audit.create({
            entityType: 'courseAssignment',
            entityId: newCourseAssignment.id,
            action: 'CREATE',
            newData: newCourseAssignment,
            performedBy: user?.id
        });

        res.status(201).json({ message: 'CourseAssignment created successfully', data: newCourseAssignment });
    } catch (error) {
        res.status(500).json({ message: COURSEASSIGNMENTS_CREATION_ERROR, error });
    }
};

// Get CourseAssignment by ID
export const getCourseAssignmentByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { id } = req.params;

    // if (!isTrainer(user)) {
    //     res.status(403).json({ message: 'Access denied. Only trainers can perform this action.' });
    //     return;
    // }

    try {
        const courseAssignment = await CourseAssignment.findByPk(id, {
            include: [
                {
                    model: Batch,
                    as: 'batch',
                    attributes: ['id', 'batchName']
                },
                {
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'courseName']
                    model: Course,
                    as: 'course',
                    attributes: ['id', 'courseName']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (!courseAssignment) {
            res.status(404).json({ message: COURSEASSIGNMENTS_NOT_FOUND });
            return;
        }

        res.status(200).json({ data: courseAssignment });
    } catch (error) {
        res.status(500).json({ message: COURSEASSIGNMENTS_FETCH_ERROR, error });
    }
};

// Update a CourseAssignment
export const updateCourseAssignmentHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;
    const { id } = req.params;
    const {
        batchId,
        courseId,
        courseId,
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        trainerId,
        totalMarks,
        assignStartDate,
        assignEndDate
    } = req.body;

    if (!isValidBase64File(courseAssignmentQuestionFile)) {
        res.status(400).json({ message: 'Invalid base64 documents format.' });
        return;
    }
    
    if (!isValidBase64File(courseAssignmentQuestionFile)) {
        res.status(400).json({ message: 'Invalid base64 documents format.' });
        return;
    }
    
    try {
        const courseAssignment = await CourseAssignment.findByPk(id);

        if (!courseAssignment) {
            res.status(404).json({ message: COURSEASSIGNMENTS_NOT_FOUND });
            return;
        }

        const previousData = courseAssignment.toJSON();

        courseAssignment.set({
            batchId,
            courseId,
            courseId,
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            trainerId,
            totalMarks,
            assignStartDate,
            assignEndDate
        });

        await courseAssignment.save();

        await Audit.create({
            entityType: 'courseAssignment',
            entityId: courseAssignment.id,
            action: 'UPDATE',
            oldData: previousData,
            newData: courseAssignment,
            performedBy: user?.id
        });

        res.status(200).json({ message: 'CourseAssignment updated successfully', data: courseAssignment });
    } catch (error) {
        res.status(500).json({ message: COURSEASSIGNMENTS_UPDATE_ERROR, error });
    }
};

// Delete a CourseAssignment
export const deleteCourseAssignmentHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;
    const { id } = req.params;

    // if (!isTrainer(user)) {
    //     res.status(403).json({ message: 'Access denied. Only trainers can perform this action.' });
    //     return;
    // }

    try {
        const courseAssignment = await CourseAssignment.findByPk(id);

        if (!courseAssignment) {
            res.status(404).json({ message: COURSEASSIGNMENTS_NOT_FOUND });
            return;
        }

        await Audit.create({
            entityType: 'courseAssignment',
            entityId: courseAssignment.id,
            action: 'DELETE',
            oldData: courseAssignment,
            performedBy: user?.id
        });

        await courseAssignment.destroy();

        res.status(200).json({ message: 'CourseAssignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: COURSEASSIGNMENTS_DELETION_ERROR, error });
    }
};