const { validationResult } = require("express-validator");

const validate = (validations) => {
    return async (req, res, next) => {
        try {
            for (const validation of validations) {
                const result = await validation.run(req);
                if (result.errors.length) {
                    break;
                }
            }

            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }

            const errorsArray = errors.array();
            const errorsArrayNew = errorsArray.reduce((uniqueErrors, currentError) => {
                const index = uniqueErrors.findIndex(
                    (error) => error.path === currentError.path
                );
                if (index === -1) {
                    uniqueErrors.push({
                        path: currentError.path,
                        msg: currentError.msg,
                    });
                }
                return uniqueErrors;
            }, []);

            res.status(400).json(errorsArrayNew);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = validate;
