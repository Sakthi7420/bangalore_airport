import { Schema } from 'express-validator';

// Validator for creating a class
export const classValidator: Schema = {
    classTitle: {
        in: 'body',
        exists: {
            errorMessage: 'Class Title is required'
        },
        isString: {
            errorMessage: 'Class Title must be a string'
        }
    },
    classDescription: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Class Description must be a string'
        }
    },
    classRecordedLink: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Class Recorded Link must be a string'
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
    classDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartDate is required',
        },
        isDate: {
            errorMessage: 'StartDate must be a date',
        }
    },
};

// Validator for updating a class
export const updateClassValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Class ID is required'
        },
        isInt: {
            errorMessage: 'Class ID must be an integer'
        }
    },
    classTitle: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Class Title must be a string'
        }
    },
    classDescription: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Class Description must be a string'
        }
    },
    classRecordedLink: {
        in: 'body',
        optional: true,
        isString: {
            errorMessage: 'Class Recorded Link must be a string'
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
    classDate: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'StartDate is required',
        },
        isDate: {
            errorMessage: 'StartDate must be a date',
        }
    },
};

// Validator for deleting a class
export const deleteClassValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Class ID is required'
        },
        isInt: {
            errorMessage: 'Class ID must be an integer'
        }
    }
};