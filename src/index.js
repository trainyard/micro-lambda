const { pipe } = require('pico-lambda')
const lambda = Object
  .getOwnPropertyNames(String.prototype)
  .reduce((lambda, method) => {
    lambda[method] = (~['concat', 'endsWith', 'slice'].indexOf(method))
      ? (fn, ...params) => (arr) => arr[method](fn, ...params)
      : (~['repeat', 'match'].indexOf(method))
        ? param => str => str[method](param)
        : (~['toLocaleString', 'indexOf', 'lastIndexOf'].indexOf(method))
          ? (...params) => arr => arr[method](...params)
          : (~['splice'].indexOf(method))
            ? (...params) => arr => { var t = [...arr]; t[method](...params); return t; }
            : (~['toLowerCase', 'toUpperCase', 'search'].indexOf(method))
              ? str => str[method]()
              : lambda[method];
    return lambda;
  }, {
    pop: arr => arr.slice(0, -1),
    shift: arr => arr.slice(1),
    unshift: params => arr => [params, ...arr],
    reverse: arr => [...arr].reverse(),
    compose: (...fns) => initialValue => fns.reduceRight((value, fn) => fn(value), initialValue),
    pipe: (...fns) => initialValue => fns.reduce((value, fn) => fn(value), initialValue)
  });

// if (typeof window !== 'undefined') window.PicoLambda = lambda;
// else module.exports = lambda;

const result = lambda.repeat(3)
console.log(result("stuff"))
console.log(lambda.toLowerCase("Stuff"))
console.log(lambda.toUpperCase("Stuff"))
const con = lambda.concat("have a ", "nice day")
console.log(con("stuff "))
var str = 'To be, or not to be, that is the question.';
const ew = lambda.endsWith('question.')
console.log(ew(str))
console.log(ew('to be'))
console.log(ew('to be', 19))

var mstr = 'For more information, see Chapter 3.4.5.1'
var re = /see (chapter \d+(\.\d)*)/i
var found = lambda.match(re)
console.log(found(mstr))

var sliceString = 'The morning is upon us.'
var str2 = lambda.slice(1, 8)
var str3 = lambda.slice(4, -2)
var str4 = lambda.slice(12)
var str5 = lambda.slice(30)

console.log(str2(sliceString))
console.log(str3(sliceString))
console.log(str4(sliceString))
console.log(str5(sliceString))
