import { Schema } from 'express-validator';
import { User } from 'db';


export const registerValidator: Schema = {
  firstName: {
    in: 'body',
    exists: {
      errorMessage: 'firstName is required'
    },
    isLength: {
      errorMessage: 'firstName must be at least 4 characters long',
      options: { min: 4 }
    }
  },
  lastName: {
    in: 'body',
    exists: {
      errorMessage: 'lastName is required'
    },
    isLength: {
      errorMessage: 'lastName must be at least 1 characters long',
      options: { min: 1 }
    }
  },
  email: {
    in: 'body',
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Email is not valid'
    },
    normalizeEmail: true, // Automatically normalize email
    custom: {
      options: async (value) => {
        const user = await User.findOne({ where: { email: value }, raw: true });
        if (user) {
          throw new Error('Email already in use');
        }
      }
    }
  },
  phoneNumber: {
    in: 'body',
    exists: {
      errorMessage: 'PhoneNumber is required'
    },
  },
  password: {
    in: 'body',
    exists: {
      errorMessage: 'Password is required'
    },
    isLength: {
      errorMessage: 'Password must be at least 8 characters long',
      options: { min: 8 }
    },
    matches: {
      options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      errorMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    },
  },
};

export const loginValidator: Schema = {
  email: {
    in: 'body',
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Email is not valid'
    },
    normalizeEmail: true
  },
  password: {
    in: 'body',
    exists: {
      errorMessage: 'Password is required'
    }
  }
};

export const logoutValidator: Schema = {};


export const createUserValidator: Schema = {
  firstName: {
    in: 'body',
    exists: {
      errorMessage: 'firstName is required'
    },
    isLength: {
      errorMessage: 'firstName must be at least 4 characters long',
      options: { min: 4 }
    }
  },
  lastName: {
    in: 'body',
    exists: {
      errorMessage: 'lastName is required'
    },
    isLength: {
      errorMessage: 'lastName must be at least 1 characters long',
      options: { min: 1 }
    }
  },
  email: {
    in: 'body',
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Email is not valid'
    },
    normalizeEmail: true, // Automatically normalize email
    custom: {
      options: async (value) => {
        const user = await User.findOne({ where: { email: value }, raw: true });
        if (user) {
          throw new Error('Email already in use');
        }
      }
    }
  },
  phoneNumber: {
    in: 'body',
    exists: {
      errorMessage: 'PhoneNumber is required'
    },
  },

}

export const updateUserValidator: Schema = {
  firstName: {
    in: 'body',
    exists: {
      errorMessage: 'firstName is required'
    },
    isLength: {
      errorMessage: 'firstName must be at least 4 characters long',
      options: { min: 4 }
    }
  },
  lastName: {
    in: 'body',
    exists: {
      errorMessage: 'lastName is required'
    },
    isLength: {
      errorMessage: 'lastName must be at least 1 characters long',
      options: { min: 1 }
    }
  },
  email: {
    in: 'body',
    exists: {
      errorMessage: 'Email is required'
    },
    isEmail: {
      errorMessage: 'Email is not valid'
    }
},
  phoneNumber: {
    in: 'body',
    exists: {
      errorMessage: 'PhoneNumber is required'
    },
  }
}
