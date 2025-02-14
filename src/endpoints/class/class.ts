
import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    classValidator,
    updateClassValidator,
    deleteClassValidator
} from "./class.validator";
import {
    getClassHandler,
    createClassHandler,
    getClassByIdHandler,
    updateClassHandler,
    deleteClassHandler,
    getClassByModuleIdHandler
} from "./class.handler";
import { checkPermission } from "middleware";

export const createClassEndpoint = new Endpoint({
    path: '/class',
    method: EndpointMethod.POST,
    handler: createClassHandler,
    authType: EndpointAuthType.JWT,
    validator: classValidator,
    middleware: [checkPermission('CreateClass')]
});

export const getClassByIdEndpoint = new Endpoint({
    path: '/class/:id',
    method: EndpointMethod.GET,
    handler: getClassByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetClass')]
});

export const getClassByModuleIdEndpoint = new Endpoint({
    path: '/classbyModule/:id',
    method: EndpointMethod.GET,
    handler: getClassByModuleIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetClass')]
});

export const getClassEndpoint = new Endpoint({
    path: '/class',
    method: EndpointMethod.GET,
    handler: getClassHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetClass')]
});

export const updateClassEndpoint = new Endpoint({
    path: '/class/:id',
    method: EndpointMethod.PUT,
    handler: updateClassHandler,
    authType: EndpointAuthType.JWT,
    validator: updateClassValidator,
    middleware: [checkPermission('UpdateClass')]
});

export const deleteClassEndpoint = new Endpoint({
    path: '/class/:id',
    method: EndpointMethod.DELETE,
    handler: deleteClassHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteClassValidator,
    middleware: [checkPermission('DeleteClass')]
});
