var dataUnits = ""
$( document ).ready(function() {

    $("#SettingsContainer").css("display", "none");
    $("#spinner").css("display", "block");

    $('#hapticId').click(function() {
         $(this).find('.btn').toggleClass('btn-primary');
    });
   
    $('#headlightId').click(function() {
    
           $(this).find('.btn').toggleClass('btn-primary');
    });
 

    var socket = io.connect(); 
    socket.emit('client_data', Update);

  	socket.on('Settings', function(data){

    $("#ssId").val(data.SSID)
    $("#securityId").val(data.PASSWORD)
    $("#channelId").val(data.CHANNEL)
    $("#volumeOutput").val(data.VOLUME);
    $("#volumeInput").val(data.VOLUME);

    $("#volumeInput").change( function(e){
        $("#volumeOutput").val($(this).val());
    });

    $("#volumeInput").mousemove( function(e){
       $("#volumeOutput").val($(this).val());
    });

    $("#barlengthInput").val(data.BARLENGTH)



   if(data.HAPTIC==1){
   
     $("#hapticId").html('<button  class="btn btn-lg btn-primary active" id="hapticOn">ON</button><button class="btn btn-lg btn-default" id="hapticOff">OFF</button>');

   }else{
   
    $("#hapticId").html('<button  class="btn btn-lg btn-default" id="hapticOn">ON</button><button  id="hapticOff" class="btn btn-lg btn-primary active">OFF</button>');
   } 
  

    if(data.HEADLIGHT==1){
   
     $("#headlightId").html('<button  class="btn btn-lg btn-primary active" id="headlightOn">ON</button><button class="btn btn-lg btn-default" id="headlightOff">OFF</button>');

   }else{
   
     $("#headlightId").html('<button  class="btn btn-lg btn-default" id="headlightOn">ON</button><button  id="headlightOff" class="btn btn-lg btn-primary active">OFF</button>');

   } 

   $("#sphereId").val(data.SPHEREDIAMETER);

   

   if(data.UNITS==1){

     //$("#inchesId").trigger("click")

     $("#inchesId").attr( "checked", true );
    
    // $("#lengthLableId").html("Bar Length(in):")
    // $("#diameterId").html("Sphere Diameter(in):")
     dataUnits = "inch"


   }else{

     //$("#mmId").trigger("click")
     $("#mmId").attr( "checked", true );

     //$("#lengthLableId").html("Bar Length(mm):")
     //$("#diameterId").html("Sphere Diameter(mm):")
     dataUnits = "mm"
  
     }

  $("#spinner").css("display", "none");
  $("#SettingsContainer").css("display", "block");

   });

   
  $("#mmId").click(function(){

     if($("body").attr("id")=="measurement"){
          Settings.UNITS = 0; 
         updateSettingForMeasurement();

     }else{

       var lengthData = String(math.eval($("#barlengthInput").val()+' inch to mm')).split("mm")[0];
       $("#barlengthInput").val(Number(lengthData).toFixed(6)); 
      
       var sphreData = String(math.eval($("#sphereId").val()+' inch to mm')).split("mm")[0];
       $("#sphereId").val(Number(sphreData).toFixed(6)); 
    }
   
  }); 
  

  $("#inchesId").click(function(){
  
      if($("body").attr("id")=="measurement"){
         
            Settings.UNITS = 1; 
            updateSettingForMeasurement();
              
      } 
     else{
    
       lengthData = String(math.eval($("#barlengthInput").val()+' mm to inch')).split("inch")[0];
       $("#barlengthInput").val(Number(lengthData).toFixed(6)); 
        sphreData = String(math.eval($("#sphereId").val()+' mm to inch')).split("inch")[0];
       $("#sphereId").val(Number(sphreData).toFixed(6)); 
     }  
              
  }); 




 });



 function setSettings(){

    var socket = io.connect(); 
    Settings.SSID = $("#ssId").val();
    Settings.PASSWORD  = $("#securityId").val()
    Settings.CHANNEL =$("#channelId").val();
    Settings.VOLUME =$("#volumeOutput").val();
    Settings.BARLENGTH = $("#barlengthInput").val();
    Settings.SPHEREDIAMETER = $("#sphereId").val();


    
   if($("#hapticOn").attr("class")=="btn btn-lg btn-primary active" || $("#hapticOn").attr("class")=="btn btn-lg btn-default btn-primary"){
      
      Settings.HAPTIC = 1;

   }else{
  
       Settings.HAPTIC = 0
   }
  
    if($("#headlightOn").attr("class")=="btn btn-lg btn-primary active" || $("#headlightOn").attr("class")=="btn btn-lg btn-default btn-primary"){
     Settings.HEADLIGHT = 1
   }else{
  
      Settings.HEADLIGHT = 0;
   }

    if($("#mmId").prop("checked")==false){
       Settings.UNITS = 1;

    }else{
      
        Settings.UNITS = 0;
    }
   socket.emit('client_data', Settings);
  // gotoHome();

   $("#saveDoneMessageId").css("display","block");

   var interval = setInterval(function(){
                   $("#saveDoneMessageId").css("display","none");  
                   clearInterval(interval);
    
    },2000);



 }



function updateSettingForMeasurement(dataUnit){
  



}