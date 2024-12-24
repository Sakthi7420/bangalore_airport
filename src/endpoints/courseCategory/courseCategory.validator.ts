import { Schema } from 'express-validator';

export const courseCategoryValidator: Schema = {
    courseCategory: {
        in: 'body',
        exists: {
            errorMessage: 'CourseCategory is Required'
        },
        isLength: {
            errorMessage: 'CourseCategory must be 5 characters long',
            options: { min: 5 }
        }
    },
    description: {
        in: 'body',
        optional: true,
    },
    courseCategoryImg: {
        in: 'body',
        exists: {
            errorMessage: 'CourseCategoryImage is required',
        },
        isString: {
            errorMessage: 'CourseCategoryImage must be a string',
        },
        // custom: {
        //     options: (value, { req }) => {
        //         // Validate that the field exists and is a valid Blob
        //         if (!req.files || !req.files.courseCategoryImg) {
        //             throw new Error('CourseCategoryImage must be a file');
        //         }
        //         const file = req.files.courseCategoryImg;
        //         if (!(file instanceof Buffer || file instanceof Blob)) {
        //             throw new Error('CourseCategoryImage must be a valid Blob or file');
        //         }
        //         return true;
        //     },
        // },
    },
};    


export const updateCourseCategoryValidator: Schema = {
    courseCategory: {
        in: 'body',
        exists: {
            errorMessage: 'CourseCategory is Required'
        },
        isLength: {
            errorMessage: 'CourseCategory must be 5 characters long',
            options: { min: 5 }
        }
    },
    description: {
        in: 'body',
        optional: true,
    },
    courseCategoryImg: {
        in: 'body',
        exists: {
            errorMessage: 'CourseCategoryImage is required',
        },
        isString: {
            errorMessage: 'CourseCategoryImage must be a string',
        },
    },
};


export const deleteCourseCategoryValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'CategoryID is Required'
        },
        isInt: {
            errorMessage: 'CategoryID must be an Integer'
        }
    }
}