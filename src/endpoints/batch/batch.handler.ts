import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from 'node-server-engine';
import { Batch, Audit, User, Course } from 'db';
import { Response } from 'express';
import { 
    BATCH_NOT_FOUND,
    BATCH_CREATION_ERROR,
    BATCH_UPDATE_ERROR,
    BATCH_DELETION_ERROR,
    BATCH_GET_ERROR,
    USER_NOT_FOUND
} from './batch.const';

//Get batch
export const getBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {

        const batches = await Batch.findAll({
            include: [
                {
                    model: Course, as: 'course',
                    attributes:['id','courseName']
                },
                {
                    model: User, as: 'trainee',
                    attributes: ['id','firstName', 'lastName']
                }
            ]
        });

        if (batches.length === 0) {
            res.status(404).json({ message: BATCH_NOT_FOUND });
            return;
        }

        res.status(200).json({ Batches: batches  });
        console.log('batches', batches)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching batches', data: error });
    }
};


//create batch
export const createBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { batchName, courseId, traineeId, startDate, endDate } = req.body;

    try {
        const newBatch = await Batch.create({
            batchName,
            courseId,
            traineeId,
            startDate,
            endDate
        });

        await Audit.create({
            entityType: 'Batch',
            entityId: newBatch.id,
            action: 'CREATE',
            newData: newBatch,
            performedBy: user?.id
        });

        res
            .status(201)
            .json({ message: 'Batch created successfully', data: newBatch });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: BATCH_CREATION_ERROR, error });
    }
};

// Get batch by ID
export const getBatchByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const batch = await Batch.findByPk(id, {
            include: [
                {
                    model: Course, as: 'course',
                    attributes:['id', 'courseName']
                },
                {
                    model: User, as: 'trainee',
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        });

        if (!batch) {
            res.status(404).json({ message: 'BatchId not found' })
            return;
        }

        res.status(200).json({ batch });
    } catch (error) {
        res.status(500).json({ message: BATCH_GET_ERROR, data: error });
    }
};

//Update a batch
export const updateBatchHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;
    const { batchName, courseId, traineeId, startDate, endDate } = req.body;
    
    try {

        const updateBatch = await Batch.findByPk(id);

        if (!updateBatch) {
            res.status(404).json({ message: 'Batch not found' });
            return;
        }

        if (!traineeId) {
            res.status(404).json({ message: USER_NOT_FOUND })
        }

        const previousData = {
            batchName: updateBatch.batchName,
            courseId: updateBatch.courseId,
            traineeId: updateBatch.traineeId,
            startDate: updateBatch.startDate,
            endDate: updateBatch.endDate   
          }

          updateBatch.set({
            batchName: batchName,
            courseId: courseId,
            traineeId: traineeId,
            startDate: startDate,
            endDate: endDate
        });

        await updateBatch.save();

        await Audit.create({
            entityType: 'Batch',
            entityId: updateBatch.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateBatch,
            performedBy: user?.id
          });

        res.status(200).json({ message: 'Batch updated successfully', updateBatch });
    } catch (error) {
        res.status(500).json({ message: BATCH_UPDATE_ERROR, error });
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
            res.status(404).json({ message: 'Batch not found' });
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