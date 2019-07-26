

$(document).ready(function() {
    $('input[type="radio"]').click(function() {
        if($(this).attr('id') == 'eat') {
             $('#foodSearch').show(); 
             $('#activitySearch').hide();
        }
  
        else {
             $('#foodSearch').hide();   
             $('#activitySearch').show();
        }
    });
  });