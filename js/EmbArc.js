$(document).ready(function(){
	$(".measure2").click(function(){
		window.location = "Measurement.html";							 
	});
	
	$("#holeDiameter").click(function(){		
		window.location = "MeasureCircleScreen.html";	
	});
	
	$(".navbar-brand").click(function(){			
			gotoHome();			
	});
	
	
	$("#settingsTop").click(function(){			
			window.location = "settings.html";				
	});
	
	$(".status").click(function(){
			window.location = "status.html";
	});
	
	$(".btn-green, .btn-red").click(function(){
		gotoHome();
	});
	
	$(".col-md-4 .thumbnail .probe").click(function(){
		window.location = "Measurement.html";
	});
	
	$(".thumbnail .dro").click(function(){
		window.location = "DRO.html";
	});
	
});


function gotoHome(){
    window.location = "home.html";
}