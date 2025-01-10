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
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainer IDS is required',
        },
        isInt: {
            errorMessage: 'Trainer IDS must be an integer',
        }
    },
    scheduleDateTime: {
        in: 'body',
        exists: {
            errorMessage: 'Schedule Date is required',
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
}

export const updateBatchModuleScheduleValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Batch ID is required',
        },
        isInt: {
            errorMessage: 'Batch ID must be an integer',
        }
    },
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
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainer ID is required',
        },
        isInt: {
            errorMessage: 'Trainer ID must be integer',
        }
    },
    scheduleDateTime: {
        in: 'body',
        exists: {
            errorMessage: 'Schedule Date is required',
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
}

export const deleteBatchModuleScheduleValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Batch ID is required',
        },
        isInt: {
            errorMessage: 'Batch ID must be an integer',
        }
    }
}