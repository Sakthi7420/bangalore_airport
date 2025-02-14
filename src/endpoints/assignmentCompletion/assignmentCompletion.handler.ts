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
    ASSIGNMENT_COMPLETION_GET_ERROR,
    COURSEASSIGNMENT_NOT_FOUND
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
                    model: CourseAssignment, as: 'courseAssignments',
                    attributes: ['id', 'courseAssignmentQuestionName']
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
    const { courseAssignId, traineeId, obtainedMarks, courseAssignmentAnswerFile } = req.body;

    try {
        
         const existingAssignmentCompletion = await AssignmentCompletion.findOne({
            where: { courseAssignId, traineeId, obtainedMarks, courseAssignmentAnswerFile },
        });

        if (existingAssignmentCompletion) {
            if (existingAssignmentCompletion.courseAssignmentAnswerFile) {
                res.status(400).json({ message: "The file already exists for this assignment." });
                return;
            }
        }

            const courseAssignment = await CourseAssignment.findByPk(courseAssignId);

            if (!courseAssignment) {
                res.status(404).json({ message: COURSEASSIGNMENT_NOT_FOUND   });
                return;
            }

            const assignEndDate = new Date(courseAssignment.assignEndDate ?? 0);
            const currentDate = new Date();
            

            if (currentDate > assignEndDate) {
                res.status(400).json({ message: 'Submission deadline has passed. You cannot upload the answer sheet.' });
                return;
            }

        const newAssignmentCompletion = await AssignmentCompletion.create({
            courseAssignId,
            traineeId,
            obtainedMarks,
            courseAssignmentAnswerFile,
            createdBy: user?.id
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
                    model: CourseAssignment, as: 'courseAssignments',
                    attributes: ['id', 'courseAssignmentQuestionName']
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
export const updateAssignmentCompletionHandler: EndpointHandler<
    EndpointAuthType.JWT
> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
        const { id } = req.params;
        const { user } = req;
        const {
            courseAssignId,
            traineeId,
            obtainedMarks,
            courseAssignmentAnswerFile
        } = req.body;

        try {
            const updateAssignmentCompletion = await AssignmentCompletion.findByPk(id);

            if (!updateAssignmentCompletion) {
                res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
                return;
            }

            const courseAssignment = await CourseAssignment.findByPk(courseAssignId);

            if (!courseAssignment) {
                res.status(404).json({ message: COURSEASSIGNMENT_NOT_FOUND   });
                return;
            }

            const assignEndDate = new Date(courseAssignment.assignEndDate ?? 0);
            const currentDate = new Date();
            

            if (currentDate > assignEndDate) {
                res.status(400).json({ message: 'Submission deadline has passed. You cannot upload the answer sheet.' });
                return;
            }

            if(updateAssignmentCompletion.courseAssignmentAnswerFile){
                res.status(400).json({ message: "the file already exits" })
                return;
            }

            const previousData = {
                courseAssignId: updateAssignmentCompletion.courseAssignId,
                traineeId: updateAssignmentCompletion.traineeId,
                obtainedMarks: updateAssignmentCompletion.obtainedMarks,
                courseAssignmentAnswerFile:
                    updateAssignmentCompletion.courseAssignmentAnswerFile
            };

            updateAssignmentCompletion.set({
                courseAssignId,
                traineeId,
                obtainedMarks,
                courseAssignmentAnswerFile,
                updatedBy: user?.id
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

            res
                .status(200)
                .json({
                    message: 'Assignment Completion updated successfully',
                    updateAssignmentCompletion
                });
        } catch (error) {
            res
                .status(500)
                .json({ message: ASSIGNMENT_COMPLETION_UPDATE_ERROR, error });
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


// Get assignment completion by TraineeId
export const getAssignmentCompletionByTraineeIdHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log('Trainee id', id);
 
  try {
    const assignmentCompletion = await AssignmentCompletion.findAll({
      where: { traineeId: id },
      include: [
        {
          model: CourseAssignment,
          as: 'courseAssignments',
          attributes: ['id', 'courseAssignmentQuestionName']
        }
      ]
    });
 
    console.log('Assignment Completion', assignmentCompletion);
 
    if (!assignmentCompletion) {
      res.status(404).json({ message: ASSIGNMENT_COMPLETION_NOT_FOUND });
      return;
    }
 
    res.status(200).json({ assignmentCompletion });
  } catch (error) {
    console.error('Error fetching assignment completion:', error);
    res
      .status(500)
      .json({ message: ASSIGNMENT_COMPLETION_GET_ERROR, data: error });
  }
};