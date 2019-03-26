# bind
bind方法主要改变函数中this的指定。返回一个原函数的拷贝，并拥有指定的this值和初始参数。
例如
```js
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42
```
在上述代码中第一次的声明和下面的代码无异:
```js
var unboundGetX = function(){
    return this.x;
}
```
问题出在 `this` 未特殊指定时，指向当前方法的上一级作用域，所以 `unboundGetX` 的上一级作用域为全局变量 `window`. 而 `window` 本身不存在 `x` 属性，所以 `unboundGetX()` 将返回`undefined`。而`module.getX()` 中的 `this` 指向的是 `getX()` 的上级作用域，即 `module` 这个 `obejct` 本身，进而可以返回 42。

而 `bind` 本身则会改变方法中 `this` 的指向，将其指向我们希望绑定的作用域。从而在 `bind` 过后，每次调用方法时，方法中的 `this` 直接被替代为被绑定作用域。所以在指定 `boundGetX` 的`this` 后，每次调用时，相当于直接执行 `return module.x`。

简单理解为 `bind` 方法直接将函数复制一遍，并将函数中所有的 `this` 都替代为我们所希望的指向。例如 `this.x` 变为 `module.x`。

## 创建绑定函数
```js
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81, //块级作用域，x仅在module中为81
  getX: function() { return this.x; }
};

module.getX(); // 当前的this指向的是 getX() 的上级作用域module 所以x为81

var retrieveX = module.getX; //retrueveX 仅复制了getX方法
retrieveX();
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
var boundGetX = retrieveX.bind(module); //可以视作 boundeGetX = function(){return module.x}
boundGetX(); // 81
```

## 偏函数
bind可以使一个函数具有一定的预设值。
```js
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```
在创建了偏函数之后，原函数相应的传入参数位置将被永远的占据。正如 `result3`，原函数的传入参数数量为2，偏函数 `addThirtySeven` 使用 37 占据了第一个传入参数，多余传入参数会被忽略。 

## 改变this指向
在一些方法中设定了this的指向，例如settimeout中，this的指向为window。如若想settimeout的传入方法调用所需的this，使用bind改变指向即可。
```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000); //无论如何，传入的方法都会被直接提升作用域至全局变量。所以如果不绑定this，this将直接指向window。
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```
简单版本
```js
const a = function(){this.x = 5}
a.prototype.c = function(){console.log(this.x)}
const b = new a();
```
按照上述声明之后，如若执行 `b.c()` 会直接输出5。但是传入setTimeout后，this会被上升为window。
```js
window.setTimeout( b.c, 1000); //undefined
```

## 作为构造函数使用
```js
const xx = function(x, y){
  this.x = x;
  this.y = y;
}
const empty = {};
const yy = xx.bind(empty, 10); //yy相当于xx的一个偏函数
const zz = new yy(10); // zz = {x:10, y: 10}
// instanceof 会判断右边是否存在于其原型链中任意位置
zz instanceof xx // true
zz instanceof yy // true
new xx(1,1) instanceof yy // true
yy instanceof xx // false
xx instanceof yy //false
```
甚至于偏函数本身是可以执行的，上述代码中 `yy` 将函数的 `this` 绑定到了 `empty` 中，当执行 `yy` 后，`empty` 本身会被改变。例如
```js
yy(99); // empty 会变成{x: 10, y: 99};
```

## 快捷调用
通过预先声明函数，可以快速调用函数。同时指定函数的this指向，可以省去apply过程。
```js
const slice = Function.prototype.apply.bind(Array.prototype.slice);
slice([a,b,c,d]);
```

## bind的js实现(部分)
```js
Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var aArgs   = Array.prototype.slice.call(arguments, 1), //为偏函数做准备
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
```