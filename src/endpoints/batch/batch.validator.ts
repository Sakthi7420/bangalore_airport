import { Schema } from 'express-validator';

export const createBatchValidator: Schema = {
  batchName: {
    in: 'body',
    exists: {
      errorMessage: 'Batch name is required'
    },
    isString: {
      errorMessage: 'Batch name must be a string'
    },
    isLength: {
      options: { max: 255 },
      errorMessage: 'Batch name cannot exceed 255 characters'
    }
  },
  courseId: {
    in: 'body',
    exists: {
      errorMessage: 'Course ID is required'
    },
    isInt: {
      errorMessage: 'Course ID must be an integer'
    }
  },
  traineeIds: {
    in: 'body',
    optional: true,
    isArray: {
      errorMessage: 'Trainee IDs must be an array'
    },
    custom: {
      options: (traineeIds: any) => {
        if (traineeIds && traineeIds.some((id: any) => typeof id !== 'number')) {
          throw new Error('Each trainee ID must be a number');
        }
        return true;
      }
    }
  },
  startDate: {
    in: 'body',
    exists: {
      errorMessage: 'Start date is required'
    },
    // isISO8601: {
    //   errorMessage: 'Start date must be a valid date in ISO8601 format'
    // }
  },
  endDate: {
    in: 'body',
    exists: {
      errorMessage: 'End date is required'
    },
    // isISO8601: {
    //   errorMessage: 'End date must be a valid date in ISO8601 format'
    // }
  }
};

export const updateBatchValidator: Schema = {
  id: {
    in: 'params',
    exists: {
      errorMessage: 'Batch ID is required'
    },
    isInt: {
      errorMessage: 'Batch ID must be an integer'
    }
  },
  batchName: {
    in: 'body',
    optional: true,
    isString: {
      errorMessage: 'Batch name must be a string'
    },
    isLength: {
      options: { max: 255 },
      errorMessage: 'Batch name cannot exceed 255 characters'
    }
  },
  courseId: {
    in: 'body',
    optional: true,
    isInt: {
      errorMessage: 'Course ID must be an integer'
    }
  },
  traineeIds: {
    in: 'body',
    optional: true,
    isArray: {
      errorMessage: 'Trainee IDs must be an array'
    },
    custom: {
      options: (traineeIds: any) => {
        if (traineeIds && traineeIds.some((id: any) => typeof id !== 'number')) {
          throw new Error('Each trainee ID must be a number');
        }
        return true;
      }
    }
  },
  startDate: {
    in: 'body',
    optional: true,
    // isISO8601: {
    //   errorMessage: 'Start date must be a valid date in ISO8601 format'
    // }
  },
  endDate: {
    in: 'body',
    optional: true,
    // isISO8601: {
    //   errorMessage: 'End date must be a valid date in ISO8601 format'
    // }
  }
};

export const deleteBatchValidator: Schema = {
  id: {
    in: 'params',
    exists: {
      errorMessage: 'Batch ID is required'
    },
    isInt: {
      errorMessage: 'Batch ID must be an integer'
    }
  }
};