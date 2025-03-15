import { Schema } from 'express-validator';

export const CreateEmployeeValidator: Schema = {
    employee_Name: {
        in: 'body',
        exists: {
            errorMessage: 'Employee Name is required',
        },
        isString: {
            errorMessage: 'Employee Name must be a string',
        }
    },
    score: {
        in: 'body',
        exists: {
            errorMessage: 'Score is required',
        }
    },
    result: {
        in: 'body',
        exists: {
            errorMessage: 'Result is required',
        },
        isString: {
            errorMessage: 'Result must be a string',
        }
    },
    certificate: {
        in: 'body',
        exists: {
            errorMessage: 'Certificate is required',
        },
        isString: {
            errorMessage: 'Certificate must be a string',
        }
    }
};

export const GetEmployeeValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'Employee ID is required',
        },
        isInt: {
            errorMessage: 'Employee ID must be an integer',
        }
    }
};