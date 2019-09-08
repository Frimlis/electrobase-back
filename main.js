const koa = require('koa');
const http = require('http');
const cors = require('koa2-cors');
const path = require('path');
const devices = require('./devices.js');
const config = require('./config.js');
const { Pool } = require('pg');
const port = 8080;
const root = path.resolve('../electrobase-Frontend');
const opts = {};
const application = new koa();
application.use(require('koa-static')(root, opts));
application.use(cors());

function createServer(application, port) {
    return new Promise((resolve, reject) => {
        const server = http.createServer(application.callback());
        server.listen(port, (err) => {
            if (err != null) return reject(err);
            return resolve(server);
        });
    });
}

async function createPool() {
    const pool = new Pool(config.pool);
    pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
    });
    return pool;
}

devices.addController(application, '/api/devices');
createServer(application, port).then(async () => {
    application.pool = await createPool();
    console.log(`Server listening on port ${port}`);
});
