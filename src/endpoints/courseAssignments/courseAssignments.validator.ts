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
    courseId: {
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'course ID is required',
            errorMessage: 'course ID is required',
        },
        isInt: {
            errorMessage: 'course ID must be an integer',
            errorMessage: 'course ID must be an integer',
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
        exists: {
            errorMessage: 'Course Assignment Question File is required',
        },
        exists: {
            errorMessage: 'Course Assignment Question File is required',
        },
        optional: true,
        isString: {
            errorMessage: 'Course Assignment Question File must be a string',
        }
    },
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'trainer ID is required',
        },
        isInt: {
            errorMessage: 'trainer ID must be an integer',
        },
        toInt: true,
    },
    totalMarks: {
        in: 'body',
        exists: {
            errorMessage: 'Total Marks is required'
        },
        isInt: {
            errorMessage: 'Total Marks must be an integer'
        }
    },

    assignStartDate: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment Start Date is required'
        },
        isString: {
            errorMessage: 'Assignment Start Date must be a string'
        }
    },
    assignEndDate: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment End Date is required'
        },
        isString: {
            errorMessage: 'Assignment End Date must be a string'
        }
    },
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
    courseId: {
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'course ID is required',
            errorMessage: 'course ID is required',
        },
        isInt: {
            errorMessage: ' course ID must be an integer',
            errorMessage: ' course ID must be an integer',
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
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'trainer ID is required',
        },
        isInt: {
            errorMessage: 'trainer ID must be an integer',
        }
    },
    totalMarks: {
        in: 'body',
        exists: {
            errorMessage: 'Total Marks is required'
        },
        isInt: {
            errorMessage: 'Total Marks must be an integer'
        }
    },

    assignStartDate: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment Start Date is required'
        },
        isString: {
            errorMessage: 'Assignment Start Date must be a string'
        }
    },
    assignEndDate: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment End Date is required'
        },
        isString: {
            errorMessage: 'Assignment End Date must be a string'
        }
    },
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