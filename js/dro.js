 
var socket = io.connect(); 
GetSettings();
var dataUnit=0;
var droData;

$(document).ready(function() {
 
    //$("#animation").css("width",$('.droImgContainer').width()+"px");
    $("#animation").css("height",$('.droImgContainer').width()/1.3+"px");

    init();
    loadObjects();
    render();

   $("#mmId").click(function(){

           dataUnit = 0;
           updatDro();
   });


   $("#inchesId").click(function(){
          dataUnit = 1;
          updatDro();
   });

})


   /*========GET the value of current setting and updated check box and saved dro data ===============*/

    function GetSettings(){
      socket.emit('client_data', Update);
    }

   
    socket.on('Settings', function(data){
         dataUnit = data.UNITS;
         
         if(dataUnit==1){
           $("#inchesId").attr( "checked", true );
         }else{
            $("#mmId").attr( "checked", true )
         }
      
        if(localStorage["droData"]==null){
       
        }else{
           droData = JSON.parse(localStorage["droData"]);
           updatDro();
        }
    }); /*==============*/   





 /*===========Get DRO data at run time =============*/


socket.on('DRO', function(data){
     droData = data;
     
     updatDro();


});	/*==============*/   



 /*===========Get and updatge Probe data(always in MM)=============*/


 socket.on('PROBE', function(data){

    $("#probeDataId").html(" "+data.Diameter+" mm");

 });/*==============*/   



 /*===========UPDATE DRO DATA======================*/

 function updatDro(){
   
    if(dataUnit==1){
     
      $("#droXId").html(" "+Number(String(math.eval(droData.X+' mm to inch')).split("inch")[0]).toFixed(4));
      $("#droYId").html(" "+Number(String(math.eval(droData.Y+' mm to inch')).split("inch")[0]).toFixed(4));
      $("#droZId").html(" "+Number(String(math.eval(droData.Z+' mm to inch')).split("inch")[0]).toFixed(4));
   
    }else{

      $("#droXId").html(" "+droData.X.toFixed(3));
      $("#droYId").html(" "+droData.Y.toFixed(3));
      $("#droZId").html(" "+droData.Z.toFixed(3));




     


   }

   UpdateAnimationSS(droData);


 }/*==============*/   
