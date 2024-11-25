import { Schema } from 'express-validator';


export const courseDetailsValidator: Schema = {
    courseId: {
        in: 'body',
        exists: {
            errorMessage: 'Course ID is required',
        },
        isInt: {
            errorMessage: 'Course ID must be an integer',
        }
    },
    courseLectures: {
        in: 'body',
        exists: {
            errorMessage: 'Course lectures are required',
        },  
    }

}