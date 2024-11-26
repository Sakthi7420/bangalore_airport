import { Endpoint, EndpointMethod, EndpointAuthType } from '@gwcdata/node-server-engine';
import {
  createRoleValidator,
  updateRoleValidator,
  deleteRoleValidator,
  assignPermissionsValidator,
  createPermissionValidator,
  updatePermissionValidator,
  deletePermissionValidator,
  getPermissionsValidator
} from './role.validator';
import {
  createRoleHandler,
  getRolesHandler,
  updateRoleHandler,
  deleteRoleHandler,
  assignPermissionsHandler,
  createPermissionHandler,
  getPermissionsHandler,
  updatePermissionHandler,
  deletePermissionHandler
} from './role.handler';

export const getRolesEndpoint = new Endpoint({
  path: '/auth/roles',
  method: EndpointMethod.GET,
  handler: getRolesHandler,
  authType: EndpointAuthType.JWT,
  validator: {}
});

export const createRoleEndpoint = new Endpoint({
  path: '/auth/roles',
  method: EndpointMethod.POST,
  handler: createRoleHandler,
  authType: EndpointAuthType.JWT,
  validator: createRoleValidator
});

export const updateRoleEndpoint = new Endpoint({
  path: '/auth/roles/:id',
  method: EndpointMethod.PUT,
  handler: updateRoleHandler,
  authType: EndpointAuthType.JWT,
  validator: updateRoleValidator
});

export const deleteRoleEndpoint = new Endpoint({
  path: '/auth/roles/:id',
  method: EndpointMethod.DELETE,
  handler: deleteRoleHandler,
  authType: EndpointAuthType.JWT,
  validator: deleteRoleValidator
});

export const assignPermissionsEndpoint = new Endpoint({
  path: '/auth/roles/:id/permissions',
  method: EndpointMethod.PUT,
  handler: assignPermissionsHandler,
  authType: EndpointAuthType.JWT,
  validator: assignPermissionsValidator
});

export const getPermissionsEndpoint = new Endpoint({
  path: '/auth/permissions',
  method: EndpointMethod.GET,
  handler: getPermissionsHandler,
  authType: EndpointAuthType.JWT,
  validator: getPermissionsValidator
});

export const createPermissionEndpoint = new Endpoint({
  path: '/auth/permissions',
  method: EndpointMethod.POST,
  handler: createPermissionHandler,
  authType: EndpointAuthType.JWT,
  validator: createPermissionValidator
});

export const updatePermissionEndpoint = new Endpoint({
  path: '/auth/permissions/:id',
  method: EndpointMethod.PUT,
  handler: updatePermissionHandler,
  authType: EndpointAuthType.JWT,
  validator: updatePermissionValidator
});

export const deletePermissionEndpoint = new Endpoint({
  path: '/auth/permissions/:id',
  method: EndpointMethod.DELETE,
  handler: deletePermissionHandler,
  authType: EndpointAuthType.JWT,
  validator: deletePermissionValidator
});
