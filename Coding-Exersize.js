// 1. What is the output of below code
var car = new Vehicle("Honda", "white", "2010", "UK");
console.log(car);

function Vehicle(model, color, year, country) {
  this.model = model;
  this.color = color;
  this.year = year;
  this.country = country;
}

// Vehicle {model: "Honda", color: "white", year: "2010", country: "UK"}

Answer: 1;
// The function declarations are hoisted similar to any variables. So the placement for Vehicle function declaration doesn't make any difference.

// 2. What is the output of below code
function foo() {
  let x = (y = 0);
  x++;
  y++;
  return x;
}

console.log(foo(), typeof x, typeof y);

Answer: 2;
// Of course the return value of foo() is 1 due to the increment operator. But the statement let x = y = 0 declares a local variable x. Whereas y declared as a global variable accidentally. This statement is equivalent to,

let x;
window.y = 0;
x = window.y;
// Since the block scoped variable x is undefined outside of the function, the type will be undefined too. Whereas the global variable y is available outside the function, the value is 0 and type is number.

// 3. What is the output of below code?
function main() {
  console.log("A");
  setTimeout(function print() {
    console.log("B");
  }, 0);
  console.log("C");
}
main();

Answer: 3;
// The statements order is based on the event loop mechanism. The order of statements follows the below order,

// At first, the main function is pushed to the stack.
// Then the browser pushes the fist statement of the main function( i.e, A's console.log) to the stack, executing and popping out immediately.
// But setTimeout statement moved to Browser API to apply the delay for callback.
// In the meantime, C's console.log added to stack, executed and popped out.
// The callback of setTimeout moved from Browser API to message queue.
// The main function popped out from stack because there are no statements to execute
// The callback moved from message queue to the stack since the stack is empty.
// The console.log for B is added to the stack and display on the console.

// 4. What is the output of below equality check
console.log(0.1 + 0.2 === 0.3);

Answer: 4;
// This is due to the float point math problem. Since the floating point numbers are encoded in binary format, the addition operations on them lead to rounding errors. Hence, the comparison of floating points doesn't give expected results. You can find more details about the explanation here 0.30000000000000004.com/

// 5. What is the output of below code
var y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y);

Answer: 5;
//   The main points in the above code snippets are,

//   You can see function expression instead function declaration inside if statement. So it always returns true.
//   Since it is not declared(or assigned) anywhere, f is undefined and typeof f is undefined too.
//   In other words, it is same as

var y = 1;
if ("foo") {
  y += typeof f;
}
console.log(y);
//   Note: It returns 1object for MS Edge browser

// 6. What is the output of below code
function foo() {
  return;
  {
    message: "Hello World";
  }
}
console.log(foo());

Answer: 6;
// This is a semicolon issue. Normally semicolons are optional in JavaScript. So if there are any statements(in this case, return) missing semicolon, it is automatically inserted immediately. Hence, the function returned as undefined.

// Whereas if the opening curly brace is along with the return keyword then the function is going to be returned as expected.

function foo() {
  return {
    message: "Hello World",
  };
}
console.log(foo()); // {message: "Hello World"}

// 7. What is the output of below code
var myChars = ["a", "b", "c", "d"];
delete myChars[0];
console.log(myChars);
console.log(myChars[0]);
console.log(myChars.length);

Answer: 7;
// The delete operator will delete the object property but it will not reindex the array or change its length. So the number or elements or length of the array won't be changed. If you try to print myChars then you can observe that it doesn't set an undefined value, rather the property is removed from the array. The newer versions of Chrome use empty instead of undefined to make the difference a bit clearer.

// 8. What is the output of below code in latest Chrome
var array1 = new Array(3);
console.log(array1);

var array2 = [];
array2[2] = 100;
console.log(array2);

var array3 = [, , ,];
console.log(array3);

Answer: 8;
// The latest chrome versions display sparse array(they are filled with holes) using this empty x n notation. Whereas the older versions have undefined x n notation. Note: The latest version of FF displays n empty slots notation.

// 9. What is the output of below code
const obj = {
  prop1: function () {
    return 0;
  },
  prop2() {
    return 1;
  },
  ["prop" + 3]() {
    return 2;
  },
};

console.log(obj.prop1());
console.log(obj.prop2());
console.log(obj.prop3());

Answer: 9;
// ES6 provides method definitions and property shorthands for objects. So both prop2 and prop3 are treated as regular function values.

// 10. What is the output of below code
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);

Answer: 10;
// The important point is that if the statement contains the same operators(e.g, < or >) then it can be evaluated from left to right. The first statement follows the below order,

