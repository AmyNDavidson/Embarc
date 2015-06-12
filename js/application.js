var ArmAxis_value;
$(document).ready(function()
{
	$("#HomeContainer").css("opacity", ".4");
	$("#waitForArmId").css("display","block");
  	var socket = io.connect();
  	socket.emit('client_data', Update);
	  socket.on('ARM', function(data)
    {
      ArmAxis_value = data.Axes;
      localStorage.setItem("axes",ArmAxis_value);
    });
    //For catching image save success event on any open tab
    socket.on('imageSaveComplete', function(){
      localStorage.setItem('imageSaveComplete',new Date().getTime());     
    });
	EnablePage();
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

function saveInLogFile(type,result,dataArray)
{
  var fileCreatedFlag;
  var fileName="";
  if($.session.get("fileName")==null)
  {
    fileCreatedFlag=true;
    var d = new Date();
    var dateStr = ('0' + (d.getMonth()+1)).slice(-2)+':'+('0' + d.getDate()).slice(-2)+ ':' + d.getFullYear();
    fileName = dateStr+" - "+formatAMPM(d);
    $.session.set("fileName",fileName);
  }
  else
  {
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

function formatAMPM(date) 
{
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
  $('#openCameraImg').attr('href','/pages/cameraImg.html');
	$('#openLogFiles').attr('href','/pages/logfile.html');
	$('#settingsTop').attr('href','/pages/settings.html');
	$('.navbar-brand').attr('href','/pages/home.html');
  $("#statusPage").click(function(){
	    window.location = "status.html";
    });
	$("#probeCalibrationPage").click(function(){
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
	$("#meaurementPage, #measurePlaneCancelButton, #measureDetails2CancelButton, #measureDetails3CancelButton, #measureDetails4CancelButton").click(function(){
		gotoMeasurePage();
	});
	$("#measureDetailsDoneButton, #statusDoneButton,#probCancelButton,#checkOutCancelButton,#settingCancilButton,#cancelCameraButton,#cameraCancel").click(function(){
		gotoHome();
	});
}
