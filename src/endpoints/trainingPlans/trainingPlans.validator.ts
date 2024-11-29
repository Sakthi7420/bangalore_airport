import { Schema } from 'express-validator';

export const trainingPlansValidator: Schema = {
    trainingName: {
        in: 'body',
        exists: {
            errorMessage: 'Training name is required',
        },
        isString: {
            errorMessage: 'Training name must be a string',
        }
    },
    description: {
        in: 'body',
        exists: {
            errorMessage: 'Description is required',
        },
        isLength: {
            errorMessage: 'Description must be at least 10 characters long',
        }
    },
    assignedTo: {
        in: 'body',
        exists: {
            errorMessage: 'Assigned to is required',
        },
        isInt: {
            errorMessage: 'Assigned to must be an Integer',
        }
    },
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainer ID is required',
        },
        isInt: {
            errorMessage: 'Trainer ID must be an Integer',
        }
    },
    startDate: {
        in: 'body',
        exists: {
            errorMessage: 'Start date is required',
        }
    },
};