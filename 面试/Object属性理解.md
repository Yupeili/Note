# Object的属性

对于一个object，其中有6个元属性
```js
{
    value: 123,
    writable: false,
    enumerable: true,
    configurable: false,
    get: undefined,
    set: undefined
}
```
+ value是属性值，默认是undefined
+ writable 是布尔值，表示value是否可写
+ enumerable 是布尔值，表示value是否可被遍历 使用 for...in | Object.keys()
+ configurable 是布尔值，表示属性对象的描述的可写性。除了value本身之外的属性的可写性(enumerable 等)
+ get 表示该属性的取值函数(getter)，默认undefined
+ set 表示该属性的寸值函数(setter)，默认undefined

## Object.getOwnPropertyDescriptor()
方法只能用于自身属性，不能用于继承的属性
```js
var obj = { p: 'a' };

Object.getOwnPropertyDescriptor(obj, 'p')
// Object { value: "a",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

## Object.getOwnPropertyNames()

不论属性是否可遍历，都会被getownpropertynames返回
```js
var obj = Object.defineProperties({}, {
  p1: { value: 1, enumerable: true },
  p2: { value: 2, enumerable: false }
});

Object.getOwnPropertyNames(obj)
// ["p1", "p2"]
```

```js
Object.keys([]) // []
Object.getOwnPropertyNames([]) // [ 'length' ]

Object.keys(Object.prototype) // []
Object.getOwnPropertyNames(Object.prototype)
// ['hasOwnProperty',
//  'valueOf',
//  'constructor',
//  'toLocaleString',
//  'isPrototypeOf',
//  'propertyIsEnumerable',
//  'toString']
```

## 对象的拷贝
```js
var extend = function (to, from) {
  for (var property in from) {
    if (!from.hasOwnProperty(property)) continue;
    Object.defineProperty(
      to,
      property,
      Object.getOwnPropertyDescriptor(from, property)
    );
  }

  return to;
}
```