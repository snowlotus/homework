var a = 1;
function b() {
	console.log(a);
    a = 10;
	console.log(a);
    return;
    function a() {}
}
b();console.log(a);
alert(a);

/*
 * @Description: js中this指向的说明及demo
 * @Author: your name
 * @Date: 2019-06-17 17:38:35
 * @LastEditTime: 2019-06-18 14:25:53
 * @LastEditors: Please set LastEditors
 */

// 结论：
//1.this 的指向和调用位置有关，与声明位置无关
//2.没有明确指向的时候，this指向window
//3.由2可知，在浏览器环境下，setTimeout、setInterval和匿名函数执行时this的指向为全局对象window
//4.call和apply能够强制改变this的指向为当前的第一个传参
//5.在es6中，箭头函数（又称lamdba表达式），是在声明的时候绑定this的
//6.严格模式下，this没有明确指向时,指向undefinde而非window

//思考题
//1.如何利用call或者apply来实现bind？

var name="window";
var obj={
  name:'obj',
  showName:function(){
    console.log(this.name);
  }
}

var otherObj={
  name:'otherObj',
  showName:obj.showName
}

var anotherObj={
  name:'anotherObj',
  showName:function(){
    var tempFunc=obj.showName; //tempFunc =function(){console.log(this.name)}
    tempFunc(); //tempFunc没有一个明确的指向，故指向window
  }
}

var anonymousObj={
  name:'anonymousObj',
  foo:function(){
    console.log(this.name)
  },
  showName:function(){
    //this.foo=function(){
    //   console.log(this.name)
    // }
    // cb=this.foo,cb是一个匿名函数，
    // 匿名函数在执行时，this也是指向window
    (function(cb){
      cb();
    })(this.foo)
  }
}

var arrowObj={
  name:'arrowObj',
  showName:()=>{
    console.log(this.name) //this 指向undefined（即全局对象window），具体可查看babel转义后的结果 https://babeljs.io/repl
  }
}

var arrowObj1={
  name:'arrowObj1',
  showName:function(){
    setTimeout(()=>{
      console.log(this.name);
    },0)
  }
}
arrowObj1.showName();

(function(){
  "use strict";
  // var name='snowdrop'
  // console.log(this.name); //Uncaught TypeError: Cannot read property 'name' of undefined  严格模式下，this没有明确指向时,指向undefinde而非window
  function fun() { return this; }
  console.assert(fun() === undefined);
  console.assert(fun.call(2) === 2);
  console.assert(fun.apply(null) === null);
  console.assert(fun.call(undefined) === undefined);
  console.assert(fun.bind(true)() === true);
})()



obj.showName();//obj 此时this指向obj
otherObj.showName();//otherObj 此时this指向otherObj
anotherObj.showName();//window 见注释，this在无明确指向时，指向了window
anonymousObj.showName();//window

obj.showName.apply();//window 此时虽然时obj调用showName方法，但apply强行改变了此时this指向为第一个参数，即空（为空时则指向window）
obj.showName.apply(anotherObj); //anotherObj  apply讲this强制指向了anotherObj 

arrowObj.showName();//window  