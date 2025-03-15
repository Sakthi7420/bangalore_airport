"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = createServer;
var _nodeServerEngine = require("node-server-engine");
var endpoints = _interopRequireWildcard(require("../endpoints"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_nodeServerEngine.reportDebug.setNameSpace('learning-management-system-backend');

/** Initialize the server */
function createServer() {
  return new _nodeServerEngine.Server({
    globalMiddleware: [_nodeServerEngine.middleware.swaggerDocs()],
    endpoints: Object.values(endpoints)
  });
}
//# sourceMappingURL=createServer.js.map