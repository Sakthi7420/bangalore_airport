import { Schema } from 'express-validator';

// Validator for creating a batch
export const batchValidator: Schema = {
    batchName: {
        in: 'body',
        exists: {
            errorMessage: 'Batch Name is required'
        },
        isString: {
            errorMessage: 'Batch Name must be a string'
        },
        isLength: {
            errorMessage: 'Batch Name must be at least 5 characters long',
            options: { min: 5 }
        }
    },
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'Course is required'
        },
        isInt: {
            errorMessage: 'Course must be a integer'
        }
    },
    traineeId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainee is required'
        },
        isInt: {
            errorMessage: 'Trainee must be a integer'
        }
    },
    startDate: {
        in: 'body',
        exists: {
            errorMessage: 'Start Date is required'
        },
        isString: {
            errorMessage: 'Start Date must be a string'
        }
    },
    endDate: {
        in: 'body',
        exists: {
            errorMessage: 'End Date is required'
        },
        isString: {
            errorMessage: 'End Date must be a string'
        }
    }
};

// Validator for updating a batch
export const updateBatchValidator: Schema = {
    batchName: {
        in: 'body',
        exists: {
            errorMessage: 'Batch Name is required'
        },
        isString: {
            errorMessage: 'Batch Name must be a string'
        },
        isLength: {
            errorMessage: 'Batch Name must be at least 5 characters long',
            options: { min: 5 }
        }
    },
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'Course is required'
        },
        isInt: {
            errorMessage: 'Course must be a integer'
        }
    },
    traineeId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainee is required'
        },
        isInt: {
            errorMessage: 'Trainee must be a integer'
        }
    },
    startDate: {
        in: 'body',
        exists: {
            errorMessage: 'Start Date is required'
        },
        isString: {
            errorMessage: 'Start Date must be a string'
        }
    },
    endDate: {
        in: 'body',
        exists: {
            errorMessage: 'End Date is required'
        },
        isString: {
            errorMessage: 'End Date must be a string'
        }
    }
};

// Validator for deleting a batch
export const deleteBatchValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Batch ID is required'
        },
        isString: {
            errorMessage: 'Batch ID must be a string'
        }
    }
};