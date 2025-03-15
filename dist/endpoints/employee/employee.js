"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeDetailsByIdEndpoint = exports.getAllEmployeeDetailsEndpoints = exports.createEmployeeEndpoint = void 0;
var _nodeServerEngine = require("node-server-engine");
var _employee = require("./employee.validator");
var _employee2 = require("./employee.handler");
const createEmployeeEndpoint = exports.createEmployeeEndpoint = new _nodeServerEngine.Endpoint({
  path: '/employee',
  method: _nodeServerEngine.EndpointMethod.POST,
  handler: _employee2.createEmployeeDetailsHandler,
  authType: _nodeServerEngine.EndpointAuthType.NONE,
  validator: _employee.CreateEmployeeValidator
});
const getAllEmployeeDetailsEndpoints = exports.getAllEmployeeDetailsEndpoints = new _nodeServerEngine.Endpoint({
  path: '/employee',
  method: _nodeServerEngine.EndpointMethod.GET,
  handler: _employee2.getAllEmployeeDetailsHandler,
  authType: _nodeServerEngine.EndpointAuthType.NONE,
  validator: {}
});
const getEmployeeDetailsByIdEndpoint = exports.getEmployeeDetailsByIdEndpoint = new _nodeServerEngine.Endpoint({
  path: '/employee/:id',
  method: _nodeServerEngine.EndpointMethod.GET,
  handler: _employee2.getEmployeeDetailsByIdHandler,
  authType: _nodeServerEngine.EndpointAuthType.NONE,
  validator: _employee.GetEmployeeValidator
});
//# sourceMappingURL=employee.js.map