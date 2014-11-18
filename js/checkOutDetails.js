    var armObject = new Object();
    var settingObject = new Object();
    var droObject = new Object();
    var probeObject = new Object();
    var pointNeededVal=0;
    var dataUnits="";
    var continueFlag=false;
    var resultStr="";
    var dataArray = new Array();
    
   // var inputFlag=false;
 
   var checkOutType =  localStorage.getItem('CheckOutType');

$(document).ready(function(){
     GetSettings();
  
    if(checkOutType=="Length Checkout" || checkOutType=="Sphere Checkout"){
      inputFlag=true;

     $(".pointText").addClass("grayFont");
     $("pointsRequired").addClass("grayFont");
     $(".lableClass").addClass("grayFont");
     $("#resultDiv").hide();
     $("#resultButton").hide();
     $("#pointsRequire2").addClass("grayBg");
     $("#CalculateResultId .btn-green").css('background','#F1F1F1');
     $("#checkOutCancelButton .btn-red").css('background','#F1F1F1');
   
     if(checkOutType=="Sphere Checkout"){
       $("#barlengthText").html("Enter the size of Sphere")
     }else{

       $("#barlengthText").html("Enter the size of Sphere")
     }
  
    }else{
  
       $("#barRequireId").hide();
       $("#resultDiv").hide();
       $("#resultButton").hide();
       $("#CalculateResultId .btn-green").css('background','#F1F1F1');
       //$("#pointsRequire2").val(pointNeededVal)
       //$//("#instructionText").html('Take at least '+pointNeededVal+' points and Click Calculate to see results.')
    }

    if(checkOutType=="Point Checkout"){
        
         continueFlag=true;
         SetCheckout(Checkouts.Point);
         //$("#measureTypeImage").attr("src","../images/probCal.png") 
         $("#headerText").html("Point Checkout")
         $("#selectedIconId").attr("src","../images/pointcheckoutBreadCrum.png")
        
        
        }else if(checkOutType=="Length Checkout"){
		     SetCheckout(Checkouts.Length);

         $("#headerText").html("Length Checkout")
        // $("#measureTypeImage").attr("src","../images/probCal.png") 
		     $("#selectedIconId").attr("src","../images/lengthcheckoutBredCrum.png")
		
      }else if(checkOutType=="Plane Checkout"){
      
         continueFlag=true;
      SetCheckout(Checkouts.Plane);
	    //$("#measureTypeImage").attr("src","../images/probCal.png") 
        $("#headerText").html("Plane Checkout")
		  $("#selectedIconId").attr("src","../images/plane_200x200.png")
       
     }else if(checkOutType=="Sphere Checkout"){
        $("#headerText").html("Sphere Checkout")
        SetCheckout(Checkouts.Sphere);
       //$("#measureTypeImage").attr("src","../images/probCal.png"); 
		   $("#selectedIconId").attr("src","../images/SpherebreadCrumb.png");
    }
  
     $("#continueButton").click(function(){
    
     if($("#continueText").val()>0){
          $("#continueButton .btn-green").addClass("grayBg");

         if(checkOutType=="Sphere Checkout"){
            saveSphereDiameter($("#continueText").val());  
         }else if(checkOutType=="Length Checkout"){
            saveBarLength($("#continueText").val());  
         }

      continueFlag=true;
      localStorage.setItem('checkOutLengthData', $("#continueText").val());
      
      $("#pointsRequire2").val(pointNeededVal)
      $("#measureDetails2CancelButton .btn-red").css('background','#df443f');
      $("#CalculateResultId .pointsContainer .btn-green").css('background','#F1F1F1');
      $(".pointText").removeClass("grayFont");
      $("pointsRequired").removeClass("grayFont");
      $(".lableClass").removeClass("grayFont");
      $("#pointsRequire2").removeClass("grayBg");
      $("#checkOutCancelButton .btn-red").css('background','#df443f');
      $("#instructionText").html('  Take at least '+pointNeededVal+' points and click Calculate or Arm Button 3 to see the result. ')

     }else{
	     $("#popUpId").css('display','block');
	  	 $("#popUpId #popUpText").html("Please enter the require field value")
	     }
    })

  
    $("#popUpId #closePopUp").click(function(){
         $("#popUpId").css('display','none');
     });
   
    $("#animation").css("width",$('.planeMeasure').width()+"px");
    $("#animation").css("height",$('.planeMeasure').width()/1.3+"px");
    init();
    loadObjects();
    render();
    if(localStorage["droData"]==null){
        
    }else{
        var droData = JSON.parse(localStorage["droData"]);
        UpdateAnimation(droData);
    }
    
     $("#saveCheckOutButton").click(function(){
     //var resultStr = "Min Deviation ="+$("#minDevi").html()+", Max Deviation="+$("#maxDevi").html()+",Average Deviation="+$("#aveDevi").html()+", Range Over 2-X="+$("#rangeX").html()+", Range Over 2-Y="+$("#rangeY").html()+", Range Over 2-Z="+$("#rangeZ").html()

       saveInLogFile(checkOutType,resultStr,dataArray);  
  
     });
   
     readJsonFile();

     $("#saveAlert #closePopUp").click(function(){
           $("#saveAlert").css("display","none");
      })
     if(checkOutType=="Sphere Checkout"){
          
           $("#r12").hide();
           $("#aveDevi").hide();
           $("#r22").hide();  
           $("#rangeZ").hide();
           $("#thirdRow").hide(); 
           $("#r20").html("Average Deviation");
           $("#r21").html("Diameter");
     }else if (checkOutType=="Length Checkout"){
           $("#r10").html("Minimum");
           $("#r11").html("Maximum");
           $("#r12").html("Average");
           $("#r20").html("Min Deviation")
           $("#r21").html("Max Deviation")
           $("#r22").html("Range2")
           $("#r30").html("Standrd Deviation") 
           $("#r30").html("Standrd Deviation")
     }else if(checkOutType=="Point Checkout"){
           $("#secondRow").hide(); 
           $("#thirdRow").hide(); 
           $("#r10").html("Range Over 2-X");
           $("#r11").html("Range Over 2-Y");
           $("#r12").html("Range Over 2-Z"); 

     }else if(checkOutType=="Plane Checkout"){

           $("#r12").hide();
           $("#aveDevi").hide();
           $("#r22").hide();  
           $("#rangeZ").hide();
           $("#secondRow").hide(); 
           $("#thirdRow").hide(); 
           $("#r10").html("Best Fit"); 
           $("#r11").html("Standrd Deviation"); 
 }

});



