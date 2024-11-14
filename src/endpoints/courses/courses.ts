import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseValidator } from "./courses.validator";
import { 
    createCourseHandler, 
    getCourseByIdHandler, 
    updateCourseHandler, 
    deleteCourseHandler 
} from './courses.handler';


export const createCourseEndpoint = new Endpoint({
    path: '/auth/createcourse',
    method: EndpointMethod.POST,
    handler: createCourseHandler,
    authType: EndpointAuthType.ADMIN,
    authParams: { permission: 'admin:create'},
    validator: courseValidator
});

export const getCourseEndPoint = new Endpoint({
    path: '/auth/getcourses/:id',
    method: EndpointMethod.GET,
    handler: getCourseByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateCourseEndpoint = new Endpoint({
    path: '/auth/updatecourse/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseHandler,
    authType: EndpointAuthType.ADMIN,
    authParams: { permission: 'admin:update'},
    validator: courseValidator
});

export const deleteCourseHandlerEndpoint = new Endpoint({
    path: '/auth/deletecourse/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseHandler,
    authType: EndpointAuthType.ADMIN,
    authParams: { permission: 'admin:delete'},
    validator: {}
});
