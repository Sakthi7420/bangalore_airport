import { Endpoint, EndpointMethod, EndpointAuthType } from "@gwcdata/node-server-engine";
import { courseCategoryValidator } from "./courseCategory.validator";
import { 
    courseCategoryHandler,
    getCategoryByIdHandler,
    updateCategoryHandler,
    deleteCategoryHandler
} from './courseCategory.handler';

export const courseCategoryEndpoint = new Endpoint({
    path: '/auth/createcourse-category',
    method: EndpointMethod.POST,
    handler: courseCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: courseCategoryValidator
});

export const getCategoryByIdEndpoint = new Endpoint({
    path: '/auth/getcategory/:id',
    method: EndpointMethod.GET,
    handler: getCategoryByIdHandler,
    authType: EndpointAuthType.NONE,
    validator: {}
});

export const updateCategoryEndpoint = new Endpoint({
    path: '/auth/updatecategory/:id',
    method: EndpointMethod.PUT,
    handler: updateCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: courseCategoryValidator
});

export const deleteCategoryHandlerEndpoint = new Endpoint({
    path: '/auth/deletecategory/:id',
    method: EndpointMethod.DELETE,
    handler: deleteCategoryHandler,
    authType: EndpointAuthType.JWT,
    validator: {}
})