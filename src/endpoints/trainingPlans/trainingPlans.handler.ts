import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from '@gwcdata/node-server-engine';
import { TrainingPlan } from 'db';
import { User } from 'db';
import { Response } from 'express';


// Get All Traingplans
export const getTrainingPlanHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {
    try {

        const trainingPlan = await TrainingPlan.findAll();

        if (trainingPlan.length === 0) {
            res.status(404).json({ message: 'No trainingPlans found' });
            return;
        }

        res.status(200).json({ trainingPlans: trainingPlan });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error', data: error });
    }
}


export const createTrainingPlanHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const {
        trainingName,
        description,
        trainerId,
        status,
        assignedTo,
        startDate,
        endDate
    } = req.body;
    
        try { 
    
            const trainer = await User.findByPk(trainerId);

            if(req.user?.role !== 'admin') {
                res.status(403).json({ message: 'You don\'t have Permission' });
                return;
            }

            if (!trainer) {
                res.status(404).json({ message: 'Trainer not found' });
                return;
            }

            const trainee = await User.findByPk(assignedTo);

            if (!trainee) {
                res.status(404).json({ message: 'Trainee not found' });
                return;
            }

            const newTrainingPlan = await TrainingPlan.create({
                trainingName,
                description,
                trainerId,
                status,
                assignedTo,
                startDate,
                endDate
            });

            res.status(201).json({ message: 'TrainingPlan Created Successfully', trainingplan: newTrainingPlan });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal Server error', data: error });
            return;
        }   
};

//get by id
export const getTraininPlanByIdHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
  ): Promise<void> => {
  
    const { id } = req.params;
  
    try {
      const trainingPlan = await TrainingPlan.findByPk(id, {
        include: [
          { model: User, as: 'trainee' },  
          { model: User, as: 'trainer' }   
        ]
      });
  
      if (!trainingPlan) {
        res.status(404).json({ message: 'Training Plan not found' });
        return;
      }
  
      res.status(200).json({ trainingPlan });
      return;
  
    } catch (error) {
      res.status(500).json({ message: 'Internal Server error', data: error });
      return;
    }
  };
  
  //Update Training Plan
  export const updateTrainingPlanHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
  ): Promise<void> => {

    const { id } = req.params;

        const {
            trainingName,
            description,
            trainerId,
            status,
            assignedTo,
            startDate,
            endDate
        } = req.body;

        try {

            if(req.user?.role !== 'admin') {
                res.status(403).json({ message: 'You dont have Permission' });
                return;
            }

            const trainingPlan = await TrainingPlan.findByPk(id);

            if (!trainingPlan) {
                res.status(404).json({ message: 'trainingPlan not found' });
                return;
            }

            if (trainerId) {
                const trainer = await User.findByPk(trainerId);
                if (!trainer) {
                    res.status(404).json({ message: 'Trainer not found' });
                    return;
                }
            }
    
            if (assignedTo) {
                const trainee = await User.findByPk(assignedTo);
                if (!trainee) {
                    res.status(404).json({ message: 'Trainee not found' });
                    return;
                }
            }

            trainingPlan.set({
            trainingName : trainingName,
            description : description,
            trainerId : trainerId,
            assignedTo : assignedTo,
            startDate : startDate,
            endDate : endDate,
            status : status

            })

            await trainingPlan.save();

            res.status(200).json({ message: 'Training plan updated successfully', trainingPlan });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Error updating training plan', error });
            return;
        }
};

//delete TrainingPlan
export const deleteTrainingPlanHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
  ): Promise<void> => {

    const { id } = req.params;

    try {

        const trainingPlan = await TrainingPlan.findByPk(id);

        if(req.user?.role !== 'admin') {
            res.status(403).json({ message: 'You don\'t have a Permission' });
            return;
        }

        if (!trainingPlan) {
            res.status(404).json({ message: 'trainingPlan not found' });
            return;
        }

        await trainingPlan.destroy();

        res.status(200).json({ message: 'Training plan deleted successfully'});
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error deleting training plan', error });
    }
  };
