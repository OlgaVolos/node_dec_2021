const {Types} = require('mongoose');

const {CustomError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => {
        try{
            const {id} = req.params;

            const isValid = Types.ObjectId.isValid(id);

            if(!isValid){
                return next(new CustomError('Not valid id'))
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
