import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { trainingPlansValidator } from "./trainingPlans.validator";
import {
    getTrainingPlanHandler,
    createTrainingPlanHandler,
    getTraininPlanByIdHandler,
    updateTrainingPlanHandler,
    deleteTrainingPlanHandler
} from './trainingPlans.handler';

export const createTrainingPlanEndpoint = new Endpoint({
    path: '/trainingplan',
    method: EndpointMethod.POST,
    handler: createTrainingPlanHandler,
    authType: EndpointAuthType.JWT,
    validator: trainingPlansValidator
});

export const getAllTrainingPlanEndpoint = new Endpoint({
    path: '/trainingplan',
    method: EndpointMethod.GET,
    handler: getTrainingPlanHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getTrainingPlanByIdEndpoint = new Endpoint({
    path: '/trainingplan/:id',
    method: EndpointMethod.GET,
    handler: getTraininPlanByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateTrainingPlanEndpoint = new Endpoint({
    path: '/trainingplan/:id',
    method: EndpointMethod.PUT,
    handler: updateTrainingPlanHandler,
    authType: EndpointAuthType.JWT,
    validator: trainingPlansValidator
});

export const deleteTrainingPlanEndpoint = new Endpoint({
    path: '/trainingplan/:id',
    method: EndpointMethod.DELETE,
    handler: deleteTrainingPlanHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
});


