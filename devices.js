const Router = require('koa-router');

exports.getDevices = async function (connection) {
    const dbQuery = {
        text: 'select * from devices',
        values: []
    };
    return await connection.query(dbQuery);
};

exports.addController = function(application, base) {
    const router = new Router();

    router.get(base, async (ctx) => {
        const connection = await application.pool.connect();
        try {
            const devices = await exports.getDevices(connection);
            ctx.body = devices.rows;
        } finally {
            await connection.release();
        }
    });

    application.use(router.routes());
};