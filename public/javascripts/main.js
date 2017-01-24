$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/contacts/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});