import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseCategoryValidator, deleteCourseCategoryValidator, updateCourseCategoryValidator } from "./courseCategory.validator";
import {
    courseCategoryHandler,
    getCategoryByIdHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from './courseCategory.handler';
import { checkPermission } from "middleware";

export const createCategoryEndpoint = new Endpoint({
    path: '/coursecategory',
    method: EndpointMethod.POST,
    handler: courseCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: courseCategoryValidator,
    middleware: [checkPermission('CreateCategory')]
});

export const getCategoryByIdEndpoint = new Endpoint({
    path: '/coursecategory/:id',
    method: EndpointMethod.GET,
    handler: getCategoryByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    // middleware: [checkPermission('GetCategory')]
});

export const getCategoryEndpoint = new Endpoint({
    path: '/coursecategory',
    method: EndpointMethod.GET,
    handler: getCategoriesHandler,
    authType: EndpointAuthType.NONE,
    validator: {},
    // middleware: [checkPermission('GetCategory')]
});

export const updateCategoryEndpoint = new Endpoint({
    path: '/coursecategory/:id',
    method: EndpointMethod.PUT,
    handler: updateCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: updateCourseCategoryValidator,
    middleware: [checkPermission('UpdateCategory')]
});

export const deleteCategoryHandlerEndpoint = new Endpoint({
    path: '/coursecategory/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: deleteCourseCategoryValidator,
    middleware: [checkPermission('DeleteCategory')]
})