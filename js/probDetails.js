    var armObject = new Object();
    var settingObject = new Object();
    var droObject = new Object();
    var probeObject = new Object();
    var pointsNeededVal=0;
    var probType="";
    var dataArray = new Array();
    var probeResultStr="";
    var continueFlag=false;
    var firstData;
    var firstSphereData = {"Type":"DRO","X":-145.13739,"Y":-369.68768,"Z":40.82619,"I":-0.28302,"J":0.09389,"K":0.95451,"Angles":[0.017343,-0.373664,0.022971,0.403598,1.715187,0.058023,0],"RawPositions":[197814366,511546544,511129770,82757319,271951044,494937407,507539223,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};
    var firstPlaneData = {"Type":"DRO","X":-406.904,"Y":330.517,"Z":-5.825,"I":0,"J":0,"K":0,"Angles":[-0.042997,-0.272257,-0.049351,0.354835,1.565268,0.012169,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};
    var firstPointData = {"Type":"DRO","X":-381.479,"Y":327.538,"Z":67.493,"I":0,"J":0,"K":0,"Angles":[0.131632,-0.277477,0.012158,0.316782,1.518734,1.027166,0],"RawPositions":[0,0,0,0,0,0,0,0],"Rate":1000,"Button1":0,"Button2":0,"Button3":0};


 var testData;
 var testSphereData7 = [
 				  [-0.200066, -0.517034,  0.071774,  0.613872, -0.382339, -0.129901,  0.300894, 0],
 				  [-0.205871, -0.518700,  0.039142,  0.591352, -0.360505, -0.114586,  0.334030, 0],
 				  [-0.183865, -0.517974,  0.038759,  0.536221, -0.399613, -0.051940,  0.309640, 0],
 				  [-0.173969, -0.523561,  0.056502,  0.551580, -0.409213, -0.026094,  0.266617, 0],
 				  [-0.173088, -0.542458,  0.032944,  0.581577, -0.391017, -0.015026,  0.281560, 0],
 				  [-0.167068, -0.544401,  0.004470,  0.574270, -0.387903, -0.012554,  0.317331, 0],
 				  [-0.166225, -0.546100,  0.011617,  0.550670, -0.404917,  0.009491,  0.317106, 0],
 				  [-0.164181, -0.544891,  0.025003,  0.551606, -0.415661,  0.025143,  0.298387, 0],
 				  [-0.167330, -0.548109,  0.016906,  0.551566, -0.406839,  0.033206,  0.298791, 0],
 				  [-0.235927, -0.525569,  0.086846,  0.599049, -0.188591, -0.052304,  1.453567, 0],
 				  [-0.239229, -0.523913,  0.053693,  0.565397, -0.170934, -0.018108,  1.486380, 0],
 				  [-0.217926, -0.519233,  0.050836,  0.528272, -0.176707, -0.003791,  1.480299, 0],
 				  [-0.185551, -0.520467,  0.056344,  0.541146, -0.209505,  0.022978,  1.449372, 0],
 				  [-0.185686, -0.540425,  0.032105,  0.565829, -0.203243,  0.053946,  1.464978, 0],
 				  [-0.185293, -0.543304,  0.006916,  0.555956, -0.186850,  0.054811,  1.484439, 0],
 				  [-0.183305, -0.543571,  0.008290,  0.543296, -0.179116,  0.041037,  1.484537, 0],
 				  [-0.178967, -0.544210,  0.031869,  0.544400, -0.209801,  0.068891,  1.473223, 0],
				  [-0.179304, -0.548617,  0.015876,  0.547882, -0.200335,  0.071108,  1.480439, 0],
				  [-0.171961, -0.526197,  0.007130,  0.568802,  0.016560,  0.053265,  2.761934, 0],
				  [-0.171191, -0.525281, -0.023352,  0.548633, -0.010417,  0.072842,  2.819727, 0],
				  [-0.172471, -0.520348, -0.009453,  0.508687, -0.045139,  0.071916,  2.892674, 0],
				  [-0.162806, -0.520675,  0.027021,  0.524300, -0.178378,  0.062541,  2.983043, 0],
				  [-0.144364, -0.541796, -0.015560,  0.557880, -0.269719,  0.080411,  3.051305, 0],
				  [-0.141006, -0.543997, -0.036702,  0.548586, -0.272427,  0.079785,  3.056377, 0],
				  [-0.150880, -0.543834, -0.019738,  0.531905, -0.270927,  0.070015,  3.062366, 0],
				  [-0.150927, -0.544768,  0.002924,  0.540800, -0.296507,  0.067442,  3.063768, 0],
				  [-0.148451, -0.548349, -0.015465,  0.544906, -0.306430,  0.075708,  3.072970, 0],
				  [-0.209290, -0.518615,  0.076887,  0.526277, -2.058199,  0.043032,  0.400974, 0],
				  [-0.212975, -0.512224,  0.049222,  0.505861, -2.042445,  0.040489,  0.401576, 0],
				  [-0.209238, -0.512236,  0.071583,  0.464779, -2.054589,  0.019780,  0.401527, 0],
				  [-0.192779, -0.516403,  0.098744,  0.485939, -2.079417, -0.003092,  0.401596, 0],
				  [-0.200352, -0.533690,  0.082877,  0.520270, -2.034725,  0.002696,  0.403113, 0],
				  [-0.212171, -0.533545,  0.070604,  0.507083, -2.018868, -0.006623,  0.404613, 0],
				  [-0.209396, -0.528845,  0.078294,  0.475942, -2.051840,  0.010633,  0.406379, 0],
				  [-0.209011, -0.535590,  0.103692,  0.492735, -2.055721, -0.007171,  0.406635, 0],
				  [-0.215540, -0.541151,  0.098459,  0.500008, -2.050850, -0.007201,  0.408060, 0]
				];



var testSphereData6  = [
							[0.017343, -0.373664,  0.022971,  0.403598,  1.715187,  0.058023, 0],
							[0.012710, -0.381814, -0.001078,  0.376360,  1.811236,  0.056319, 0],
							[0.023065, -0.368456,  0.020406,  0.338459,  1.766062,  0.100447, 0],
							[0.029579, -0.373848,  0.032839,  0.365580,  1.694334,  0.027314, 0],
							[0.027000, -0.390859,  0.010473,  0.400157,  1.707828,  0.047751, 0],
							[0.027230, -0.391318, -0.000085,  0.389658,  1.733239,  0.100199, 0],
							[0.026060, -0.392353,  0.020684,  0.368372,  1.741754,  0.118536, 0],
							[0.028425, -0.389224,  0.033983,  0.381723,  1.706274,  0.077606, 0],
							[0.027641, -0.395768,  0.018805,  0.388834,  1.708104,  0.077086, 0],
							[0.025688, -0.372978,  0.029333,  0.433575,  2.950362,  0.069944, 0],
							[0.015813, -0.372884,  0.000639,  0.399796,  3.024338,  0.052575, 0],
							[0.020345, -0.371470,  0.030608,  0.371708,  3.068358,  0.073678, 0],
							[0.021364, -0.371240,  0.062195,  0.400939,  3.018770,  0.065120, 0],
							[0.022489, -0.388854,  0.023610,  0.414762,  2.990462, -0.039754, 0],
							[0.024270, -0.390104, -0.000489,  0.399641,  3.000284, -0.024056, 0],
							[0.023404, -0.390957,  0.018570,  0.390054,  3.032798,  0.061451, 0],
							[0.017554, -0.394416,  0.050689,  0.408662,  3.014283,  0.038035, 0],
							[0.021016, -0.398611,  0.022028,  0.408342,  3.020151,  0.024648, 0],
							[0.038095, -0.381369, -0.026289,  0.452165, -1.569927,  0.065710, 0],
							[0.031147, -0.376934, -0.055784,  0.416672, -1.519542,  0.057546, 0],
							[0.036060, -0.375501, -0.023752,  0.386338, -1.566741,  0.034581, 0],
							[0.062820, -0.378062, -0.032161,  0.412065, -1.634677,  0.085950, 0],
							[0.077021, -0.393383, -0.078890,  0.446539, -1.618024,  0.128754, 0],
							[0.076788, -0.394044, -0.100325,  0.432205, -1.587921,  0.090820, 0],
							[0.077408, -0.394686, -0.083237,  0.414334, -1.608520,  0.074828, 0],
							[0.080410, -0.395486, -0.067083,  0.430404, -1.643985,  0.082602, 0],
							[0.078878, -0.398529, -0.086048,  0.436656, -1.625875,  0.083260, 0],
							[0.016865, -0.374591,  0.012511,  0.437767,  0.203518, -0.090208, 0],
							[0.024030, -0.377323, -0.003369,  0.402149,  0.224703, -0.110431, 0],
							[0.015600, -0.377017,  0.020488,  0.381897,  0.196158, -0.119599, 0],
							[0.011162, -0.378558,  0.045030,  0.415661,  0.185978, -0.103097, 0],
							[0.031559, -0.393863,  0.039062,  0.425769,  0.236688, -0.053728, 0],
							[0.032640, -0.394298,  0.024933,  0.406112,  0.241255, -0.047906, 0],
							[0.033444, -0.385548,  0.046311,  0.388110,  0.211363, -0.094457, 0],
							[0.040486, -0.390718,  0.068905,  0.405850,  0.215393, -0.066144, 0],
							[0.043800, -0.396186,  0.052353,  0.403765,  0.235512, -0.032680, 0]

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
				[0.180210, -0.348318,  0.084704,  0.290458,  1.538086,  1.132185, -1.486460, 0],
				[0.002469, -0.419826, -0.030796,  0.550796, -2.882466,  0.829761, -3.122348, 0],
				[0.061110, -0.422709,  0.020823,  0.570157, -2.967837,  0.812749, -3.109309, 0],
				[0.029303, -0.418484,  0.010520,  0.460310, -2.907415,  0.737362,  3.137163, 0],
				[0.079193, -0.384534, -0.057525,  0.199257,  0.196134,  0.887596,  0.026550, 0],
				[0.107272, -0.385733,  0.016230,  0.213726,  0.122537,  0.912221, -0.058383, 0],
				[0.093263, -0.353258, -0.025478,  0.064473,  0.085148,  1.052007,  0.030997, 0]
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
				[0.311420, -0.165418, -0.325655,  0.214783,  1.217712,  0.705734, 0],
				[-0.845042,  0.310464,  1.219844,  0.276090,  0.824561,  1.150914, 0],
				[-0.763763,  0.341278,  1.235219,  0.298837,  0.818780,  1.077911, 0],
				[-0.751799,  0.278332,  1.224754,  0.147763,  0.811533,  1.079648, 0],
				[0.633980,  0.118666, -0.928348,  0.571096,  0.031762, -0.862188, 0],
				[0.719250,  0.099278, -0.881535,  0.566276, -0.046096, -0.823349, 0],
				[0.621965,  0.077846, -0.923757,  0.428283,  0.026286, -0.821411, 0]
				];


var testPointData7 = [

				[0.138228, -0.377212,  0.227026,  0.302831,  1.427715,  1.395343, -1.467636, 0],
				[0.101332, -0.436963,  0.216047,  0.338275,  1.435942,  1.071475, -1.473870, 0],
				[0.052116, -0.513021,  0.072344,  0.396075,  1.491882,  0.250747, -1.402347, 0],
				[-0.036450, -0.485143,  0.038429,  0.353785, -1.238693,  0.594951,  1.460954, 0],
				[-0.114300, -0.413935,  0.046458,  0.292851, -1.211682,  1.040394,  1.490025, 0],
				[-0.175249, -0.379223,  0.123835,  0.254863, -1.096340,  1.133137, -1.727899, 0],
				[-0.173432, -0.434135,  0.181949,  0.303180, -1.029602,  0.779886, -1.713353, 0],
				[0.071117, -0.515534,  0.034918,  0.424828, -0.458226,  0.035750, -2.261719, 0],
				[0.120027, -0.468411,  0.148466,  0.415991,  1.753974,  0.878676,  1.774287, 0],
				[0.164257, -0.404287,  0.172025,  0.395444,  1.707670,  1.270238,  1.732152, 0],
				[0.043872, -0.369188,  0.089402,  0.046362,  0.096795,  1.347245, -0.005503, 0],
				[0.027223, -0.427022,  0.098561,  0.139178,  0.086145,  1.031501,  0.070999, 0],
				[0.016707, -0.496925,  0.074336,  0.311398, -0.148339,  0.460919,  0.321516, 0],
				[0.101979, -0.510631, -0.061815,  0.463897, -2.552861,  0.461315,  2.636333, 0],
				[0.096741, -0.476437, -0.063250,  0.559052, -2.855122,  0.904204,  3.014854, 0],
				[0.003967, -0.483076,  0.070212,  0.546970, -2.941156,  0.807393,  0.036850, 0],
				[-0.006902, -0.503925,  0.093541,  0.489940, -2.925167,  0.521531,  0.030455, 0],
				[0.001238, -0.510478,  0.105764,  0.394321, -2.935071,  0.124654,  0.047905, 0],
				[0.043677, -0.465044,  0.082276,  0.215724, -2.988800, -0.496479,  0.038747, 0],
				[0.060772, -0.378331,  0.077960,  0.059542, -3.002216, -1.018482, -0.014527, 0]
				];

var testPointData6 = [

				[0.131632, -0.277477,  0.012158,  0.316782,  1.518734,  1.027166, 0],
				[0.161216, -0.313017, -0.083252,  0.335844,  1.494162,  0.583619, 0],
				[0.079936, -0.347703, -0.078219,  0.352171,  1.550385,  0.024690, 0],
				[0.001204, -0.322907, -0.100418,  0.337667,  1.601320, -0.639412, 0],
				[0.033841, -0.289202, -0.196212,  0.319625,  1.618988, -0.985051, 0],
				[-0.145779, -0.278997,  0.037677,  0.337615, -1.299264,  0.953440, 0],
				[-0.142803, -0.324234,  0.096650,  0.380097, -1.363330,  0.483543, 0],
				[0.023504, -0.351184, -0.052132,  0.398200, -1.466396,  0.170970, 0],
				[0.070813, -0.322334,  0.039509,  0.395868, -1.542859, -0.670463, 0],
				[0.107317, -0.284618,  0.038519,  0.380631, -1.571136, -1.014898, 0],
				[-0.006631, -0.219728,  0.034138,  0.102563,  3.036932, -1.400261, 0],
				[-0.000532, -0.278329,  0.022543,  0.179030,  3.010640, -0.962366, 0],
				[0.002989, -0.345668,  0.035744,  0.339755,  3.058466, -0.187069, 0],
				[0.053705, -0.327729, -0.009527,  0.489512,  3.012841,  0.737025, 0],
				[0.086059, -0.279053, -0.040735,  0.526701,  2.973429,  1.207096, 0],
				[0.046126, -0.274583, -0.040580,  0.537553, -0.190025, -1.256839, 0],
				[0.031173, -0.313555, -0.046183,  0.514623, -0.064458, -0.927664, 0],
				[-0.005854, -0.352050, -0.013560,  0.414768,  0.113550, -0.235448, 0],
				[-0.006914, -0.314173, -0.004139,  0.239323,  0.042434,  0.655047, 0],
				[-0.026075, -0.268019,  0.016982,  0.159151,  0.003352,  1.070364, 0]
				];


	var point1;
 
    $(document).ready(function() {

	point1 = 0;
       probType =  localStorage.getItem('ProbType');
      //  $("#measurePlaneNextButton .btn-blue").css('background','#F1F1F1');
     
      $("#CalculateResultId .btn-green").css('background','#F1F1F1');
      

       $(".diameterContainer").hide();
       GetSettings();
    	
      if(probType=="Sphere Method"){
	    console.log("ProbeType is : Sphere Method");
		testData = testSphereData6;
		//testData = testSphereData7;
		firstData = firstSphereData;
         SetCalibration(Calibrations.Sphere)
        
         $("#headerText").html("Probe Calibritaion - Sphere")
         $("#selectedIconId").attr("src","../images/SpherebreadCrumb.png")
         $("#measureTypeImage").attr("src","../images/probCal.png") 
         $("#headerText").html("Probe Calibritaion - Sphere")
         $("#measureTextId2").html("Take "+pointsNeededVal+" points on the plane and click Calculate or Button 3, Click Save Calibration to save your result or click Discard to start over.")  
         $(".pointText").addClass("grayFont");
         $("#pointsRequire2").addClass("grayFont");

         $(".lableClass").addClass("grayFont");
         $("#resultDiv").hide();
         $("#resultButton").hide();
         $("#pointsRequire2").addClass("grayBg");
         $("#CalculateResultId .btn-green").css('background','#F1F1F1');
         $("#checkOutCancelButton .btn-red").css('background','#F1F1F1');
      
       }else if(probType=="Plane Method"){
        console.log("ProbeType is : Plane Method");
		myObjects[1] = "";
		testData = testPlaneData6;
		//testData = testPlaneData7;
		firstData = firstPlaneData;
        SetCalibration(Calibrations.Plane)
        continueFlag=true;
        $("#barRequireId").hide();
        $("#headerText").html("Probe Calibritaion - Plane")   
        $("#selectedIconId").attr("src","../images/plane_200x200.png")
        $("#measureTypeImage").attr("src","../images/probCal.png") 
        $("#measureTextId2").html("Take "+pointsNeededVal+" points on the plane and click Calculate or Button 3, Click Save Calibration to save your result or click Discard to start over.")  
      

       }else if(probType=="Single Point"){
	 console.log("ProbeType is : Single Point Method");
		  myObjects[1] = "";
		testData = testPointData6;
		//testData = testPointData7;
		firstData = firstPointData;

        continueFlag=true;
         SetCalibration(Calibrations.Point)
         $("#barRequireId").hide();
         $("#headerText").html("Probe Calibritaion - Point")
         $("#selectedIconId").attr("src","../images/pointcheckoutBreadCrum.png")
         //$("#measureTypeImage").attr("src","../images/probCal.png") 
         $("#measureTextId2").html("Take "+pointsNeededVal+" points on the plane and click Calculate or Button 3, Click Save Calibration to save your result or click Discard to start over.")  
        }
     
       $("#discardResult").click(function(){

          discardProbeData();
        });

       $("#saveResult").click(function(){
           saveProbeData();
           saveInLogFile("Probe - "+probType ," Residual Value: "+$("#probResultId").html(),dataArray)          
        });


    $("#continueButton").click(function(){
  
     if($("#continueText").val()>0){

       $("#continueButton .btn-green").addClass("grayBg");
      continueFlag=true;

            saveSphereDiameter($("#continueText").val());  

     // $("#pointsRequire2").val(pointNeededVal)
     
      $("#measureDetails2CancelButton .btn-red").css('background','#df443f');
      $("#CalculateResultId .pointsContainer .btn-green").css('background','#F1F1F1');
      $(".pointText").removeClass("grayFont");
      $("#ptsReq").removeClass("lableClass grayFont");
      $("#ptsTk").removeClass("lableClass grayFont");
      $("#pointsRequire2").removeClass("grayFont");



      $("#pointsRequire2").removeClass("grayBg");
      $("#checkOutCancelButton .btn-red").css('background','#df443f');
      $("#ptsReq").removeClass("lableClass"); 

     // $("#instructionText").html('  Take at least '+pointNeededVal+' points and click Calculate or Arm Button 3 to see the result. ')
      $("#probPointsId").html("1/"+pointsNeededVal);
        UpdateAnimationSS(firstData);

    }else{

      $("#probAlert").css('display','block');
      $("#probAlert #popUpText").html("Please enter the require field value")

     }
     })

      $("#saveAlert #closePopUp").click(function(){
           $("#saveAlert").css("display","none");
      })


       $("#closePopUp").click(function(){
           $("#probAlert").css("display","none");

      })


    $("#animation").css("width",$('.planeMeasure').width()+"px");
    $("#animation").css("height",$('.planeMeasure').width()/1.3+"px");
    readJsonFile();
    init();
    loadObjects();
    render();
    if(localStorage["droData"]==null){
        
    }else{
        var droData = JSON.parse(localStorage["droData"]);
        UpdateAnimation(droData);
    }

   
       $("#probAlert #closePopUp").click(function(){
      $("#probAlert").css('display','none');

      });
 



  
});


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
  

    if(MyMeasureObject.Type == "Calibration")
    {
       
       if(dataUnits=="mm"){
       $("#probResultId").html(data.Residual+" "+dataUnits)
       }else{


      var resultStr  = Number(String(math.eval(data.Residual+' mm to inch')).split("inch")[0]).toFixed(4);   
   
      $("#probResultId").html(resultStr+" "+dataUnits)  

     }
     
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
            
             if(dataUnits=="inch"){


                var resultDiameter  = Number(String(math.eval(data.Diameter+' mm to inch')).split("inch")[0]).toFixed(4);
                var resultLength =Number(String(math.eval(data.Length.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);
                var resultWidth = Number(String(math.eval(data.Width.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);
                var resultDistance = Number(String(math.eval(data.Distance.toFixed(4)+' mm to inch')).split("inch")[0]).toFixed(4);;
                var resultAngle = String(math.eval(data.Degrees+' mm to inch')).split("inch")[0];

              }else{               
                   
                resultDiameter  = data.Diameter.toFixed(4)
                resultLength =data.Length.toFixed(4)
                resultWidth = data.Width.toFixed(4)
                resultDistance = data.Distance.toFixed(4)
                resultAngle = data.Degrees;

              }
            if(MeasureName[feature]=="MeasureACircle"){
             
              $("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId">'+resultDiameter+" "+dataUnits+'</h1>');

            }else if(MeasureName[feature]=="MeasureASlot"){




            
             $("#resultId").html('<h2>Slot length is:</h2><h1 id="diameterId">'+resultLength+" "+dataUnits+'</h1><h2>Slot width is:</h2><h1 id="diameterId">'+resultWidth+" "+dataUnits+'</h1>');
            }
             
            else if(MeasureName[feature]=="MeasureARectangle"){
            
            $("#resultId").html('<h2>Slot length is:</h2><h1 id="diameterId">'+resultLength+" "+dataUnits+'</h1><h2>Slot width is:</h2><h1 id="diameterId">'+resultWidth+" "+dataUnits+'</h1>');
              
            }else if(MeasureName[feature]=="MeasureAnExtCircle"){
        
                $("#resultId").html('<h2>Circle Diameter</h2><h1 id="diameterId">'+resultDiameter+" "+dataUnits+'</h1>');
            }
              
            else if(MeasureName[feature]=="MeasurePtToPt"){
        
                $("#resultId").html('<h2>Distance Between points is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');
            }

           else if(MeasureName[feature]=="MeasurePlnToPln"){
        
               $("#resultId").html('<h2>Distance Between plane is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');

            }
            else if(MeasureName[feature]=="MeasureCirtoCir"){
 
              $("#resultId").html('<h2>Distance Between holes is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');

            }

            else if(MeasureName[feature]=="MeasurePtToLine"){
            
               $("#resultId").html('<h2>Distance Between point and line is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');

            }

            else if(MeasureName[feature]=="MeasurePtToPln"){
            
              $("#resultId").html('<h2>Distance From a Point to a Plane is:</h2><h1 id="diameterId">'+resultDistance+" "+dataUnits+'</h1>');

            }
             
            else if(MeasureName[feature]=="MeasureAngle2PLn"){
            
               $("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
       
            }
            
            else if(MeasureName[feature]=="MeasureAngle2Lines"){
            
               $("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
       
            }
           
              
             else if(MeasureName[feature]=="MeasureAngleLin2Pln"){
            
               $("#resultId").html('<h2>Angle between Surfaces is:</h2><h1 id="diameterId">'+resultAngle+' Degree<h1>');
       
            }
          }
    }
   });
       
    socket.on('DRO', function(data){


    //console.log(" Point1: " + point1 + "And Continue flag is :" + continueFlag);
    //Commented out to implement new login for button 2 press
  
  if(continueFlag){

   console.log( "ContinueFlag: true and Button1 value is:" +data.Button1+" Button2 value is :"+ data.Button2+ " point1 value is: " +point1);

	if( point1 == 0)
	{	 data.Angles = testData[0];
		//console.log("sending first point to the Animation");
		point1 = 1;
        $("#probPointsId").html("1/"+pointsNeededVal);
		UpdateAnimationSS(data);
	}

 // UpdateAnimation(data);
 //  console.log("I am in");

    droObject.X = data.X.toFixed(3);
    droObject.Y = data.Y.toFixed(3);
    droObject.Z = data.Z.toFixed(3);
    droObject.I = data.I.toFixed(3);
    droObject.J = data.J.toFixed(3);
    droObject.K = data.K.toFixed(3);
 

    localStorage["droData"] = JSON.stringify(data);


  if(data.Button2 != 0){
   // console.log("Sending to TakeAPoint func...");
    TakeAPoint(data);
  }
  if(data.Button1 != 0){
   // console.log("Sending to EraseAPoint func...");
    EraseAPoint(data);
  }
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
    
     //$("#probAlert #popUpText").html("Please click continue to take points")  
     //$("#probAlert").css('display','block');

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
  
    dataUnits="mm";
    console.log(" dataUnits are : "+dataUnits);
    settingObject.dataUnits=0;

    if(probType=="Sphere Method"){
      $("#barlengthText").html("Enter Sphere Size(mm)")
      $("#continueText").val(data.SPHEREDIAMETER)

    } 

  }else{
      dataUnits='inch';
      settingObject.dataUnits=1;
      if(probType=="Sphere Method"){
      $("#barlengthText").html("Enter Sphere Size(in)")
      $("#continueText").val(data.SPHEREDIAMETER)
    } 
  


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
            elem.value = pts1.length;

	          if(pts1.length < pointsNeededVal){

	          		 $("#probPointsId").html((pts1.length + 1)+"/"+pointsNeededVal);
	          }
           

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
    console.log("Points taken: "+points_taken);
    var p = parseInt(points_taken); 
   

    //console.log(" Original Data : " + data.Angles );
   // console.log("p value is :"+ p);	
   // console.log("testData : " + testData[p]);
   // console.log("pts1.length:"+ pts1.length);	
  if(testData[p] != null){
        data.Angles = testData[p];
	//console.log(" Modified Data : " + data.Angles);
        UpdateAnimationSS(data);
  }
  }
 
 function EraseAPoint(data)
 {
  ErasePointSound();

  elem = document.getElementById("pointsTakenId2");
     
 // console.log("MeasureStep value:"+ MeasureStep);
  switch(MeasureStep)
  {
    case 0:
      pts1.pop();
      elem.value = pts1.length;
     // console.log("pts1.length:"+ pts1.length);
      data.Angles = testData[pts1.length];
      $("#probPointsId").html((pts1.length + 1)+"/"+pointsNeededVal);
     // console.log(data);
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
    
      

  /*ClearData();
  feature = meas;
  
  var elem = document.getElementById("TYPE");


  elem.value = CheckoutName[meas];
  elem = document.getElementById("PTSNEEDED");
  elem.value = maxChkPts[meas];
  MaxPointsToTake = maxChkPts[meas];
  MyMeasureObject = Checkout;
  MyMeasureObject.Feature = meas;
  MyMeasureObject.SphereDiameter = 25.0;
  MyMeasureObject.BarLength = 711.;*/
}

function SetCalibration(meas)
{
 // ClearData();
  feature = meas;
  $("#pointsRequire2").val(maxCalPts[meas])
  pointsNeededVal = maxCalPts[meas];
  MaxPointsToTake = maxCalPts[meas];
  MyMeasureObject = Calibration;
  MyMeasureObject.Feature = meas;
  $("#probPointsId").html(0+"/"+pointsNeededVal)
  
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
    $("#probCancelButton .btn-red").css('background','#F1F1F1');


    MeasureFeature();
  
}


function saveProbeData(){
	YesNo.Response = 1;
	YesNo.PID = probeObject.PID;
	YesNo.Residual = $("#probResultId").html(),dataArray;
	YesNo.Name = "New Probe";
	socket.emit('client_data', YesNo);
}


function discardProbeData(){
    YesNo.Response = 0;
     socket.emit('client_data', YesNo);
     gotoHome();
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

  
