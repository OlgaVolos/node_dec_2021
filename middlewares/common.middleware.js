const {Types} = require("mongoose");
const {CustomError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            const isValid = Types.ObjectId.isValid(id);
            if (!isValid) {
                return next(new CustomError("Not valid id"))
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isDateValid: (validatorSchema, dataType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = validatorSchema.validate(req[dataType]);

            if(error){
                return next(new CustomError(error.details[0].message));
            }
            req[dataType] = value;
            next();
        }catch (e) {
            next(e);
        }
    }, // універсальна мідлвара, змінюються параметри

};
