/*
 * @Description: js中实现继承的黑魔法
 * @Author: snowdrop
 * @Date: 2019-06-19 09:59:39
 * @LastEditTime: 2019-06-19 11:28:57
 * @LastEditors: Please set LastEditors
 */

 //TODO 此部分还有很多没理解，待深究

 //ES6 继承特性 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes
 //1.extends 关键字
 //2.子类继承父类时，子类的构造函数需要显式的调用下父类的super方法
 //3.可以定义static方法

//ES5实现继承的黑魔法
//1.原型链继承 
//缺点：父类的构造函数会在创建子类及实例化子类的时候分别各执行了一次，造成了内存的浪费

function Super(){
  this.name='super';
}
Super.prototype.showName=function(){
  console.log(this.name)
}

function Sub(){
  this.name='sub';
  this.age=24;
}
Sub.prototype=new Super();
Sub.prototype.showAge=function(){
  console.log(this.age)
}

//2.混合继承
//优点：避开了上述缺点，没有造成不必要的内存浪费

 