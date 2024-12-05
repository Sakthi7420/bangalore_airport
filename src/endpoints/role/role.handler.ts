import {
  EndpointHandler,
  EndpointAuthType,
  EndpointRequestType
} from '@gwcdata/node-server-engine';
import { Response } from 'express';
import { Role, Permission, RolePermission, Audit } from 'db';
import {
  ROLE_NOT_FOUND,
  ROLE_CREATION_ERROR,
  ROLE_UPDATE_ERROR,
  ROLE_DELETE_ERROR,
  PERMISSION_NOT_FOUND,
  PERMISSION_CREATION_ERROR,
  PERMISSION_UPDATE_ERROR,
  PERMISSION_DELETE_ERROR,
  ROLE_GET_ERROR
} from './role.const';

// Handler to get details of a specific role
export const getRoleDetailsHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { roleId } = req.params;

  try {
    // Fetch the role by roleId, including associated permissions
    const role = (
      await Role.findOne({
        where: { id: roleId }, // Filter by the roleId
        attributes: ['id', 'name', 'description'], // Select role attributes
        include: [
          {
            model: Permission,
            through: { attributes: [] }, // Exclude join table attributes
            attributes: ['action'] // Select permission attributes
          }
        ]
      })
    )?.toJSON();

    if (!role) {
      res.status(404).json({ message: 'Role not found' });
      return;
    }
    // Format the result to include permissions as an array of strings
    const formattedRole = {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions:
        role.permissions?.map((permission: any) => permission.action) || []
    };

    res.status(200).json(formattedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role details', error });
  }
};

// Handler to get all roles
export const getRolesHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'description'], // Select role attributes
      include: [
        {
          model: Permission,
          through: { attributes: [] }, // Exclude join table attributes
          attributes: ['action'] // Select permission attributes
        }
      ]
    });

    // Call .toJSON() for each role instance to extract plain object
    const formattedRoles = roles.map((role) => {
      const roleData = role.toJSON(); // Convert sequelize instance to plain object
      return {
        id: roleData.id,
        name: roleData.name,
        description: roleData.description,
        permissions:
          roleData.permissions?.map((permission: any) => permission.action) ||
          []
      };
    });

    res.status(200).json(formattedRoles);
  } catch (error) {
    res.status(500).json({ message: ROLE_GET_ERROR, error });
  }
};

// Handler to create a new role
export const createRoleHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { name, description, permissions } = req.body; // Changed to use actions (permissions array)
  const { user } = req; // Getting the authenticated user

  try {
    // Create the role
    const role = await Role.create({
      name,
      description,
      createdBy: user?.id
    });

    // If permissions (actions) are provided, associate them with the role
    if (permissions && permissions.length > 0) {
      // Loop through the permissions (actions) and associate them
      const rolePermissions = permissions.map((action: string) => ({
        roleId: role.id,
        action,
        createdBy: user?.id
      }));

      // Add the permissions to the join table with `createdBy` using bulkCreate
      await RolePermission.bulkCreate(rolePermissions);
    }

    // Create audit entry
    await Audit.create({
      entityType: 'Role',
      entityId: role.id,
      action: 'CREATE',
      newData: role,
      performedBy: user?.id
    });

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: ROLE_CREATION_ERROR, error });
  }
};

// Handler to update a role
export const updateRoleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, description, permissions } = req.body; // Now using actions (permissions)
  const { user } = req;

  try {
    // Find the existing role by primary key (id)
    const role = await Role.findByPk(id, {
      include: [Permission] // To fetch current permissions along with role
    });

    if (!role) {
      res.status(404).json({ message: ROLE_NOT_FOUND });
      return;
    }

    // Store the previous data values manually for audit
    const previousData = {
      name: role.name,
      description: role.description,
      permissions:
        role.permissions?.map((permission) => permission.action) || []
    };

    // Update role properties if provided in the request body
    role.name = name || role.name;
    role.description = description || role.description;
    role.updatedBy = user?.id;
    await role.save();

    // If permissions (actions) are provided, update the role's permissions
    if (permissions && permissions.length > 0) {
      // Remove existing permissions from the join table (RolePermissions)
      await RolePermission.destroy({
        where: { roleId: role.id }
      });

      // Map through the permissions (actions) and prepare data for bulk insert into RolePermissions
      const rolePermissions = permissions.map((action: string) => ({
        roleId: role.id,
        action, // Using action as permissionId
        createdBy: user?.id
      }));

      // Add the new permissions to the role
      await RolePermission.bulkCreate(rolePermissions);
    }

    // Create audit entry for update
    await Audit.create({
      entityType: 'Role',
      entityId: role.id,
      action: 'UPDATE',
      oldData: previousData,
      newData: role,
      performedBy: user?.id
    });
    res.status(200).json({ message: 'Role updated successfully', role });
  } catch (error) {
    res.status(500).json({ message: ROLE_UPDATE_ERROR, error });
  }
};

// Handler to delete a role
export const deleteRoleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { user } = req;

  try {
    const role = await Role.findByPk(id);
    if (!role) {
      res.status(404).json({ message: ROLE_NOT_FOUND });
      return;
    }

    // Create audit entry for delete
    await Audit.create({
      entityType: 'Role',
      entityId: role.id,
      action: 'DELETE',
      oldData: role, // Old data before deletion
      performedBy: user?.id
    });

    await role.destroy();
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: ROLE_DELETE_ERROR, error });
  }
};

// Handler to create a new permission
export const createPermissionHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { action } = req.body;
  const { user } = req;

  try {
    const permission = await Permission.create({ action, createdBy: user?.id });

    // Create audit entry for permission creation
    await Audit.create({
      entityType: 'Permission',
      entityId: permission.id,
      action: 'CREATE',
      newData: permission,
      performedBy: user?.id
    });

    res
      .status(201)
      .json({ message: 'Permission created successfully', permission });
  } catch (error) {
    res.status(500).json({ message: PERMISSION_CREATION_ERROR, error });
  }
};

// Handler to get all permissions
export const getPermissionsHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json({ permissions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching permissions', error });
  }
};

// Handler to update a permission
export const updatePermissionHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { action } = req.params;
  const { user } = req;

  try {
    const permission = await Permission.findByPk(action);
    if (!permission) {
      res.status(404).json({ message: PERMISSION_NOT_FOUND });
      return;
    }

    // Store the previous data values manually
    const previousData = {
      action: permission.action
    };

    permission.action = action || permission.action;
    permission.updatedBy = user?.id;
    await permission.save();

    // Create audit entry for permission update
    await Audit.create({
      entityType: 'Permission',
      entityId: permission.id,
      action: 'UPDATE',
      oldData: previousData,
      newData: permission,
      performedBy: user?.id
    });

    res
      .status(200)
      .json({ message: 'Permission updated successfully', permission });
  } catch (error) {
    res.status(500).json({ message: PERMISSION_UPDATE_ERROR, error });
  }
};

// Handler to delete a permission
export const deletePermissionHandler: EndpointHandler<
  EndpointAuthType.JWT
> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {
  const { action } = req.params;
  const { user } = req;

  try {
    const permission = await Permission.findByPk(action);
    if (!permission) {
      res.status(404).json({ message: PERMISSION_NOT_FOUND });
      return;
    }

    // Create audit entry for permission delete
    await Audit.create({
      entityType: 'Permission',
      entityId: permission.id,
      action: 'DELETE',
      oldData: permission, // Old data before deletion
      performedBy: user?.id
    });

    await permission.destroy();
    res.status(200).json({ message: 'Permission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: PERMISSION_DELETE_ERROR, error });
  }
};
