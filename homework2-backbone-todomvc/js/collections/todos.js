var app =app || {};

(function(){
  var Todos =Backbone.Collection.extend({
    model:app.Todo,
    localStorage:new Backbone.LocalStorage('todos-example'),//获取所有事项
    completed:function(){//获取已完成事项
      return this.where({completed:true})
    },
    remaining:function(){//获取未完成事项
      return this.where({completed:false})
    },
    nextOrder:function(){//TODO 没太明白作用
      return this.length ? this.last().get('order') + 1 : 1;
    },
    comparator:'order' //TODO 没太明白作用

  })
  app.todos=new Todos();
})()