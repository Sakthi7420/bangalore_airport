import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType
} from 'node-server-engine';
import { Batch, Audit, User, Course, BatchTrainee } from 'db';
import { Response } from 'express';
import {
  BATCH_NOT_FOUND,
  BATCH_CREATION_ERROR,
  BATCH_UPDATE_ERROR,
  BATCH_DELETION_ERROR,
  BATCH_GET_ERROR,
  USER_NOT_FOUND
} from './batch.const';

// Get batch details by id
export const getBatchDetailsHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params; // Fetching batch ID from URL params

  try {
    // Fetch the batch with associated course and trainees
    const batch = await Batch.findOne({
      where: { id: id }, // Use the ID from the request parameters
      attributes: ['id', 'batchName', 'startDate', 'endDate'],
      include: [
        {
          model: Course,
          as: 'course', // Ensure this matches the alias in the model association
          attributes: ['id', 'courseName']
        },
        {
          model: User,
          as: 'trainees', // Ensure this matches the alias in the model association
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    // If batch is not found
    if (!batch) {
      res.status(404).json({ message: 'Batch not found' });
      return;
    }

    // Format the batch data
    const formattedBatch = {
      id: batch.id,
      name: batch.batchName,
      startDate: batch.startDate,
      endDate: batch.endDate,
      course: batch.course
        ? {
            id: batch.course.id,
            courseName: batch.course.courseName
          }
        : null,
      trainees:
        batch.trainees?.map((trainee: any) => ({
          id: trainee.id,
          firstName: trainee.firstName,
          lastName: trainee.lastName
        })) || []
    };

    // Return the formatted response
    res.status(200).json({ batch: formattedBatch });
  } catch (error) {
    console.error('Error fetching batch:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error getting Batch', error });
  }
};

// Handler to get all batches
export const getBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  try {
    // Fetch all batches with associated course and trainees
    const batches = await Batch.findAll({
      attributes: ['id', 'batchName', 'startDate', 'endDate'],
      include: [
        {
          model: Course,
          as: 'course', // Ensure this matches the alias in the model association
          attributes: ['id', 'courseName']
        },
        {
          model: User,
          as: 'trainees', // Ensure this matches the alias in the model association
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    // If no batches are found
    if (batches.length === 0) {
      res.status(404).json({ message: BATCH_NOT_FOUND });
      return;
    }

    // Call .toJSON() for each batch instance to extract plain object
    const formattedBatches = batches.map((batch) => {
      const batchData = batch.toJSON();

      // Format the batch response
      return {
        id: batchData.id,
        name: batchData.batchName,
        startDate: batchData.startDate,
        endDate: batchData.endDate,
        course: batchData.course
          ? {
              id: batchData.course.id,
              courseName: batchData.course.courseName
            }
          : null,
        trainees:
          batchData.trainees?.map((trainee: any) => ({
            id: trainee.id,
            firstName: trainee.firstName,
            lastName: trainee.lastName
          })) || []
      };
    });

    res.status(200).json(formattedBatches);
  } catch (error) {
    res.status(500).json({ message: BATCH_GET_ERROR, error });
  }
};

// Handler to create a new batch
export const createBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { batchName, courseId, traineeIds, startDate, endDate } = req.body; // traineeIds should be an array of trainee IDs
  const { user } = req; // Getting the authenticated user

  try {
    // Create the batch
    const batch = await Batch.create({
      batchName,
      courseId,
      startDate,
      endDate,
      createdBy: user?.id,
      updatedBy: user?.id
    });

    console.log('Created Batch:', batch);

    if (traineeIds && traineeIds.length > 0) {
      // Fetch the trainee IDs for the provided trainee IDs
      const matchedTrainees = await User.findAll({
        where: {
          id: traineeIds // Match the trainee IDs to fetch the trainee data
        },
        attributes: ['id']
      });

      console.log('Matched Trainees:', matchedTrainees);

      if (matchedTrainees.length !== traineeIds.length) {
        const missingTrainees = traineeIds.filter(
          (id: number) => !matchedTrainees.some((trainee) => trainee.id === id)
        );
        res.status(400).json({
          message: 'Some trainees were not found',
          missingTrainees
        });
        return;
      }

      // Map the trainee IDs to the batch trainees
      const batchTrainees = matchedTrainees.map((trainee) => ({
        batchId: batch.id,
        traineeId: trainee.id,
        createdBy: user?.id
      }));

      // Add the trainees to the join table with `createdBy` using bulkCreate
      console.log('Batch Trainees to be added:', batchTrainees);
      await BatchTrainee.bulkCreate(batchTrainees);
    }

    // Create an audit entry
    await Audit.create({
      entityType: 'Batch',
      entityId: batch.id,
      action: 'CREATE',
      newData: batch,
      performedBy: user?.id
    });

    // Format the result to include trainees as an array of objects
    const formattedBatch = {
      id: batch.id,
      batchName: batch.batchName,
      startDate: batch.startDate,
      endDate: batch.endDate,
      course: batch.course
        ? {
            id: batch.course.id,
            courseName: batch.course.courseName
          }
        : null,
      trainees:
        batch.trainees?.map((trainee: any) => ({
          id: trainee.id,
          firstName: trainee.firstName,
          lastName: trainee.lastName
        })) || []
    };

    console.log('Formatted Batch:', formattedBatch); // Check if formatted batch is correct

    res
      .status(201)
      .json({ message: 'Batch created successfully', batch: formattedBatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: BATCH_CREATION_ERROR, error });
  }
};

// Handler to update a batch
export const updateBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params; // Batch ID
  const { batchName, courseId, traineeIds, startDate, endDate } = req.body; // Batch details
  const { user } = req; // Authenticated user

  try {
    // Find the existing batch
    const batch = await Batch.findByPk(id, {
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'courseName']
        },
        {
          model: User,
          as: 'trainees',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    console.log('Existing Batch:', batch);

    if (!batch) {
      res.status(404).json({ message: 'Batch not found' });
      return;
    }

    // Update batch details
    batch.set({
      batchName: batchName || batch.batchName,
      courseId: courseId || batch.courseId,
      startDate: startDate || batch.startDate,
      endDate: endDate || batch.endDate,
      updatedBy: user?.id
    });
    await batch.save();

    // Update trainees if provided
    if (traineeIds && traineeIds.length > 0) {

      // Validate trainee IDs
      const invalidTrainees = traineeIds.filter(
        (id: any) => !id || typeof id !== 'number'
      );
      if (invalidTrainees.length > 0) {
        res.status(400).json({
          message: 'Invalid trainee IDs provided',
          invalidTrainees
        });
        return;
      }
      
      // Fetch trainees by IDs
      const matchedTrainees = await User.findAll({
        where: { id: traineeIds },
        attributes: ['id']
      });

      // Check for missing trainee IDs
      if (matchedTrainees.length !== traineeIds.length) {
        const missingTrainees = traineeIds.filter(
          (id: number) => !matchedTrainees.some((trainee) => trainee.id === id)
        );
        res.status(400).json({
          message: 'Some trainees were not found',
          missingTrainees
        });
        return;
      }

      // Remove existing trainees from the batch
    //   await BatchTrainee.destroy({ where: { batchId: batch.id } });

      // Map matched trainees to batch trainees
      const batchTrainees = matchedTrainees.map((trainee) => ({
        batchId: batch.id,
        userId: trainee.id, // Ensure this is the correct column
        createdBy: user?.id
      }));

      // Insert new trainees
      await BatchTrainee.bulkCreate(batchTrainees);
    }

    // Log audit
    await Audit.create({
      entityType: 'Batch',
      entityId: batch.id,
      action: 'UPDATE',
      oldData: {
        batchName: batch.batchName,
        courseId: batch.courseId,
        traineeIds: batch.trainees?.map((trainee) => trainee.id),
        startDate: batch.startDate,
        endDate: batch.endDate
      },
      newData: {
        batchName,
        courseId,
        traineeIds,
        startDate,
        endDate
      },
      performedBy: user?.id
    });

    // Respond with updated batch
    res.status(200).json({ message: 'Batch updated successfully' });
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({ message: 'Error updating Batch', error });
  }
};

//Delete a category
export const deleteBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req;

  try {
    const deleteBatch = await Batch.findByPk(id);

    if (!deleteBatch) {
      res.status(404).json({ message: BATCH_NOT_FOUND });
      return;
    }

    await Audit.create({
      entityType: 'Batch',
      entityId: deleteBatch.id,
      action: 'DELETE',
      oldData: deleteBatch,
      performedBy: user?.id
    });

    await deleteBatch.destroy();

    res.status(200).json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: BATCH_DELETION_ERROR, error });
  }
};
