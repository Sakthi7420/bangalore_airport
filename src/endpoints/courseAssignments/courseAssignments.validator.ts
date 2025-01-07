import { Schema } from 'express-validator';

export const createCourseAssignmentValidator: Schema = {
    batchId: {
        in: 'body',
        exists: {
            errorMessage: 'Batch ID is required',
        },
        isInt: {
            errorMessage: 'Batch ID must be an integer',
        }
    },
    batchModuleScheduleId: {
        in: 'body',
        exists: {
            errorMessage: 'Batch Module Schedule ID is required',
        },
        isInt: {
            errorMessage: 'Batch Module Schedule ID must be an integer',
        }
    },
    courseAssignmentQuestionName: {
        in: 'body',
        exists: {
            errorMessage: 'Course Assignment Question Name is required',
        },
        isString: {
            errorMessage: 'Course Assignment Question Name must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Course Assignment Question Name cannot be empty',
        }
    },
    courseAssignmentQuestionFile: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Course Assignment Question File must be a string',
        }
    },
    instructorId: {
        in: 'body',
        exists: {
            errorMessage: 'Instructor ID is required',
        },
        isInt: {
            errorMessage: 'Instructor ID must be an integer',
        }
    }
};

export const updateCourseAssignmentValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Course Assignment ID is required',
        },
        isInt: {
            errorMessage: 'Course Assignment ID must be an integer',
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
    batchModuleScheduleId: {
        in: 'body',
        exists: {
            errorMessage: 'Batch Module Schedule ID is required',
        },
        isInt: {
            errorMessage: 'Batch Module Schedule ID must be an integer',
        }
    },
    courseAssignmentQuestionName: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Course Assignment Question Name must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Course Assignment Question Name cannot be empty',
        }
    },
    courseAssignmentQuestionFile: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Course Assignment Question File must be a string',
        }
    },
    instructorId: {
        in: 'body',
        exists: {
            errorMessage: 'Instructor ID is required',
        },
        isInt: {
            errorMessage: 'Instructor ID must be an integer',
        }
    }
};

export const deleteCourseAssignmentValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Course Assignment ID is required',
        },
        isInt: {
            errorMessage: 'Course Assignment ID must be an integer',
        }
    }
};
