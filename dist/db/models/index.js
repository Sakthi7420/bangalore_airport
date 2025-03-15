"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _EmployeeTable = require("./EmployeeTable");
Object.keys(_EmployeeTable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _EmployeeTable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EmployeeTable[key];
    }
  });
});
//# sourceMappingURL=index.js.map