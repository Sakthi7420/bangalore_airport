import { QueryInterface, DataTypes, literal } from 'sequelize';


export async function up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Admin',
        description:
          'Has full access to manage the application, including users, roles, permissions, Scheduling Training sessions and view User Activity.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sales',
        description:
          "Can manage team member's, manage payment details and Onboard trainees",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trainer',
        description: 'Assign tasks, track submissions, Conduct interactive live sessions and Access reports for trainee progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trainee',
        description: 'View assigned training plans, Join live sessions via Microsoft Teams link and Submit tasks',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    //permission
    await queryInterface.bulkInsert('Permissions', [
        {
          action: 'Manage Users',
          resource: 'Users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: 'Manage Roles',
          resource: 'Roles',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          action: 'Manage Permissions',
          resource: 'Permissions',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // {
        //   action: 'View All ',
        //   resource: 'Leave Requests',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   action: 'Approve/Reject Leave Requests',
        //   resource: 'Leave Requests',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   action: 'View Team Leave Requests',
        //   resource: 'Leave Requests',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   action: 'Apply for Leave',
        //   resource: 'Leave Requests',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   action: 'View Leave Balance',
        //   resource: 'Leave Balance',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   action: 'Generate Reports',
        //   resource: 'Reports',
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }
      ]);

      await queryInterface.bulkInsert('RolePermissions', [
        {
          roleId: 1, // Admin
          permissionId: 1, // Manage Users
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          roleId: 1, // Admin
          permissionId: 2, // Manage Roles
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          roleId: 1, // Admin
          permissionId: 3, // Manage Permissions
          createdAt: new Date(),
          updatedAt: new Date()
        },
        // {
        //   roleId: 1, // Admin
        //   permissionId: 4, // View All Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 1, // Admin
        //   permissionId: 5, // Approve/Reject Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 2, // Manager
        //   permissionId: 6, // View Team Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 2, // Manager
        //   permissionId: 5, // Approve/Reject Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 3, // Employee
        //   permissionId: 7, // Apply for Leave
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 3, // Employee
        //   permissionId: 8, // View Leave Balance
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 4, // HR
        //   permissionId: 1, // Manage Users
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 4, // HR
        //   permissionId: 4, // View All Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // },
        // {
        //   roleId: 4, // HR
        //   permissionId: 5, // Approve/Reject Leave Requests
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }
      ]);
    }
    
    export async function down(queryInterface: QueryInterface): Promise<void> {
      // Remove all data from RolePermissions table
      await queryInterface.bulkDelete('RolePermissions', {}, {});
    
      // Remove all data from Permissions table
      await queryInterface.bulkDelete('Permissions', {}, {});
    
      // Remove all data from Roles table
      await queryInterface.bulkDelete('Roles', {}, {});
    }
    