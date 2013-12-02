$('#form-signin').submit(function(){
    if($('#input-name').val().length==0 || $('#input-password').val().length==0){

    }else{
      tour_detail_loaded();
    }
    return false;
});
$('#signout').click(function(){
    tour_detail_loaded();
});