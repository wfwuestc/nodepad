var Note = require('./note.js');
var Toast = require('./toast.js');
var Event = require('./event.js');
var $ = require('jquery')

var NoteManager = (function(){

  function load() {
    $.get('/api/notes')
      .done(function(ret){
        if(ret.status == 0){
          $.each(ret.data, function(idx, article) {
              console.log('article',article)
              new Note({
                id: article.id,
                content: article.content,
                title: article.title,
                username: 'By ' + article.username,
                time: new Date(parseInt(article.updatedAt)).toLocaleString('chinese',{hour12:false})
              });
          });

          Event.fire('waterfall');
        }else{
          Toast(ret.errorMsg);
        }
      })
      .fail(function(){
        Toast('网络异常');
      });


  }

  function add(){
    new Note();
  }

  return {
    load: load,
    add: add
  }

})();

module.exports.NoteManager = NoteManager