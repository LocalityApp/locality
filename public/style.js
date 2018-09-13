$(document).ready(function(){



  $("#sortable").sortable({
      revert: true
    }); 
  
  $('.ui-state-default').on('click', function(){
    let list = $('.ui-state-default');
      list.forEach(element =>{
        console.log(element);
    });       
  });


});