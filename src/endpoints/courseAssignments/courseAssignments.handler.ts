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
    COURSEASSIGNMENTS_FETCH_ERROR
} from './courseAssignments.const';

import { Audit, Batch, BatchModuleSchedules, CourseAssignment, User } from 'db';
import { Response } from 'express';

 // Utility function to check if the user is a trainer
// const isTrainer = (user: any): boolean => user?.role === 'trainer';

// Get all CourseAssignments
export const getCourseAssignmentsHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;

    // if (!isTrainer(user)) {
    //     res.status(403).json({ message: 'Access denied. Only trainers can perform this action.' });
    //     return;
    // }

    try {
        const courseAssignments = await CourseAssignment.findAll({
            include: [
                {
                    model: Batch,
                    as: 'batch',
                    attributes: ['id', 'batchName']
                },
                {
                    model: BatchModuleSchedules,
                    as: 'batchmoduleschedule',
                    attributes: ['id', 'scheduleDateTime']
                },
                {
                    model: User,
                    as: 'user',
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

    // if (!isTrainer(user)) {
    //     res.status(403).json({ message: 'Access denied. Only trainers can perform this action.' });
    //     return;
    // }

    const {
        batchId,
        batchModuleScheduleId,
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        instructorId
    } = req.body;

    try {
        const newCourseAssignment = await CourseAssignment.create({
            batchId,
            batchModuleScheduleId,
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            instructorId
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
    const { user } = req;
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
                    model: BatchModuleSchedules,
                    as: 'batchmoduleschedule',
                    attributes: ['id', 'scheduleDateTime']
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
        batchModuleScheduleId,
        courseAssignmentQuestionName,
        courseAssignmentQuestionFile,
        instructorId
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
            batchModuleScheduleId,
            courseAssignmentQuestionName,
            courseAssignmentQuestionFile,
            instructorId
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
