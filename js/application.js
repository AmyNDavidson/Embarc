

$(document).ready(function(){
	$("#HomeContainer").css("opacity", ".4");
	$("#waitForArmId").css("display","block");
  	var socket = io.connect();
	/*socket.emit('client_data', IsRunning);
	socket.on('Running', function(data)
	{
		console.log("socket.on Running function");
		if(data.IsRunning == 0)
			EnablePage();
	});	  */
	EnablePage();
	$('#openCameraImg').attr('href','/pages/cameraImg.html');
	$('#openLogFiles').attr('href','/pages/logfile.html');
	$('#settingsTop').attr('href','/pages/settings.html');
});

function gotoHome(){
  window.location = "home.html";
}		

function gotoMeasurePage(){

  window.location = "Measurement.html";
}

function openMeasureDetails(type){
 
 localStorage.setItem('MeasureType', type);
 window.location = "Measure_details_step1.html";

}

function openProbCalDetails(type){
 
 localStorage.setItem('ProbType', type);
 window.location = "probcal_details.html";

}

function openCheckOutCalDetails(type){
 
 localStorage.setItem('CheckOutType', type);
 window.location = "checkout_details.html";


}

function saveInLogFile(type,result,dataArray){

    var fileCreatedFlag;
    var fileName="";

      if($.session.get("fileName")==null){
        fileCreatedFlag=true;
        var d = new Date();
        var dateStr = ('0' + (d.getMonth()+1)).slice(-2)+':'+('0' + d.getDate()).slice(-2)+ ':' + d.getFullYear();
        fileName = dateStr+" - "+formatAMPM(d)

        //fileName =('0' + (d.getMonth()+1)).slice(-2)+'/'+('0' + d.getDate()).slice(-2)+ '/' + d.getFullYear()+"-"+formatAMPM(d)+".txt";

        $.session.set("fileName",fileName)
       
      }else{
          fileCreatedFlag=false;
          fileName  = $.session.get("fileName")
      }

     var date = new Date();
     var dateStr = ('0' + (date.getMonth()+1)).slice(-2)+'/'+('0' + date.getDate()).slice(-2)+ '/' + date.getFullYear();
     var jsonObject  = new Object();
     jsonObject.date = dateStr;
     jsonObject.fileName = fileName;
     dataArray.push(jsonObject);
     socket.emit('writeJsonFile', dataArray, fileName,fileCreatedFlag , type,result);
     fileCreatedFlag=false; 

}


function formatAMPM(date) {

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;

}

function EnablePage()
{

	$("#HomeContainer").css("opacity", "1");
	$("#waitForArmId").css("display","none");

	$(".settingsTop").click(function(){			
	window.location = "settings.html";				
	});
	$("#holeDiameter").click(function(){		
	});

	$(".navbar-brand").click(function(){			
	gotoHome();
	/*if(($("body").attr("id")=="cameraImg") || ($("body").attr("id")=="logfile")){

	window.location = "settings.html";      
	}else{
	gotoHome();      
	}*/
	});


	$("#statusPage").click(function(){
	window.location = "status.html";
	});

	$(".btn-green, .btn-red").click(function(){
	//gotoHome();
	});

	$("#probeCali").click(function(){
	window.location = "probe_cali.html";
	});

	$("#droPage").click(function(){
	window.location = "dro.html";
	});

	$("#cameraPage").click(function(){
	window.location = "camera.html";
	});

	$("#checkoutPage").click(function(){
	window.location = "checkout.html";
	});

	$("#meaurementPage").click(function(){
	gotoMeasurePage();
	});


	$("#measurePlaneCancelButton").click(function(){
	gotoMeasurePage();
	});


	$("#measureDetails2CancelButton").click(function(){
	gotoMeasurePage();
	});


	$("#measureDetailsDoneButton").click(function(){
	window.location = "Measurement.html";
	});



	$("#statusDoneButton").click(function(){
	gotoHome();
	});

	$("#probCancelButton").click(function(){
	gotoHome();
	});

	$("#checkOutCancelButton").click(function(){
	gotoHome();
	});

	$("#settingCancilButton").click(function(){
	gotoHome();
	});

	$("#openLogFiles").click(function(){
	window.location = "logfile.html";

	});

	$("#cancelCameraButton").click(function(){
	gotoHome();

	});

	$("#openCameraImg").click(function(){

	window.location = "cameraImg.html";

	});

	$("#cameraCanil ").click(function(){

	gotoHome();

	});

}
