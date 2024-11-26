import { Endpoint, EndpointMethod, EndpointAuthType } from '@gwcdata/node-server-engine';
import {
  logoutValidator,
  registerValidator,
  loginValidator,
  createUserValidator, 
  updateUserValidator
} from './auth.validator';
import { 
  registerHandler, 
  loginHandler, 
  logoutHandler, 
  getAllUsersHandler, 
  getUserByIdHandler,
  getUserDetailsHandler, 
  createUserHandler, 
  updateUserHandler, 
  deleteUserHandler } 
from './auth.handler';

export const registerEndpoint = new Endpoint({
  path: '/auth/register',
  method: EndpointMethod.POST,
  handler: registerHandler,
  authType: EndpointAuthType.NONE,
  validator: registerValidator
});

export const loginEndpoint = new Endpoint({
  path: '/auth/login',
  method: EndpointMethod.POST,
  handler: loginHandler,
  authType: EndpointAuthType.NONE,
  validator: loginValidator
});

export const logoutEndpoint = new Endpoint({
  path: '/auth/logout',
  method: EndpointMethod.POST,
  handler: logoutHandler,
  authType: EndpointAuthType.JWT,
  validator: logoutValidator
});


export const getUserEndpoint = new Endpoint({
  path: '/auth/users',
  method: EndpointMethod.GET,
  handler: getAllUsersHandler,
  authType: EndpointAuthType.JWT,
  validator: {}
});

export const getUserByIdEndpoint = new Endpoint({
  path: '/auth/users/:id',
  method: EndpointMethod.GET,
  handler: getUserByIdHandler,
  authType: EndpointAuthType.JWT,
  validator: {}
});

export const getUserDetailsByIdEndpoint = new Endpoint({
  path: '/auth/userDetails',
  method: EndpointMethod.GET,
  handler: getUserDetailsHandler,
  authType: EndpointAuthType.JWT,
  validator: {}
})

export const createUserEndpoint = new Endpoint({
  path: '/auth/create-users',
  method: EndpointMethod.POST,
  handler: createUserHandler,
  authType: EndpointAuthType.NONE,
  validator: createUserValidator
})

export const updateUserEndpoint = new Endpoint({
  path: '/auth/update-users/:id',
  method: EndpointMethod.PUT,
  handler: updateUserHandler,
  authType: EndpointAuthType.JWT,
  validator: updateUserValidator
})

export const deleteUserEndpoint = new Endpoint({
  path: '/auth/delete-users/:id',
  method: EndpointMethod.DELETE,
  handler: deleteUserHandler,
  authType: EndpointAuthType.JWT,
  validator: {}
})

