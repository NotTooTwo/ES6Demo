////////////////////////////////////////////////////
function timeout(ms){
	return new Promise((resoult) => {
		setTimeout( resoult , ms)
	})
};

async function asyncPrint(value , ms){
	await timeout(ms);
	console.log(value);
};
asyncPrint('Hello world',2000);

////////////////////////////////////////////////////
function add(a,b){
	console.log(a+b)
}
// await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
async function myFun(a,b){
	// await add().catch(function(err){
	// 	console.log(err)
	// })
	try {
	   await add(a,v);
	} catch (err) {
		console.log(err);
	}
}
