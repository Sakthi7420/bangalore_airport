import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import { createCourseValidator, updateCourseValidator, deleteCourseValidator } from "./courses.validator";
import {
    createCourseHandler,
    getCourseByIdHandler,
    getCourseHandler,
    updateCourseHandler,
    deleteCourseHandler
} from './courses.handler';
import { checkPermission } from 'middleware';


export const createCourseEndpoint = new Endpoint({
    path: '/course',
    method: EndpointMethod.POST,
    handler: createCourseHandler,
    authType: EndpointAuthType.NONE,
    validator: createCourseValidator,
    // middleware: [checkPermission('CreateCourse')]
});

export const getAllCourseEndPoint = new Endpoint({
    path: '/course',
    method: EndpointMethod.GET,
    handler: getCourseHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    // middleware: [checkPermission('GetCourse')]
});

export const getCourseByIdEndPoint = new Endpoint({
    path: '/course/:id',
    method: EndpointMethod.GET,
    handler: getCourseByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    middleware: [checkPermission('GetCourse')]
});

export const updateCourseEndpoint = new Endpoint({
    path: '/course/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: updateCourseValidator,
    middleware: [checkPermission('UpdateCourse')]
});

export const deleteCourseHandlerEndpoint = new Endpoint({
    path: '/course/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteCourseValidator,
    middleware: [checkPermission('DeleteCourse')]
});
