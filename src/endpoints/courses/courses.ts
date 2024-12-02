import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { createCourseValidator, updateCourseValidator } from "./courses.validator";
import {
    createCourseHandler,
    getCourseByIdHandler,
    getCourseHandler,
    updateCourseHandler,
    deleteCourseHandler
} from './courses.handler';


export const createCourseEndpoint = new Endpoint({
    path: '/createcourse',
    method: EndpointMethod.POST,
    handler: createCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: createCourseValidator
});

export const getAllCourseEndPoint = new Endpoint({
    path: '/getallcourse',
    method: EndpointMethod.GET,
    handler: getCourseHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getCourseByIdEndPoint = new Endpoint({
    path: '/getcourse/:id',
    method: EndpointMethod.GET,
    handler: getCourseByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateCourseEndpoint = new Endpoint({
    path: '/updatecourse/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: updateCourseValidator
});

export const deleteCourseHandlerEndpoint = new Endpoint({
    path: '/deletecourse/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
});
