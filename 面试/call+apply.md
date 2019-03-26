# call / apply
call 和 apply 的主要区别在于，call()接受的是一个参数的列表，也就是说可以传入无数个参数。apply()本身接受的是一个参数的数组，数组会被解析为一系列的传入参数传入方法中。

# call
```js
const product = function(name, price){
    this.name = name;
    this.price = price;
}

const food = function(name, price){
    product.call(this, name, price);
    this.category = 'food';
}

const toy = function(name, price){
    product.call(this, name, price);
    this.category = 'toy';
}
```

## 使用call来调用匿名函数 

```js
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}
```
## 使用call方法调用函数并且指定上下文的``this``
```js
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

## 使用call方法调用函数并且没有确定第一个参数（argument）

### 严格模式下不传参数的call将this指向undefined
```js
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined
```

### 非严格模式下 this 将指向全局变量
```js
var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```

# apply

apply的第一个传入参数是apply使用时的this指定。

## 数组合并
两个数组合并，使用concat()其实并不会改变现有数组，其实是返回一个新的数组。
如果使用
```js
A.push(B);
```
其实是返回一个：
```js
[...A,[...B]]
```
这并不符合需求。
而apply可以解决这个需求，使用：
```js
A.push.apply(B)
```
则会返回：
```js
[...A, ...B]
```

## 对于数组传入值得一些计算
比大小
```js
const A = [1,2,3,4,5,6];
Math.max(A) // 这是行不通的 因为传入参数不能是一个数组
Math.max.apply(null,A); // 6
```

## apply的传入对象不可过大，否则会爆出超出堆栈上限
```js
function minOfArray(arr) {
  var min = Infinity;
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}
```

## 用来连接构造器
```js
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};

function MyConstructor () {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"
```
在上述代码中，myInstance 的声明时所调用的 MyConstructor.construct() 中的this指向了MyConstructor。直接 console.log(myInstance)时，会返回一个MyConstructor的构造器的实例。