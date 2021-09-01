// What are the possible ways to create objects in JavaScript ?
// There are many ways to create objects in javascript as below

// Object constructor:
// The simplest way to create an empty object is using the Object constructor. Currently this approach is not recommended.
var object = new Object();

// Object's create method:
// The create method of Object creates a new object by passing the prototype object as a parameter
var object = Object.create(null);

// Object literal syntax:
// The object literal syntax is equivalent to create method when it passes null as parameter
var object = {};

// Function constructor:
// Create any function and apply the new operator to create object instances,
function Person(name) {
  var object = {};
  object.name = name;
  object.age = 21;
  return object;
}
var object = new Person("Khadija");

// Function constructor with prototype:
// This is similar to function constructor but it uses prototype for their properties and methods,
function Person() {}
Person.prototype.name = "Khadija";
var object = new Person();

// ES6 introduces class feature to create the objects
class Person {
  constructor(name) {
    this.name = name;
  }
}
var object = new Person("Khadija");

// Singleton pattern:
// A Singleton is an object which can only be instantiated one time. Repeated calls to its constructor return the same instance and this way one can ensure that they don't accidentally create multiple instances.
var object = new (function () {
  this.name = "Khadija";
})();

// ========================================================================================

// What is the difference between Call, Apply and Bind?
// The difference between Call, Apply and Bind can be explained with below examples,

// Call: The call() method invokes a function with a given this value and arguments provided one by one
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}
invite.call(employee1, "Hello", "How are you?"); // Hello John Rodson, How are you?
invite.call(employee2, "Hello", "How are you?"); // Hello Jimmy Baily, How are you?

// Apply: Invokes the function with a given this value and allows you to pass in arguments as an array
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}
invite.apply(employee1, ["Hello", "How are you?"]); // Hello John Rodson, How are you?
invite.apply(employee2, ["Hello", "How are you?"]); // Hello Jimmy Baily, How are you?

// bind: returns a new function, allowing you to pass any number of arguments
var employee1 = { firstName: "John", lastName: "Rodson" };
var employee2 = { firstName: "Jimmy", lastName: "Baily" };

function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}

var inviteEmployee1 = invite.bind(employee1);
var inviteEmployee2 = invite.bind(employee2);
inviteEmployee1("Hello", "How are you?"); // Hello John Rodson, How are you?
inviteEmployee2("Hello", "How are you?"); // Hello Jimmy Baily, How are you?

// Call and apply are pretty interchangeable. Both execute the current function immediately. You need to decide whether it’s easier to send in an array or a comma separated list of arguments. You can remember by treating Call is for comma (separated list) and Apply is for Array.
// Whereas Bind creates a new function that will have this set to the first parameter passed to bind().

// ========================================================================================
// What is a first class function
// In Javascript, functions are first class objects. First-class functions means when functions in that language are treated like any other variable.

// For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable. For example, in the below example, handler functions assigned to a listener

const handler = () => console.log("This is a click handler function");
document.addEventListener("click", handler);

// What is a first order function
// First-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.

const firstOrder = () => console.log("I am a first order function!");

// What is a higher order function
// Higher-order function is a function that accepts another function as an argument or returns a function as a return value or both.

const firstOrderFunc = () => console.log("Hello, I am a First order function");
const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
higherOrder(firstOrderFunc);

// ========================================================================================
// What is the currying function
// Currying is the process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument. Currying is named after a mathematician Haskell Curry. By applying currying, a n-ary function turns it into a unary function.

// Let's take an example of n-ary function and how it turns into a currying function,

const multiArgFunction = (a, b, c) => a + b + c;
console.log(multiArgFunction(1, 2, 3)); // 6

const curryUnaryFunction = (a) => (b) => (c) => a + b + c;
curryUnaryFunction(1); // returns a function: b => c =>  1 + b + c
curryUnaryFunction(1)(2); // returns a function: c => 3 + c
curryUnaryFunction(1)(2)(3); // returns the number 6

// Curried functions are great to improve code reusability and functional composition.