console.log(1 < 2 < 3);
console.log(true < 3);
console.log(1 < 3); // True converted as 1 during comparison
True;
// Whereas the second statement follows the below order,

console.log(3 > 2 > 1);
console.log(true > 1);
console.log(1 > 1); // False converted as 0 during comparison
False;

// 11. What is the output of below code in non-strict mode
function printNumbers(first, second, first) {
  console.log(first, second, first);
}
printNumbers(1, 2, 3);

Answer: 11;
// In non-strict mode, the regular JavaScript functions allow duplicate named parameters. The above code snippet has duplicate parameters on 1st and 3rd parameters. The value of the first parameter is mapped to the third argument which is passed to the function. Hence, the 3rd argument overrides the first parameter.

// Note: In strict mode, duplicate parameters will throw a Syntax Error.

// 12. What is the output of below code
const printNumbersArrow = (first, second, first) => {
  console.log(first, second, first);
};
printNumbersArrow(1, 2, 3);
Answer: 12;
//   Unlike regular functions, the arrow functions doesn't not allow duplicate parameters in either strict or non-strict mode. So you can see SyntaxError in the console.


// 13. What is the output of below code
const arrowFunc = () => arguments.length;
console.log(arrowFunc(1, 2, 3));

Answer: 13
// Arrow functions do not have an arguments, super, this, or new.target bindings. So any reference to arguments variable tries to resolve to a binding in a lexically enclosing environment. In this case, the arguments variable is not defined outside of the arrow function. Hence, you will receive a reference error.

// Where as the normal function provides the number of arguments passed to the function

const func = function () {
                    return arguments.length;
                    }
console.log(func(1, 2, 3));
// But If you still want to use an arrow function then rest operator on arguments provides the expected arguments

const arrowFunc = (...args) => args.length;
console.log(arrowFunc(1, 2, 3));


// 14. What is the output of below code
console.log( String.prototype.trimLeft.name === 'trimLeft' );
console.log( String.prototype.trimLeft.name === 'trimStart' );

Answer: 14
// In order to be consistent with functions like String.prototype.padStart, the standard method name for trimming the whitespaces is considered as trimStart. Due to web web compatibility reasons, the old method name 'trimLeft' still acts as an alias for 'trimStart'. Hence, the prototype for 'trimLeft' is always 'trimStart'


// 15. What is the output of below code
console.log(Math.max());
Answer: 15
// -Infinity is the initial comparant because almost every other value is bigger. So when no arguments are provided, -Infinity is going to be returned. Note: Zero number of arguments is a valid case.


// 16. What is the output of below code
console.log(10 == [10]);
console.log(10 == [[[[[[[10]]]]]]]);

Answer: 16
// As per the comparison algorithm in the ECMAScript specification(ECMA-262), the above expression converted into JS as below

10 === Number([10].valueOf().toString()) // 10
// So it doesn't matter about number brackets([]) around the number, it is always converted to a number in the expression.

// 17. What is the output of below code
console.log(10 + '10');
console.log(10 - '10');

Answer: 17
// The concatenation operator(+) is applicable for both number and string types. So if any operand is string type then both operands concatenated as strings. Whereas subtract(-) operator tries to convert the operands as number type.


// 18. What is the output of below
console.log([0] == false);
if([0]) {
console.log("I'm True");
} else {
console.log("I'm False");
}

Answer: 18
// In comparison operators, the expression [0] converted to Number([0].valueOf().toString()) which is resolved to false. Whereas [0] just becomes a truthy value without any conversion because there is no comparison operator.

// 19. What is the output of below code
console.log([1, 2] + [3, 4]);

Answer: 19
// The + operator is not meant or defined for arrays. So it converts arrays into strings and concatenates them.


// 20. What is the output of below code
const numbers = new Set([1, 1, 2, 3, 4]);
console.log(numbers);

const browser = new Set('Firefox');
console.log(browser);

Answer: 20
// Since Set object is a collection of unique values, it won't allow duplicate values in the collection. At the same time, it is case sensitive data structure.

// 22. What  is the output of below code
console.log(NaN === NaN);

Answer: 22
// JavaScript follows IEEE 754 spec standards. As per this spec, NaNs are never equal for floating-point numbers.

// 23. What is the output of below code
let numbers = [1, 2, 3, 4, NaN];
console.log(numbers.indexOf(NaN));

