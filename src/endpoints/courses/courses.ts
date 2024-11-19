import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseValidator } from "./courses.validator";
import { 
    createCourseHandler, 
    getCourseByIdHandler,
    getCourseHandler, 
    updateCourseHandler, 
    deleteCourseHandler 
} from './courses.handler';


export const createCourseEndpoint = new Endpoint({
    path: '/auth/createcourse',
    method: EndpointMethod.POST,
    handler: createCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: courseValidator
});

export const getAllCourseEndPoint = new Endpoint({
    path: '/auth/getallcourse',
    method: EndpointMethod.GET,
    handler: getCourseHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getCourseByIdEndPoint = new Endpoint({
    path: '/auth/getcourse/:id',
    method: EndpointMethod.GET,
    handler: getCourseByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateCourseEndpoint = new Endpoint({
    path: '/auth/updatecourse/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: courseValidator
});

export const deleteCourseHandlerEndpoint = new Endpoint({
    path: '/auth/deletecourse/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
});