// ========================================================================================

// What is a pure function
// A Pure function is a function where the return value is only determined by its arguments without any side effects. i.e, If you call a function with the same arguments 'n' number of times and 'n' number of places in the application then it will always return the same value.

//Impure
let numberArray = [];
const impureAddNumber = (number) => numberArray.push(number);
//Pure
const pureAddNumber = (number) => (argNumberArray) =>
  argNumberArray.concat([number]);

//Display the results
console.log(impureAddNumber(6)); // returns 1
console.log(numberArray); // returns [6]
console.log(pureAddNumber(7)(numberArray)); // returns [6, 7]
console.log(numberArray); // returns [6]

// Remember that Pure functions are important as they simplify unit testing without any side effects and no need for dependency injection. They also avoid tight coupling and make it harder to break your application by not having any side effects. These principles are coming together with Immutability concept of ES6 by giving preference to const over let usage.

// ========================================================================================

// What is the difference between let and var
//                  var	                                             let
// It is been available from the beginning of JavaScript	Introduced as part of ES6
// It has function scope	                                It has block scope
// Variables will be hoisted	                            Hoisted but not initialized

function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible to due function scope)
  console.log(age); //error: age is not defined(due to block scope)
}
userDetails("John");

// ========================================================================================

// What is the Temporal Dead Zone
// The Temporal Dead Zone is a behavior in JavaScript that occurs when declaring a variable with the let and const keywords, but not with var. In ECMAScript 6, accessing a let or const variable before its declaration (within its scope) causes a ReferenceError. The time span when that happens, between the creation of a variable’s binding and its declaration, is called the temporal dead zone.

function somemethod() {
  console.log(counter1); // undefined
  console.log(counter2); // ReferenceError
  var counter1 = 1;
  let counter2 = 2;
}

// ========================================================================================

// What is IIFE(Immediately Invoked Function Expression)
// IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. The signature of it would be as below,

(function () {
  // logic here
})();

// If you try to access variables with IIFE then it throws an error as below,
(function () {
  var message = "IIFE";
  console.log(message);
})();
console.log(message); //Error: message is not defined

// ========================================================================================

// What is memoization
// Memoization is a programming technique which attempts to increase a function’s performance by caching its previously computed results. Each time a memoized function is called, its parameters are used to index the cache. If the data is present, then it can be returned, without executing the entire function. Otherwise the function is executed and then the result is added to the cache. Let's take an example of adding function with memoization,

const memoizAddition = () => {
  let cache = {};
  return (value) => {
    if (value in cache) {
      console.log("Fetching from cache");
      return cache[value]; // Here, cache.value cannot be used as property name starts with the number which is not a valid JavaScript  identifier. Hence, can only be accessed using the square bracket notation.
    } else {
      console.log("Calculating result");
      let result = value + 20;
      cache[value] = result;
      return result;
    }
  };
};
// returned function from memoizAddition
const addition = memoizAddition();
console.log(addition(20)); //output: 40 calculated
console.log(addition(20)); //output: 40 cached

// ========================================================================================

// What is Hoisting
// Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Remember that JavaScript only hoists declarations, not initialization. Let's take a simple example of variable hoisting,

console.log(message); //output : undefined
var message = "The variable Has been hoisted";
// The above code looks like as below to the interpreter,

var message;
console.log(message);
message = "The variable Has been hoisted";

function message() {
  a = "The variable is Global";
  var b = "The variable is Local"; // Cannot be access outside
}
message();

// ========================================================================================

// What are classes in ES6
// In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance. For example, the prototype based inheritance written in function expression as below,

function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};

// Whereas ES6 classes can be defined as an alternative
class Bike {
  constructor(color, model) {
    this.color = color;
    this.model = model;
  }
  getDetails() {
    return this.model + " bike has" + this.color + " color";
  }
}

// ========================================================================================

// What are closures
// A closure is the combination of a function and the lexical environment within which that function was declared. i.e, It is an inner function that has access to the outer or enclosing function’s variables. The closure has three scope chains

