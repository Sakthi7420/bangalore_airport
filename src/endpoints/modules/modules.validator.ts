import { Schema } from 'express-validator';

export const createModuleValidator: Schema = {
  courseId: {
    in: 'body',
    exists: {
      errorMessage: 'Course ID is required',
    },
    isInt: {
      errorMessage: 'Course ID must be an integer',
    },
  },
  moduleName: {
    in: 'body',
    exists: {
      errorMessage: 'Module Name is required',
    },
    isLength: {
      errorMessage: 'Module Name must be at least 3 characters long',
      options: { min: 3 },
    },
  },
  moduleDescription: {
    in: 'body',
    optional: { options: { nullable: true } },
    isLength: {
      errorMessage: 'Module Description must be at least 10 characters long',
      options: { min: 10 },
    },
  },
//   sequence: {
//     in: 'body',
//     exists: {
//       errorMessage: 'Sequence is required',
//     },
//     isInt: {
//       errorMessage: 'Sequence must be an integer',
//     },
//   },
  createdBy: {
    in: 'body',
    exists: {
      errorMessage: 'Created By (User ID) is required',
    },
    isInt: {
      errorMessage: 'Created By must be an integer',
    },
  },
};

export const updateModuleValidator: Schema = {
  moduleName: {
    in: 'body',
    optional: { options: { nullable: true } },
    isLength: {
      errorMessage: 'Module Name must be at least 3 characters long',
      options: { min: 3 },
    },
  },
  moduleDescription: {
    in: 'body',
    optional: { options: { nullable: true } },
    isLength: {
      errorMessage: 'Module Description must be at least 10 characters long',
      options: { min: 10 },
    },
  },
  sequence: {
    in: 'body',
    optional: { options: { nullable: true } },
    isInt: {
      errorMessage: 'Sequence must be an integer',
    },
  },
  updatedBy: {
    in: 'body',
    optional: { options: { nullable: true } },
    isInt: {
      errorMessage: 'Updated By must be an integer',
    },
  },
};

export const deleteModuleValidator: Schema = {
  id: {
    in: 'params',
    exists: {
      errorMessage: 'Module ID is required',
    },
    isInt: {
      errorMessage: 'Module ID must be an integer',
    },
  },
};
