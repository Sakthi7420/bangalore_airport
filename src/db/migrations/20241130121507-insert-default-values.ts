import { QueryInterface, QueryTypes } from 'sequelize';

// Define types for roles and permissions based on their schema
interface Role {
  id: number;
  name: string;
  description: string;
}

interface Permission {
  id: number;
  action: string;
  description: string;
}

export async function up(queryInterface: QueryInterface): Promise<void> {
  // Insert roles into the Roles table
  await queryInterface.bulkInsert('Roles', [
    { name: 'admin', description: 'Administrator role' },
    { name: 'sales', description: 'Salesperson role' },
    { name: 'trainer', description: 'Trainer role' },
    { name: 'trainee', description: 'Trainee role' }
  ]);

  // Insert permissions into the Permissions table
  await queryInterface.bulkInsert('Permissions', [
    { action: 'CreateRole', description: 'Create a new role' },
    { action: 'CreatePermission', description: 'Create a new permission' },
    { action: 'UpdateRole', description: 'Update an existing role' },
    { action: 'UpdatePermission', description: 'Update an existing permission' },
    { action: 'DeleteRole', description: 'Delete a role' },
    { action: 'DeletePermission', description: 'Delete a permission' },
    { action: 'GetRole', description: 'Get details of a role' },
    { action: 'GetPermission', description: 'Get details of a permission' }
  ]);

  // Retrieve all roles and permissions using queryInterface.sequelize.query()
  const roles = await queryInterface.sequelize.query('SELECT * FROM Roles', {
    type: QueryTypes.SELECT
  });

  const permissions = await queryInterface.sequelize.query('SELECT * FROM Permissions', {
    type: QueryTypes.SELECT
  });

  // Explicitly type roles and permissions as the correct types
  const typedRoles = roles as Role[];
  const typedPermissions = permissions as Permission[];

  const rolePermissions = [];

  // Step 3: Map admin to all permissions
  for (const role of typedRoles) {
    for (const permission of typedPermissions) {
      if (role.name === 'admin') {
        rolePermissions.push({
          roleId: role.id,
          action: permission.action,
        });
      }
    }
  }

  rolePermissions.push({
    roleId: 2,
    action: 'GetRole',
  });

  rolePermissions.push({
    roleId: 3,
    action: 'GetPermission',
  });

  // Insert role-permission mappings into RolePermissions table
  await queryInterface.bulkInsert('RolePermissions', rolePermissions);

  // Insert a default user with the 'admin' role
  await queryInterface.bulkInsert('Users', [
    {
      firstName: 'Ram',
      lastName: 'Admin',
      email: 'ram@gwc.ai',
      password: '$2b$10$QapWKNNihqtqiFLeLU/eXOhRCD4vpMbULwzf0fV15hze8FnfT8DQ6', // example hashed password
      roleId: 1, // Assuming the admin role has id = 1
      accountStatus: 'active'
    }
  ]);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Code to reverse the changes (if needed) in case of rollback
}
