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
            errorMessage: 'Trainer ID is required',
        },
        isInt: {
            errorMessage: 'Trainer ID must be an integer',
        }
    },
    // scheduleDateTime: {
    //     in: 'body',
    //     exists: {
    //         errorMessage: 'Schedule Date is required',
    //     },
    //     // isDate: {
    //     //     errorMessage: 'Schedule Date must be a valid date',
    //     // },
    //     custom: {
    //         options: (value) => {
    //             // Manually validate the format of "YYYY-MM-DD HH:mm:ss"
    //             const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    //             if (!regex.test(value)) {
    //                 throw new Error('Schedule Date must be in the format YYYY-MM-DD HH:mm:ss');
    //             }
    //             return true;
    //         }
    //     }
    // },
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
            errorMessage: 'Trainer ID must be an integer',
        }
    },
    scheduleDateTime: {
        in: 'body',
        exists: {
            errorMessage: 'Schedule Date is required',
        },
        // isDate: {
        //     errorMessage: 'Schedule Date must be a valid date',
        // },

        // custom: {// Manually validate the format of "YYYY-MM-DD HH:mm:s 2024-01-21 12:00:00"
        //     options: (value) => {
        //         // Manually validate the format of "YYYY-MM-DD HH:mm:ss"
        //         const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        //         if (!regex.test(value)) {
        //             throw new Error('Schedule Date must be in the format YYYY-MM-DD HH:mm:ss');
        //         }
        //         return true;
        //     }
        // }
        
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