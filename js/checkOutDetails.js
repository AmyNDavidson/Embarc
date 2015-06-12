var armObject = new Object();
var settingObject = new Object();
var droObject = new Object();
var probeObject = new Object();
var pointNeededVal=0;
var dataUnits="";
var continueFlag=false;
var resultStr="";
var dataArray = new Array();
var point1;
var checkOutType =  localStorage.getItem('CheckOutType');
var firstData;
var firstSphereData = {"Type":"DRO","X":-634.498,"Y":-374.078,"Z":53.178,"I":0,"J":0,"K":0,"Angles":[-0.004866,-0.427465,0.015376,0.505727,-0.279357,-0.180619,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};
var firstPlaneData = {"Type":"DRO","X":-121.071,"Y":-428.443,"Z":0.501,"I":0,"J":0,"K":0,"Angles":[-0.042997,-0.272257,-0.049351,0.354835,1.565268,0.012169,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};
var firstPointData = {"Type":"DRO","X":95.764,"Y":-401.696,"Z":8.807,"I":0,"J":0,"K":0,"Angles":[-1.050477,0.350163,1.178647,0.985467,2.132676,1.299407,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};
var firstLengthData = {"Type":"DRO","X":95.764,"Y":-401.696,"Z":8.807,"I":0,"J":0,"K":0,"Angles":[-1.66071,0.422301,0.524274,0.200471,2.206462,0.779029,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0}; 
var testData;
var testSphereData6 = [ 
                [-0.004866, -0.427465,  0.015376,  0.505727, -0.279357, -0.180619, 0],
                [-0.063195, -0.425297,  0.016465,  0.464756, -0.215503, -0.155341, 0],
                [-0.076444, -0.413101,  0.076702,  0.387478, -0.137114, -0.130601, 0],
                [-0.067398, -0.411662,  0.127199,  0.438497, -0.155532, -0.147850, 0],
                [-0.075305, -0.435933,  0.117327,  0.482624, -0.145276, -0.133251, 0],
                [-0.072528, -0.442732,  0.049508,  0.484174, -0.098238, -0.093363, 0],
                [-0.074708, -0.439710,  0.032926,  0.428644, -0.029081, -0.122439, 0],
                [-0.088850, -0.438655,  0.111870,  0.419192,  0.031797, -0.178648, 0],
                [-0.087755, -0.462751,  0.086830,  0.456546, -0.079793, -0.113701, 0]
               ];
var testSphereData7 = [
                [-0.095312, -0.530057, -0.045589,  0.398574, -0.365919,  0.245490, -0.867678, 0],
                [-0.086881, -0.537701,  0.006823,  0.473720, -0.271045,  0.161200, -0.896166, 0],
                [-0.115865, -0.536823, -0.006113,  0.533643, -0.161045,  0.098900, -0.872385, 0],
                [-0.163744, -0.532187, -0.006743,  0.460843, -0.214971,  0.161995, -0.853519, 0],
                [-0.149064, -0.566960,  0.002272,  0.454435, -0.232878,  0.190254, -0.877410, 0],
                [-0.119222, -0.565233,  0.023339,  0.463249, -0.207161,  0.187675, -0.945036, 0],
                [-0.120630, -0.568869,  0.011482,  0.508097, -0.160097,  0.173891, -0.940441, 0],
                [-0.147133, -0.568490, -0.006026,  0.486354, -0.158033,  0.207705, -0.911480, 0],
                [-0.140850, -0.578553,  0.014813,  0.471573, -0.176160,  0.204503, -0.921080, 0]
                ];
var testLengthData6 = [
                [-1.660710,  0.422301,  0.524274,  0.200471,  2.206462,  0.779029, 0],
                [-0.640071,  0.475149, -0.959098, -0.435857, -1.442730,  0.955640, 0],
                [-1.641697,  0.405580,  0.475754,  0.226064, -1.065247, -0.702224, 0],
                [-0.646773,  0.464209, -0.930919, -0.426879,  1.368252, -0.925979, 0],
                [-1.161054,  0.298137, -0.040284,  0.178130, -1.521143,  0.030399, 0],
                [-0.984023,  0.273234, -0.141253, -0.408665,  1.743991, -0.218730, 0],
                [-0.722475,  0.413287, -0.467469,  0.248950,  0.355000, -0.636826, 0],
                [-1.448472,  0.460093,  0.921480, -0.417802, -1.651832, -0.901158, 0],
                [-0.599757,  0.476408, -0.609406,  0.223816, -2.009786,  0.678773, 0],
                [-1.385654,  0.424353,  0.764911, -0.543549,  1.061425,  0.873291, 0]
                ];
var testLengthData7 = [
                [-1.516109,  0.823457,  1.567094, -0.025880,  2.469342,  1.634128, -1.416253, 0],
                [-1.972702,  0.875610,  0.901883,  0.534417,  2.675352,  1.642214, -1.599530, 0],
                [-0.917032,  0.169801,  0.100701, -0.147242,  0.552930,  0.122859, -0.750795, 0],
                [-0.920003,  0.306081,  0.123930,  0.470400,  2.882313,  0.907192, -3.054013, 0],
                [-0.088418,  0.821687, -1.571769, -0.045785, -2.282880,  1.471939, -0.273113, 0],
                [0.342129,  0.744494, -0.759339,  0.514707, -2.726953,  1.184204,  0.935567,  0],
                [-0.092157,  0.678215, -1.346574, -0.098645,  1.126100, -0.888471,  2.750967, 0],
                [0.288664,  0.666215, -0.629752,  0.498616,  0.120270, -0.660965, -2.130619, 0],
                [-1.598324,  0.763246,  1.422923, -0.013983, -0.811092, -0.980236,  2.496851, 0],
                [-2.101940,  0.875537,  0.933652,  0.475708, -0.754622, -1.051727,  2.374312, 0]
                ];
var testPointData6 = [
                [-1.050477,  0.350163,  1.178647,  0.985467,  2.132676,  1.299407, 0],
                [-0.413591, -0.190434,  0.305943,  0.979227,  2.758824,  0.887326, 0],
                [-0.069505, -0.205652, -0.131421,  0.996023, -2.991512,  0.877292, 0],
                [ 0.387837,  0.056207, -0.804851,  1.012063, -2.227863,  1.221115, 0],
                [ 0.573233,  0.351894, -1.127401,  1.057620, -2.210457,  1.563641, 0],
                [ 0.603960,  0.362346, -1.189629,  1.006367,  0.964858, -1.446881, 0],
                [ 0.326961, -0.024240, -0.702724,  0.990037,  0.629709, -1.048596, 0],
                [-0.057473, -0.202906, -0.215623,  0.988522,  0.181351, -0.877489, 0],
                [-0.631039, -0.054781,  0.572382,  1.028165, -0.687312, -1.240765, 0],
                [-0.976450,  0.356950,  1.178688,  1.023881, -1.171424, -1.610666, 0]

               ];
var testPointData7 = [
                [-0.840009,  0.685308,  1.800890,  1.197013,  1.744219,  2.271733, -2.202140, 0],
                [-0.756085, -0.022529,  0.912360,  1.101887,  2.192557,  1.285905, -2.334030, 0],
                [-0.134601, -0.341168,  0.048855,  1.083014,  3.056296,  0.875063,  2.839164, 0],
                [ 0.647876, -0.010602, -0.933099,  1.062344, -2.146229,  1.090884,  1.036387, 0],
                [ 0.742797,  0.515855, -1.563369,  1.117663, -1.763619,  1.890132,  0.609790, 0],
                [ 0.589885,  0.016989, -0.933863,  1.126000,  0.860244, -1.022131, -1.902469, 0],
                [ 0.450613, -0.138804, -0.713381,  1.103810,  0.726645, -0.834498, -1.778125, 0],
                [ 0.067439, -0.301477, -0.198711,  1.115069,  0.172395, -0.720838, -1.306231, 0],
                [-0.372491, -0.209104,  0.516666,  1.119624, -0.759541, -0.974821,  0.097743, 0],
                [-0.572319, -0.109918,  0.730157,  1.133657, -0.808434, -1.061986,  0.470964, 0]
            
               ];   
var testPlaneData6 = [
                [-0.042997, -0.272257, -0.049351,  0.354835,  1.565268,  0.012169, 0],
                [0.023809, -0.274231,  0.023065,  0.375831,  1.462850,  0.020482, 0],
                [-0.002060, -0.269393, -0.001269,  0.272823,  1.448421,  0.026229, 0],
                [-0.415210, -0.141093,  0.299785,  0.305522,  1.916081, -0.900878, 0],
                [-0.344635, -0.118330,  0.354509,  0.305915,  1.889269, -0.905260, 0],
                [-0.367757, -0.125880,  0.333819,  0.214883,  1.818482, -0.944869, 0],
                [0.302189, -0.152991, -0.356936,  0.354942,  1.300249,  0.672119, 0],
                [0.352838, -0.172797, -0.284047,  0.344018,  1.219143,  0.721167, 0],
                [0.311420, -0.165418, -0.325655,  0.214783,  1.217712,  0.705734, 0]

           ];
var testPlaneData7 = [
                [0.098791, -0.449691, -0.093904,  0.436408,  0.072180,  0.096420,  0.214161, 0],
                [0.145955, -0.453950, -0.052155,  0.457869,  0.057829,  0.092498,  0.091314, 0],
                [0.106655, -0.442582, -0.054080,  0.350795,  0.072412,  0.166419,  0.138661, 0],
                [-0.165166, -0.351583,  0.009400,  0.278542, -1.074187,  1.059626,  1.485963, 0],
                [-0.093081, -0.353038,  0.011756,  0.325143, -1.192267,  1.052467,  1.533671, 0],
                [-0.109778, -0.341279,  0.014992,  0.222761, -1.177349,  1.080277,  1.441149, 0],
                [0.157773, -0.360164,  0.051837,  0.397251,  1.579052,  1.088007, -1.542385, 0],
                [0.201889, -0.360793,  0.111598,  0.387856,  1.471287,  1.118157, -1.529958, 0],
                [ 0.180210, -0.348318,  0.084704,  0.290458,  1.538086,  1.132185, -1.486460, 0]

           ];

$(document).ready(function(){
   
    point1 = 0;
    GetSettings();
    
          if(checkOutType=="Length Checkout" || checkOutType=="Sphere Checkout")
          {
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
                 $("#barlengthText").html("Enter the size of Sphere");
               }else{
                 $("#barlengthText").html("Enter the size of Sphere");
               }
          }
          else
          {
               myObjects[1] = "";
               $("#barRequireId").hide();
               $("#resultDiv").hide();
               $("#resultButton").hide();
               $("#CalculateResultId .btn-green").css('background','#F1F1F1');
          }

          if(checkOutType=="Point Checkout")
          {
               myObjects[1] = "";
               continueFlag=true;
               SetCheckout(Checkouts.Point);
               $("#headerText").html("Point Checkout");
               $("#selectedIconId").attr("src","../images/pointcheckoutBreadCrum.png");
          }
          else if(checkOutType=="Length Checkout")
          {
      		     SetCheckout(Checkouts.Length);
               $("#headerText").html("Length Checkout");
      		     $("#selectedIconId").attr("src","../images/lengthcheckoutBredCrum.png");
          }
          else if(checkOutType=="Plane Checkout")
          {
               myObjects[1] = "";
               continueFlag=true;
               SetCheckout(Checkouts.Plane);
               $("#headerText").html("Plane Checkout");
               $("#selectedIconId").attr("src","../images/plane_200x200.png");
          }
          else if(checkOutType=="Sphere Checkout")
          {
              $("#headerText").html("Sphere Checkout");
              SetCheckout(Checkouts.Sphere);
      		    $("#selectedIconId").attr("src","../images/SpherebreadCrumb.png");
          }




          $("#continueButton").click(function(){

            var value = $("#continueText").val();
            if($("#continueText").val()>0)
             {
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
                $("#calPointsId").html("1/"+ pointNeededVal);
                UpdateAnimationSS(firstData);
             }
             else
             {
        	     $("#popUpId").css('display','block');
        	  	 $("#popUpId #popUpText").html("Please enter the require field value")
        	   }
        });
          $("#popUpId #closePopUp").click(function(){
               $("#popUpId").css('display','none');
           });
         
          $("#animation").css("width",$('.planeMeasure').width()+"px");
          $("#animation").css("height",$('.planeMeasure').width()/1.3+"px");

          init();
          loadObjects();
          render();

          if(localStorage["droData"]==null){
              
          }
          else
          {
              var droData = JSON.parse(localStorage["droData"]);
              UpdateAnimation(droData);
          }
        
         $("#saveCheckOutButton").click(function(){
           saveInLogFile(checkOutType,resultStr,dataArray);  
         });
        readJsonFile();

        $("#saveAlert #closePopUp").click(function(){
             $("#saveAlert").css("display","none");
             $("#saveCheckOutButton").hide();
        })

         if(checkOutType=="Sphere Checkout"){
               testData = testSphereData6;
               //testData = testSphereData7;
               firstData = firstSphereData;
               $("#r12").hide();
               $("#aveDevi").hide();
               $("#r22").hide();  
               $("#rangeZ").hide();
               $("#thirdRow").hide(); 
               $("#r20").html("Average Deviation");
               $("#r21").html("Diameter");
         }else if (checkOutType=="Length Checkout"){
            
               testData = testLengthData6;
               //testData = testLengthData7;
               firstData = firstLengthData;
               $("#r10").html("Minimum");
               $("#r11").html("Maximum");
               $("#r12").html("Average");
               $("#r20").html("Min Deviation")
               $("#r21").html("Max Deviation")
               $("#r22").html("Range2")
               $("#r30").html("Standrd Deviation") 
               $("#r30").html("Standrd Deviation")
         }else if(checkOutType=="Point Checkout"){
            
               testData = testPointData6;
               //testData = testPointData7;
               firstData = firstPointData;
               $("#secondRow").hide(); 
               $("#thirdRow").hide(); 
               $("#r10").html("Range Over 2-X");
               $("#r11").html("Range Over 2-Y");
               $("#r12").html("Range Over 2-Z"); 

         }else if(checkOutType=="Plane Checkout"){
               testData = testPlaneData6;
               //testData = testPlaneData7;
               firstData = firstPlaneData;
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
      if(data.Valid == 0)
      {
         string = "Calculation failed";
         alert("calculation failed");
         
      }
      else
      {
           $("#resultDiv").show(); 
           $("#resultButton").show(); 
        
            
            if(checkOutType=="Sphere Checkout")
            {
                if(dataUnits=='mm')
                {
                  $("#minDevi").html(data.Mindev+" "+dataUnits);
                  $("#maxDevi").html(data.Maxdev+" "+dataUnits);
                  $("#rangeX").html(data.Averagedev+" "+dataUnits);
                  $("#rangeY").html(data.Diameter+" "+dataUnits);
                }
                else
                {
                  $("#minDevi").html(Number(String(math.eval(data.Mindev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#maxDevi").html(Number(String(math.eval(data.Maxdev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#rangeX").html(Number(String(math.eval(data.Averagedev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#rangeY").html(Number(String(math.eval(data.Diameter+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                }
                resultStr = "Min Deviation = "+$("#minDevi").html()+", Max Deviation = "+$("#maxDevi").html()+", Average Deviation = "+$("#rangeX").html()+", Diameter = "+$("#rangeY").html();            
            }
            else if(checkOutType=="Length Checkout")
            {
               if(dataUnits=='mm')
               {
                  $("#minDevi").html(data.Minimum+" "+dataUnits);
                  $("#maxDevi").html(data.Maximum+" "+dataUnits);
                  $("#aveDevi").html(data.Average+" "+dataUnits);
                  $("#rangeX").html(data.Mindev+" "+dataUnits);
                  $("#rangeY").html(data.Maxdev+" "+dataUnits);
                  $("#rangeZ").html(data.Range2+" "+dataUnits);              
                  $("#rr30").html(data.StandardDeviation+" "+dataUnits);   
               }
               else
               {
                  $("#minDevi").html(Number(String(math.eval(data.Minimum+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#maxDevi").html(Number(String(math.eval(data.Maximum+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#aveDevi").html(Number(String(math.eval(data.Average+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#rangeX").html(Number(String(math.eval(data.Mindev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#rangeY").html(Number(String(math.eval(data.Maxdev+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                  $("#rangeZ").html(Number(String(math.eval(data.Range2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);              
                  $("#rr30").html(Number(String(math.eval(data.StandardDeviation+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);           
               }
                resultStr = "Minimum = "+$("#minDevi").html()+", Maximum = "+$("#maxDevi").html()+", Average = "+$("#aveDevi").html()+", Min Deviation = "+$("#rangeX").html()+", Max Deviation = "+ $("#rangeY").html()+", Range2 = "+$("#rangeZ").html()+", Standrd Deviation = "+$("#rr30").html();                    
            }
            else if(checkOutType=="Plane Checkout")
            {
                 if(dataUnits=='mm')
                 {
                    $("#minDevi").html(data.BestFit+" "+dataUnits);
                    $("#maxDevi").html(data.StandardDeviation+" "+dataUnits);
                 } 
                 else
                 {
                    $("#minDevi").html(Number(String(math.eval(data.BestFit+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                    $("#maxDevi").html(Number(String(math.eval(data.StandardDeviation+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                 }
                 resultStr = "Best Fit = "+$("#minDevi").html()+", Standrd Deviation = "+$("#maxDevi").html()
            }
            else if(checkOutType=="Point Checkout")
            {
                    if(dataUnits=='mm')
                    {
                      $("#minDevi").html(data.XRange2+" "+dataUnits);
                      $("#maxDevi").html(data.YRange2+" "+dataUnits);
                      $("#aveDevi").html(data.ZRange2+" "+dataUnits);
                    }
                    else
                    {
                      $("#minDevi").html(Number(String(math.eval(data.XRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                      $("#maxDevi").html(Number(String(math.eval(data.YRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                      $("#aveDevi").html(Number(String(math.eval(data.ZRange2+' mm to inch')).split("inch")[0]).toFixed(4)+" "+dataUnits);
                   }
                 resultStr = "Range Over 2-X = "+$("#minDevi").html()+", Range Over 2-Y = "+$("#maxDevi").html()+", Range Over 2-Z = "+$("#aveDevi").html();
            }
        }
   });
socket.on('DRO', function(data){

  if(continueFlag)
  {
      if( point1 == 0)
      { 
        data.Angles = testData[0];
        point1 = 1;
        $("#calPointsId").html("1/"+ pointNeededVal);
        UpdateAnimationSS(data);
      }

    //UpdateAnimation(data);
    droObject.X = data.X.toFixed(3);
    droObject.Y = data.Y.toFixed(3);
    droObject.Z = data.Z.toFixed(3);
    droObject.I = data.I.toFixed(3);
    droObject.J = data.J.toFixed(3);
    droObject.K = data.K.toFixed(3);
    localStorage["droData"] = JSON.stringify(data);
    if(data.Button2 != 0)
    {  
      TakeAPoint(data);
    }

    if(data.Button1 != 0)
    {
      EraseAPoint(data);
    }
    
    if(data.Button3 != 0)
    {   
	    if(MaxPointsToTake != 0 && MaxPointsToTake == pts1.length)
        $("#CalculateResultId").trigger("click");      
    }
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
  if(data.UNITS == 0)
  {
    dataUnits="mm"
    settingObject.dataUnits=0;
        if(checkOutType=="Sphere Checkout")
        {
          $("#lengthId").html("Enter Sphere Size (mm)")
        }else{
          $("#lengthId").html("Enter Bar Length (mm)")
        }  
  }
  else
  {
      dataUnits='inch'
        if(checkOutType=="Sphere Checkout")
        {
        $("#lengthId").html("Enter Sphere Size (in)")
        }else{
        $("#lengthId").html("Enter Bar Length (in)")
        }
        settingObject.dataUnits=1;
  } 
 });
      
  socket.on('ARM', function(data){
    armObject.Battery = data.Battery;
    armObject.Version = data.Version;
    armObject.Axes = data.Axes;
    armObject.Volume = data.Volume;
    armObject.HWVersion = data.HWVersion;
    armObject.SWVersionHi = data.SWVersionHi;
    armObject.SWVersionLo = data.SWVersionLo;
    armObject.ArmVolume = data.ArmVolume;
    armObject.Ambient = data.Ambient;
    armObject.Haptic = data.Haptic;
    armObject.Haptic = data.Haptic;    
    armObject.Headlights = data.Headlights;    
  });

  socket.on('PROBE', function(data){
      if(data.PID == 0){
          $("#noProbe #popUpText").html("Please insert a probe");
          $("#noProbe").css('display','block');
          $("#noProbe #closePopUp").click(function(){
            gotoHome();
          })
      }
      probeObject.PType = data.PType
      probeObject.PName = data.PName
      probeObject.Diameter = data.Diameter
      probeObject.PID = data.PID
});
 
socket.on('PROBESPECS', function(data){
        var string;
        if(data.Saved == 0){
          $("#probAlert #popUpText").html("Probe Specs not saved")  
          $("#probAlert").css('display','block');
        }
        else{
          $("#probAlert #popUpText").html("Probe Specs saved")  
          $("#probAlert").css('display','block');
        }
        $("#probAlert #closePopUp").click(function(){
            gotoHome();
        });
});



 var pts1 = []; 
 var pts2 = []; 
 var pts3 = []; 
 var pts4 = []; 
      
 function TakeAPoint(data)
 {
    TakePointSound();
    var x = {"X": data.X, "Y":data.Y, "Z": data.Z, "I": data.I, "J": data.J, "K": data.K, "ANGLES": data.ANGLES, "RawPositions" : data.RawPositions};  
    elem = document.getElementById("pointsTakenId2");
    switch(MeasureStep)
    {
        case 0:
              pts1.push(x);
              $("#pointsTakenId").val(pts1.length);
              if(pts1.length < pointNeededVal){
                $("#calPointsId").html((pts1.length + 1)+"/"+pointNeededVal);
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

                var points_taken = $("#pointsTakenId2").val();
                //console.log("Points taken: "+points_taken);
                var p = parseInt(points_taken); 
                //console.log(" Original data is : "+data);
                if(testData[p] != null){
                    data.Angles = testData[p];
                    UpdateAnimationSS(data);
                }
        }
 
 function EraseAPoint(data)
 {
  ErasePointSound();
  elem = document.getElementById("pointsTakenId2");
  switch(MeasureStep)
  {
    case 0:
          pts1.pop();
          elem.value = pts1.length;
	        data.Angles = testData[pts1.length];
          $("#calPointsId").html((pts1.length + 1)+"/"+pointNeededVal);
          UpdateAnimationSS(data);
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
  MyMeasureObject.ProbeDiameter =  probeObject.Diameter;
  MyMeasureObject.PID =   probeObject.PID;
  MyMeasureObject.SphereDiameter =  settingObject.SPHEREDIAMETER 
  MyMeasureObject.Points1 = pts1;
  MyMeasureObject.Points2 = pts2;
  MyMeasureObject.Points3 = pts3;
  MyMeasureObject.Points4 = pts4;
  socket.emit('client_data', MyMeasureObject);
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
  if(checkOutType=="Length Checkout" || checkOutType=="Sphere Checkout")
  {
  
  }else{
    $("#pointsRequire2").val(pointNeededVal);
    $("#instructionText").html('Take at least '+pointNeededVal+' points and click Calculate or Arm button 3 to see the result.');
  }

  $("#calPointsId").html("0/"+pointNeededVal);
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
}

function GetSettings()
{
  socket.emit('client_data', Update);
}

/*function SetSettings()
{

}
*/

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
