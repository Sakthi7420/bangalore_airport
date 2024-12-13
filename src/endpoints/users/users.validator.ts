import { User } from 'db';
import { Schema } from 'express-validator';

export const createUserValidator: Schema = {
    firstName: {
        in: 'body',
        exists: {
            errorMessage: 'First name is required',
        },
        isString: {
            errorMessage: 'First name must be a string',
        },
        isLength: {
            options: { max: 20 },
            errorMessage: 'First name must be less than 20 characters',
        }
    },
    lastName: {
        in: 'body',
        exists: {
            errorMessage: 'Last name is required',
        },
        isString: {
            errorMessage: 'Last name must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Last name must be at least 2 characters',
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
            errorMessage: 'Phone number is required'
        }
    },
    password: {
        in: 'body',
        exists: {
            errorMessage: 'Password is required'
        },
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: 'Password must be between 8 and 20 characters long',
        }
    },
    dateOfJoining: {
        in: 'body',
        exists: {
            errorMessage: 'Date of joining is required'
        },
        isDate: {
            errorMessage: 'Invalid date of joining'
        },
    },
    roleId: {
        in: 'body',
        exists: {
            errorMessage: 'Role is required'
        },
        isInt: {
            errorMessage: 'Role must be an integer'
        }
    }
};

export const updateUserValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'User id is required'
        },
        isInt: {
            errorMessage: 'User id must be an integer'
        }
    },
    firstName: {
        in: 'body',
        exists: {
            errorMessage: 'First name is required',
        },
        isString: {
            errorMessage: 'First name must be a string',
        },
        isLength: {
            options: { max: 20 },
            errorMessage: 'First name must be less than 20 characters',
        }
    },
    lastName: {
        in: 'body',
        exists: {
            errorMessage: 'Last name is required',
        },
        isString: {
            errorMessage: 'Last name must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Last name must be at least 2 characters',
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
        normalizeEmail: true,
        optional: true, // Automatically normalize email    ----> while updating need to validated email other than exisiting email
        custom: {
            options: async (value, { req }) => {
                if (!req.params?.id) {
                    throw new Error('User ID is required in params');
                  }
                const existingUser = await User.findOne({ where: { id: req.params.id }, raw: true });
                if (existingUser && existingUser.email !== value) {
                  const user = await User.findOne({ where: { email: value }, raw: true });
                  if (user) {
                    throw new Error('Email already in use');
                  }
                }
              },
        }
    },
    phoneNumber: {
        in: 'body',
        exists: {
            errorMessage: 'Phone number is required'
        }
    },
    dateOfJoining: {
        in: 'body',
        exists: {
            errorMessage: 'Date of joining is required'
        },
        isDate: {
            errorMessage: 'Invalid date of joining'
        },
    },
    roleId: {
        in: 'body',
        exists: {
            errorMessage: 'Role is required'
        },
        isInt: {
            errorMessage: 'Role must be an integer'
        }
    },
    accountStatus: {
        in: 'body',
        exists: {
            errorMessage: 'Account status is required'
        },
        isString: {
            errorMessage: 'Account status must be a string'
        },
    }
};


export const deleteUserValidator: Schema = {
    id: {
        in: 'params',
        exists: {
            errorMessage: 'User id is required'
        },
        isInt: {
            errorMessage: 'User id must be an integer'
        }
    }
};