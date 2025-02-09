import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import {
    assignmentCompletionValidator,
    updateAssignmentCompletionValidator,
    deleteAssignmentCompletionValidator
} from "./assignmentCompletion.validator";
import {
    getAssignmentCompletionHandler,
    createAssignmentCompletionHandler,
    getAssignmentCompletionByIdHandler,
    updateAssignmentCompletionHandler,
    deleteAssignmentCompletionHandler,
    getAssignmentCompletionByTraineeIdHandler
} from "./assignmentCompletion.handler";
import { checkPermission } from "middleware";

export const createAssignmentCompletionEndpoint = new Endpoint({
    path: '/assignment-completion',
    method: EndpointMethod.POST,
    handler: createAssignmentCompletionHandler,
    authType: EndpointAuthType.JWT,
    validator: assignmentCompletionValidator,
    middleware: [checkPermission('CreateAssignmentCompletion')]
});

export const getAssignmentCompletionByIdEndpoint = new Endpoint({
    path: '/assignment-completion/:id',
    method: EndpointMethod.GET,
    handler: getAssignmentCompletionByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetAssignmentCompletion')]
});

export const getAssignmentCompletionEndpoint = new Endpoint({
    path: '/assignment-completion',
    method: EndpointMethod.GET,
    handler: getAssignmentCompletionHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetAssignmentCompletion')]
});

export const getAssignmentCompletionByTraineeIdEndpoint = new Endpoint({
    path: '/assignment-completion-bytrainee/:id',
    method: EndpointMethod.GET,
    handler: getAssignmentCompletionByTraineeIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetAssignmentCompletion')]
});

export const updateAssignmentCompletionEndpoint = new Endpoint({
    path: '/assignment-completion/:id',
    method: EndpointMethod.PUT,
    handler: updateAssignmentCompletionHandler,
    authType: EndpointAuthType.JWT,
    validator: updateAssignmentCompletionValidator,
    middleware: [checkPermission('UpdateAssignmentCompletion')]
});

export const deleteAssignmentCompletionHandlerEndpoint = new Endpoint({
    path: '/assignment-completion/:id',
    method: EndpointMethod.DELETE,
    handler: deleteAssignmentCompletionHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteAssignmentCompletionValidator,
    middleware: [checkPermission('DeleteAssignmentCompletion')]
});
