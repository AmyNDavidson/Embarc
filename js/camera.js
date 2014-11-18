var socket = io.connect();
var imgDataArray = new Array();
var saveFlag=true;

$(document).ready(function() {
    var myImage = document.getElementById("picture");
    myImage.src="http://" + document.domain+ ":8080/?action=stream";
    readImageJsonData();
  
    $("#saveAlert #closePopUp").click(function(){
        $("#saveAlert").css("display","none");
        saveFlag=true;
    })
  
    $("#cameraSaveButton").click(function(){
        saveImageServer();
    });

        $("#cameraCaptureButton").click(function(){
        captureImage();
    })

});

  function readImageJsonData(){

     socket.emit('readImageJson');  
   
 }

  socket.on('logsImgJsonData', function(response){
       
     if(response.Data.length>0){
             $.each(response.Data, function(idx, topic){
                    var obj = new Object();
                    obj.date = topic.date
                    obj.fileName = topic.fileName
                    imgDataArray.push(obj);
             });
      }
   
});

function captureImage(){
 
  var myImage = document.getElementById("photo");
  myImage.src="http://" + document.domain+ ":8080/?action=snapshot.jpg";
 
}


function saveImageServer(){

   var d = new Date();
   var timeFormate = String(formatAMPM(d));
   
   var dateStr = ('0' + (d.getMonth()+1)).slice(-2)+':'+('0' + d.getDate()).slice(-2)+ ':' + d.getFullYear();
   fileName = dateStr+"_"+timeFormate.replace(" ","")+".jpg"

   var fileCreationDate = ('0' + (d.getMonth()+1)).slice(-2)+'/'+('0' + d.getDate()).slice(-2)+ '/' + d.getFullYear();
   var imageJsonObject  = new Object();
   imageJsonObject.date=fileCreationDate;
   imageJsonObject.fileName=fileName;
   imgDataArray.push(imageJsonObject);

   if(saveFlag){
    socket.emit('saveImageJson',imgDataArray); 
    socket.emit('saveImageFile',"http://" + document.domain+ ":8080/?action=snapshot.jpg",fileName); 
  
   // socket.emit('saveImageFile',"http://127.0.0.1:8001/cameraimages/09:15:2014_4:26pm.jpg",fileName);   


    saveFlag=false;
   }
    
}


 socket.on('imageSaveComplete', function(){
     $("#saveAlert").css("display","block");

 }) 


  
function SaveToDisk(fileURL, fileName) {
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var event = document.createEvent('Event');
        event.initEvent('click', true, true);
        save.dispatchEvent(event);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

