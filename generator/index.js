/**generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。
函数在执行过程中，如果没有遇到return语句（函数末尾如果没有return，就是隐含的return undefined;），控制权无法交回被调用的代码。

**/
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
// 调用generator对象有两个方法，
// 一.是不断地调用generator对象的next()方法：

var foo1 = foo(1);
foo1.next();//{value: 2, done: false}
foo1.next();//{value: 3, done: false}
foo1.next();//{value: 4, done: true}
foo1.next();//{value: undefined, done: true}

// 一个产生斐波那契数列的函数
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}

// next()方法会执行generator的代码，每次遇到yield x就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
// next 方法返回值的 value 属性，是 Generator 函数向外输出数据；next 方法还可以接受参数，这是向 Generator 函数体内输入数据。
// 参数可以传入 Generator函数，作为上个阶段异步任务的返回结果，被函数体内的变量接收
// Generator 函数体外，使用指针对象的 throw 方法抛出的错误，可以被函数体内的 try ... catch 代码块捕获
// function* gen(x){
//   try {
//     var y = yield x + 2;
//   } catch (e){ 
//     console.log(e);
//   }
//   return y;
// }

// 二.直接用for..of循环迭代generator对象，这种方式不需要我们自己判断done：
for (var x of fib(5)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
}

// generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个generator就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态，
var fib = {
    a: 0,
    b: 1,
    n: 0,
    max: 5,
    next: function () {
        var
            r = this.a,
            t = this.a + this.b;
        this.a = this.b;
        this.b = t;
        if (this.n < this.max) {
            this.n ++;
            return r;
        } else {
            return undefined;
        }
    }
};

// 用AJAX时
// try {
//     r1 = yield ajax('http://url-1');
//     r2 = yield ajax('http://url-2');
//     r3 = yield ajax('http://url-3');
//     success(r3);
// }
// catch (err) {
//     handle(err);
// }