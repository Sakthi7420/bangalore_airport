import { Schema } from 'express-validator';

export const batchModuleScheduleValidator: Schema = {
    batchId: {
        in: 'body',
        exists: {
            errorMessage: 'Batch ID is required',
        },
        isInt: {
            errorMessage: 'Batch ID must be an integer',
        }
    },
    moduleId: {
        in: 'body',
        exists: {
            errorMessage: 'Module ID is required',
        },
        isInt: {
            errorMessage: 'Module ID must be an integer',
        }
    },
    trainerIds: {
        in: 'body',
        exists: {
            errorMessage: 'Trainer IDs are required',
        },
        isArray: {
            errorMessage: 'Trainer IDs must be an array',
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value)) {
                    throw new Error('Trainer IDs must be an array');
                }
                const isValid = value.every((id) => Number.isInteger(id));
                if (!isValid) {
                    throw new Error('Each Trainer ID must be an integer');
                }
                return true;
            }
        }
    },
    scheduleDateTime: {
        in: 'body',
        exists: {
            errorMessage: 'Schedule Date and Time is required',
        },
        custom: {
            options: (value) => {
                const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (!regex.test(value)) {
                    throw new Error('Schedule Date and Time must be in the format YYYY-MM-DD HH:mm:ss');
                }
                if (isNaN(new Date(value).getTime())) {
                    throw new Error('Schedule Date and Time must be a valid date');
                }
                return true;
            }
        }
    },
    duration: {
        in: 'body',
        exists: {
            errorMessage: 'Duration is required',
        },
        isInt: {
            errorMessage: 'Duration must be an integer',
        }
    }
};

export const updateBatchModuleScheduleValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Batch Module Schedule ID is required',
        },
        isInt: {
            errorMessage: 'Batch Module Schedule ID must be an integer',
        }
    },
    batchId: {
        in: 'body',
        optional: true,
        isInt: {
            errorMessage: 'Batch ID must be an integer',
        }
    },
    moduleId: {
        in: 'body',
        optional: true,
        isInt: {
            errorMessage: 'Module ID must be an integer',
        }
    },
    trainerIds: {
        in: 'body',
        optional: true,
        isArray: {
            errorMessage: 'Trainer IDs must be an array',
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value)) {
                    throw new Error('Trainer IDs must be an array');
                }
                const isValid = value.every((id) => Number.isInteger(id));
                if (!isValid) {
                    throw new Error('Each Trainer ID must be an integer');
                }
                return true;
            }
        }
    },
    scheduleDateTime: {
        in: 'body',
        optional: true,
        custom: {
            options: (value) => {
                const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
                if (!regex.test(value)) {
                    throw new Error('Schedule Date and Time must be in the format YYYY-MM-DD HH:mm:ss');
                }
                if (isNaN(new Date(value).getTime())) {
                    throw new Error('Schedule Date and Time must be a valid date');
                }
                return true;
            }
        }
    },
    duration: {
        in: 'body',
        optional: true,
        isInt: {
            errorMessage: 'Duration must be an integer',
        }
    }
};

export const deleteBatchModuleScheduleValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Batch Module Schedule ID is required',
        },
        isInt: {
            errorMessage: 'Batch Module Schedule ID must be an integer',
        }
    }
};
