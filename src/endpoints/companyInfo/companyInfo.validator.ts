import { Schema } from 'express-validator';

export const createCompanyInfoValidator: Schema = {
    companyName: {
        in: 'body',
        exists: {
            errorMessage: 'CompanyName is Required'
        },
        isLength: {
            errorMessage: 'CompanyName must be 3 characters long',
            options: { min: 3 }
        }
    },
    companyImg: {
        in: 'body',
        exists: {
            errorMessage: 'companyImg is Required'
        },
        isString: {
            errorMessage: 'companyImg must be a string'
        },
    }
};


export const updateCompanyInfoValidator: Schema = {
    companyName: {
        in: 'body',
        exists: {
            errorMessage: 'CompanyName is Required'
        },
        isLength: {
            errorMessage: 'CompanyName must be 3 characters long',
            options: { min: 3 }
        }
    },
    companyImg: {
        in: 'body',
        exists: {
            errorMessage: 'companyImg is Required'
        },
        isString: {
            errorMessage: 'companyImg must be a string'
        },
    }
};


export const deleteCompanyInfoValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'companyInfoId is Required'
        },
        isInt: {
            errorMessage: 'companyInfoId must be an Integer'
        }
    }
}