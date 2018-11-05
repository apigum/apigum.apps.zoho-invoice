var request = require("request");

module.exports = function(context, req) {

        var obj = {
            method: req.body.httpverb,
            uri: req.body.url,
            json: true
        };

        if (req.body.payload) obj.body = (typeof req.body.payload=='string') ? JSON.parse(req.body.payload) : req.body.payload;

        new Promise((resolve, reject) => {
            request(
                obj,
                function(error, response, body) {
                    let message = `Call of ${req.body.url}`;
                    if (error) {
                        context.log(message + " failed", error);
                        reject(error);
                        return;
                    } else {
                        context.res = { status: response.statusCode, body: body };
                        context.done();
                    }
                }
            );
        })
};