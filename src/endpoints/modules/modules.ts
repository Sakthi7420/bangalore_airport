import { Endpoint, EndpointMethod, EndpointAuthType } from 'node-server-engine';
import {
  createModuleHandler,
  getModulesHandler,
  updateModuleHandler,
  deleteModuleHandler,
} from './modules.handler';
import {
  createModuleValidator,
  updateModuleValidator,
  deleteModuleValidator,
} from './modules.validator';
import { checkPermission } from 'middleware';

export const createModuleEndpoint = new Endpoint({
  path: '/module',
  method: EndpointMethod.POST,
  handler: createModuleHandler,
  authType: EndpointAuthType.JWT,
  validator: createModuleValidator,
  middleware: [checkPermission('CreateModule')],
});

export const getModulesEndpoint = new Endpoint({
  path: '/module',
  method: EndpointMethod.GET,
  handler: getModulesHandler,
  authType: EndpointAuthType.NONE,
  validator: {},
});

export const updateModuleEndpoint = new Endpoint({
  path: '/module/:id',
  method: EndpointMethod.PUT,
  handler: updateModuleHandler,
  authType: EndpointAuthType.JWT,
  validator: updateModuleValidator,
  middleware: [checkPermission('UpdateModule')],
});

export const deleteModuleEndpoint = new Endpoint({
  path: '/module/:id',
  method: EndpointMethod.DELETE,
  handler: deleteModuleHandler,
  authType: EndpointAuthType.JWT,
  validator: deleteModuleValidator,
  middleware: [checkPermission('DeleteModule')],
});
