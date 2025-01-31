import { Schema } from 'express-validator';

// Validator for creating an assignment completion
export const assignmentCompletionValidator: Schema = {
    courseAssignId: {
        in: 'body',
        exists: {
            errorMessage: 'Course Assignment ID is required'
        },
        isInt: {
            errorMessage: 'Course Assignment ID must be an integer'
        }
    },
    traineeId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainee ID is required'
        },
        isInt: {
            errorMessage: 'Trainee ID must be an integer'
        }
    },
    courseAssignmentAnswerFile: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment Answer File is required'
        },
        isString: {
            errorMessage: 'Assignment Answer File must be a string'
        }
    }
};

// Validator for updating an assignment completion
export const updateAssignmentCompletionValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Assignment Completion ID is required'
        },
        isInt: {
            errorMessage: 'Assignment Completion ID must be an integer'
        }
    },
    courseAssignId: {
        in: 'body',
        exists: {
            errorMessage: 'Course Assignment ID is required'
        },
        isInt: {
            errorMessage: 'Course Assignment ID must be an integer'
        }
    },
    traineeId: {
        in: 'body',
        exists: {
            errorMessage: 'Trainee ID is required'
        },
        isInt: {
            errorMessage: 'Trainee ID must be an integer'
        }
    },
    courseAssignmentAnswerFile: {
        in: 'body',
        exists: {
            errorMessage: 'Assignment Answer File is required'
        },
        isString: {
            errorMessage: 'Assignment Answer File must be a string'
        }
    }
};

// Validator for deleting an assignment completion
export const deleteAssignmentCompletionValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Assignment Completion ID is required'
        },
        isInt: {
            errorMessage: 'Assignment Completion ID must be an integer'
        }
    }
};
