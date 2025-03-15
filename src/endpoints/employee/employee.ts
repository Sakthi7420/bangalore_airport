import { 
    Endpoint, 
    EndpointMethod, 
    EndpointAuthType 
} from "node-server-engine";
import { 
   CreateEmployeeValidator,
   GetEmployeeValidator 
} from "./employee.validator";
import {
   getAllEmployeeDetailsHandler,
   createEmployeeDetailsHandler,
   getEmployeeDetailsByIdHandler
} from './employee.handler';


export const createEmployeeEndpoint = new Endpoint({
    path: '/employee',
    method: EndpointMethod.POST,
    handler: createEmployeeDetailsHandler,
    authType: EndpointAuthType.NONE,
    validator: CreateEmployeeValidator
});

export const getAllEmployeeDetailsEndpoints = new Endpoint({
    path: '/employee',
    method: EndpointMethod.GET,
    handler: getAllEmployeeDetailsHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getEmployeeDetailsByIdEndpoint = new Endpoint({
    path: '/employee/:id',
    method: EndpointMethod.GET,
    handler: getEmployeeDetailsByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: GetEmployeeValidator
});