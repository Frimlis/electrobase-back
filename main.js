const koa = require('koa');
const fs = require('fs');
const http = require('http');
const cors = require('koa2-cors');
const Router = require('koa-router');
const path = require('path');

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
            return resolve();
        });
    });
}

//addController(application);
createServer(application, 8080);
/*
function addController(application) {
    const router = new Router();

    router.get('/media', async (ctx) => {
        const furl = ctx.originalUrl;
        const params = furl.split('?');
        const fp = params[1];
        if (fp == null) {
            cts.status = 404;
            ctx.body = 'not found';
            return;
        }
        const fname =  decodeURIComponent(fp);
        ctx.body = fs.createReadStream(fname);
    });

    router.get('/test', async (ctx) => {
        ctx.body = 'test completed';
        ctx.status = 200;
    });

    application.use(router.routes());
}*/
