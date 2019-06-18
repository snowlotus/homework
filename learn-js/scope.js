
/*
 * @Description: js中的作用域
 * @Author: snowdrop
 * @Date: 2019-06-18 14:56:24
 * @LastEditTime: 2019-06-18 15:53:36
 * @LastEditors: Please set LastEditors
 */

 //结论
 //1.函数和变量的声明都会产生作用域提升
 //2.变量的上升只是声明会提升，赋值不会
 //3.函数表达式（包括匿名和具名）不会发生作用域提升
 //4.函数提升的优先级高于变量，且不会被同名变量覆盖
 //5.声明的提升不会被条件判断给控制住（不过不同浏览器的实现不同，有的会控制有的不会控制）

//DEMO 1、2
 foo();
 function foo(){
   console.log(a);
   var a=2; 
 }

//上面的代码在执行时别js引擎解析成如下的代码
function foo(){
  var a;//undefined
  console.log(a);
  a=2; 
}
foo();

//DEMO 3
show();//TypeError: show is not a function
var show=function (){
  console.log(1)
}
//上面代码等价与下面
var show;//undefined
show ();
show=function (){
  console.log(1)
}

f(); //f is not a function
var f=function baar(){
  console.log('baar')
}


//DEMO 4
typeof show; // function  函数的变量提升优于变量
var show=11;
function show(){
  console.log('show')
}
//上面代码等价于以下代码
function show(){
  console.log('show')
}
var show=11;
typeof show;

//DEMO 5
if(someVar ===undefined){
  var someVar=1;
  console.log(someVar)
}