Answer: 23
// The indexOf uses strict equality operator(===) internally and NaN === NaN evaluates to false. Since indexOf won't be able to find NaN inside an array, it returns -1 always. But you can use Array.prototype.findIndex method to find out the index of NaN in an array or You can use Array.prototype.includes to check if NaN is present in an array or not.

let numbers = [1, 2, 3, 4, NaN];
console.log(numbers.findIndex(Number.isNaN)); // 4

console.log(numbers.includes(NaN)); // true


// 24. What is the output of below code
let [a, ...b,] = [1, 2, 3, 4, 5];
console.log(a, b);

Answer: 24
// When using rest parameters, trailing commas are not allowed and will throw a SyntaxError. If you remove the trailing comma then it displays 1st answer

let [a, ...b] = [1, 2, 3, 4, 5];
console.log(a, b); // 1, [2, 3, 4, 5]


// 25. What is the output of below code
async function func() {
    return 10;
 }
 console.log(func());

 Answer: 25
// Async functions always return a promise. But even if the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise. The above async function is equivalent to below expression,

function func() {
   return Promise.resolve(10)
}


// 26. What is the output of below code
async function func() {
    await 10;
 }
console.log(func());
 
 Answer: 26
//  The await expression returns value 10 with promise resolution and the code after each await expression can be treated as existing in a .then callback. In this case, there is no return expression at the end of the function. Hence, the default return value of undefined is returned as the resolution of the promise. The above async function is equivalent to below expression,
 
 function func() {
    return Promise.resolve(10).then(() => undefined)
}
 

// 27. What is the output of below code
function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  async function delayedLog(item) {
    await delay();
    console.log(item);
  }
  
  async function processArray(array) {
    array.forEach(item => {
      await delayedLog(item);
    })
  }
  
  processArray([1, 2, 3, 4]);

  Answer: 27
// Even though “processArray” is an async function, the anonymous function that we use for forEach is synchronous. If you use await inside a synchronous function then it throws a syntax error.

// 28. What is the output of below code
function delay() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  async function delayedLog(item) {
    await delay();
    console.log(item);
  }
  
  async function process(array) {
    array.forEach(async (item) => {
      await delayedLog(item);
    });
    console.log('Process completed!');
  }
  process([1, 2, 3, 5]);

  Answer: 28
// The forEach method will not wait until all items are finished but it just runs the tasks and goes next. Hence, the last statement is displayed first followed by a sequence of promise resolutions.

// But you control the array sequence using for..of loop,

async function processArray(array) {
  for (const item of array) {
    await delayedLog(item);
  }
  console.log('Process completed!');
}


// 29. What is the output of below code
var set = new Set();
set.add("+0").add("-0").add(NaN).add(undefined).add(NaN);;
console.log(set);

Answer: 29
// Set has few exceptions from equality check,

// All NaN values are equal
// Both +0 and -0 considered as different values


// 30. What is the output of below code
const sym1 = Symbol('one');
const sym2 = Symbol('one');

const sym3 = Symbol.for('two');
const sym4 = Symbol.for('two');

cnsooe.log(sym1 === sym2, sym3 === sym4);

Answer: 30
// Symbol follows below conventions,

// Every symbol value returned from Symbol() is unique irrespective of the optional string.
// Symbol.for() function creates a symbol in a global symbol registry list. But it doesn't necessarily create a new symbol on every call, it checks first if a symbol with the given key is already present in the registry and returns the symbol if it is found. Otherwise a new symbol created in the registry.
// Note: The symbol description is just useful for debugging purposes.

// 31. What is the output of below code
const sym1 = new Symbol('one');
console.log(sym1);

Answer: 31
// Symbol is a just a standard function and not an object constructor(unlike other primitives new Boolean, new String and new Number). So if you try to call it with the new operator will result in a TypeError


// 32. What is the output of below code
let myNumber = 100;
let myString = '100';

if (!typeof myNumber === "string") {
   console.log("It is not a string!");
} else {
    console.log("It is a string!");
}

if (!typeof myString === "number"){
   console.log("It is not a number!")
} else {
   console.log("It is a number!");
}

Answer: 32
// The return value of typeof myNumber (OR) typeof myString is always the truthy value (either "number" or "string"). Since ! operator converts the value to a boolean value, the value of both !typeof myNumber or !typeof myString is always false. Hence the if condition fails and control goes to else block.


// 33. What is the output of below code
console.log(JSON.stringify({ myArray: ['one', undefined, function(){}, Symbol('')] }));
console.log(JSON.stringify({ [Symbol.for('one')]: 'one' }, [Symbol.for('one')]));

Answer: 33
// The symbols has below constraints,

