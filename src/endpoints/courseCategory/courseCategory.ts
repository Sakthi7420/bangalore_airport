import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseCategoryValidator } from "./courseCategory.validator";
import {
    courseCategoryHandler,
    getCategoryByIdHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from './courseCategory.handler';

export const createCategoryEndpoint = new Endpoint({
    path: '/createcourse-category',
    method: EndpointMethod.POST,
    handler: courseCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: courseCategoryValidator
});

export const getCategoryByIdEndpoint = new Endpoint({
    path: '/getcoursecategory/:id',
    method: EndpointMethod.GET,
    handler: getCategoryByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const getCategoryEndpoint = new Endpoint({
    path: '/getcategory',
    method: EndpointMethod.GET,
    handler: getCategoriesHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateCategoryEndpoint = new Endpoint({
    path: '/updatecategory/:id',
    method: EndpointMethod.PUT,
    handler: updateCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: courseCategoryValidator
});

export const deleteCategoryHandlerEndpoint = new Endpoint({
    path: '/deletecategory/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
})