import { Endpoint, EndpointMethod, EndpointAuthType } from "node-server-engine";
import { createCompanyInfoValidator, updateCompanyInfoValidator, deleteCompanyInfoValidator } from "./companyInfo.validator";
import {
    getAllCompanyInfoHandler,
    createCourseCategoryHandler,
    getCompanyInfoByIdHandler,
    updateCompanyInfoHandler,
    deleteCompanyInfoHandler
} from './companyInfo.handler';
import { checkPermission } from "middleware";

export const createCompanyInfoEndpoint = new Endpoint({
    path: '/companyinfo',
    method: EndpointMethod.POST,
    handler: createCourseCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: createCompanyInfoValidator,
    middleware: [checkPermission('CreateCompanyInfo')]
});

export const getCompanyInfoByIdEndpoint = new Endpoint({
    path: '/companyinfo/:id',
    method: EndpointMethod.GET,
    handler: getCompanyInfoByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    middleware: [checkPermission('GetCompanyInfo')]
});

export const getCompanyInfoEndpoint = new Endpoint({
    path: '/companyinfo',
    method: EndpointMethod.GET,
    handler: getAllCompanyInfoHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    middleware: [checkPermission('GetCompanyInfo')]
});

export const updateCompanyInfoEndpoint = new Endpoint({
    path: '/companyinfo/:id',
    method: EndpointMethod.PUT,
    handler: updateCompanyInfoHandler,
    authType: EndpointAuthType.JWT,
    validator: updateCompanyInfoValidator,
    middleware: [checkPermission('UpdateCompanyInfo')]
});

export const deleteCompanyInfoHandlerEndpoint = new Endpoint({
    path: '/companyinfo/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCompanyInfoHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteCompanyInfoValidator,
    middleware: [checkPermission('DeleteCompanyInfo')]
})