// The undefined, Functions, and Symbols are not valid JSON values. So those values are either omitted (in an object) or changed to null (in an array). Hence, it returns null values for the value array.
// All Symbol-keyed properties will be completely ignored. Hence it returns an empty object({}).


// 34. What is the output of below code
class A {
    constructor() {
      console.log(new.target.name)
    }
  }
  
  class B extends A { constructor() { super() } }
  
  new A();
  new B();

  Answer: 34
// Using constructors, new.target refers to the constructor (points to the class definition of class which is initialized) that was directly invoked by new. This also applies to the case if the constructor is in a parent class and was delegated from a child constructor.

// 35. What is the output of below code
const [x, ...y,] = [1, 2, 3, 4];
console.log(x, y);

Answer: 35
// It throws a syntax error because the rest element should not have a trailing comma. You should always consider using a rest operator as the last element.


// 36. What is the output of below
const {a: x = 10, b: y = 20} = {a: 30};

console.log(x);
console.log(y);

Answer: 36
// The object property follows below rules,

// The object properties can be retrieved and assigned to a variable with a different name
// The property assigned a default value when the retrieved value is undefined


// 37. What is the output of below code
function area({length = 10, width = 20}) {
    console.log(length*width);
  }
  
  area();

  Answer: 37
// If you leave out the right-hand side assignment for the destructuring object, the function will look for at least one argument to be supplied when invoked. Otherwise you will receive an error Error: Cannot read property 'length' of undefined as mentioned above.

// You can avoid the error with either of the below changes,

// Pass at least an empty object:
function area({length = 10, width = 20}) {
  console.log(length*width);
}

area({});
// Assign default empty object:
function area({length = 10, width = 20} = {}) {
  console.log(length*width);
}

area();


// 38. What is the output of below code
const props = [
    { id: 1, name: 'John'},
    { id: 2, name: 'Jack'},
    { id: 3, name: 'Tom'}
  ];
  
  const [,, { name }] = props;
  console.log(name);

  Answer: 38
// It is possible to combine Array and Object destructuring. In this case, the third element in the array props accessed first followed by name property in the object.

// 39. What is the output of below code
function checkType(num = 1) {
    console.log(typeof num);
  }
  
  checkType();
  checkType(undefined);
  checkType('');
  checkType(null);
  
Answer: 39
// If the function argument is set implicitly(not passing argument) or explicitly to undefined, the value of the argument is the default parameter. Whereas for other falsy values('' or null), the value of the argument is passed as a parameter.

// Hence, the result of function calls categorized as below,

// The first two function calls logs number type since the type of default value is number
// The type of '' and null values are string and object type respectively.



// 40. What is the output of below code
function add(item, items = []) {
  items.push(item);
  return items;
}

console.log(add('Orange'));
console.log(add('Apple'));

Answer: 40
// Since the default argument is evaluated at call time, a new object is created each time the function is called. So in this case, the new array is created and an element pushed to the default empty array.


// 41. What is the output of below code
function greet(greeting, name, message = greeting + ' ' + name) {
  console.log([greeting, name, message]);
}

greet('Hello', 'John');
greet('Hello', 'John', 'Good morning!');

Answer: 41
// Since parameters defined earlier are available to later default parameters, this code snippet doesn't throw any error.


// 42. What is the output of below code
function outer(f = inner()) {
  function inner() { return 'Inner' }
}
outer();

Answer: 42
// The functions and variables declared in the function body cannot be referred from default value parameter initializers. If you still try to access, it throws a run-time ReferenceError(i.e, inner is not defined).


// 43. What is the output of below code
function myFun(x, y, ...manyMoreArgs) {
  console.log(manyMoreArgs)
}

myFun(1, 2, 3, 4, 5);
myFun(1, 2);

Answer: 43
// The rest parameter is used to hold the remaining parameters of a function and it becomes an empty array if the argument is not provided.


// 44. What is the output of below code
const obj = {'key': 'value'};
const array = [...obj];
console.log(array);

Answer: 44
// Spread syntax can be applied only to iterable objects. By default, Objects are not iterable, but they become iterable when used in an Array, or with iterating functions such as map(), reduce(), and assign(). If you still try to do it, it still throws TypeError: obj is not iterable.


// 45. What is the output of below code
function* myGenFunc() {
    yield 1;
    yield 2;
    yield 3;
}
var myGenObj = new myGenFunc;
console.log(myGenObj.next().value);

Answer: 45
// Generators are not constructible type. But if you still proceed to do, there will be an error saying "TypeError: myGenFunc is not a constructor"


