var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName,'utf-8', function(error, data){
      if (error) {
        reject(error)
      }else{
        resolve(data);        
      }
    });
  });
};

//1. Promise + Generator
var gen = function* (){
  console.log('start')
  var f1 = yield readFile('./test1.txt');
  var f2 = yield readFile('./test2.txt');
  console.log('gen f1:'+f1);
  console.log('gen f2'+f2);
};
// 由于 res 返回的是一个 Promise 对象，因此要用 then 方法调用下一个next 方法。
var g =gen();
var res = g.next();
res.value.then(function(data){
  console.log('GetValue: '+data)
})
// var res2 = g.next();
// res2.value.then(function(data){
//   console.log('GetValue: '+data)
// })
// //2. Promise + async
var asyncReadFile = async function (){
  var f1 = await readFile('./test1.txt');
  var f2 = await readFile('./test2.txt');
  console.log('asyncReadFile f1:'+f1);
  console.log('asyncReadFile f2'+f2);
};
asyncReadFile()



// async 函数的优点
// async 函数对 Generator 函数的改进，体现在以下三点。

// （1）内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
// （2）更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
// （3）更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。