function showCheckOutdata(data){
  
}


 var MeasureStep = 0;
    var feature = 1;    
    var socket = io.connect();
    var MyMeasureObject;
    var MaxPointsToTake = 0;
    var settingUnits;
    // number of subfeatures for each measurement
    var maxSteps = [0,2,2,2,2,2,2,4,4,3,2,4,3];
   // number of points for each checkout
    var maxChkPts = [0,10,9,9,10];
   // number of points for each calibration
    var maxCalPts = [0,20,15,36];
    // indexed array of measurements.
     var MeasureName = ["Invalid", "MeasureACircle", "MeasureASlot", "MeasureARectangle", "MeasureAnExtCircle", "MeasurePtToPt",
          "MeasurePlnToPln", "MeasureCirtoCir", "MeasurePtToLine", "MeasurePtToPln", "MeasureAngle2PLn", 
          "MeasureAngle2Lines", "MeasureAngleLin2Pln"];
    var CheckoutName = ["Invalid", "Point Checkout", "Plane Checkout", "Sphere Checkout", "Length Checkout"];
    var CalibrationName = ["Invalid", "Calibration - Point", "Calibration - Plane", "Calibration - Sphere"];
          
  var MeasureObject = [MeasureACircle, MeasureACircle, MeasureASlot, MeasureARectangle, MeasureAnExtCircle, MeasurePtToPt,MeasurePlnToPln, MeasureCirtoCir, MeasurePtToLine, MeasurePtToPln, MeasureAngle2PLn,          MeasureAngle2Lines, MeasureAngleLin2Pln];
    
  var SphereDiameter = 25.0;
  
  
  socket.on('Result', function(data){

       console.log(data);

  
      if(data.Valid == 0)
      {
         string = "Calculation failed";
         alert("calculation failed");
         
      }
      else
      {
           $("#resultDiv").show(); 
           $("#resultButton").show(); 
        
            
            if(checkOutType=="Sphere Checkout"){

                
              if(dataUnits=='mm'){
              
              $("#minDevi").html(data.Mindev+" "+dataUnits);
              $("#maxDevi").html(data.Maxdev+" "+dataUnits);
              $("#rangeX").html(data.Averagedev+" "+dataUnits);
              $("#rangeY").html(data.Diameter+" "+dataUnits);

        



              } else{
             
              $("#minDevi").html(Number(String(math.eval(data.Mindev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#maxDevi").html(Number(String(math.eval(data.Maxdev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#rangeX").html(Number(String(math.eval(data.Averagedev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#rangeY").html(Number(String(math.eval(data.Diameter+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
            
           
            }
 
        resultStr = "Min Deviation = "+$("#minDevi").html()+", Max Deviation = "+$("#maxDevi").html()+", Average Deviation = "+$("#rangeX").html()+", Diameter = "+$("#rangeY").html();            


            }else if(checkOutType=="Length Checkout"){
          
              if(dataUnits=='mm'){
              
              $("#minDevi").html(data.Minimum+" "+dataUnits);
              $("#maxDevi").html(data.Maximum+" "+dataUnits);
              $("#aveDevi").html(data.Average+" "+dataUnits);
              $("#rangeX").html(data.Mindev+" "+dataUnits);
              $("#rangeY").html(data.Maxdev+" "+dataUnits);
              $("#rangeZ").html(data.Range2+" "+dataUnits);              
              $("#rr30").html(data.StandardDeviation+" "+dataUnits);   
         
             } else{

              $("#minDevi").html(Number(String(math.eval(data.Minimum+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#maxDevi").html(Number(String(math.eval(data.Maximum+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#aveDevi").html(Number(String(math.eval(data.Average+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#rangeX").html(Number(String(math.eval(data.Mindev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#rangeY").html(Number(String(math.eval(data.Maxdev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#rangeZ").html(Number(String(math.eval(data.Range2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);              
              $("#rr30").html(Number(String(math.eval(data.StandardDeviation+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);           
             
            }
     resultStr = "Minimum = "+$("#minDevi").html()+", Maximum = "+$("#maxDevi").html()+", Average = "+$("#aveDevi").html()+", Min Deviation = "+$("#rangeX").html()+", Max Deviation = "+ $("#rangeY").html()+", Range2 = "+$("#rangeZ").html()+", Standrd Deviation = "+$("#rr30").html();                    

            }else if(checkOutType=="Plane Checkout"){
          
              if(dataUnits=='mm'){
              
              $("#minDevi").html(data.BestFit+" "+dataUnits);
              $("#maxDevi").html(data.StandardDeviation+" "+dataUnits);
             

             } else{
              $("#minDevi").html(Number(String(math.eval(data.BestFit+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#maxDevi").html(Number(String(math.eval(data.StandardDeviation+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
            }


     resultStr = "Best Fit = "+$("#minDevi").html()+", Standrd Deviation = "+$("#maxDevi").html()


            }
             else if(checkOutType=="Point Checkout"){
          
              if(dataUnits=='mm'){
              
              $("#minDevi").html(data.XRange2+" "+dataUnits);
              $("#maxDevi").html(data.YRange2+" "+dataUnits);
              $("#aveDevi").html(data.ZRange2+" "+dataUnits);
              } else{
              
              $("#minDevi").html(Number(String(math.eval(data.XRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#maxDevi").html(Number(String(math.eval(data.YRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
              $("#aveDevi").html(Number(String(math.eval(data.ZRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
             
             }
 
  resultStr = "Range Over 2-X = "+$("#minDevi").html()+", Range Over 2-Y = "+$("#maxDevi").html()+", Range Over 2-Z = "+$("#aveDevi").html();



            }
        }
   });
       
    socket.on('DRO', function(data){

    if(continueFlag){

    UpdateAnimation(data);
    droObject.X = data.X.toFixed(3);
    droObject.Y = data.Y.toFixed(3);
    droObject.Z = data.Z.toFixed(3);
    droObject.I = data.I.toFixed(3);
    droObject.J = data.J.toFixed(3);
    droObject.K = data.K.toFixed(3);

    localStorage["droData"] = JSON.stringify(data);
    
  if(data.Button2 != 0)
    TakeAPoint(data);
  if(data.Button1 != 0)
     EraseAPoint();
    
  if(data.Button3 != 0)
  {


      if(MeasureStep==0){
      
      $("#measurePlaneNextButton").trigger("click");      
      
      }else if(MeasureStep==1){
              
               $("#CalculateResultId").trigger("click");      
               
            }

       MeasureStep++;
      
       if(MeasureStep==0){

             var elem = document.getElementById("pointsTakenId");


    }else
    {
             elem = document.getElementById("pointsTakenId2");

    }
      
           elem.value = 0;
      
          if(MeasureStep == maxSteps[feature]){
          showResult();

          }
      else
      { 
         //var f = document.getElementById("STEP");
          f.value = MeasureStep + 1;
          //var f1 = document.getElementById("FEATURE");
      
        switch(MeasureStep)
        {
        case 1:
          f1.value = MyMeasureObject.SubFeature2;
          break;
        case 2:
          f1.value = MyMeasureObject.SubFeature3;
          break;
        case 3:
          f1.value = MyMeasureObject.SubFeature4;
          break;

      }
    
    }
  }

  }else{
 
  //  $("#popUpId #popUpText").html("Please click continue to take points")   
    //$("#popUpId").css("display","block");
  }

});
 
 
    socket.on('Settings', function(data){


    settingObject.SSID = data.SSID;
    settingObject.PASSWORD = data.PASSWORD;
    settingObject.CHANNEL = data.CHANNEL;
    settingObject.VOLUME = data.VOLUME;
    settingObject.BARLENGTH = data.BARLENGTH;
     settingObject.SPHEREDIAMETER = data.SPHEREDIAMETER;
   
    if(checkOutType=="Length Checkout"){
   
     $("#continueText").val(data.BARLENGTH);
   
    }else if(checkOutType=="Sphere Checkout"){
    
     $("#continueText").val(data.SPHEREDIAMETER); 
    } 




  if(data.HAPTIC == 0)
  
      settingObject.HAPTIC = 0;
  if(data.HEADLIGHT == 0)
  
      settingObject.HEADLIGHT = 0;

  if(data.UNITS == 0){
  
    dataUnits="mm"
    settingObject.dataUnits=0;
         
  
         if(checkOutType=="Sphere Checkout")
        {
        $("#lengthId").html("Enter Sphere Size (mm)")
        }else{
        $("#lengthId").html("Enter Bar Length (mm)")
        }  

      }else{
  

      dataUnits='inch'

         if(checkOutType=="Sphere Checkout")
        {
        $("#lengthId").html("Enter Sphere Size (in)")
        }else{
        $("#lengthId").html("Enter Bar Length (in)")
        }
        settingObject.dataUnits=1;
  
      /*$("#lengthId").html("Enter Bar Length(inch)")    
      settingObject.dataUnits=1;*/
    } 

 });
      
    socket.on('ARM', function(data){
    armObject.Battery = data.Battery;
     

    /*elem = document.getElementById("version");
    elem.value = data.Version;*/
        armObject.Version = data.Version;
    /*elem = document.getElementById("axes");
    elem.value = data.Axes;
    */armObject.Axes = data.Axes;
        armObject.Volume = data.Volume;
        armObject.HWVersion = data.HWVersion;
        armObject.SWVersionHi = data.SWVersionHi;
        armObject.SWVersionLo = data.SWVersionLo;
   
/*
    elem = document.getElementById("armvolume");
    elem.value = data.ArmVolume;
*/
          armObject.ArmVolume = data.ArmVolume;
/*
    elem = document.getElementById("temperature");
    elem.value = data.Ambient;*/

             armObject.Ambient = data.Ambient;
/*
    elem = document.getElementById("hapticon");
    elem.disabled = (0 == data.Haptic);
*/
         armObject.Haptic = data.Haptic;



    /*elem = document.getElementById("hapticoff");
    elem.disabled = (0 == data.Haptic);
*/
             armObject.Haptic = data.Haptic;    

  /*  elem = document.getElementById("headlighton");
    elem.disabled = (0 == data.Headlights);
*/
        armObject.Headlights = data.Headlights;    
/*
    elem = document.getElementById("headlightoff");
    elem.disabled = (0 == data.Headlights);
*/
        //armObject.headlightoff = data.headlightoff;      

  
       });
   



      socket.on('PROBE', function(data){


    /*  var elem = document.getElementById("type");


    elem.value = data.PType;*/
       probeObject.PType = data.PType
    



/*
      elem = document.getElementById("name");
    elem.value = data.PName;*/

    probeObject.PName = data.PName
      /*elem = document.getElementById("diameter");
    elem.value = data.Diameter;*/
        probeObject.Diameter = data.Diameter

/*
      elem = document.getElementById("pid");
    elem.value = data.PID;*/

    probeObject.PID = data.PID




       });
 
   socket.on('PROBESPECS', function(data){
        var string;
          if(data.Saved == 0){
          //string = "Probe Specs not saved.";
          $("#probAlert #popUpText").html("Probe Specs not saved")  
          $("#probAlert").css('display','block');
        }


          else{
          $("#probAlert #popUpText").html("Probe Specs saved")  
          $("#probAlert").css('display','block');
          }

          $("#probAlert #closePopUp").click(function(){

                // $("#probAlert").css("display","none");             
                  gotoHome();
          }) 

          });



      var pts1 = []; 
      var pts2 = []; 
      var pts3 = []; 
      var pts4 = []; 
      
 function TakeAPoint(data)
 {
    TakePointSound();
    
   var x = {"X": data.X, "Y":data.Y, "Z": data.Z, "I": data.I, "J": data.J, "K": data.K, "ANGLES": data.ANGLES, "RawPositions" : data.RawPositions};  
   
     

   // if(MeasureStep==0){
     //  var elem = document.getElementById("pointsTakenId");

  //   }else{
  
       elem = document.getElementById("pointsTakenId2");
  //   }


  switch(MeasureStep)
  {

    case 0:
      pts1.push(x);
            
             $("#pointsTakenId").val(pts1.length)
             
             if(pts1.length<=pointNeededVal){
             
              $("#calPointsId").html(pts1.length+"/"+pointNeededVal)
            }
      elem.value = pts1.length;
        // special case for calibration and checkout.

    if(MaxPointsToTake != 0 && MaxPointsToTake == pts1.length){

      $(".pointsContainer .btn-green").css('background','#1db79b'); 

      $("#CalculateResultId").click(function(){
          showResult();
      });

    }

    break;
    case 1:
      pts2.push(x);

            elem.value = pts2.length;
    break;
    case 2:
      pts3.push(x);
      elem.value = pts3.length;
    break;
    case 3:
      pts4.push(x);
      elem.value = pts4.length;
    break;
  }
   
    
       if(MeasureStep==0){
         
       $("#pointsTakenId").val(pts1.length);

       if(pts1.length>=3){
            
            $("#measurePlaneNextButton .btn-blue").css('background','#0474b2');
            
             $("#measurePlaneNextButton").click(function(){
          $("#step1Id").css("display","none");
              $("#step2Id").css("display","block");
         }); 

           } 
      
        }
      else if(MeasureStep==1){

           $("#pointsTakenId2").val(pts2.length);
          
           if($("#pointsTakenId2").val()>=$("#pointsRequire2").val()){

           $(".pointsContainer .btn-green").css('background','#1db79b');
          
           $("#CalculateResultId").click(function(){
            showResult();

            })
         }    

      }
 }

 
 function EraseAPoint()
 {
  

  ErasePointSound();

  elem = document.getElementById("pointsTakenId2");

  switch(MeasureStep)
  {
    case 0:
      pts1.pop();
    elem.value = pts1.length;
    break;
    case 1:
      pts2.pop();
      elem.value = pts2.length;
    break;
    case 2:
      pts3.pop();
      elem.value = pts3.length;
    break;
    case 3:
      pts4.pop(d);
    elem.value = pts4.length;
    break;
  } 
 }
 
 function MeasureFeature()
{  
  MakeMeasureSound();
  //var elem = document.getElementById("diameter");
  MyMeasureObject.ProbeDiameter =  probeObject.Diameter;
  //elem = document.getElementById("pid");
  MyMeasureObject.PID =   probeObject.PID;
  MyMeasureObject.SphereDiameter =  settingObject.SPHEREDIAMETER 
  MyMeasureObject.Points1 = pts1;
  MyMeasureObject.Points2 = pts2;
  MyMeasureObject.Points3 = pts3;
  MyMeasureObject.Points4 = pts4;
    socket.emit('client_data', MyMeasureObject);

  //ClearData();

}
      
function Sound()
{

sound.Frequency = 500;
sound.Duration = 50;
sound.Volume = 10;
socket.emit('client_data', sound);
}

function TakePointSound()
{
sound.Frequency = 500;
sound.Duration = 50;
sound.Volume = 100;
socket.emit('client_data', sound);


}

function ErasePointSound()
{
sound.Frequency = 750;
sound.Duration = 150;
sound.Volume = 100;
socket.emit('client_data', sound);
}

function MakeMeasureSound()
{

sound.Frequency = 1000;
sound.Duration = 500;
sound.Volume = 100;
socket.emit('client_data', sound);

}

function SetMeasurement(meas)
{ 
  ClearData();
  feature = meas;
  MyMeasureObject = MeasureObject[meas];
}


function SetCheckout(meas)
{

  ClearData();
  feature = meas;

pointNeededVal=maxChkPts[meas]
  if(checkOutType=="Length Checkout" || checkOutType=="Sphere Checkout"){
  
}else{
  $("#pointsRequire2").val(pointNeededVal)
  $("#instructionText").html('Take at least '+pointNeededVal+' points and click Calculate or Arm button 3 to see the result.')
   
}

 $("#calPointsId").html("0/"+pointNeededVal)


 //$("#pointsRequire2").val(maxChkPts[meas])
 
  
  MaxPointsToTake = maxChkPts[meas];
  MyMeasureObject = Checkout;
  MyMeasureObject.Feature = meas;
 

     if(checkOutType=="Length Checkout" || checkOutType=="Sphere Checkout"){

      MyMeasureObject.BarLength = $("#continueText").val();

    } 
 
    else{
    
       MyMeasureObject.BarLength = 711;

    }  
  
}

function SetCalibration(meas)
{
 // ClearData();
  feature = meas;
  $("#pointsRequire2").val(maxCalPts[meas])
  MaxPointsToTake = maxCalPts[meas];
  MyMeasureObject = Calibration;
  MyMeasureObject.Feature = meas;

  
}

function ClearData()
{
  pts1 = [];
  pts2 = [];
  pts3 = [];
  pts4 = [];
  MeasureStep = 0;
  MaxPointsToTake = 0;
  
  //var elem = document.getElementById("PTSTAKEN");
     if(MeasureStep==0){
      //var elem = document.getElementById("pointsTakenId");
    }else
    {
          //var elem = document.getElementById("pointsTakenId2");

    }
  //elem.value = 0;

  //elem = document.getElementById("PTSNEEDED");
  //elem.value = 0;
}

function GetSettings()
{
  socket.emit('client_data', Update);
}

function SetSettings()
{

  /*var elem = document.getElementById("ssid");
  Settings.SSID = elem.value;
  elem = document.getElementById("password");
  Settings.PASSWORD = elem.value;
  elem = document.getElementById("channel");
  Settings.CHANNEL = elem.value;
  elem = document.getElementById("volume");
  Settings.VOLUME = elem.value;
  elem = document.getElementById("barlength");
  Settings.BARLENGTH = elem.value;
  elem = document.getElementById("spherediameter");
  Settings.SPHEREDIAMETER = elem.value;
  
  elem = document.getElementById("hapticon");
  Settings.HAPTIC = 0;
  if(elem.checked == true)
    Settings.HAPTIC = 1;
  Settings.HEADLIGHT = 0;
  elem = document.getElementById("headlighton");
  if(elem.checked == true)
    Settings.HEADLIGHT = 1;
  elem = document.getElementById("unitsinch");
  Settings.UNITS = 0;
  if(elem.checked == true)
    Settings.UNITS = 1;
    
  socket.emit('client_data', Settings);*/
}


function showResult(){
  
    $(".diameterContainer").show();

     $("#CalculateResultId .btn-green").css('background','#F1F1F1');
     $("#checkOutCancelButton .btn-red").css('background','#F1F1F1');

    MeasureFeature();
  
}


 function readJsonFile(){
     socket.emit('readJsonObject');  
   }


     socket.on('logsJsonData', function(response){
   
      if(response.Data.length>0){
             $.each(response.Data, function(idx, topic){
                    var obj = new Object();
                    obj.date = topic.date
                    obj.fileName = topic.fileName
                    dataArray.push(obj);
             });
        }
    });
   

 socket.on('writeDone', function(data){

  $("#saveAlert").css("display","block");

});