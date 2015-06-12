 
 var socket = io.connect();
 var imgDataArray = new Array();
 var filePath="http://"+document.domain+":8001/cameraimages/"
 $(document).ready(function(){
   readImageJsonData();
   $("#downloadButton").click(function(){
      downloadFiles();
   }) ;
   $("#searchImagesButton").click(function(){
      if($("#dateField").val()==""){
        $("#popUpId #popUpText").html("Please select a date")
        $("#popUpId").css("display","block");
      }else{
        var str =  $("#dateField").val();      
        var dateStr = str.split("-")[0];
        var finalDate = str.split(dateStr+"-")[1]+"-"+dateStr;
        var selecteddate  = finalDate.replace(/\-/g, '/');
        searchFiles(selecteddate);
       }
    });
  $("#popUpId #closePopUp").click(function(){
       $("#popUpId").css("display","none");
  });
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
     viewFilesList();
});

function searchFiles(datestr){
  var fileAvailabe=false;
  $("#imageContainerId").html("");
 
  for(var i=0;i<imgDataArray.length;i++){
       if(datestr==imgDataArray[i].date){
        fileAvailabe=true;
        var str = '<div class="col-lg-3 col-md-4 col-xs-6 thumb" onclick="imageClick('+i+')"><a class="thumbnail" href="#"><img class="img-responsive" src="'+filePath+imgDataArray[i].fileName+'" alt=""> <label>'+imgDataArray[i].fileName+'</label></a><div class="checkBox"><input name="" id="check'+i+'" type="checkbox" value="0"></div></div>'
        $("#imageContainerId").append(str);
        }
  }

  if(!fileAvailabe){
     $("#popUpId #popUpText").html("No file availabe for the selected date");
     $("#popUpId").css("display","block");
  }
}

  function viewFilesList(){
       for(var i=0;i<imgDataArray.length;i++){
          var str = '<div class="col-lg-3 col-md-4 col-xs-6 thumb" onclick="imageClick('+i+')"><a class="thumbnail" href="#"><img class="img-responsive" src="'+filePath+imgDataArray[i].fileName+'" alt=""> <label>'+imgDataArray[i].fileName+'</label></a><div class="checkBox"><input name="" id="check'+i+'" type="checkbox" value="0"></div></div>'
          $("#imageContainerId").append(str);
       }
  }

  function imageClick(num){
      if($("#imageContainerId #check"+num).prop('checked')==false){
           $("#imageContainerId #check"+num).prop('checked',true) 
      }else{
          $("#imageContainerId #check"+num).prop('checked',false)
       }
  }

  function downloadFiles(){  
   var downloadDataArray = new Array();
   for(var i=0;i<imgDataArray.length;i++){
          if($("#imageContainerId #check"+i).prop('checked')==true){
              SaveToDisk(filePath+imgDataArray[i].fileName,imgDataArray[i].fileName);
         } 
       }
  }

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
    }else{
      
    }
}