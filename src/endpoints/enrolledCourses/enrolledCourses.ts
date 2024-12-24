import { 
    Endpoint,
    EndpointAuthType,
    EndpointMethod, 
} 
from 'node-server-engine';
import {
    createEnrollCourse,
    updateEnrollCourse,
    deleteEnrollCourse
 } from './enrolledCourses.validator';
 import {
    createEnrolledCourseHandler,
    getAllEnrolledCoursesHandler,
    getEnrolledCourseByIdHandler,
    updateEnrolledCourseHandler,
    deleteEnrolledCourse
 } from './enrolledCourses.handler';
import { checkPermission } from 'middleware';


 export const createEnrollCourseEndpoint = new Endpoint({
    path: '/enrolledCourses',
    method: EndpointMethod.POST,
    handler: createEnrolledCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: createEnrollCourse,
    middleware: [checkPermission('CreateEnrollCourse')]
 });

 export const getAllEnrollCourseEndpoint = new Endpoint({
    path: '/enrolledCourses',
    method: EndpointMethod.GET,
    handler: getAllEnrolledCoursesHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetEnrollCourse')]
 });

 export const getEnrollCourseByIdEndpoint = new Endpoint({
    path: '/enrolledCourses/:id',
    method: EndpointMethod.GET,
    handler: getEnrolledCourseByIdHandler,
    authType: EndpointAuthType.JWT,
    validator: {},
    middleware: [checkPermission('GetEnrollCourse')]
 })

 export const updateEnrollCourseEndpoint = new Endpoint({
    path: '/enrolledCourses/:id',
    method: EndpointMethod.PUT,
    handler: updateEnrolledCourseHandler,
    authType: EndpointAuthType.JWT,
    validator: updateEnrollCourse,
    middleware: [checkPermission('UpdateEnrollCourse')]
 });

 export const deleteEnrollCourseEndpoint = new Endpoint({
    path: '/enrolledCourses/:id',
    method: EndpointMethod.DELETE,
    handler: deleteEnrolledCourse,
    authType: EndpointAuthType.JWT,
    validator: deleteEnrollCourse,
    middleware: [checkPermission('DeleteEnrollCourse')]
 })