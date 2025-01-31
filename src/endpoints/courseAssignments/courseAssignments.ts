import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    createCourseAssignmentValidator,
    updateCourseAssignmentValidator,
    deleteCourseAssignmentValidator
} from './courseAssignments.validator';
import {
    getCourseAssignmentsHandler,
    getCourseAssignmentByIdHandler,
    createCourseAssignmentHandler,
    updateCourseAssignmentHandler,
    deleteCourseAssignmentHandler,
    getCourseAssignmentRecordsByBatchIdHandler
} from './courseAssignments.handler';
import { checkPermission } from "middleware";

export const createCourseAssignmentEndpoint = new Endpoint({
  path: '/courseAssignment',
  method: EndpointMethod.POST,
  handler: createCourseAssignmentHandler,
  authType: EndpointAuthType.JWT,
  validator: createCourseAssignmentValidator,
  middleware: [checkPermission('CreateCourseAssignment')]
});

export const getCourseAssignmentsEndpoint = new Endpoint({
    path: '/courseAssignment',
    method: EndpointMethod.GET,
    handler: getCourseAssignmentsHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetCourseAssignment')]
});

export const getCourseAssignmentRecordsByBatchIdEndpoint = new Endpoint({
    path: '/courseAssignmentRecords/:id',
    method: EndpointMethod.GET,
    handler: getCourseAssignmentRecordsByBatchIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetCourseAssignment')]
});

export const getCourseAssignmentByIdEndpoint = new Endpoint({
    path: '/courseAssignment/:id',
    method: EndpointMethod.GET,
    handler: getCourseAssignmentByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetCourseAssignment')]
});

export const updateCourseAssignmentEndpoint = new Endpoint({
    path: '/courseAssignment/:id',
    method: EndpointMethod.PUT,
    handler: updateCourseAssignmentHandler,
    authType: EndpointAuthType.JWT,
    validator: updateCourseAssignmentValidator,
    middleware: [checkPermission('UpdateCourseAssignment')]
});

export const deleteCourseAssignmentEndpoint = new Endpoint({
    path: '/courseAssignment/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCourseAssignmentHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteCourseAssignmentValidator,
    middleware: [checkPermission('DeleteCourseAssignment')]
});
