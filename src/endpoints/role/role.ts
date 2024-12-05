import { Endpoint, EndpointMethod, EndpointAuthType } from '@gwcdata/node-server-engine';
import {
  createRoleValidator,
  updateRoleValidator,
  deleteRoleValidator,
  createPermissionValidator,
  updatePermissionValidator,
  deletePermissionValidator
} from './role.validator';
import {
  createRoleHandler,
  getRolesHandler,
  updateRoleHandler,
  deleteRoleHandler,
  createPermissionHandler,
  getPermissionsHandler,
  updatePermissionHandler,
  deletePermissionHandler,
  getRoleDetailsHandler
} from './role.handler';
import { checkPermission } from 'middleware';

export const getRoleDetailsEndpoint = new Endpoint({
  path: '/roles/:roleId',
  method: EndpointMethod.GET,
  handler: getRoleDetailsHandler,
  authType: EndpointAuthType.JWT,
  validator: {},
  middleware: [checkPermission('GetRole')] 
});

export const getRolesEndpoint = new Endpoint({
  path: '/roles',
  method: EndpointMethod.GET,
  handler: getRolesHandler,
  authType: EndpointAuthType.JWT,
  validator: {},
  middleware: [checkPermission('GetRole')]
});

export const createRoleEndpoint = new Endpoint({
  path: '/roles',
  method: EndpointMethod.POST,
  handler: createRoleHandler,
  authType: EndpointAuthType.NONE,
  validator: createRoleValidator,
  // middleware: [checkPermission('CreateRole')]
});

export const updateRoleEndpoint = new Endpoint({
  path: '/roles/:id',
  method: EndpointMethod.PUT,
  handler: updateRoleHandler,
  authType: EndpointAuthType.JWT,
  validator: updateRoleValidator,
  middleware: [checkPermission('UpdateRole')]
});

export const deleteRoleEndpoint = new Endpoint({
  path: '/roles/:id',
  method: EndpointMethod.DELETE,
  handler: deleteRoleHandler,
  authType: EndpointAuthType.JWT,
  validator: deleteRoleValidator,
  middleware: [checkPermission('DeleteRole')]
});

export const getPermissionsEndpoint = new Endpoint({
  path: '/permissions',
  method: EndpointMethod.GET,
  handler: getPermissionsHandler,
  authType: EndpointAuthType.JWT,
  validator: {},
  middleware: [checkPermission('GetPermission')]
});

export const createPermissionEndpoint = new Endpoint({
  path: '/permissions',
  method: EndpointMethod.POST,
  handler: createPermissionHandler,
  authType: EndpointAuthType.NONE,
  validator: createPermissionValidator,
  // middleware: [checkPermission('CreatePermission')]
});

export const updatePermissionEndpoint = new Endpoint({
  path: '/permissions/:action',
  method: EndpointMethod.PUT,
  handler: updatePermissionHandler,
  authType: EndpointAuthType.JWT,
  validator: updatePermissionValidator,
  middleware: [checkPermission('UpdatePermission')]
});

export const deletePermissionEndpoint = new Endpoint({
  path: '/permissions/:action',
  method: EndpointMethod.DELETE,
  handler: deletePermissionHandler,
  authType: EndpointAuthType.JWT,
  validator: deletePermissionValidator,
  middleware: [checkPermission('DeletePermission')]
});
