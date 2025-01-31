import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    batchModuleScheduleValidator,
    updateBatchModuleScheduleValidator,
    deleteBatchModuleScheduleValidator
} from './batchModuleSchedules.validator';
import {
    getBatchModuleScheduleHandler,
    getBatchModuleScheduleByIdHandler,
    createBatchModuleScheduleHandler,
    updateBatchModuleScheduleHandler,
    deleteBatchModuleScheduleHandler,
    getBatchModuleScheduleByBatchIdHandler
} from './batchModuleSchedules.handler';
import { checkPermission } from "middleware";

export const createBatchModuleScheduleEndpoint = new Endpoint({
  path: '/batchModuleSchedule',
  method: EndpointMethod.POST,
  handler: createBatchModuleScheduleHandler,
  authType: EndpointAuthType.JWT,
  validator: batchModuleScheduleValidator,
  middleware: [checkPermission('CreateBatchSchedule')]
});

export const getBatchModuleScheduleEndpoint = new Endpoint({
    path: '/batchModuleSchedule',
    method: EndpointMethod.GET,
    handler: getBatchModuleScheduleHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatchSchedule')]
});

export const getBatchModuleScheduleByIdEndpoint = new Endpoint({
    path: '/batchModuleSchedule/:id',
    method: EndpointMethod.GET,
    handler: getBatchModuleScheduleByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatchSchedule')]
});

export const getBatchModuleScheduleByBatchIdEndpoint = new Endpoint({
    path: '/batchModuleSchedulebybatch/:id',
    method: EndpointMethod.GET,
    handler: getBatchModuleScheduleByBatchIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatchSchedule')]
})

export const updateBatchModuleScheduleEndpoint = new Endpoint({
    path: '/batchModuleSchedule/:id',
    method: EndpointMethod.PUT,
    handler: updateBatchModuleScheduleHandler,
    authType: EndpointAuthType.JWT,
    validator: updateBatchModuleScheduleValidator,
    middleware: [checkPermission('UpdateBatchSchedule')]
});


export const deleteBatchModuleScheduleEndpoint = new Endpoint({
    path: '/batchModuleSchedule/:id',
    method: EndpointMethod.DELETE,
    handler: deleteBatchModuleScheduleHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteBatchModuleScheduleValidator,
    middleware: [checkPermission('DeleteBatchSchedule')]
});