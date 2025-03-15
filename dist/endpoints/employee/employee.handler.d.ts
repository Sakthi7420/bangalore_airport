import { EndpointAuthType, EndpointHandler } from 'node-server-engine';
export declare const getAllEmployeeDetailsHandler: EndpointHandler<EndpointAuthType>;
export declare const getEmployeeDetailsByIdHandler: EndpointHandler<EndpointAuthType>;
export declare const createEmployeeDetailsHandler: EndpointHandler<EndpointAuthType.NONE>;
