import { Schema } from 'express-validator';


export const createEnrollCourse: Schema = {
    userId: {
        in: 'body',
        exists: {
            errorMessage: 'User ID is required',
        },
        isInt: {
            errorMessage: 'User ID must be an integer',
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
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'Course ID is required',
        },
        isInt: {
            errorMessage: 'Course ID must be an integer',
        }
    },
    // enrollmentDate: {
    //     in: 'body',
    //     exists: {
    //         errorMessage: 'Enrollment Date is required',
    //     },
    //     isDate: {
    //         errorMessage: 'Enrollment Date must be a date',
    //     }
    // }
}

export const updateEnrollCourse: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'EnrollCourse ID is required',
        },
        isInt: {
            errorMessage: 'EnrollCourse ID must be an integer',
        }
    },
    userId: {
        in: 'body',
        exists: {
            errorMessage: 'User ID is required',
        },
        isInt: {
            errorMessage: 'User ID must be an integer',
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
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'Course ID is required',
        },
        isInt: {
            errorMessage: 'Course ID must be an integer',
        }
    },
    // enrollmentDate: {
    //     in: 'body',
    //     exists: {
    //         errorMessage: 'Enrollment Date is required',
    //     },
    //     isDate: {
    //         errorMessage: 'Enrollment Date must be a date',
    //     }
    // }
}

export const deleteEnrollCourse: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'EnrollCourse ID is required',
        },
        isInt: {
            errorMessage: 'EnrollCourse ID must be an integer',
        }
    }
}