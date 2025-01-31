import { Schema } from 'express-validator';


export const createCourseValidator: Schema = {
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
    courseImg: {
        in: 'body',
        exists: {
            errorMessage: 'Course Image is Required'
        },
        isString: {
            errorMessage: 'Course Image must be a String'
        }
    },
    courseLink: {
        in: 'body',
        optional: true, 
        isLength: {
            errorMessage: 'Course Link must be at least 5 characters long',
            options: { min: 5 }
        }
    },
};


export const updateCourseValidator: Schema = {
    courseName: {
        in: 'body',
        optional: true, 
        isLength: {
            errorMessage: 'Course Name must be at least 5 characters long',
            options: { min: 5 }
        }
    },
    courseDesc: {
        in: 'body',
        optional: true, 
        isLength: {
            errorMessage: 'Course Description must be at least 20 characters long',
            options: { min: 20 }
        }
    },
    courseCategoryId: {
        in: 'body',
        optional: true, 
        isInt: {
            errorMessage: 'CourseCategoryId must be an Integer'
        }
    },
    courseImg: {
        in: 'body',
        exists: {
            errorMessage: 'Course Image is Required'
        },
        isString: {
            errorMessage: 'Course Image must be a String'
        }
    },
    courseLink: {
        in: 'body',
        optional: true, 
        isLength: {
            errorMessage: 'Course Link must be at least 5 characters long',
            options: { min: 5 }
        }
    },
};

export const deleteCourseValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'CourseId is Required'
        },
        isInt: {
            errorMessage: 'CourseId must be an Integer'
        }
    }
}