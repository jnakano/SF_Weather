$(document).ready(function(){
   
  

    $('a').click(function(event) {
  var clicked ="#"+this.id;
  zip = $(clicked).data("zip");
       
      
      
      function foo(callback1) {
      
        $.ajax({                                                                                                                                                                                                        
    type: 'GET',                                                                                                                                                                                                 
    url: 'http://api.wunderground.com/api/b3af3687e2ff8860/conditions/q/CA/'+zip+ '.json?callback=?',                                                                                                                                              
    dataType: 'jsonp',                                                                                                                                                                                                
    success: function(result) { 
      
    
      var temp_phrase = clicked+" feels like: " +result.current_observation.feelslike_string;
      
     
 var zip_lat =  eval(result.current_observation.display_location.latitude);
      
 var zip_long = eval(result.current_observation.display_location.longitude);

    var weather_state = result.current_observation.icon;  
      
      
      callback1(zip_lat, zip_long,weather_state,temp_phrase);
      

   
     //$('#temp').html(temp_phrase); 
      
      
      /*$('#logo').html("<img src='http://icons.wxug.com/i/c/k/"+weather_state+ ".gif'>");*/
      
     
    },/* Endo f success function*/                                                                                                                                                                                       
    error: function() { console.log('Uh Oh!'); },
    jsonp: 'jsonp'                                                                                                                                                
  }); /* End of ajax call*/
      
       
 }  //end of foo 
     
      foo(function(lat,long,weather_state,temp_phrase) {
        
       
        var mapOptions = {
          center: new google.maps.LatLng(lat,long),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        //var image = 'http://icons.wxug.com/i/c/k/'+weather_state+ '.gif';
        var image = 'http://icons.wxug.com/i/c/k/partlycloudy.gif';
        var myLatLng = new google.maps.LatLng(lat, long);
        var infowindow = new google.maps.InfoWindow({
          content: temp_phrase,
          maxWidth: 200
        });
        var weathericon = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: image
        });
        google.maps.event.addListener(weathericon, 'click', function() {
    infowindow.open(map,weathericon);
  });
        
      });
    
       
     

      
  });//end of a click event 
  
  
  
  

  
  
}); /*End of document ready function */ 



                              