// Own scope where variables defined between its curly brackets
// Outer function’s variables
// Global variables
// Let's take an example of closure concept,

function Welcome(name) {
  var greetingInfo = function (message) {
    console.log(message + " " + name);
  };
  return greetingInfo;
}
var myFunction = Welcome("John");
myFunction("Welcome "); //Output: Welcome John
myFunction("Hello Mr."); //output: Hello Mr.John

// ========================================================================================

// What is scope in javascript
// Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime. In other words, scope determines the visibility of variables and other resources in areas of your code.
// https://dmitripavlutin.com/javascript-scope/

// ========================================================================================

// What is web storage
// Web storage is an API that provides a mechanism by which browsers can store key/value pairs locally within the user's browser, in a much more intuitive fashion than using cookies. The web storage provides two mechanisms for storing data on the client.

// Local storage: It stores data for current origin with no expiration date.
// Session storage: It stores data for one session and the data is lost when the browser tab is closed.

// What is a Cookie
// A cookie is a piece of data that is stored on your computer to be accessed by your browser.Cookies are saved as key / value pairs.For example, you can create a cookie named username as below.

// ========================================================================================
// What is a promise
// A promise is an object that may produce a single value some time in the future with either a resolved value or a reason that it’s not resolved(for example, network error). It will be in one of the 3 possible states: fulfilled, rejected, or pending.

const promise = new Promise(function (resolve, reject) {
  // promise description
});

const promise = new Promise(
  (resolve) => {
    setTimeout(() => {
      resolve("I'm a Promise!");
    }, 5000);
  },
  (reject) => {}
);

promise.then((value) => console.log(value));

// Why do you need a promise ?
// Promises are used to handle asynchronous operations. They provide an alternative approach for callbacks by reducing the callback hell and writing the cleaner code.

// What are the three states of promise
// Promises have three states:
// Pending: This is an initial state of the Promise before an operation begins
// Fulfilled: This state indicates that the specified operation was completed.
// Rejected: This state indicates that the operation did not complete. In this case an error value will be thrown.

// What is promise.all
// Promise.all is a promise that takes an array of promises as an input (an iterable), and it gets resolved when all the promises get resolved or any one of them gets rejected. For example, the syntax of promise.all method is below,

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
// Note: Remember that the order of the promises(output the result) is maintained as per input order.

// ========================================================================================
// What is a callback function
// A callback function is a function passed into another function as an argument. This function is invoked inside the outer function to complete an action. Let's take a simple example of how to use callback function

function callbackFunction(name) {
  console.log("Hello " + name);
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}
outerFunction(callbackFunction);

// Why do we need callbacks
// The callbacks are needed because javascript is an event driven language. That means instead of waiting for a response javascript will keep executing while listening for other events. Let's take an example with the first function invoking an API call(simulated by setTimeout) and the next function which logs the message.

function firstFunction() {
  // Simulate a code delay
  setTimeout(function () {
    console.log("First function called");
  }, 1000);
}
function secondFunction() {
  console.log("Second function called");
}
firstFunction();
secondFunction();

// What is a callback hell
// Callback Hell is an anti-pattern with multiple nested callbacks which makes code hard to read and debug when dealing with asynchronous logic. The callback hell looks like below,
async1(function () {
  async2(function () {
    async3(function () {
      async4(function () {
        // Some Code
      });
    });
  });
});

// ========================================================================================
// What is a strict mode in javascript
// Strict Mode is a new feature in ECMAScript 5 that allows you to place a program, or a function, in a “strict” operating context. This way it prevents certain actions from being taken and throws more exceptions. The literal expression "use strict"; instructs the browser to use the javascript code in the Strict mode.

// Why do you need strict mode
// Strict mode is useful to write "secure" JavaScript by notifying "bad syntax" into real errors. For example, it eliminates accidentally creating a global variable by throwing an error and also throws an error for assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object.

// How do you declare strict mode
// The strict mode is declared by adding "use strict"; to the beginning of a script or a function. If declared at the beginning of a script, it has global scope.

