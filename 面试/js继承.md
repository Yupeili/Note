# 继承
```js
/**
 * 定义了一个function 并将其实例化
 * */
const father = function (FirstName, LastName){
    this.firstName = FirstName;
    this.lastName = LastName;
}

father.prototype.call = function(i){
    console.log(i)
}

let child = new father('s','m');
```

## 寄生式继承
## 组合寄生式继承