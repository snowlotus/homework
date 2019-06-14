var app = app || {}

(function($){
    app.TodoView = Backbone.View.extend({
      tagName:'li',
      template:_.template($("#item-template").html()),
      events:{//TODO 点击某个html标签 触发某个事件行为
        'click .toggle':'toggleCompleted',
        'dbclick label':'edit',
        'click .destroy':'clear',
        'blur .edit':'close',
        'keypress .edit':'revertOnEscape',
        'keydown .edit':'updateOnEnter'
      },
      initialize:function(){
        //TODO
        this.listenTo(this.model,'change',this.render)
      },
      render:function(){
        //TODO
        this.$el.html(this.template(this.model.toJSON()))
      },
      toogleVisible:function(){
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
        this.model.destory();//内置方法，在模型上触发 "destroy" 事件，该事件将会冒泡到任何包含这个模型的集合中
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

    }) 
})(jQuery)