"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Employee = require("./Employee");
Object.keys(_Employee).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Employee[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Employee[key];
    }
  });
});
//# sourceMappingURL=index.js.map