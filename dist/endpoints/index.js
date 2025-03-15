"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _employee = require("./employee");
Object.keys(_employee).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _employee[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _employee[key];
    }
  });
});
//# sourceMappingURL=index.js.map