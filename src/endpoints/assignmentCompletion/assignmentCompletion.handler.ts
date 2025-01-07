import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from 'node-server-engine';
import { AssignmentCompletion, Audit, User, CourseAssignment } from 'db';
import { Response } from 'express';
import {
    ASSIGNMENT_COMPLETION_NOT_FOUND,
    ASSIGNMENT_COMPLETION_CREATION_ERROR,
    ASSIGNMENT_COMPLETION_UPDATE_ERROR,
    ASSIGNMENT_COMPLETION_DELETION_ERROR,
    ASSIGNMENT_COMPLETION_GET_ERROR
} from './assignmentCompletion.const';

// Get all assignment completions
export const getAssignmentCompletionHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {
        const assignments = await AssignmentCompletion.findAll({
            include: [
                {
                    model: User, as: 'trainee',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: CourseAssignment, as: 'courseAssignment',
                    attributes: ['id', 'assignmentName']
                }
            ]
        });

        if (assignments.length === 0) {
            res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
            return;
        }

        res.status(200).json({ Assignments: assignments });
    } catch (error) {
        res.status(500).json({ message: ASSIGNMENT_COMPLETION_GET_ERROR, error });
    }
};

// Create assignment completion
export const createAssignmentCompletionHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { courseAssignId, traineeId, totalMarks, obtainedMarks, assignStartDate, assignEndDate, courseAssignmentAnswerFile } = req.body;

    try {
        const newAssignmentCompletion = await AssignmentCompletion.create({
            courseAssignId,
            traineeId,
            totalMarks,
            obtainedMarks,
            assignStartDate,
            assignEndDate,
            courseAssignmentAnswerFile
        });

        await Audit.create({
            entityType: 'AssignmentCompletion',
            entityId: newAssignmentCompletion.id,
            action: 'CREATE',
            newData: newAssignmentCompletion,
            performedBy: user?.id
        });

        res
            .status(201)
            .json({ message: 'Assignment Completion created successfully', newAssignmentCompletion });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: ASSIGNMENT_COMPLETION_CREATION_ERROR, error });
    }
};

// Get assignment completion by ID
export const getAssignmentCompletionByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const assignmentCompletion = await AssignmentCompletion.findByPk(id, {
            include: [
                {
                    model: User, as: 'trainee',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: CourseAssignment, as: 'courseAssignment',
                    attributes: ['id', 'assignmentName']
                }
            ]
        });

        if (!assignmentCompletion) {
            res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
            return;
        }

        res.status(200).json({ assignmentCompletion });
    } catch (error) {
        res.status(500).json({ message: ASSIGNMENT_COMPLETION_GET_ERROR, data: error });
    }
};

// Update assignment completion
export const updateAssignmentCompletionHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;
    const { courseAssignId, traineeId, totalMarks, obtainedMarks, assignStartDate, assignEndDate, courseAssignmentAnswerFile } = req.body;

    try {
        const updateAssignmentCompletion = await AssignmentCompletion.findByPk(id);

        if (!updateAssignmentCompletion) {
            res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
            return;
        }

        const previousData = {
            courseAssignId: updateAssignmentCompletion.courseAssignId,
            traineeId: updateAssignmentCompletion.traineeId,
            totalMarks: updateAssignmentCompletion.totalMarks,
            obtainedMarks: updateAssignmentCompletion.obtainedMarks,
            assignStartDate: updateAssignmentCompletion.assignStartDate,
            assignEndDate: updateAssignmentCompletion.assignEndDate,
            courseAssignmentAnswerFile: updateAssignmentCompletion.courseAssignmentAnswerFile
        };

        updateAssignmentCompletion.set({
            courseAssignId,
            traineeId,
            totalMarks,
            obtainedMarks,
            assignStartDate,
            assignEndDate,
            courseAssignmentAnswerFile
        });

        await Audit.create({
            entityType: 'AssignmentCompletion',
            entityId: updateAssignmentCompletion.id,
            action: 'UPDATE',
            oldData: previousData,
            newData: updateAssignmentCompletion,
            performedBy: user?.id
        });

        await updateAssignmentCompletion.save();

        res.status(200).json({ message: 'Assignment Completion updated successfully', updateAssignmentCompletion });
    } catch (error) {
        res.status(500).json({ message: ASSIGNMENT_COMPLETION_UPDATE_ERROR, error });
    }
};

// Delete assignment completion
export const deleteAssignmentCompletionHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {
        const deleteAssignmentCompletion = await AssignmentCompletion.findByPk(id);

        if (!deleteAssignmentCompletion) {
            res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
            return;
        }

        await Audit.create({
            entityType: 'AssignmentCompletion',
            entityId: deleteAssignmentCompletion.id,
            action: 'DELETE',
            oldData: deleteAssignmentCompletion,
            performedBy: user?.id
        });

        await deleteAssignmentCompletion.destroy();

        res.status(200).json({ message: 'Assignment Completion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: ASSIGNMENT_COMPLETION_DELETION_ERROR, error });
    }
};
