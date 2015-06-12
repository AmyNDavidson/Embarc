$(document).ready(function()
{
	$("#StatusContainer").css("display", "none");
	$("#spinner").css("display", "block");
	var hasArmData = 0;
	var hasVersionData = 0;
	var socket = io.connect();
	socket.emit('client_data', Update);
	socket.on('ARM', function(data)
	{
		$("#versionInput").val(data.Version);
		$("#axesInput").val(data.Axes);
		$("#volumeInput").val(data.ArmVolume);
		$("#hwVersionInput").val(data.HWVersion);
		$("#swInputHi").val(data.SWVersionHi + '.' + data.SWVersionLo);
		var per = (data.Battery/255)*100;
		$("#battryPercentageId").html(Math.floor(per)+"%");
		$("#batteryInput").val(" "+Math.floor(per)+"%");
		$(".batteryPer .battery em font").css("width",Math.floor(per)+"%");
		
		if(data.Ambient == 255)
			$("#temperatureInput").val("N/A");
		else
			$("#temperatureInput").val(data.Ambient+" Celsius");

		if(hasVersionData == 1)
		{
			$("#spinner").css("display", "none");
			$("#StatusContainer").css("display", "block");
		}
		hasArmData = 1;
	});

	socket.emit('requestLoggingData', "/home/version.txt");
	socket.on('LoggingDataDispatch', function(data)
	{
		$("#swInputLo").val(data[2] + '.' + data[4] + '.' + data[6]);
		if(hasArmData == 1)
		{
			$("#spinner").css("display", "none");
			$("#StatusContainer").css("display", "block");
		}
		hasVersionData = 1;			
	});
});
