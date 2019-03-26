# bind
bind方法主要改变函数中this的指定。
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
问题出在 `this` 未特殊指定时，指向当前方法的上一级作用域，所以 `unboundGetX` 的上一级作用域为全局变量 `windows`. 而 `windows` 本身不存在 `x` 属性，所以 `unboundGetX()` 将返回`undefined`。而`module.getX()` 中的 `this` 指向的是 `getX()` 的上级作用域，即 `module` 这个 `obejct` 本身，进而可以返回 42。

而 `bind` 本身则会改变方法中 `this` 的指向，将其指向我们希望绑定的作用域。从而在 `bind` 过后，每次调用方法时，方法中的 `this` 直接被替代为被绑定作用域。所以在指定 `boundGetX` 的`this` 后，每次调用时，相当于直接执行 `return module.x`。