import { StartFunc as StartFuncPortListen } from "./PortListen.js";

import express from 'express';
import http from 'http';
import path from 'path';

const app = express();
const server = http.createServer(app);

var port = normalizePort(process.env.PORT || '7019');

app.disable('x-powered-by');

app.use(express.json({ limit: '100mb' }));

app.use('/', express.static(path.join(path.resolve(), 'publicDir')));

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, StartFuncPortListen);
