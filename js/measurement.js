var socket = io.connect(); 
$(document).ready(function(){
  getSetting();
  $("#inchesId").click(function(){
    updateSetting(1);
  });
  $("#mmId").click(function(){
    updateSetting(0);
  });
});

function getSetting(){
  socket.emit('client_data', Update);
}

socket.on('Settings', function(data){
  Settings.SSID = data.SSID
  Settings.PASSWORD  = data.PASSWORD
  Settings.CHANNEL = data.CHANNEL
  Settings.VOLUME =data.VOLUME
  Settings.BARLENGTH = data.BARLENGTH 
  Settings.SPHEREDIAMETER = data.SPHEREDIAMETER 
  Settings.HAPTIC=data.HAPTIC 
  Settings.HEADLIGHT=data.HEADLIGHT 

  if(data.UNITS==1){
    $("#inchesId").attr( "checked", true );
  }else{
    $("#mmId").attr( "checked", true );
  }    
});

function updateSetting(unit){
  Settings.UNITS=unit;
  socket.emit('client_data', Settings); 
}

function  saveBarLength(val){
  Settings.BARLENGTH=val;
  socket.emit('client_data', Settings); 
}    

function  saveSphereDiameter(val){
  Settings.SPHEREDIAMETER=val;
  socket.emit('client_data', Settings); 
}