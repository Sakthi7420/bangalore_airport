import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    createAttendanceValidator,
    deleteAttendanceValidator,
    updateAttendanceValidator,
    getUserByIdValidator,
    createAttendanceFileValidator,
    updateAttendanceFileValidator,
    deleteAttendanceFileValidator,
    getAttendanceFileValidator
} from './attendance.validator';
import {
    createAttendanceHandler,
    deleteAttendanceHandler,
    getAttendanceHandler,
    getAttendanceByIdHandler,
    updateAttendanceHandler,
    createAttendanceFileHandler,
    updateAttendanceFileHandler,
    getAttendanceFileByIdHandler,
    deleteAttendanceFileHandler,
    getAttendanceFileHandler
} from './attendance.handler';
import { checkPermission } from "middleware";

//AttendanceFileTable Endpoints
export const createAttendanceFileEndpoint = new Endpoint({
    path: '/attendance-file',
    method: EndpointMethod.POST,
    handler: createAttendanceFileHandler,
    authType: EndpointAuthType.JWT,
    validator: createAttendanceFileValidator,
    middleware: [checkPermission('CreateAttendanceFile')]
});

export const getAttendanceFileEndpoint = new Endpoint({
    path: '/attendance-file',
    method: EndpointMethod.GET,
    handler: getAttendanceFileHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetAttendanceFile')]
});

export const getAttendanceFileByIdEndpoint = new Endpoint({
    path: '/attendance-file/:id',
    method: EndpointMethod.GET,
    handler: getAttendanceFileByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: getAttendanceFileValidator,
    middleware: [checkPermission('GetAttendanceFile')]
});

export const updateAttendanceFileEndpoint = new Endpoint({
    path: '/attendance-file/:id',
    method: EndpointMethod.PUT,
    handler: updateAttendanceFileHandler,
    authType: EndpointAuthType.JWT,
    validator: updateAttendanceFileValidator,
    middleware: [checkPermission('UpdateAttendanceFile')]
});

export const deleteAttendanceFileEndpoint = new Endpoint({
    path: '/attendance-file/:id',
    method: EndpointMethod.DELETE,
    handler: deleteAttendanceFileHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteAttendanceFileValidator,
    middleware: [checkPermission('DeleteAttendanceFile')]
});


//AttendanceTable Endpoints
export const createAttendanceEndpoint = new Endpoint({
    path: '/attendance',
    method: EndpointMethod.POST,
    handler: createAttendanceHandler,
    authType: EndpointAuthType.JWT,
    validator: createAttendanceValidator,
    middleware: [checkPermission('CreateAttendance')]
});

export const getAttendanceEndpoint = new Endpoint({
    path: '/attendance',
    method: EndpointMethod.GET,
    handler: getAttendanceHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetAttendance')]
});

export const getAttendanceByUserId = new Endpoint({
    path: '/attendance/:userId',
    method: EndpointMethod.GET,
    handler: getAttendanceByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: getUserByIdValidator,
    middleware: [checkPermission('GetAttendance')]
});

export const updateAttendanceEndpoint = new Endpoint({
    path: '/attendance/:id',
    method: EndpointMethod.PUT,
    handler: updateAttendanceHandler,
    authType: EndpointAuthType.JWT,
    validator: updateAttendanceValidator,
    middleware: [checkPermission('UpdateAttendance')]
});

export const deleteAttendanceEndpoint = new Endpoint({
    path: '/attendance/:id',
    method: EndpointMethod.DELETE,
    handler: deleteAttendanceHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteAttendanceValidator,
    middleware: [checkPermission('DeleteAttendance')]
});

