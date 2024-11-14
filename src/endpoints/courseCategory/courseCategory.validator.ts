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
            errorMessage: 'CourseCategoryImage is Required'
        },
        isString: {
            errorMessage: 'CourseCategoryImage must be a string'
        },
    }
}