("use strict");
x = 3.14; // This will cause an error because x is not declared

// and if you declare inside a function, it has local scope
x = 3.14; // This will not cause an error.
myFunction();

function myFunction() {
  "use strict";
  y = 3.14; // This will cause an error
}

// ========================================================================================
// What is event bubbling
// Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element in the same nesting hierarchy till it reaches the outermost DOM element.

// What is event capturing
// Event capturing is a type of event propagation where the event is first captured by the outermost element, and then successively triggers on the descendants (children) of the target element in the same nesting hierarchy till it reaches the innermost DOM element.

// ========================================================================================
// What are the tools or techniques used for debugging JavaScript code
// You can use below tools or techniques for debugging javascript

// Chrome Devtools
// debugger statement
// Good old console.log statement

// Is JavaScript a compiled or interpreted language
// JavaScript is an interpreted language, not a compiled language. An interpreter in the browser reads over the JavaScript code, interprets each line, and runs it. Nowadays modern browsers use a technology known as Just-In-Time (JIT) compilation, which compiles JavaScript to executable bytecode just as it is about to run.

// Is JavaScript a case-sensitive language
// Yes, JavaScript is a case sensitive language. The language keywords, variables, function & object names, and any other identifiers must always be typed with a consistent capitalization of letters.
// ========================================================================================

// What is the use of setTimeout
// The setTimeout() method is used to call a function or evaluate an expression after a specified number of milliseconds. For example, let's log a message after 2 seconds using setTimeout method,

setTimeout(function () {
  console.log("Good morning");
}, 2000);

// What is the use of setInterval
// The setInterval() method is used to call a function or evaluate an expression at specified intervals (in milliseconds). For example, let's log a message after 2 seconds using setInterval method,

setInterval(function () {
  console.log("Good morning");
}, 2000);

// Why is JavaScript treated as Single threaded
// JavaScript is a single-threaded language. Because the language specification does not allow the programmer to write code so that the interpreter can run parts of it in parallel in multiple threads or processes. Whereas languages like java, go, C++ can make multi-threaded and multi-process programs.

// What is an event delegation
// Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.

// For example, if you wanted to detect field changes in inside a specific form, you can use event delegation technique,

var form = document.querySelector("#registration-form");

// Listen for changes to fields inside the form
form.addEventListener(
  "input",
  function (event) {
    // Log the field that was changed
    console.log(event.target);
  },
  false
);

// ========================================================================================

// What is an arguments object
// The arguments object is an Array-like object accessible inside functions that contains the values of the arguments passed to that function. For example, let's see how to use arguments object inside sum function,

function sum() {
  var total = 0;
  for (var i = 0, len = arguments.length; i < len; ++i) {
    total += arguments[i];
  }
  return total;
}

sum(1, 2, 3); // returns 6
var argsArray = Array.prototype.slice.call(arguments);

// ========================================================================================

// What is a rest parameter
// Rest parameter is an improved way to handle function parameters which allows us to represent an indefinite number of arguments as an array. The syntax would be as below,

function f(a, b, ...theArgs) {
  // ...
}

function fun(...args) {
  let sum = 0;
  for (let i of args) {
    sum += i;
  }
  return sum;
}
console.log(fun(1, 2)); //3
console.log(fun(1, 2, 3)); //6
console.log(fun(1, 2, 3, 4)); //13
console.log(fun(1, 2, 3, 4, 5)); //15
// Note: Rest parameter is added in ES2015 or ES6

// What is a spread operator
// Spread operator allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements. Let's take an example to see this behavior,

function calculateSum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];

console.log(calculateSum(...numbers)); // 6

// ========================================================================================

// What is an anonymous function
// An anonymous function is a function without a name! Anonymous functions are commonly assigned to a variable name or used as a callback function. The syntax would be as below,

// function (optionalParameters) {
//   //do something
// }

const myFunction = function () {
  //Anonymous function assigned to a variable
  //do something
};

