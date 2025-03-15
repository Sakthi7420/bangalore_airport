"use strict";

var _nodeServerEngine = require("node-server-engine");
var _app = require("./app");
var models = _interopRequireWildcard(require("./db/models"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
(0, _app.createServer)().init().then(async () => {
  await _nodeServerEngine.sequelize.init();
  const modelArray = Object.values(models);
  await _nodeServerEngine.sequelize.addModels(modelArray);
  if (process.env.DB_MIGRATION?.toLowerCase() === 'true') {
    console.log('Db Migration Started');
    await (0, _nodeServerEngine.runPendingMigrations)();
  }
}).catch(e => {
  (0, _nodeServerEngine.reportError)(e);
  process.exit(1);
});
//# sourceMappingURL=index.js.map