// 46. What is the output of below code
function* yieldAndReturn() {
  yield 1;
  return 2;
  yield 3;
}

var myGenObj = yieldAndReturn()
console.log(myGenObj.next());
console.log(myGenObj.next());
console.log(myGenObj.next());

Answer: 46
// A return statement in a generator function will make the generator finish. If a value is returned, it will be set as the value property of the object and done property to true. When a generator is finished, subsequent next() calls return an object of this form: {value: undefined, done: true}.


// 47. What is the output of below code
const myGenerator = (function *(){
  yield 1;
  yield 2;
  yield 3;
})();
for (const value of myGenerator) {
  console.log(value);
  break;
}

for (const value of myGenerator) {
  console.log(value);
}

Answer: 47
// The generator should not be re-used once the iterator is closed. i.e, Upon exiting a loop(on completion or using break & return), the generator is closed and trying to iterate over it again does not yield any more results. Hence, the second loop doesn't print any value.


// 48. What is the output of below code
const num = 0o38;
console.log(num);

Answer: 48
// If you use an invalid number(outside of 0-7 range) in the octal literal, JavaScript will throw a SyntaxError. In ES5, it treats the octal literal as a decimal number.


// 49. What is the output of below code
const squareObj = new Square(10);
console.log(squareObj.area);

class Square {
  constructor(length) {
    this.length = length;
  }

  get area() {
    return this.length * this.length;
  }

  set area(value) {
    this.area = value;
  }
}

Answer: 2
// Unlike function declarations, class declarations are not hoisted. i.e, First You need to declare your class and then access it, otherwise it will throw a ReferenceError "Uncaught ReferenceError: Square is not defined".

// Note: Class expressions also applies to the same hoisting restrictions of class declarations.


// 50. What is the output of below code
function Person() { }

Person.prototype.walk = function() {
  return this;
}

Person.run = function() {
  return this;
}

let user = new Person();
let walk = user.walk;
console.log(walk());

let run = Person.run;
console.log(run());

Answer: 50
// When a regular or prototype method is called without a value for this, the methods return an initial this value if the value is not undefined. Otherwise global window object will be returned. In our case, the initial this value is undefined so both methods return window objects.


// 51. What is the output of below code
class Vehicle {
  constructor(name) {
    this.name = name;
  }

  start() {
    console.log(`${this.name} vehicle started`);
  }
}

class Car extends Vehicle {
  start() {
    console.log(`${this.name} car started`);
    super.start();
  }
}

const car = new Car('BMW');
console.log(car.start());

Answer: 51
// The super keyword is used to call methods of a superclass. Unlike other languages the super invocation doesn't need to be a first statement. i.e, The statements will be executed in the same order of code.


// 52. What is the output of below code
const USER = {'age': 30};
USER.age = 25;
console.log(USER.age);

Answer: 2
// Even though we used constant variables, the content of it is an object and the object's contents (e.g properties) can be altered. Hence, the change is going to be valid in this case.


// 53. What is the output of below code
console.log('🙂' === '🙂');

Answer: 53
// Emojis are unicodes and the unicode for smile symbol is "U+1F642". The unicode comparision of same emojies is equivalent to string comparison. Hence, the output is always true.


// 54. What is the output of below code?
console.log(typeof typeof typeof true);

Answer: 54
// The typeof operator on any primitive returns a string value. So even if you apply the chain of typeof operators on the return value, it is always string.


// 55. What is the output of below code?
let zero = new Number(0);

if (zero) {
  console.log("If");
} else {
  console.log("Else");
}

Answer: 55
// The type of operator on new Number always returns object. i.e, typeof new Number(0) --> object.
// Objects are always truthy in if block
// Hence the above code block always goes to if section.


// 55. What is the output of below code in non strict mode?
let msg = "Good morning!!";

msg.name = "John"; 

console.log(msg.name);

Answer: 55
// It returns undefined for non-strict mode and returns Error for strict mode. In non-strict mode, the wrapper object is going to be created and get the mentioned property. But the object get disappeared after accessing the property in next line.


// 56. What is the output of below code?
let count = 10;

(function innerFunc() {
    if (count === 10) {
        let count = 11;
        console.log(count);
    }
    console.log(count);
})();

Answer: 56
// 11 and 10 is logged to the console.

// The innerFunc is a closure which captures the count variable from the outerscope. i.e, 10. But the conditional has another local variable count which overwrites the ourter count variable. So the first console.log displays value 11. Whereas the second console.log logs 10 by capturing the count variable from outerscope.