import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseDetailsValidator } from "./courseDetails.validator";
import {
    createCourseDetailsHandler,
    getCourseDetailsHandler,
    getCourseDetailsByIdHandler,
    updateCourseDetailsHandler,
    deleteCourseDetailsHandler
} from './courseDetails.handler'


export const createCourseDetailsEndpoint = new Endpoint({
    path: '/auth/create-coursedetails',
    method: EndpointMethod.POST,
    handler: createCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: courseDetailsValidator
});

export const getAllCourseDetailsEndpoint = new Endpoint({
    path: '/auth/get-coursedetails',
    method: EndpointMethod.GET,
    handler: getCourseDetailsHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getCourseDetailsByIdEndpoint = new Endpoint({
    path: '/auth/get-coursedetails/:id',
    method: EndpointMethod.GET,
    handler: getCourseDetailsByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});


export const updateCourseDetailsEndpoint = new Endpoint({
    path: '/auth/update-courseDetails/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: courseDetailsValidator
});


export const deleteCourseDetailsEndpoint = new Endpoint({
    path: '/auth/delete-courseDetails/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
});



