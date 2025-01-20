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
} from './courseAssignments.const';

import { Audit, Batch, Course, CourseAssignment, User } from 'db';
import { Response } from 'express';


function isValidBase64Pdf(base64String: string): boolean {
    // Regular expression to match base64 strings for PDF MIME type
    const base64Regex = /^data:application\/pdf;base64,/;
    return base64Regex.test(base64String);
  }
  

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
                },
                {
                    model: User,
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
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        trainerId
    } = req.body;

    if (!isValidBase64Pdf(courseAssignmentQuestionFile)) {
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
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            trainerId
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
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        trainerId
    } = req.body;

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

        const previousData = courseAssignment.toJSON();

        courseAssignment.set({
            batchId,
            courseId,
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            trainerId
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
