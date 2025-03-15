"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Employee = void 0;
var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));
var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));
var _sequelizeTypescript = require("sequelize-typescript");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function () { return !!t; })(); }
let Employee = exports.Employee = (_dec = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: false
}), _dec2 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.INTEGER,
  allowNull: false
}), _dec3 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.STRING,
  allowNull: false
}), _dec4 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.TEXT('long'),
  allowNull: false
}), (0, _sequelizeTypescript.Table)(_class = (_class2 = /*#__PURE__*/function (_Model) {
  function Employee(...args) {
    var _this;
    (0, _classCallCheck2.default)(this, Employee);
    _this = _callSuper(this, Employee, [...args]);
    (0, _initializerDefineProperty2.default)(_this, "employee_Name", _descriptor, _this);
    (0, _initializerDefineProperty2.default)(_this, "score", _descriptor2, _this);
    (0, _initializerDefineProperty2.default)(_this, "result", _descriptor3, _this);
    (0, _initializerDefineProperty2.default)(_this, "certificate", _descriptor4, _this);
    return _this;
  }
  (0, _inherits2.default)(Employee, _Model);
  return (0, _createClass2.default)(Employee);
}(_sequelizeTypescript.Model), _descriptor = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "employee_Name", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "score", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "result", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2.default)(_class2.prototype, "certificate", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _class2)) || _class);
//# sourceMappingURL=Employee.js.map