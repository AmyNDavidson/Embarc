var armObject = new Object();
var settingObject = new Object();
var droObject = new Object();
var probeObject = new Object();
var resultString="";
var dataArray = new Array();
var MeasureStep = 0;
var feature = 1;    
var socket = io.connect();
var MyMeasureObject;
var MaxPointsToTake = 0;
var settingUnits;
var maxSteps = [0,2,2,2,2,2,2,4,4,3,2,4,3]; // number of subfeatures for each measurement
var maxChkPts = [0,10,9,9,10]; // number of points for each checkout
var maxCalPts = [0,20,15,36]; // number of points for each calibration
// indexed array of measurements.
var MeasureName = ["Invalid", "MeasureACircle", "MeasureASlot", "MeasureARectangle", "MeasureAnExtCircle", "MeasurePtToPt",
"MeasurePlnToPln", "MeasureCirtoCir", "MeasurePtToLine", "MeasurePtToPln", "MeasureAngle2PLn", 
"MeasureAngle2Lines", "MeasureAngleLin2Pln"];
var CheckoutName = ["Invalid", "Point Checkout", "Plane Checkout", "Sphere Checkout", "Length Checkout"];
var CalibrationName = ["Invalid", "Calibration - Point", "Calibration - Plane", "Calibration - Sphere"];
var MeasureObject = [MeasureACircle, MeasureACircle, MeasureASlot, MeasureARectangle, MeasureAnExtCircle, MeasurePtToPt,MeasurePlnToPln, MeasureCirtoCir, MeasurePtToLine, MeasurePtToPln, MeasureAngle2PLn, 					MeasureAngle2Lines, MeasureAngleLin2Pln];
var SphereDiameter = 25.0;
$(document).ready(function() {
	GetSettings();
	var MeasureType =  localStorage.getItem('MeasureType');
	$("#measurePlaneNextButton .btn-blue").css('background','#F1F1F1');
	$(".pointsContainer .btn-green").css('background','#F1F1F1');
	$(".diameterContainer").hide();
	if(MeasureType=="holeDiameter"){
		SetMeasurement(Measurements.MeasureACircle);
		$("#headerText").html("Measure Circle")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Circle");
		$("#selectedIconId").attr("src","../images/circle_breadcrumb_200x200.png")
		$("#measureTextId2").html("Take at least 3 points on the Circle and click Calculate or Arm Button 3")
		$("#measureTypeImage").attr("src","../images/circle_Img.png")
		$("#measureTypeTitle").html("Circle Hole")
		$("#measureTitleText").html("Step 2:  Measure the Circle")
		$("#pointsRequire2").val("3");
		$("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="slotDimensions"){
		SetMeasurement(Measurements.MeasureASlot)
		$("#headerText").html("Measure Slot")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Slot");
		$("#measureTextId").html("Take at least 3 points on the Plane and click Next or Arm Button 3");
		$("#selectedIconId").attr("src","../images/measure_slot_200x200.png");
		$("#measureTypeImage").attr("src","../images/slotImage.png")
		$("#measureTypeTitle").html("Slot")
		$("#measureTitleText").html("Step 2: Measure the Slot")
		$("#measureTextId2").html("Take at least 10 points on the Slot and click Calculate or Arm Button 3");
		$("#pointsRequire2").val("10");
		$("#resultId").html('<h2>Slot length is</h2><h1 id="diameterId"></h1><h2>Slot width is</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="rectangleDimensions"){
		SetMeasurement(Measurements.MeasureARectangle);
		$("#headerText").html("Measure Rectangle")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Rectangle");
		$("#selectedIconId").attr("src","../images/rectangle_breadcrumb_200x200.png")
		$("#measureTextId2").html("Take two points on a major side, then one point each of the remaining sides in a cw or a ccw and click Calculate or Arm Button 3") 
		$("#measureTypeImage").attr("src","../images/RectangleImage.png")
		$("#measureTypeTitle").html("Rectangle")
		$("#measureTitleText").html("Step 2: Measure the Rectangle")
		$("#pointsRequire2").val("5"); //Should be 4 here for rectangle 
		$("#resultId").html('<h2>Slot length is:</h2><h1 id="diameterId"></h1><h2>Slot width is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="diameterOfAShaft"){
		SetMeasurement(Measurements.MeasureAnExtCircle)
		$("#headerText").html("Measure Shaft")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Shaft");
		$("#selectedIconId").attr("src","../images/shaft_breadcrumb_200x200.png")
		$("#measureTextId").html("Take at least 3 points on the Plane and click Next or Arm Button 3") 
		$("#measureTextId2").html("Take at least 3 points on the Plane and click Calculate or Arm Button 3") ;
		$("#measureTypeImage").attr("src","../images/circle_Img.png")
		$("#measureTypeTitle").html("Shaft");
		$("#measureTitleText").html("Step 2: Measure the Shaft");
		$("#pointsRequire2").val("3");
		$("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="distanceBetweenTwoPoints"){
		SetMeasurement(Measurements.MeasurePtToPt);
		$("#headerText").html("Measure Distance Between Two Points");
		$("#step1_measureTypeTitle").html("Point");		   
		$("#step1_measureTitleText").html("Step 1: Take a Point");
		$("#step1_measureTypeImage").attr("src","../images/PointImage.png");
		$("#measureTextId").html("Take a point and click Next or Arm Button 3") 
		$("#measureTextId2").html("Take a point and click Calculate or Arm Button 3") 
		$("#selectedIconId").attr("src","../images/points_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/PointImage.png");
		$("#measureTitleText").html("Step 2: Take the next Point");
		$("#pointsRequire").val("1");
		$("#pointsRequire2").val("1");
		$("#resultId").html('<h2>Distance Between points is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="distanceBetweenTwoSurfaces"){
		SetMeasurement(Measurements.MeasurePlnToPln)
		$("#headerText").html("Measure Distance Between Two Surfaces")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Surface");
		$("#selectedIconId").attr("src","../images/surface_breadcrumb_200x200.png")
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3")
		$("#measureTextId2").html("Take at least 3 points on the plane and click Calculate or Arm Button 3")
		$("#measureTypeImage").attr("src","../images/planePoints.png")
		$("#measureTypeTitle").html("Plane")
		$("#measureTitleText").html("Step 2: Measure the next Plane");
		$("#pointsRequire2").val("3");
		$("#resultId").html('<h2>Distance Between plane is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="distanceBetweenTwoCirclesHoles"){
		SetMeasurement(Measurements.MeasureCirtoCir)
		$("#headerText").html("Measure Distance Between Two Circles")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the first Circle");
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3")
		$("#measureTextId2").html("Take at least 3 points on the Circle and click Next or Arm Button 3")
		$("#selectedIconId").attr("src","../images/holes_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/circle_Img.png")
		$("#measureTypeTitle").html("Circle Hole")
		$("#measureTitleText").html("Step 2: Measure the First Circle");
		$("#pointsRequire2").val("3");
		$("#pointsRequire3").val("3");
		$("#pointsRequire4").val("3");
		$("#measureTextId3").html("Take at least 3 points on the plane and click Next or Arm Button 3");
		$("#step3_measureTypeImage").attr("src","../images/planePoints.png"); 
		$("#step3_measureTitleText").html("Step 3: Measure the Plane of the second Circle");
		$("#step3_measureTypeTitle").html("Plane");		 
		$("#measureTextId4").html("Take at least 3 points on the Circle and click Calculate or Arm Button 3");
		$("#step4_measureTypeImage").attr("src","../images/circle_Img.png"); 
		$("#step4_measureTitleText").html("Step 4: Measure the second Circle");
		$("#step4_measureTypeTitle").html("Circle Hole");
		$("#resultId").html('<h2>Distance Between holes is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="distancePointToLine"){
		SetMeasurement(Measurements.MeasurePtToLine)	     
		$("#headerText").html("Measure Distance From a Point to a Line")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Line");
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3")
		$("#measureTextId2").html("Take a min of two poitns to define a line")
		$("#selectedIconId").attr("src","../images/pointtoline_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/line.png")
		$("#measureTypeTitle").html("Line")
		$("#measureTitleText").html("Step 2: Measure the Line");
		$("#pointsRequire2").val("2");
		$("#pointsRequire3").val("3");
		$("#pointsRequire4").val("1");
		$("#measureTextId3").html("Take at least 3 points on the plane and click Next or Arm Button 3");
		$("#step3_measureTypeImage").attr("src","../images/planePoints.png"); 
		$("#step3_measureTitleText").html("Step 3: Measure the Plane of the Point");
		$("#step3_measureTypeTitle").html("Plane");		 
		$("#measureTextId4").html("Take a point and click Next or Arm Button 3");
		$("#step4_measureTypeImage").attr("src","../images/PointImage.png"); 
		$("#step4_measureTitleText").html("Step 4: Take a Point");
		$("#step4_measureTypeTitle").html("Point");
		$("#resultId").html('<h2>Distance Between point and line is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="distancePointToPlaneSurface"){
		SetMeasurement(Measurements.MeasurePtToPln) 
		$("#headerText").html("Measure Distance From a Point to Surface")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Surface");
		$("#selectedIconId").attr("src","../images/pointtosurface_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/planePoints.png")
		$("#measureTypeTitle").html("Plane")
		$("#measureTitleText").html("Step 2: Measure the Plane of the Point");
		$("#pointsRequire2").val("3");
		$("#measureTextId").html("Take at least 3 points on the Plane and click Next or Arm Button 3");
		$("#measureTextId2").html("Take at least 3 points on the Plane and click Next or Arm Button 3");
		$("#measureTextId3").html("Take a single point and click Calculate or Arm Button 3");
		$("#pointsRequire3").val("1");
		$("#measureTextId3").html("Take a point");
		$("#step3_measureTypeImage").attr("src","../images/PointImage.png");
		$("#step3_measureTitleText").html("Step 3: Measure Distance From a Point to a Plane");
		$("#step3_measureTypeTitle").html("Point");
		$("#resultId").html('<h2>Distance From a Point to a Plane is:</h2><h1 id="diameterId"></h1>');
	}else if(MeasureType=="angleBetweenTwoSurfaces"){
		SetMeasurement(Measurements.MeasureAngle2PLn);
		$("#headerText").html("Measure Angle Between Two Surfaces");
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the first Surface");
		$("#selectedIconId").attr("src","../images/angle_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/planePoints.png")
		$("#measureTypeTitle").html("Plane")
		$("#measureTitleText").html("Step 2: Measure the Plane of the second Surface");
		$("#pointsRequire2").val("3");
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3")
		$("#measureTextId2").html("Take at least 3 points on the plane and click Calculate or Arm Button 3")
		$("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId"><h1>');
	}else if(MeasureType=="angleBetweenTwoLinesEdges"){
		SetMeasurement(Measurements.MeasureAngle2Lines)
		$("#headerText").html("Measure Angle Between Two Lines");
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the First Line");
		$("#selectedIconId").attr("src","../images/angle_lines_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/line.png")
		$("#measureTypeTitle").html("Line");
		$("#measureTitleText").html("Step 2: Measure the first Line");
		$("#pointsRequire2").val("2");
		$("#pointsRequire3").val("3");
		$("#measureTextId3").html("Take at least 3 points on the plane and click Next or Arm Button 3");
		$("#step3_measureTypeImage").attr("src","../images/planePoints.png"); 
		$("#step3_measureTitleText").html("Step 3: Measure the Plane of the second Line");
		$("#step3_measureTypeTitle").html("Plane");
		$("#pointsRequire4").val("2");
		$("#measureTextId4").html("Take at least min of two points to define a line");
		$("#step4_measureTypeImage").attr("src","../images/line.png"); 
		$("#step4_measureTitleText").html("Step 4: Measure the second Line");
		$("#step4_measureTypeTitle").html("Line");
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3")
		$("#measureTextId2").html("Take at least min of two points to define a line")
		$("#resultId").html('<h2>Angle between Lines is:</h2><h1 id="diameterId"><h1>');
	}else if(MeasureType=="angleBetweenLineAndSurface"){
		SetMeasurement(Measurements.MeasureAngleLin2Pln)
		$("#headerText").html("Measure Angle Between Line And Surface")
		$("#step1_measureTitleText").html("Step 1: Measure the Plane of the Surface");
		$("#selectedIconId").attr("src","../images/angleline_breadcrumb_200x200.png")
		$("#measureTypeImage").attr("src","../images/planePoints.png")
		$("#measureTypeTitle").html("Plane");
		$("#measureTitleText").html("Step 2: Measure the Plane of the Line");
		$("#pointsRequire2").val("3");
		$("#measureTextId").html("Take at least 3 points on the plane and click Next or Arm Button 3");
		$("#measureTextId2").html("Take at least 3 points on the plane and click Next or Arm Button 3");
		$("#pointsRequire3").val("2");
		$("#measureTextId3").html("Take at least min of two points to define a line");
		$("#step3_measureTypeImage").attr("src","../images/line.png"); 
		$("#step3_measureTitleText").html("Step 3: Measure the Line");
		$("#step3_measureTypeTitle").html("Line");
		$("#resultId").html('<h2>Angle between Lines and Surface is:</h2><h1 id="diameterId"><h1>');
	} 
	$("#saveCircleButton").click(function(){
		saveInLogFile($("#headerText").html(),resultString,dataArray);
	})
	$("#saveAlert #closePopUp").click(function(){
		$("#saveAlert").css("display","none");
		$("#saveCircleButton").hide();
	})
	readJsonFile();
});

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

socket.on('Result', function(data){   
    console.log("data valid: "+data.Valid);
	if(data.Valid == 0)
	{	
		  $("#measureFail #popUpText").html("Invalid Data");
          $("#measureFail").css('display','block');
          $("#measureFail #closePopUp").click(function(){
	      	gotoMeasurePage();
          });
		  string = "Calculation failed";
	}
	else
	{
		$(".diameterContainer").show();
		if(MyMeasureObject.Type == "Calibration")
		{
			string = "\nResidual: " + data.Residual;
			string += "\n\nSave Data?";
			alert(string);
			YesNo.response = 0;
			socket.emit('client_data', YesNo);
		}
		else
		{
			string = "\nDiameter: " + data.Diameter;
			string += "\nMindev: " + data.Mindev;
			string += "\nMaxdev: " + data.Maxdev;
			string += "\nAveragedev: " + data.Averagedev;
			string += "\nXRange2: " + data.XRange2;
			string += "\nYRange2: " + data.YRange2;
			string += "\nZRange2: " + data.ZRange2;
			string += "\nMinimum: " + data.Minimum;
			string += "\nMaximum: " + data.Maximum;
			string += "\nAverage: " + data.Average;
			string += "\nRange2: " + data.Range2;
			string += "\nLength: " + data.Length;
			string += "\nWidth: " + data.Width;
			string += "\nDistance: " + data.Distance;
			string += "\nDegrees: " + data.Degrees;
			string += "\nStandardDeviation: " + data.StandardDeviation;
			string += "\nBest Fit: " + data.BestFit;
			var resultDiameter,resultLength,resultWidth,resultDistance,resultAngle;
			
			if(dataUnits=="inch"){
				resultDiameter  = Number(String(math.eval(data.Diameter+' mm to inch')).split("inch")[0]).toFixed(4);
				resultLength =Number(String(math.eval(data.Length.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);
				resultWidth = Number(String(math.eval(data.Width.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);
				resultDistance = Number(String(math.eval(data.Distance.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);
				resultAngle = String(math.eval(data.Degrees+' mm to inch')).split("inch")[0];
			}else{
				resultDiameter  = data.Diameter.toFixed(4);
				resultLength = data.Length.toFixed(4);
				resultWidth = data.Width.toFixed(4);
				resultDistance = data.Distance.toFixed(4);
				resultAngle = data.Degrees.toFixed(4);
				resultAngle = data.Degrees.toFixed(4);
			}

			switch(MeasureName[feature])
			{
				case "MeasureACircle":
						$("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId">'+resultDiameter+" "+dataUnits+'</h1>');
						resultString = "Circle Diameter is: "+resultDiameter+" "+dataUnits;
						break;
				case "MeasureASlot":
						$("#resultId").html('<h2>Slot length is:</h2><h1 id="diameterId">'+resultLength+" "+dataUnits+'</h1><h2>Slot width is:</h2><h1 id="diameterId">'+resultWidth+" "+dataUnits+'</h1>');
						resultString = "Slot length is: "+resultLength+" "+dataUnits+" Slot width is: "+resultWidth+" "+dataUnits;
						break;
				case "MeasureARectangle":
						$("#resultId").html('<h2>Slot length is:</h2><h1 id="diameterId">'+resultLength+" "+dataUnits+'</h1><h2>Slot width is:</h2><h1 id="diameterId">'+resultWidth+" "+dataUnits+'</h1>');
						resultString = "Rectangle length is: "+resultLength+" "+dataUnits+" Rectangle width is: "+resultWidth+" "+dataUnits;
						break;
				case "MeasureAnExtCircle":
						$("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId">'+resultDiameter+" "+dataUnits+'</h1>');
						resultString = "Circle Diameter is: "+resultDiameter+" "+dataUnits ;
						break;
				case "MeasurePtToPt":
						$("#resultId").html('<h2>Distance Between points is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
						resultString = "Distance Between points is: "+resultDistance+" "+dataUnits ;
						break;
				case "MeasurePlnToPln":
						$("#resultId").html('<h2>Distance Between plane is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
						resultString = "Distance Between planes is: "+resultDistance+" "+dataUnits ;
						break;
				case "MeasureCirtoCir":
						$("#resultId").html('<h2>Distance Between holes is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
						resultString = "Distance Between holes is: "+resultDistance+" "+dataUnits;
						break;
				case "MeasurePtToLine":
						$("#resultId").html('<h2>Distance Between point and line is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
						resultString = "Distance Between point and line is: "+resultDistance+dataUnits;
						break;
				case "MeasurePtToPln":
						$("#resultId").html('<h2>Distance From a Point to a Plane is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
						resultString = "Distance From a Point to a Plane is: "+resultDistance+dataUnits;
						break;
				case "MeasureAngle2PLn":
						$("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
						resultString = "ngle between Surfaces is: "+resultAngle+" Degree";
						break;
				case "MeasureAngle2Lines":
						$("#resultId").html('<h2>Angle between line is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
						resultString = "Angle between line is: "+resultAngle+" Degree";
						break;
				case "MeasureAngleLin2Pln":
						$("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
						resultString = "Angle between line and plance is: "+resultAngle+" Degree";  
						break;
			}
		}
	}
});

socket.on('DRO', function(data){
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
		/* Increment current measure step conditionally*/
		var curTaken,curRequired;
		if(MeasureStep==0){
			curTaken = document.getElementById("pointsTakenId").value;
			curRequired = document.getElementById("pointsRequire").value;
		} 
		else if(MeasureStep==1)
		{
			curTaken = document.getElementById("pointsTakenId2").value;
			curRequired = document.getElementById("pointsRequire2").value;
		}
		else if(MeasureStep==2){
			curTaken = document.getElementById("pointsTakenId3").value;
			curRequired = document.getElementById("pointsRequire3").value;
		}
		else if(MeasureStep==3){
			curTaken = document.getElementById("pointsTakenId4").value;
			curRequired = document.getElementById("pointsRequire4").value;
		}
		if(parseInt(curTaken) >= parseInt(curRequired)){
			if(MeasureStep==0){
				$("#measurePlaneNextButton").trigger("click");      
			}
			else if(MeasureStep==1){
				if(MeasureStep == maxSteps[feature] - 1){
					$("#CalculateResultId").trigger("click");
				}else{
					$("#TempNextButton").trigger("click");
				}                             
			}
			else if(MeasureStep==2){
				if(MeasureStep == maxSteps[feature] - 1){
					$("#CalculateResultId3").trigger("click");
				}else{
					$("#TempNextButton3").trigger("click");	
				}
			}
			else if(MeasureStep==3){
				$("#CalculateResultId4").trigger("click");            	
			}
	
			if(MeasureStep==0){
				var elem = document.getElementById("pointsTakenId");
			} 
			else if(MeasureStep==1){
				elem = document.getElementById("pointsTakenId2");
			} 
			else if(MeasureStep==2){
				elem = document.getElementById("pointsTakenId3");
			} 
			else if(MeasureStep==3){
				elem = document.getElementById("pointsTakenId4");
			}			

			if(elem){		    
				NextStepSound();
				MeasureStep++;		
				elem.value = 0;
			}
			return;
		}
		else{				
			return;
		}
		/*End of increment current measure steps conditionally*/
		if(MeasureStep == maxSteps[feature]){
		//	MeasureFeature();
		}
		else
		{	
			f.value = MeasureStep + 1;
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
});


socket.on('Settings', function(data){
	settingObject.SSID = data.SSID;
	settingObject.PASSWORD = data.PASSWORD;
	settingObject.CHANNEL = data.CHANNEL;
	settingObject.VOLUME = data.VOLUME;
	settingObject.BARLENGTH = data.BARLENGTH;
	settingObject.SPHEREDIAMETER = data.SPHEREDIAMETER;
	if(data.HAPTIC == 0)
		settingObject.HAPTIC = 0;
	if(data.HEADLIGHT == 0)
		settingObject.HEADLIGHT = 0;
	if(data.UNITS == 0){
		dataUnits="mm"
		settingObject.dataUnits=0;
	}else{
		dataUnits='inch'
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
	console.log("PROBE.PID:"+data.PID);
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
	if(data.Saved == 0)
		string = "Probe Specs not saved.";
	else
		string = "Probe Specs saved.";
});

var pts1 = []; 
var pts2 = []; 
var pts3 = []; 
var pts4 = []; 

function TakeAPoint(data)
{
	TakePointSound();
	var x = {"X": data.X, "Y":data.Y, "Z": data.Z, "I": data.I, "J": data.J, "K": data.K, "ANGLES": data.ANGLES, "RawPositions" : data.RawPositions};	
	if(MeasureStep==0){
		var elem = document.getElementById("pointsTakenId");
	}else if(MeasureStep == 1){     
		elem = document.getElementById("pointsTakenId2");
	}else if(MeasureStep == 2){
		elem = document.getElementById("pointsTakenId3");
	}else if(MeasureStep == 3){
		elem = document.getElementById("pointsTakenId4");
	}
	switch(MeasureStep)
	{
		case 0:
			pts1.push(x);
			$("#pointsTakenId").val(pts1.length);
			elem.value = pts1.length;
			// special case for calibration and checkout.
			if(MaxPointsToTake != 0 && MaxPointsToTake == pts1.length)
				MeasureFeature();
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
		if(pts1.length >= parseInt($("#pointsRequire").val()) ){
			$("#measurePlaneNextButton .btn-blue").css('background','#0474b2');
			$("#measurePlaneNextButton").click(function(){
				$("#step1Id").css("display","none");
				$("#step2Id").css("display","block");
			}); 
		} 
	}
	else if(MeasureStep==1){                    
		$("#pointsTakenId2").val(pts2.length);
		if( parseInt($("#pointsTakenId2").val()) >= parseInt($("#pointsRequire2").val()) ){
			if(MeasureStep == maxSteps[feature] - 1){
				$(".pointsContainer .btn-green").css('background','#1db79b');          
				$("#CalculateResultId").click(function(){
					showResult();
				});
			}else{               	   
				$('#CalculateResultId').css('display','none');
				$("#TempNextButton").css('display','block');
				$("#TempNextButton .btn-blue").css('background','#0474b2');            
				$("#TempNextButton").click(function(){
					$("#step1Id").css("display","none");
					$("#step2Id").css("display","none");
					$("#step3Id").css("display","block");
				});
			}       	   
		}    

	}else if(MeasureStep==2){

		if( parseInt($("#pointsTakenId3").val()) >= parseInt($("#pointsRequire3").val()) ){
			if(MeasureStep == maxSteps[feature] - 1){
				$(".pointsContainer .btn-green").css('background','#1db79b');          
				$("#CalculateResultId3").click(function(){
					showResult();
				});
			}else{
				$('#CalculateResultId3').css('display','none');
				$("#TempNextButton3").css('display','block');
				$("#TempNextButton3 .btn-blue").css('background','#0474b2');            
				$("#TempNextButton3").click(function(){
					$("#step1Id").css("display","none");
					$("#step2Id").css("display","none");
					$("#step3Id").css("display","none");
					$("#step4Id").css("display","block");
				});
			}
		}    
	}else if(MeasureStep==3){
		if( parseInt($("#pointsTakenId4").val()) >= parseInt($("#pointsRequire4").val()) ){
			$(".pointsContainer .btn-green").css('background','#1db79b');
			$("#CalculateResultId4").click(function(){
				showResult();
			});
		}         
	}
}


function EraseAPoint()
{
	ErasePointSound();
	if(MeasureStep==0){
		var elem = document.getElementById("pointsTakenId");
	}else if(MeasureStep==1){
		elem = document.getElementById("pointsTakenId2");
	}else if(MeasureStep==2){
		elem = document.getElementById("pointsTakenId3");
	}else if(MeasureStep==3){
		elem = document.getElementById("pointsTakenId4");
	}
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
			pts4.pop();
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

function NextStepSound(){
	sound.Frequency = 850;
	sound.Duration = 50;
	sound.Volume = 100;
	socket.emit('client_data', sound);
};

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
}

function SetCalibration(meas)
{
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

function SetSettings()
{
}

function showResult(){
	$(".pointsContainer .btn-green").css('background','#F1F1F1'); 
	$(".pointsContainer .btn-red").css('background','#F1F1F1'); 
	$("#measureTextId2").addClass("grayFont");
	$("#measureTextId3").addClass("grayFont");
	$("#measureTextId4").addClass("grayFont");
	$( "#measureDetails2CancelButton").unbind( "click" );
	$( "#measureDetails3CancelButton").unbind( "click" );
	$( "#measureDetails4CancelButton").unbind( "click" );
	MeasureFeature();
}
socket.on('writeDone', function(data){
	$("#saveAlert").css("display","block");
});
