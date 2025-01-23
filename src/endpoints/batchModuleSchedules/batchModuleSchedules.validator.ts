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
        optional: true,
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
    startDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartDate is required',
        },
        isDate: {
            errorMessage: 'StartDate must be a date',
        }
    },
    endDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'EndDate is required',
        },
        isDate: {
            errorMessage: 'EndDate must be a valid date',
        }
    },
    startTime: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartTime is required',
        },
        // isTime: {
        //     errorMessage: 'StartTime must be a time',
        // }
    },
    endTime: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'EndTime is required',
        },
        // isTime: {
        //     errorMessage: 'EndTime must be a time',
        // }
    },
    meetingLink: {
        in: 'body',
        exists: {
            errorMessage: 'MeetingLink is required',
        },
        isString: {
            errorMessage: 'MeetingLink must be a string',
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
    startDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartDate is required',
        },
        isDate: {
            errorMessage: 'StartDate must be a date',
        }
    },
    endDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'EndDate is required',
        },
        isDate: {
            errorMessage: 'EndDate must be a valid date',
        }
    },
    startTime: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartTime is required',
        },
        // isTime: {
        //     errorMessage: 'StartTime must be a time',
        // }
    },
    endTime: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'EndTime is required',
        },
        // isTime: {
        //     errorMessage: 'EndTime must be a time',
        // }
    },
    meetingLink: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'MeetingLink is required',
        },
        isString: {
            errorMessage: 'MeetingLink must be a string',
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