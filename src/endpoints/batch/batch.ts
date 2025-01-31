import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import { createBatchValidator, updateBatchValidator, deleteBatchValidator } from "./batch.validator";
import {
    getBatchHandler,
    createBatchHandler,
    getBatchDetailsHandler,
    updateBatchHandler,
    deleteBatchHandler
} from "./batch.handler";
import { checkPermission } from "middleware";

export const createBatchEndpoint = new Endpoint({
    path: '/batch',
    method: EndpointMethod.POST,
    handler: createBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: createBatchValidator,
    middleware: [checkPermission('CreateBatch')]
});

export const getBatchByIdEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.GET,
    handler: getBatchDetailsHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatch')]
});

export const getBatchEndpoint = new Endpoint({
    path: '/batch',
    method: EndpointMethod.GET,
    handler: getBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatch')]
});

export const updateBatchEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.PUT,
    handler: updateBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: updateBatchValidator,
    middleware: [checkPermission('UpdateBatch')]
});

export const deleteBatchHandlerEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.DELETE,
    handler: deleteBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteBatchValidator,
    middleware: [checkPermission('DeleteBatch')]
})