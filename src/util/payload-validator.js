const Joi = require('joi');
const { response } = require('../dto/send.response');

const checkoutSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Name is required', // Customize the error message for required field
    }),
    mobileNumber: Joi.string().length(11).message('Enter your 11 digit mobile number').required(),
    nationalID: Joi.string().length(13).message('Enter your 13 digit digit NIC without -').required()
});



const validateCheckoutPayload = (req, res, next) => {
    const { error } = checkoutSchema.validate(req.body);
    if (error) {
        return res.status(400).send(response(false, error.details[0].message, {}));
    }
    next();
};
module.exports = { validateCheckoutPayload }