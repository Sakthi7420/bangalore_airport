import {
    EndpointHandler,
    EndpointAuthType,
    EndpointRequestType
  } from '@gwcdata/node-server-engine';
  import { Response } from 'express';
  import { Role, Permission, RolePermission, Audit } from 'db';
  
  // Handler to get all roles with pagination
  export const getRolesHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
  
    try {
      const { count, rows } = await Role.findAndCountAll({
        limit,
        offset
      });
  
      res.status(200).json({
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        roles: rows
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching roles', error });
    }
  };
  
  // Handler to create a new role
  export const createRoleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ) => {
    const { name, description } = req.body;
    try {
      const role = await Role.create({
        name,
        description,
        // createdBy: req.user.id
      });
  
      // Create an audit entry
    //   await Audit.create({
    //     entityType: 'Role',
    //     entityId: role.id,
    //     action: 'CREATE',
    //     newData: role,
    //     performedBy: req.user.id
    //   });
  
      res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
      res.status(500).json({ message: 'Error creating role', error });
    }
  };
  
  // Handler to update a role
  export const updateRoleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
  
      // const previousData = { ...role.get() }; // Save previous data for audit
  
      await role.update({ name, description, updatedBy: req.user.id });
  
      // Create an audit entry
      // await Audit.create({
      //   entityType: 'Role',
      //   entityId: id,
      //   action: 'UPDATE',
      //   previousData,
      //   newData: { ...previousData, ...req.body, updatedBy: req.user.id },
      //   performedBy: req.user.id
      // });
  
      res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
      res.status(500).json({ message: 'Error updating role', error });
    }
  };
  
  // Handler to delete a role
  export const deleteRoleHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
  ) => {
    const { id } = req.params;
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
  
      // const previousData = { ...role.get() }; // Save previous data for audit
  
      await role.destroy();
  
      // Create an audit entry
      // await Audit.create({
      //   entityType: 'Role',
      //   entityId: id,
      //   action: 'DELETE',
      //   previousData,
      //   performedBy: req.user.id
      // });
  
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting role', error });
    }
  };
  
  // Handler to assign permissions to a role
  export const assignPermissionsHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (req: EndpointRequestType[EndpointAuthType.JWT], res: Response) => {
    const { id } = req.params;
    const { permissionIds } = req.body;
  
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
        return;
      }
  
      // Clear existing permissions for the role
      await RolePermission.destroy({ where: { roleId: id } });
  
      // Assign new permissions
      const rolePermissions = permissionIds.map((permissionId: number) => ({
        roleId: id,
        permissionId,
        createdBy: req.user.id
      }));
  
      await RolePermission.bulkCreate(rolePermissions);
  
      // Create an audit entry
      // await Audit.create({
      //   entityType: 'Role',
      //   entityId: id,
      //   action: 'ASSIGN_PERMISSIONS',
      //   newData: { permissionIds },
      //   performedBy: req.user.id
      // });
  
      res.status(200).json({ message: 'Permissions assigned successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error assigning permissions', error });
    }
  };
  
  // Handler to get all permissions
  export const getPermissionsHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (req: EndpointRequestType[EndpointAuthType.JWT], res: Response) => {
    try {
      const permissions = await Permission.findAll({
        raw: true
      });
      res.status(200).json(permissions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching permissions', error });
    }
  };
  
  // Handler to create a new permission
  export const createPermissionHandler: EndpointHandler<
    EndpointAuthType
  > = async (req: EndpointRequestType[EndpointAuthType], res: Response) => {
    
    const { resource } = req.body;
    try {
      const permission = await Permission.create({
        resource,
        // createdBy: req.user.id
      });
  
    //   Create an audit entry
    //   await Audit.create({
    //     entityType: 'Permission',
    //     entityId: permission.id,
    //     action: 'CREATE',
    //     newData: permission,
    //     performedBy: req.user.id
    //   });
  
      res
        .status(201)
        .json({ message: 'Permission created successfully', permission });
    } catch (error) {
      res.status(500).json({ message: 'Error creating permission', error });
    }
  };
  
  // Handler to update a permission
  export const updatePermissionHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (req: EndpointRequestType[EndpointAuthType.JWT], res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const permission = await Permission.findByPk(id);
      if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
        return;
      }
  
      const previousData = { ...permission.get() }; // Save previous data for audit
  
      await permission.update({ name, description, updatedBy: req.user.id });
  
      // Create an audit entry
      await Audit.create({
        entityType: 'Permission',
        entityId: id,
        action: 'UPDATE',
        previousData,
        newData: { ...previousData, ...req.body, updatedBy: req.user.id },
        performedBy: req.user.id
      });
  
      res
        .status(200)
        .json({ message: 'Permission updated successfully', permission });
    } catch (error) {
      res.status(500).json({ message: 'Error updating permission', error });
    }
  };
  
  // Handler to delete a permission
  export const deletePermissionHandler: EndpointHandler<
    EndpointAuthType.JWT
  > = async (req: EndpointRequestType[EndpointAuthType.JWT], res: Response) => {
    const { id } = req.params;
    try {
      const permission = await Permission.findByPk(id);
      if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
        return;
      }
  
      const previousData = { ...permission.get() }; // Save previous data for audit
  
      await permission.destroy();
  
      // Create an audit entry
      await Audit.create({
        entityType: 'Permission',
        entityId: id,
        action: 'DELETE',
        previousData,
        performedBy: req.user.id
      });
  
      res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting permission', error });
    }
  };
  