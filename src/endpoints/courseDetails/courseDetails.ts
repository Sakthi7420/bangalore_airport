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
    path: '/create-coursedetails',
    method: EndpointMethod.POST,
    handler: createCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: courseDetailsValidator
});

export const getAllCourseDetailsEndpoint = new Endpoint({
    path: '/get-coursedetails',
    method: EndpointMethod.GET,
    handler: getCourseDetailsHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getCourseDetailsByIdEndpoint = new Endpoint({
    path: '/get-coursedetails/:id',
    method: EndpointMethod.GET,
    handler: getCourseDetailsByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});


export const updateCourseDetailsEndpoint = new Endpoint({
    path: '/update-coursedetails/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: courseDetailsValidator
});


export const deleteCourseDetailsEndpoint = new Endpoint({
    path: '/delete-coursedetails/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
});



