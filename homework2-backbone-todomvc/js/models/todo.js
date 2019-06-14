var app = app|| {};

(function(){
  app.Todo = Backbone.Model.extend({
    defaults:{ //设置Todo 的默认数据结构，确保每一个代办项都有title和completed属性
      title:'',
      completed:false
    },
    toogle:function(){ //自定义方法
      this.save({
        completed:!this.get("completed")
      })
    }
  })
})()