

$(document).ready(function() {
    $('input[type="button"]').click(function() {
        if($(this).attr('id') == 'eat') {
             $('#foodSearch').show(); 
             $('#activitySearch').hide();
             $('#addActivity').hide();

        }
  
        else if ($(this).attr('id') == 'activity') {
             $('#foodSearch').hide();   
             $('#activitySearch').show();
             $('#addActivity').hide();
        }
        else{
          $('#foodSearch').hide();   
          $('#activitySearch').hide();
          $('#addActivity').show();
        }
    });
  });


  function getData(){
       return false;
  }