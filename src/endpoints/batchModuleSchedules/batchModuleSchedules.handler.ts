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
            as: 'trainer', // Correct alias here, use 'trainer' for the association
            attributes: ['id', 'firstName', 'lastName'],
          },
        ],
        logging: console.log, // This will log the generated SQL query for debugging
      });
  
      // If no batch module schedules are found
      if (batchModuleSchedule.length === 0) {
        res.status(404).json({ message: 'BatchModuleSchedules not found' });
        return;
      }
  
      // Call .toJSON() to convert Sequelize instances to plain objects
      const batchModuleScheduleData = batchModuleSchedule.map((schedule) => schedule.toJSON());
  
      // Format the response data
      const formattedData = batchModuleScheduleData.map((schedule) => ({
        id: schedule.id,
        module: schedule.module
          ? {
              id: schedule.module.id,
              moduleName: schedule.module.moduleName,
            }
          : null,
        batch: schedule.batch
          ? {
              id: schedule.batch.id,
              batchName: schedule.batch.batchName,
            }
          : null,
        // Flatten the trainer array and return it as a list of objects
        trainer: schedule.trainer?.map((trainer: any) => ({
          id: trainer.id,
          firstName: trainer.firstName,
          lastName: trainer.lastName,
        })) || [], // Ensure trainer is an array, even if empty
      }));
  
      // Send the formatted response
      res.status(200).json({ data: formattedData });
    } catch (error) {
      // Log the error details
      console.error('Error fetching batch module schedules:', error);
  
      // Send error response with additional error information
      res.status(500).json({
        message: 'Error fetching batch module schedules',
      });
    }
  };
  

//create BatchModuleSchedule
export const createBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { user } = req;
    const { batchId, moduleId, trainerIds, scheduleDateTime, duration } = req.body;
  
    try {
      const newBatchModuleSchedule = await BatchModuleSchedules.create({
        batchId,
        moduleId,
        scheduleDateTime,
        duration,
      });
  
      if (trainerIds && trainerIds.length > 0) {
        const trainerEntries = trainerIds.map((trainerId: number) => ({
          batchModuleScheduleId: newBatchModuleSchedule.id,
          trainerId,
        }));
        await BatchTrainer.bulkCreate(trainerEntries);
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
                    model: User, as: 'trainer',
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

export const updateBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { batchId, moduleId, trainerIds, scheduleDateTime, duration } = req.body;
    const user = req.user;
  
    try {
      const batchModuleSchedule = await BatchModuleSchedules.findByPk(id);
  
      if (!batchModuleSchedule) {
        res.status(404).json({ message: BATCHMODULESCHEDULES_NOT_FOUND });
        return;
      }
  
      const previousData = batchModuleSchedule.toJSON();
  
      batchModuleSchedule.set({
        batchId,
        moduleId,
        scheduleDateTime,
        duration,
      });
      await batchModuleSchedule.save();
  
      if (trainerIds && trainerIds.length > 0) {
        await BatchTrainer.destroy({ where: { batchModuleScheduleId: id } });
  
        const trainerEntries = trainerIds.map((trainerId: number) => ({
          batchModuleScheduleId: id,
          trainerId,
        }));
        await BatchTrainer.bulkCreate(trainerEntries);
      }
  
      await Audit.create({
        entityType: 'batchModuleSchedule',
        entityId: id,
        action: 'UPDATE',
        oldData: previousData,
        newData: batchModuleSchedule,
        performedBy: user?.id,
      });
  
      res.status(200).json({ message: 'Batch Module Schedule updated successfully' });
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
  