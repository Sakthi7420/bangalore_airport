import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    createAttendanceValidator,
    deleteAttendanceValidator,
    updateAttendanceValidator,
    getUserByIdValidator
} from './attendance.validator';
import {
    createAttendanceHandler,
    deleteAttendanceHandler,
    getAttendanceHandler,
    getAttendanceByIdHandler,
    updateAttendanceHandler
} from './attendance.handler';
import { checkPermission } from "middleware";

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
    validator: getUserByIdValidator,
    middleware: [checkPermission('GetAttendance')]
});

export const getAttendanceByUserId = new Endpoint({
    path: '/attendance/:userId',
    method: EndpointMethod.GET,
    handler: getAttendanceByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
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

