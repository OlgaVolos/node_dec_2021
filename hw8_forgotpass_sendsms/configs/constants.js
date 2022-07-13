module.exports = {
    PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{6,}$/,
    EMAIL_REGEX: /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$/,
    PHONE_REGEX: /\(?\+\d{1,3}\)? ?-?\d{1,3} ?-?\d{3,5} ?-?\d{4}( ?-?\d{3})? ?(\w{1,10}\s?\d{1,6})?/,

    AUTHORIZATION: 'Authorization',
};
