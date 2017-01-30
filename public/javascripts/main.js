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



if (window.location.pathname === '/contacts') {

  fetch('api/v1/Contact').then(function(res) {
    res.json().then(function(contacts) {
      console.log('contacts', contacts);
      var tbody = document.getElementById('table-body');
      contacts.forEach(function(contact) {
        tbody.insertAdjacentHTML('beforeend', '<tr> <td>  <input type="checkbox" id="' + contact._id + '" />  </td>  <td>  <a href="/contacts/#' + contact._id + '">' + contact.name + '</a></td> <td> ' + contact.nickname + '</td> <td>' + contact.email + ' </td> </tr>');

      });
    })
  });

}