class CustomError extends Error{

    constructor(massage, status = 400) {
        super(massage);
        this.status = status;
    }
}

module.exports = CustomError;
