import { Schema } from 'express-validator';

export const createJobBoardValidator: Schema = {
  companyId: {
    in: 'body',
    exists: {
      errorMessage: 'companyId is Required'
    },
    isInt: {
      errorMessage: 'companyId must be an Integer'
    }
  },

  jobRole: {
    in: 'body',
    exists: {
      errorMessage: 'JobRole is Required'
    },
    isLength: {
      errorMessage: 'JobRole must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  jobRoleDesc: {
    in: 'body',
    exists: {
      errorMessage: 'JobRole Description is Required'
    },
    isLength: {
      errorMessage: 'JobRole Description must be at least 5 characters long',
      options: { min: 5 }
    }
  },

  jobType: {
    in: 'body',
    exists: {
      errorMessage: 'JobType is Required'
    },
    isLength: {
      errorMessage: 'JobType must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  jobLocation: {
    in: 'body',
    exists: {
      errorMessage: 'JobLocation is Required'
    },
    isLength: {
      errorMessage: 'JobLocation must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  experience: {
    in: 'body',
    exists: {
      errorMessage: 'Experience is Required'
    },
    isLength: {
      errorMessage: 'Experience must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  salary: {
    in: 'body',
    exists: {
      errorMessage: 'Salary is Required'
    },
    isFloat: {
      errorMessage: 'Salary must be a Float'
    }
  },

  jobLink: {
    in: 'body',
    optional: true,
    isLength: {
      errorMessage: 'JobLink must be at least 5 characters long',
      options: { min: 5 }
    }
  }
};

export const updateJobBoardValidator: Schema = {
  companyId: {
    in: 'body',
    exists: {
      errorMessage: 'companyId is Required'
    },
    isInt: {
      errorMessage: 'companyId must be an Integer'
    }
  },

  jobRole: {
    in: 'body',
    exists: {
      errorMessage: 'JobRole is Required'
    },
    isLength: {
      errorMessage: 'JobRole must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  jobRoleDesc: {
    in: 'body',
    exists: {
      errorMessage: 'JobRole Description is Required'
    },
    isLength: {
      errorMessage: 'JobRole Description must be at least 5 characters long',
      options: { min: 5 }
    }
  },

  jobType: {
    in: 'body',
    exists: {
      errorMessage: 'JobType is Required'
    },
    isLength: {
      errorMessage: 'JobType must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  jobLocation: {
    in: 'body',
    exists: {
      errorMessage: 'JobLocation is Required'
    },
    isLength: {
      errorMessage: 'JobLocation must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  experience: {
    in: 'body',
    exists: {
      errorMessage: 'Experience is Required'
    },
    isLength: {
      errorMessage: 'Experience must be at least 3 characters long',
      options: { min: 3 }
    }
  },

  salary: {
    in: 'body',
    exists: {
      errorMessage: 'Salary is Required'
    },
    isFloat: {
      errorMessage: 'Salary must be a Float'
    }
  },

  jobLink: {
    in: 'body',
    optional: true,
    isLength: {
      errorMessage: 'JobLink must be at least 5 characters long',
      options: { min: 5 }
    }
  }
};

export const deleteJobBoardValidator: Schema = {
  id: {
    in: 'params',
    exists: {
      errorMessage: 'JobBoardId is Required'
    },
    isInt: {
      errorMessage: 'JobBoardId must be an Integer'
    }
  }
};
