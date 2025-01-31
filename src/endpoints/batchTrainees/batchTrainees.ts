import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    getBatchIdsByTraineeIdHandler,
} from "./batchTrainees.handler";
import { checkPermission } from "middleware";

export const getBatchIdsByTraineeIdEndpoint = new Endpoint({
    path: '/batchTrainee/:id',
    method: EndpointMethod.GET,
    handler: getBatchIdsByTraineeIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetBatch')]
});