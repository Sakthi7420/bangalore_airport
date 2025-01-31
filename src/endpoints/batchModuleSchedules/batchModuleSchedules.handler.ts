import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType
} from 'node-server-engine';
import {
  BATCHMODULESCHEDULES_CREATION_ERROR,
  BATCHMODULESCHEDULES_NOT_FOUND,
  BATCHMODULESCHEDULES_UPDATE_ERROR,
  BATCHMODULESCHEDULES_DELETION_ERROR,
  BATCHMODULESCHEDULES_FETCH_ERROR,
  BATCH_NOT_FOUND,
  MODULES_NOT_FOUND,
  TRAINER_NOT_FOUND
} from './batchModuleSchedules.const';
import { Audit, Module, User, Batch, BatchModuleSchedules} from 'db';
import { Response } from 'express';
import { BatchTrainer } from 'db/models/BatchTrainer';

// Get all batch module schedules
export const getBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  try {
    // Fetch batch module schedules with associated module, batch, and trainer (alias: trainer)
    const batchModuleSchedule = await BatchModuleSchedules.findAll({
      include: [
        {
          model: Module,
          as: 'module', // Ensure this matches the alias in the model association
          attributes: ['id', 'moduleName'],
        },
        {
          model: Batch,
          as: 'batch', // Ensure this matches the alias in the model association
          attributes: ['id', 'batchName'],
        },
        {
          model: User,
          as: 'trainers', // Correct alias here, use 'trainer' for the association
          attributes: ['id', 'firstName', 'lastName'],
        },
      ]
    });

    // If no batch module schedules are found
    if (batchModuleSchedule.length === 0) {
      res.status(404).json({ message: 'BatchModuleSchedules not found' });
      return;
    }

    // Call .toJSON() to convert Sequelize instances to plain objects
    const formattedScheduleModule = batchModuleSchedule.map((schedule) => {
      const scheduleData = schedule.toJSON();

    // Format the response data
    return {
      id: scheduleData.id,
      duration: scheduleData.duration,
      startDate: scheduleData.startDate,
      startTime: scheduleData.startTime,
      endDate: scheduleData.endDate,
      endTime: scheduleData.endTime,
      meetingLink: scheduleData.meetingLink,
      module: scheduleData.module
        ? {
            id: scheduleData.module.id,
            moduleName: scheduleData.module.moduleName,
          }
        : null,
      batch: scheduleData.batch
        ? {
            id: scheduleData.batch.id,
            batchName: scheduleData.batch.batchName,
          }
        : null,
      // Flatten the trainer array and return it as a list of objects
      trainers: scheduleData.trainers?.map((trainer: any) => ({
        id: trainer.id,
        firstName: trainer.firstName,
        lastName: trainer.lastName,
      })) || [], // Ensure trainer is an array, even if empty
    }
  });

    // Send the formatted response
    res.status(200).json({ data: formattedScheduleModule });
  } catch (error) {
    res.status(500).json({
      message: BATCHMODULESCHEDULES_CREATION_ERROR, error
    });
  }
};


//create BatchModuleSchedule
export const createBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { user } = req;
  const { batchId, moduleId, trainerIds, startDate, startTime, endDate, endTime, meetingLink, duration } = req.body;

  try {
    const newBatchModuleSchedule = await BatchModuleSchedules.create({
      batchId,
      moduleId,
      startDate,
      startTime,
      endDate,
      endTime,
      meetingLink,
      duration,
    });

    if (trainerIds && trainerIds.length > 0) {
      const matchedTrainers = await User.findAll({
        where: {
          id: trainerIds
        },
        attributes: ['id']
      });

      if (matchedTrainers.length !== trainerIds.length){
        const missingTrainers = trainerIds.filter((id: number) => !matchedTrainers.some((trainer) => trainer.id === id));
      res.status(400).json({
        message: 'Some trainers were not found',
        missingTrainers
      })
      return;
      }

      const batchTrainers = matchedTrainers.map((trainer) => ({
        batchModuleScheduleId: newBatchModuleSchedule.id,
        trainerId: trainer.id,
      }));
      await BatchTrainer.bulkCreate(batchTrainers);
    }

    await Audit.create({
      entityType: 'batchModuleSchedule',
      entityId: newBatchModuleSchedule.id,
      action: 'CREATE',
      newData: newBatchModuleSchedule,
      performedBy: user?.id,
    });

    res.status(201).json({ message: 'Batch Module Schedule created successfully', data: newBatchModuleSchedule });
  } catch (error) {
    res.status(500).json({ message: BATCHMODULESCHEDULES_CREATION_ERROR, error });
  }
};


//Get BatchModuleSchedule by id
export const getBatchModuleScheduleByIdHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {

  const { id } = req.params;

  try {

      const batchModuleSchedule = await BatchModuleSchedules.findByPk(id, {
          include: [
              {
                  model: Module, as: 'module',
                  attributes: ['id', 'moduleName']
              },
              {
                  model: Batch, as: 'batch',
                  attributes: ['id', 'batchName']
              },
              {
                  model: User, as: 'trainers',
                  attributes: ['id', 'firstName', 'lastName']
              }
          ]
      });

      if (!batchModuleSchedule) {
          res.status(404).json({ message: BATCH_NOT_FOUND })
          return;
      }

      res.status(200).json({ batchModuleSchedule });
  } catch (error) {
      res.status(500).json({ message: BATCHMODULESCHEDULES_FETCH_ERROR })
  }
};

export const getBatchModuleScheduleByBatchIdHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params; // Expect a single batchId from the request params

  try {
    // Validate if batchId is provided
    if (!id) {
      res.status(400).json({ message: 'batchId is required' });
      return;
    }

    // Fetch the batch module schedule for the provided batchId
    const batchModuleSchedule = await BatchModuleSchedules.findAll({
      where: { batchId: id }, // Match the specific batchId
      include: [
        {
          model: Module,
          as: 'module',
          attributes: ['id', 'moduleName'],
        },
        {
          model: Batch,
          as: 'batch',
          attributes: ['id', 'batchName'],
        },
        {
          model: User,
          as: 'trainers',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    if (!batchModuleSchedule) {
      res.status(404).json({ message: 'BatchModuleSchedule not found for the given Batch ID' });
      return;
    }

    res.status(200).json({ batchModuleSchedule });
  } catch (error) {
    console.error('Error fetching BatchModuleSchedule:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { batchId, moduleId, trainerIds, startDate, startTime, endDate, endTime, meetingLink, duration } = req.body;
  const user = req.user;

  try {
    const batchModuleSchedule = await BatchModuleSchedules.findByPk(id, {
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
          model: User,
          as: 'trainers',
          attributes: ['id', 'firstName', 'lastName'],
        }
      ]
    });

    if (!batchModuleSchedule) {
      res.status(404).json({ message: BATCHMODULESCHEDULES_NOT_FOUND });
      return;
    } else if (!batchId) {
      res.status(404).json({ message: BATCH_NOT_FOUND });
      return;
    } else if (!moduleId) {
      res.status(404).json({ message: MODULES_NOT_FOUND });
      return;
    }

    batchModuleSchedule.set({
      batchId: batchId || batchModuleSchedule.batchId,
      moduleId: moduleId || batchModuleSchedule.moduleId,
      startDate: startDate || batchModuleSchedule.startDate,
      startTime: startTime || batchModuleSchedule.startTime,
      endDate: endDate || batchModuleSchedule.endDate,
      endTime: endTime || batchModuleSchedule.endTime,
      duration: duration || batchModuleSchedule.duration,
      meetingLink: meetingLink || batchModuleSchedule.meetingLink,
      updatedBy: user?.id,
    });
    await batchModuleSchedule.save();

    const previousData = batchModuleSchedule.toJSON();

    if (trainerIds && trainerIds.length > 0) {
      if (
        !Array.isArray(trainerIds) ||
        trainerIds.some((id) => typeof id !== 'number')
      ) {
        res.status(400).json({ message: 'Invalid trainer IDs provided' });
        return;
      }

      // Fetch trainees by IDs
    const matchedTrainers = await User.findAll({
      where: { id: trainerIds },
      attributes: ['id']
    });
    // Check for missing trainee IDs
    if (matchedTrainers.length !== trainerIds.length) {
      const missingTrainers = trainerIds.filter(
        (id) => !matchedTrainers.some((trainer) => trainer.id === id)
      );
      res.status(400).json({
        message: 'Some trainers were not found',
        missingTrainers
      });
      return;
    }

    await BatchTrainer.destroy({ where: { batchModuleScheduleId: batchModuleSchedule.id } });

      const batchTrainers = matchedTrainers.map((trainer) => ({
        batchModuleScheduleId: batchModuleSchedule.id,
        trainerId: trainer.id,
      }));
      await BatchTrainer.bulkCreate(batchTrainers);
    }

    await Audit.create({
      entityType: 'batchModuleSchedule',
      entityId: id,
      action: 'UPDATE',
      oldData: previousData,
      newData: batchModuleSchedule,
      performedBy: user?.id,
    });

    res.status(200).json({ message: 'Batch Module Schedule updated successfully', data: batchModuleSchedule });
  } catch (error) {
    res.status(500).json({ message: BATCHMODULESCHEDULES_UPDATE_ERROR, error });
  }
};


export const deleteBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req;

  try {
    const batchModuleSchedule = await BatchModuleSchedules.findByPk(id);

    if (!batchModuleSchedule) {
      res.status(404).json({ message: BATCHMODULESCHEDULES_NOT_FOUND });
      return;
    }

    await BatchTrainer.destroy({ where: { batchModuleScheduleId: id } });
    
    await Audit.create({
      entityType: 'batchModuleSchedule',
      entityId: id,
      action: 'DELETE',
      oldData: batchModuleSchedule,
      performedBy: user?.id,
    });

    await batchModuleSchedule.destroy();

    res.status(200).json({ message: 'Batch Module Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: BATCHMODULESCHEDULES_DELETION_ERROR, error });
  }
};