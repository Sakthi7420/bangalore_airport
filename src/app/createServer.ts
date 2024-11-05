import {Server, reportDebug, middleware} from '@gwcdata/node-server-engine';
import * as endpoints from 'endpoints';

reportDebug.setNameSpace('learning-management-system-backend');

/** Initialize the server */
export function createServer(): Server {
  return new Server({
    globalMiddleware: [middleware.swaggerDocs()],
    endpoints: Object.values(endpoints)
  });
}
