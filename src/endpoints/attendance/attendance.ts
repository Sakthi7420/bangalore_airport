import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    createAttendanceValidator,
    deleteAttendanceValidator
} from './attendance.validator';
import {
    createAttendanceHandler,
    deleteAttendanceHandler,
    getAttendanceHandler
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
    validator: {},
    middleware: [checkPermission('GetAttendance')]
});

export const deleteAttendanceEndpoint = new Endpoint({
    path: '/attendance',
    method: EndpointMethod.POST,
    handler: deleteAttendanceHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteAttendanceValidator,
    middleware: [checkPermission('DeleteAttendance')]
});

