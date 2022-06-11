function test(){
    console.log('call');
}

test(); // воно все одно запуститься, навіть, якщо не експортується.
// Треба бути обережним з цим

module.exports = {
    greeting: function (name) {
        console.log('hello', name);
    }
} // module.exports може бути лише 1