[1, 2, 3].map(function (element) {
  //Anonymous function used as a callback function
  //do something
});
// Let's see the above anonymous function in an example,

var x = function (a, b) {
  return a * b;
};
var z = x(5, 10);
console.log(z); // 50

// ========================================================================================
// What are primitive data types
// A primitive data type is data that has a primitive value (which has no properties or methods). There are 7 types of primitive data types.

string;
number;
boolean;
null;
undefined;
bigint;
symbol;

// What is an error object
// An error object is a built in error object that provides error information when an error occurs. It has two properties: name and message. For example, the below function logs error details,

try {
  greeting("Welcome");
} catch (err) {
  console.log(err.name + "<br>" + err.message);
}

// When you get a syntax error
// A SyntaxError is thrown if you try to evaluate code with a syntax error. For example, the below missing quote for the function parameter throws a syntax error

try {
  eval("greeting('welcome)"); // Missing ' will produce an error
} catch (err) {
  console.log(err.name);
}

// What are the different error names from error object
// There are 6 different types of error names returned from error object,

// Error Name	Description
// EvalError	An error has occurred in the eval() function
// RangeError	An error has occurred with a number "out of range"
// ReferenceError	An error due to an illegal reference
// SyntaxError	An error due to a syntax error
// TypeError	An error due to a type error
// URIError	An error due to encodeURI()

// What are the various statements in error handling
// Below are the list of statements used in an error handling,

// try: This statement is used to test a block of code for errors
// catch: This statement is used to handle the error
// throw: This statement is used to create custom errors.
// finally: This statement is used to execute code after try and catch regardless of the result.

// ========================================================================================
// What is an Iterator
// An iterator is an object which defines a sequence and a return value upon its termination. It implements the Iterator protocol with a next() method which returns an object with two properties: value (the next value in the sequence) and done (which is true if the last value in the sequence has been consumed).

// How does synchronous iteration works
// Synchronous iteration was introduced in ES6 and it works with below set of components,

// Iterable: It is an object which can be iterated over via a method whose key is Symbol.iterator. Iterator: It is an object returned by invoking [Symbol.iterator]() on an iterable. This iterator object wraps each iterated element in an object and returns it via next() method one by one. IteratorResult: It is an object returned by next() method. The object contains two properties; the value property contains an iterated element and the done property determines whether the element is the last element or not.

// Let's demonstrate synchronous iteration with an array as below,

const iterable = ["one", "two", "three"];
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // { value: 'one', done: false }
console.log(iterator.next()); // { value: 'two', done: false }
console.log(iterator.next()); // { value: 'three', done: false }
console.log(iterator.next()); // { value: 'undefined, done: true }

// What is an event loop
// The Event Loop is a queue of callback functions. When an async function executes, the callback function is pushed into the queue. The JavaScript engine doesn't start processing the event loop until the async function has finished executing the code. Note: It allows Node.js to perform non-blocking I/O operations even though JavaScript is single-threaded.

// What is call stack
// Call Stack is a data structure for javascript interpreters to keep track of function calls in the program. It has two major actions,

// Whenever you call a function for its execution, you are pushing it to the stack.
// Whenever the execution is completed, the function is popped out of the stack.

function hungry() {
  eatFruits();
}
function eatFruits() {
  return "I'm eating fruits";
}

// Invoke the `hungry` function
hungry();
// The above code processed in a call stack as below,

// Add the hungry() function to the call stack list and execute the code.
// Add the eatFruits() function to the call stack list and execute the code.
// Delete the eatFruits() function from our call stack list.
// Delete the hungry() function from the call stack list since there are no items anymore.

// What is V8 JavaScript engine
// V8 is an open source high-performance JavaScript engine used by the Google Chrome browser, written in C++. It is also being used in the node.js project. It implements ECMAScript and WebAssembly, and runs on Windows 7 or later, macOS 10.12+, and Linux systems that use x64, IA-32, ARM, or MIPS processors. Note: It can run standalone, or can be embedded into any C++ application.

