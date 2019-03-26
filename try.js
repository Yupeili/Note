const father = function(firstName = void 0, LastName = void 0){
    this.firstName = firstName;
    this.lastName = LastName;
}

father.prototype.newChild = function(firstName){
    return new father(firstName, this.lastName)
};

const a = new father('s', 'asd');
//a.constructor.name = 'father'

//extend 拓展一个目标对象的属性
function extend(target, source) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var propName in source) {
        // 把this绑定到source对象, 之后再调用hasOwnProperty()方法
        if (hasOwnProperty.call(source, propName)) {
            target[propName] = source[propName];
        }
    }
    return target;
}