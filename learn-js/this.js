/*
 * @Description: js中this指向的说明及demo
 * @Author: your name
 * @Date: 2019-06-17 17:38:35
 * @LastEditTime: 2019-06-17 17:53:05
 * @LastEditors: Please set LastEditors
 */

//this 的指向和调用位置有关，与声明位置无关

var obj={
  name:'obj',
  foo:function(){
    console.log(this.name);
    
  }
}

var otherObj={
  name:'otherObj',
  foo:obj.foo
}

var anotherObj={
  name:'anotherObj',
  foo:function(){
    
    var tempFunc=obj.foo; //tempFunc =function(){console.log(this.name)}
    tempFunc(); //window.tempFunc() 此时的this指向了window
  }
}
var name="window"

obj.foo();//此时this指向obj
otherObj.foo();//此时this指向otherObj
anotherObj.foo();//见注释，this在无明确指向时，指向了window