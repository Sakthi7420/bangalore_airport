import { Schema } from 'express-validator';

export const createRoleValidator: Schema = {
  name: {
    in: 'body',
    exists: { errorMessage: 'Role name is required' },
    isLength: {
      errorMessage: 'Role name must be at least 3 characters long',
      options: { min: 3 }
    }
  },
  description: {
    in: 'body',
    optional: true,
    isLength: {
      errorMessage: 'Description must be at least 5 characters long',
      options: { min: 5 }
    }
  }
};

export const updateRoleValidator: Schema = {
  id: {
    in: 'params',
    isInt: { errorMessage: 'Role ID must be an integer' },
    toInt: true
  },
  ...createRoleValidator // Reusing fields from createRoleValidator
};

export const deleteRoleValidator: Schema = {
  id: {
    in: 'params',
    isInt: { errorMessage: 'Role ID must be an integer' },
    toInt: true
  }
};

export const assignPermissionsValidator: Schema = {
  id: {
    in: 'params',
    isInt: { errorMessage: 'Role ID must be an integer' },
    toInt: true
  },
  permissionIds: {
    in: 'body',
    exists: { errorMessage: 'Permission IDs are required' },
    isArray: { errorMessage: 'Permission IDs must be an array' }
  }
};

export const createPermissionValidator: Schema = {
  // name: {
  //   in: 'body',
  //   exists: { errorMessage: 'Permission name is required' },
  //   isLength: {
  //     errorMessage: 'Permission name must be at least 3 characters long',
  //     options: { min: 3 }
  //   }
  // },
  resource: {
    in: 'body',
    optional: true,
    isLength: {
      errorMessage: 'Description must be at least 5 characters long',
      options: { min: 1 }
    }
  }
};

export const updatePermissionValidator: Schema = {
  id: {
    in: 'params',
    isInt: { errorMessage: 'Permission ID must be an integer' },
    toInt: true
  },
  ...createPermissionValidator // Reusing fields from createPermissionValidator
};

export const deletePermissionValidator: Schema = {
  id: {
    in: 'params',
    isInt: { errorMessage: 'Permission ID must be an integer' },
    toInt: true
  }
};

// Validator for getting permissions
export const getPermissionsValidator: Schema = {
  // No specific query parameters needed for this case, but can be expanded
};
