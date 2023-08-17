request = require('request');
request(
    'http://example.com/api',
    (err, response, body) => {
        if (err)
            return res
                .status(500)
                .send({ message: err });

        return res.send(body);
    }
);
request.post(
    {
        url: 'http://example.com/api',
        form: {
            login: 'login1',
            password: 'password1',
        },
    },
    (err, response, body) => {
        if (err)
            return res.status(500).send({ message: err });

        return res.send(body);
    }
);
request(
    {
        method: 'DELETE',
        url: 'http://example.com/api',
    },
    (err, response, body) => {
        if (err)
            return res.status(500).send({ message: err });

        return res.send(body);
    }
);


module.exports = new IikoService();
