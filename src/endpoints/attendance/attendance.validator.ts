import { Schema } from 'express-validator';

//AttendanceFileTable validator
export const createAttendanceFileValidator: Schema = {
    teamsAttendanceFile: {
        in: 'body',
        exists: {
            errorMessage: 'teamsAttendanceFile is required'
        },
        isString: {
            errorMessage: 'teamsAttendanceFile must be a string'
        }
    }
};

export const getAttendanceFileValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'id is required'
        },
        isInt: {
            errorMessage: 'id must be a integer'
        }
    }
};

export const updateAttendanceFileValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'id is required'
        },
        isInt: {
            errorMessage: 'id must be a integer'
        }
    },
    teamsAttendanceFile: {
        in: 'body',
        exists: {
            errorMessage: 'teamsAttendanceFile is required'
        },
        isString: {
            errorMessage: 'teamsAttendanceFile must be a string'
        }
    }
};

export const deleteAttendanceFileValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'id is required'
        },
        isInt: {
            errorMessage: 'id must be a integer'
        }
    },
};


//AttendanceTable Validator
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
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'CourseId is required'
        },
        isInt: {
            errorMessage: 'CourseId must be a integer'
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

export const getUserByIdValidator: Schema = {
    userId: {
        in: 'params',
        exists: {
            errorMessage: 'userId is required'
        },
        isInt: {
            errorMessage: 'userId must be integer'
        }
    },
    batchId: {
        in: 'params',
        exists: {
            errorMessage: 'batchId is require'
        },
        isInt: {
            errorMessage: 'batchId must be an Integer'
        }
    },
    courseId: {
        in: 'params',
        exists: {
            errorMessage: 'CourseId is required'
        },
        isInt: {
            errorMessage: 'CourseId must be a integer'
        }
    }
};

export const updateAttendanceValidator: Schema = {
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
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'CourseId is required'
        },
        isInt: {
            errorMessage: 'CourseId must be a integer'
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
