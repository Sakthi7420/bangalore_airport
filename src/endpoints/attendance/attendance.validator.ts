import { Schema } from 'express-validator';

export const createAttendanceValidator: Schema = {
    batchId: {
        in: 'body',
        exists: {
            errorMessage: 'batchId is require'
        },
        isInt: {
            errorMessage: 'batchId must be an Integer'
        }
    },
    moduleId: {
        in: 'body',
        exists: {
            errorMessage: 'moduleId is required'
        },
        isInt: {
            errorMessage: 'moduleId must be an Integer'
        }
    },
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'trainerId is required'
        },
        isInt: {
            errorMessage: 'trainerId must be an Integer'
        }
    },
    excelFile: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'excelFile is Required'
        },
        isString: {
            errorMessage: 'excelFile must be string'
        }
    }
};

export const updateAttendance: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'id is required'
        },
        isInt: {
            errorMessage: 'id must be an Integer'
        }
    },
    batchId: {
        in: 'body',
        exists: {
            errorMessage: 'batchId is required'
        },
        isInt: {
            errorMessage: 'batchId must be an Integer'
        }
    },
    moduleId: {
        in: 'body',
        exists: {
            errorMessage: 'moduleId is required'
        },
        isInt: {
            errorMessage: 'moduleId must be an Integer'
        }
    },
    trainerId: {
        in: 'body',
        exists: {
            errorMessage: 'trainerId is required'
        },
        isInt: {
            errorMessage: 'trainerId must be an Integer'
        }
    },
    excelFile: {
        in: 'body',
        optional: true,
        exists: {
            errorMessage: 'excelFile is Required'
        },
        isString: {
            errorMessage: 'excelFile must be string'
        }
    }
};

export const deleteAttendanceValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Id is required',
        },
        isInt: {
            errorMessage: 'Id must be a integer'
        }
    }
};
