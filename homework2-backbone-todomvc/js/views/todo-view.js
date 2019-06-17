/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';
    app.TodoView = Backbone.View.extend({
      tagName:'li',
      template:_.template($("#item-template").html()),
      events:{
        'click .toggle':'toggleCompleted',
        'dbclick label':'edit',
        'click .destroy':'clear',
        'blur .edit':'close',
        'keypress .edit':'updateOnEnter',//keypress按下字符键
        'keydown .edit':'revertOnEscape' //keydown表示按下任何键（不一定会有字符产生）；处理按下退出键的情况
      },
      initialize:function(){
        //WHY
        this.listenTo(this.model,'change',this.render);
        this.listenTo(this.model,'destroy',this.remove);//WHY remove在哪里定义的
        this.listenTo(this.model,'visible',this.toggleVisible);
      },
      render:function(){
        //WHY
        if(this.model.changed.id!==undefined){
          return 
        }

        //WHY
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('completed',this.model.get('completed'));
        this.toggleVisible(); 
        this.$input=this.$('.edit');
        return this;
      },
      toggleVisible:function(){
        this.$el.toggleClass('hidden',this.isHidden())
      },
      isHidden:function(){
        return this.model.get('completed')?
          app.TodoFilter === 'active':
          app.TodoFilter === 'completed'
      },
      toggleCompleted:function(){
        return this.model.toggle();
      },
      edit:function(){
        var textLength = this.$input.val().length;
        this.$el.addClass('editing')
        this.$input.focus();
        this.$input[0].setSelectionRange(textLength,textLength)
      },
      clear:function(){
        this.model.destroy();//内置方法，在模型上触发 "destroy" 事件，该事件将会冒泡到任何包含这个模型的集合中
      },
      close:function(){
        var value =this.$input.val();
        var trimmedValue=value.trim();

        //WHY
        if(!this.$el.hasClass('editing')){
          return;
        }

        if(trimmedValue){
          this.model.save({
            title:trimmedValue
          })
        }
        this.$el.removeClass('editing')

      },
      updateOnEnter:function(e){
        //WHY 不是说keypress不会对非字符的键产生反应吗？
        if(e.which===ENTER_KEY){
          this.close();
        }
      },
      revertOnEscape:function(e){
        if(e.which===ESC_KEY){
          this.$el.removeClass('editing')
          this.$input.val(this.model.get('title'))
        }
      }

    }); 
})(jQuery);