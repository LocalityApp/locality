$(document).ready(function(){
  $("#sortable").sortable({
    evert: true
  }); 
  
  $('.ui-state-default').on('click', function(){
    let list = $('.ui-state-default');
      list.forEach(element =>{
        console.log(element);
    });       
  });
});