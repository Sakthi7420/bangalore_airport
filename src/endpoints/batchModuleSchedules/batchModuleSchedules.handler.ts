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
import { BatchModuleSchedules, Audit, Module, User, Batch } from 'db';
import { Response } from 'express';

//Get Categories
export const getBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {

        const batchModuleSchedule = await BatchModuleSchedules.findAll({
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

        if (batchModuleSchedule.length === 0) {
            res.status(404).json({ message: BATCHMODULESCHEDULES_FETCH_ERROR });
            return;
        }

        res.status(200).json({ batchModuleSchedule });
    } catch (error) {
        res.status(500).json({ message: BATCHMODULESCHEDULES_FETCH_ERROR, error });
    }
}

//create BatchModuleSchedule
export const createBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { batchId, moduleId, trainerId, scheduleDateTime, duration } = req.body;

    try {

        const newBatchModuleSchedule = await BatchModuleSchedules.create({
            batchId,
            moduleId,
            trainerId,
            scheduleDateTime,
            duration
        });

        // Log the action in the audit table
        await Audit.create({
            entityType: 'batchModuleSchedule',
            entityId: newBatchModuleSchedule.id,
            action: 'CREATE',
            newData: newBatchModuleSchedule,
            performedBy: user?.id,
        });

        res.status(201).json({ message: 'BactchSchedule created successfully', newBatchModuleSchedule });
    } catch (error) {
        res.status(500).json({ message: BATCHMODULESCHEDULES_CREATION_ERROR, error });
    }
}

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
        res.status(500).json({ message: BATCHMODULESCHEDULES_FETCH_ERROR, error })
    }
};


//Update BatchModuleSchedule
export const updateBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { batchId, moduleId, trainerId, scheduleDateTime, Duration } = req.body;
    const user = req.user;

    try {

        const updateBatchModuleSchedule = await BatchModuleSchedules.findByPk(id);

        if (!updateBatchModuleSchedule) {
            res.status(404).json({ message: BATCHMODULESCHEDULES_NOT_FOUND })
            return;
        }

        if (!batchId) {
            res.status(404).json({ message: BATCH_NOT_FOUND })
            return;
        }

        if (!moduleId) {
            res.status(404).json({ message: MODULES_NOT_FOUND });
            return;
        }

        if (!trainerId) {
            res.status(404).json({ message: TRAINER_NOT_FOUND });
            return;
        }

        const previousData = {
            batchId: updateBatchModuleSchedule.batchId,
            moduleId: updateBatchModuleSchedule.moduleId,
            trainerId: updateBatchModuleSchedule.trainerId,
            scheduleDateTime: updateBatchModuleSchedule.scheduleDateTime,
            duration: updateBatchModuleSchedule.duration
        }

        updateBatchModuleSchedule.set({
            batchId: batchId,
            moduleId: moduleId,
            trainerId: trainerId,
            scheduleDate: scheduleDateTime,
            Duration: Duration
        });


        await Audit.create({
            entityType: 'batchModuleSchedule',
            entityId: updateBatchModuleSchedule.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateBatchModuleSchedule,
            performedBy: user?.id
        });

        await updateBatchModuleSchedule.save();

        res.status(200).json({ message: 'Batch ModuleSchedule updated successfully', updateBatchModuleSchedule });
    } catch (error) {
        res.status(500).json({ message: BATCHMODULESCHEDULES_UPDATE_ERROR, error })
    }
}

//Delete batchModuleSchedules
export const deleteBatchModuleScheduleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {

        const deleteBatchModuleSchedule = await BatchModuleSchedules.findByPk(id);

        if (!deleteBatchModuleSchedule) {
            res.status(404).json({ message: BATCHMODULESCHEDULES_NOT_FOUND })
            return;
        }

        await Audit.create({
            entityType: 'batchModuleSchedule',
            entityId: deleteBatchModuleSchedule.id,
            action: 'DELETE',
            oldData: deleteBatchModuleSchedule, // Old data before deletion
            performedBy: user?.id
        });

        await deleteBatchModuleSchedule.destroy();

        res.status(200).json({ message: 'BatchModuleSchedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: BATCHMODULESCHEDULES_DELETION_ERROR, error })
    }
}