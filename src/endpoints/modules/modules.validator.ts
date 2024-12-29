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
    }
  },
};

export const updateModuleValidator: Schema = {
  id: {
    in: 'body',
    exists: {
      errorMessage: 'id must be required'
    },
    isInt: {
      errorMessage: 'id must be integer'
    }
  },
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