// Why do we call javascript as dynamic language
// JavaScript is a loosely typed or a dynamic language because variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned/reassigned with values of all types.

let age = 50; // age is a number now
age = "old"; // age is a string now
age = true; // age is a boolean

// List down some of the features of ES6
// Below are the list of some new features of ES6,

// Support for constants or immutable variables
// Block-scope support for variables, constants and functions
// Arrow functions
// Default parameters
// Rest and Spread Parameters
// Template Literals
// Multi-line Strings
// Destructuring Assignment
// Enhanced Object Literals
// Promises
// Classes
// Modules

// What paradigm is Javascript
// JavaScript is a multi-paradigm language, supporting imperative/procedural programming, Object-Oriented Programming and functional programming. JavaScript supports Object-Oriented Programming with prototypical inheritance.

// How do you map the array values without using map method
// You can map the array values without using the map method by just using the from method of Array. Let's map city names from Countries array,

const countries = [
  { name: "India", capital: "Delhi" },
  { name: "US", capital: "Washington" },
  { name: "Russia", capital: "Moscow" },
  { name: "Singapore", capital: "Singapore" },
  { name: "China", capital: "Beijing" },
  { name: "France", capital: "Paris" },
];

const cityNames = Array.from(countries, ({ capital }) => capital);
console.log(cityNames); // ['Delhi, 'Washington', 'Moscow', 'Singapore', 'Beijing', 'Paris']

// What are the different ways to deal with Asynchronous Code
// Below are the list of different ways to deal with Asynchronous code.

// Callbacks
// Promises
// Async/await
// Third-party libraries such as async.js,bluebird etc

// What is heap
// Heap(Or memory heap) is the memory location where objects are stored when we define variables. i.e, This is the place where all the memory allocations and de-allocation take place. Both heap and call-stack are two containers of JS runtime. Whenever runtime comes across variables and function declarations in the code it stores them in the Heap.

// What is an async function
// An async function is a function declared with the async keyword which enables asynchronous, promise-based behavior to be written in a cleaner style by avoiding promise chains. These functions can contain zero or more await expressions.

// Let's take a below async function example,

async function logger() {
  let data = await fetch("http://someapi.com/users"); // pause until fetch returns
  console.log(data);
}
logger();

// It is basically syntax sugar over ES2015 promises and generators.

// What are the differences between arguments object and rest parameter
// There are three main differences between arguments object and rest parameters

// The arguments object is an array-like but not an array. Whereas the rest parameters are array instances.
// The arguments object does not support methods such as sort, map, forEach, or pop. Whereas these methods can be used in rest parameters.
// The rest parameters are only the ones that haven’t been given a separate name, while the arguments object contains all arguments passed to the function

// What are the differences between spread operator and rest parameter
// Rest parameter collects all remaining elements into an array. Whereas Spread operator allows iterables( arrays / objects / strings ) to be expanded into single arguments/elements. i.e, Rest parameter is opposite to the spread operator.

// What are the built-in iterables
// Below are the list of built-in iterables in javascript,

// Arrays and TypedArrays
// Strings: Iterate over each character or Unicode code-points
// Maps: iterate over its key-value pairs
// Sets: iterates over their elements
// arguments: An array-like special variable in functions
// DOM collection such as NodeList

// What are the differences between for...of and for...in statements
// Both for...in and for...of statements iterate over js data structures. The only difference is over what they iterate:

// for..in iterates over all enumerable property keys of an object
// for..of iterates over the values of an iterable object.
// Let's explain this difference with an example,

let arr = ["a", "b", "c"];

arr.newProp = "newVlue";

// key are the property keys
for (let key in arr) {
  console.log(key);
}

// value are the property values
for (let value of arr) {
  console.log(value);
}
// Since for..in loop iterates over the keys of the object, the first loop logs 0, 1, 2 and newProp while iterating over the array object. The for..of loop iterates over the values of a arr data structure and logs a, b, c in the console.
// ========================================================================================

// ========================================================================================
