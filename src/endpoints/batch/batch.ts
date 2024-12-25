import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import { batchValidator, updateBatchValidator, deleteBatchValidator } from "./batch.validator";
import {
    getBatchHandler,
    BatchHandler,
    getBatchByIdHandler,
    updateBatchHandler,
    deleteBatchHandler
} from './Batch.handler'
import { checkPermission } from "middleware";

export const createBatchEndpoint = new Endpoint({
    path: '/batch',
    method: EndpointMethod.POST,
    handler: BatchHandler,
    authType: EndpointAuthType.NONE,
    validator: batchValidator,
    // middleware: [checkPermission('CreateBatch')]
});

export const getBatchByIdEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.GET,
    handler: getBatchByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    // middleware: [checkPermission('GetBatch')]
});

export const getBatchEndpoint = new Endpoint({
    path: '/batch',
    method: EndpointMethod.GET,
    handler: getBatchHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    // middleware: [checkPermission('GetBatch')]
});

export const updateBatchEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.PUT,
    handler: updateBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: updateBatchValidator,
    // middleware: [checkPermission('UpdateBatch')]
});

export const deleteBatchHandlerEndpoint = new Endpoint({
    path: '/batch/:id',
    method: EndpointMethod.DELETE,
    handler: deleteBatchHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteBatchValidator,
    // middleware: [checkPermission('DeleteBatch')]
})




