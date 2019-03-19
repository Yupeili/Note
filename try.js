/**
 * 中缀表达式转后缀表达式
 * @param {String} infixExpression 中缀表达式
 * @return {<String>} 后缀表达式
 * @public
 */
const transformIntoRPN = function(infixExpression){
    let mid = infixExpression.split(' ');
    let RPN = []; let operators = [];
    let i = 0; let currentChar = '';
    operatorsArray= {'+': 0,'-': 1,'x': 2,'/': 3,'%': 4,'#': 5};
    const priorityMatrix = [
/* + */    [1, 1, 0, 0, 0, 1],
/* - */    [1, 1, 0, 0, 0, 1],
/* * */    [1, 1, 1, 1, 1, 1],
/* / */    [1, 1, 1, 1, 1, 1],
/* % */    [1, 1, 1, 1, 1, 1],
/* # */    [0, 0, 0, 0, 0, 2]];
    operators.push('#');
    while(i < mid.length){
        currentChar = mid[i]
        if(!!Number(currentChar)){
            RPN.push(currentChar)
        }else{
            switch (priorityMatrix[operators.slice(-1)[0]][currentChar]){
                case 0:
                    operators.push(currentChar);
                    i++;
                    break;
                case 1:
                    RPN.push(operators.pop());
                    break;
                case 2:
                    operators.pop();
                    i++;
            }
        }
    }
    while(operators.length > 1){
        RPN.push(operators.pop());
    }
    return RPN;
}

/** 
 * 计算表达式
 * @param {String} operator 输入的运算符
 * @param {Number} left 左值
 * @param {Number} right 右值
 * @return {Number} 计算结果
*/
const calcOperator = function(operator, left, right){
    switch(operator){
        case '+':
            return left + right;
        case '-':
            return right - left;
        case 'x':
            return left * right;
        case '/':
            return right /left;
        case '%':
            return right % left;
    }
}

/** 
 * 计算后缀表达式求解
 * 整体流程是，如果是运算数就入辅助栈，如果是运算符就从辅助栈出相应数量的运算数运算。
 * 取得结果后再推回栈中
 * @param {Array<String>} RPN 后缀表达式
 * @return {Number} 后缀表达式的解
 * @public
 * */ 
const calcRPN = function(RPN){
    let S = [];
    let mid = '';
    while(RPN.length > 0){
        mid = RPN.pop();
        if(!!Number(mid)){
            S.push(mid);
        }else{
            S.push(calcOperator(mid, S.pop(), S.pop()));
        }
    }
    return S.pop();
}

const calc = function(input){
        
}
