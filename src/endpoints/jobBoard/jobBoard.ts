import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import { createJobBoardValidator, updateJobBoardValidator, deleteJobBoardValidator } from "./jobBoard.validator";
import {
    createJobBoardHandler,
    getJobBoardByIdHandler,
    getAllJobBoardHandler,
    updateJobBoardHandler,
    deleteJobBoardHandler,
    getJobBoardByCompanyIdHandler,
} from './jobBoard.handler';
import { checkPermission } from 'middleware';

export const createJobBoardEndpoint = new Endpoint({
    path: '/job-board',
    method: EndpointMethod.POST,
    handler: createJobBoardHandler,
    authType: EndpointAuthType.JWT,
    validator: createJobBoardValidator,
    middleware: [checkPermission('CreateJobBoard')]
});

export const getAllJobBoardEndPoint = new Endpoint({
    path: '/job-board',
    method: EndpointMethod.GET,
    handler: getAllJobBoardHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetJobBoard')]
});

export const getJobBoardByIdEndPoint = new Endpoint({
    path: '/job-board/:id',
    method: EndpointMethod.GET,
    handler: getJobBoardByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetJobBoard')]
});

export const getJobBoardByCompanyIdEndPoint = new Endpoint({
    path: '/job-board-company/:id',
    method: EndpointMethod.GET,
    handler: getJobBoardByCompanyIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetJobBoard')]
});

export const updateJobBoardEndpoint = new Endpoint({
    path: '/job-board/:id',
    method: EndpointMethod.PUT,
    handler: updateJobBoardHandler,
    authType: EndpointAuthType.JWT,
    validator: updateJobBoardValidator,
    middleware: [checkPermission('UpdateJobBoard')]
});

export const deleteJobBoardEndpoint = new Endpoint({
    path: '/job-board/:id',
    method: EndpointMethod.DELETE,
    handler: deleteJobBoardHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteJobBoardValidator,
    middleware: [checkPermission('DeleteJobBoard')]
});

