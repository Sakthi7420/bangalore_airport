import { Schema } from 'express-validator';

export const courseValidator: Schema = {
    courseName: {
        in: 'body',
        exists: {
            errorMessage: 'Course Name is Required'
        },
        isLength: {
            errorMessage: 'CourseName must be at least 5 characters long',
            options: { min: 5 }
        }
    },
    courseDesc: {
        in: 'body',
        exists: {
            errorMessage: 'Course Description is Required'
        },
        isLength: {
            errorMessage: 'Course Description must be at least 20 characters long',
        }
    },
    courseCategoryId: {
        in: 'body',
        exists: {
            errorMessage: 'CourseCategoryId is Required'
        },
        isInt: {
            errorMessage: 'CourseCategoryId must be an Integer'
        }
    },
    courseInstructorId: {
        in: 'body',
        exists: {
            errorMessage: 'CourseInstructorId is Required'
        },
        isInt: {
            errorMessage: 'CourseInstructorId must be an Integer'
        }
    }
};