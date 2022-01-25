module.exports = validateRequest;

function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    console.log("Validate Request "+req.body);
    let val;
    if(req.body.user === undefined) {
        val = schema.validate(req.body, options);
    }
    else {
        val = schema.validate(req.body.user, options);
    }
    const { error, value } = val;
    console.log(error)
    console.log(value)
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}