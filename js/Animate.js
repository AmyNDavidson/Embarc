
var container;
var camera, scene, renderer, objects;

var ArmXYZ = new Array();
ArmXYZ = ['0.0', '0.0', '0.0'];


var Angles = new Array(8);

var meshGroup = new Array(myPositions.length);

function init()  //init function
{

    console.log("init Function Called.");

    container = document.getElementById("animation");
    camera = new THREE.PerspectiveCamera( 15, container.clientWidth / container.clientHeight, 1, 15000 );
    camera.position.set( 0, -3800, 1200 );
    scene = new THREE.Scene();
    group = new THREE.Object3D();

    scene.fog = new THREE.Fog( 0x808080, 2, 15000 );

    var size = 20, step = 0.25;				
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { color: 0x000000 } );

    for ( var i = - size; i <= size; i += step ) 
    {
      	geometry.vertices.push( new THREE.Vector3( - size, - 0.04, i ) );
      	geometry.vertices.push( new THREE.Vector3(   size, - 0.04, i ) );

      	geometry.vertices.push( new THREE.Vector3( i, - 0.04, - size ) );
      	geometry.vertices.push( new THREE.Vector3( i, - 0.04,   size ) );

    }

    var line = new THREE.Line( geometry, material, THREE.LinePieces );
    line.position.y = -0.46;
  
    var plane = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), new THREE.MeshPhongMaterial( { ambient: 0x999999, color: 0x999999, specular: 0x101010 } ) );
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -0.5;
  
    scene.add( new THREE.AmbientLight( 0x777777 ) );

    addShadowedLight( 1, -0.5, 1, 0xffffff, 1.35 );
    addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );
    renderer = Detector.webgl? new THREE.WebGLRenderer(): new THREE.CanvasRenderer();
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.setClearColor( scene.fog.color, 1 );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;

    renderer.shadowMapEnabled = true;
    renderer.shadowMapCullFace = THREE.CullFaceBack;

    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

}	// init ended here



function addShadowedLight( x, y, z, color, intensity ) {

    console.log("addShadowedLight Function Called.");

    var directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z )
    scene.add( directionalLight );

    directionalLight.castShadow = true;
    
    var d = 1;
    directionalLight.shadowCameraLeft = -d;
    directionalLight.shadowCameraRight = d;
    directionalLight.shadowCameraTop = d;
    directionalLight.shadowCameraBottom = -d;

    directionalLight.shadowCameraNear = 1;
    directionalLight.shadowCameraFar = 4;

    directionalLight.shadowMapWidth = 2048;
    directionalLight.shadowMapHeight = 2048;

    directionalLight.shadowBias = -0.005;
    directionalLight.shadowDarkness = 0.15;

}

function onWindowResize() {

      console.log("onWindowResize Function Called.");
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( container.clientWidth, container.clientHeight );

}

function render() {

    console.log("render Function Called.");
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

//note. this is called before the last load is done.
var lastLoad = 0;
var count = 0;
var chklen = false;
function loadObjects()
{
    console.log("loadObjects Function Called.");
    
    if(typeof checkOutType === 'undefined'){
        console.log("checkOutType not defined");
    }else{

         console.log("checkOutType is:"+checkOutType);
         if( checkOutType =="Length Checkout"){

          chklen = true;
          myObjects = [
                 '../stl/StepBar.STL',
                 '../stl/BASE_PLATE.STL',
                 '../stl/Base.STL',
                 '../stl/A.STL',
                 '../stl/BC25.STL',
                 '../stl/C_FORK.STL',
                 '../stl/DE25.STL',
                 '../stl/F.STL',
                 '../stl/F_AXIS.STL',
                 '../stl/Buttons.STL',
                 '../stl/Hard_Probe_15.STL',
                 ];




        myPositions = [
               [-300,-10,-50],
               [-10,1000,-10],
               [0,0,89.5],
               [0,0,150],
               [0,0,137],
               [711,0,62],
               [39,0,0],
               [62,0,-451.5],
               [0,0,-48.5],
               [0,0,0],
               [0,15,-69.5],
               ];

    myAxes = [
              " ",
              " ",
              " ",
              "Z",
              "Y",
              "X",
              "Y",
              "Z",
              "Y",
              " ",
              " ",
            ];
        }

    }

    
    // Objects
    lastLoad = 0;
    count = 0;
    
    var loader = new THREE.STLLoader();	
    loader.addEventListener( 'load', function ( event ) {
	
      	count++;
      	var index = event.index;
       	var geometry = event.content;
      	var materials = [
                            new THREE.MeshPhongMaterial( { ambient: 0x262B30, color: 0x262B30, specular: 0x111111, shininess: 200 }), //0 -- brown
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }), //1 -- blue
                            new THREE.MeshPhongMaterial( { ambient: 0x797F85, color: 0x797F85, specular: 0x111111, shininess: 200 }), //2 -- gray
                            new THREE.MeshPhongMaterial( { ambient: 0x797F85, color: 0x797F85, specular: 0x111111, shininess: 200 }), //3
                            new THREE.MeshPhongMaterial( { ambient: 0x797F85, color: 0x797F85, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x184369, color: 0x184369, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x184369, color: 0x184369, specular: 0x111111, shininess: 200 }),
                            new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 })
                        ];

           
  	     if(chklen == true){
               materials[0] = new THREE.MeshPhongMaterial( { ambient: 0x3B95E3, color: 0x3B95E3, specular: 0x111111, shininess: 200 });

               var mesh =  new THREE.Mesh( geometry, materials[index] );
               mesh.castShadow = true;
               mesh.receiveShadow = true;

                if(index == 0){
                    mesh.rotation.y = 0.8;
                }else if(index == 1){
                    mesh.rotation.y = -0.8;
                }
                mesh.position.set(myPositions[index][0], myPositions[index][1], myPositions[index][2]);
                meshGroup[index] = mesh;

        }else{
             var mesh =  new THREE.Mesh( geometry, materials[index] );
             mesh.castShadow = true;
             mesh.receiveShadow = true;
             mesh.position.set(myPositions[index][0], myPositions[index][1], myPositions[index][2]);
             meshGroup[index] = mesh;
        }
        
            
        	   
        if(count ==  myObjects.length)
  	    {
        		scene.add(meshGroup[0]);
        		for(var j = 0; j < myObjects.length - 1; j++)
        		meshGroup[j].add(meshGroup[j+1]);	
        		lastLoad = 1;
  	    }
    } );
      
    for(var j = 0; j < myObjects.length; j++)
    {
  	      loader.load(myObjects[j], 0, j);
          
    }

}

function UpdateAnimation(data){

  console.log("UpdateAnimation Function Called.");

     if((data.Button1 == 0) && (data.Button2 == 0) && (data.Button3 == 0)){
      return;
     }

    if(lastLoad == 0)
	return;
    
    var x=0.0, y=0.0, z=0.0;
    var minChange = 10;

    x = ArmXYZ[0];
    y = ArmXYZ[1];
    z = ArmXYZ[2];


    if((Math.abs(x-data.X) < minChange) && (Math.abs(y-data.y) < minChange) && (Math.abs(z-data.Z) < minChange))
	return;


    var angleIndex = 0;
    for(var j = 0; j < myObjects.length; j++)
    
	    if(myAxes[j] != " ")
	{
	    if(myAxes[j] == "X")
		meshGroup[j].rotation.x = data.Angles[angleIndex];
	    else if(myAxes[j] == "Y")
		meshGroup[j].rotation.y = data.Angles[angleIndex];
	    else
		meshGroup[j].rotation.z = data.Angles[angleIndex];
	    angleIndex +=1;
	}

    render();
}

function UpdateAnimationSS(data){

    console.log("UpdateAnimationSS Function Called.");

    if(lastLoad == 0)
    return;
    
    var x=0.0, y=0.0, z=0.0;
   
    x = ArmXYZ[0];
    y = ArmXYZ[1];
    z = ArmXYZ[2]

    var angleIndex = 0;
    for(var j = 0; j < myObjects.length; j++)
    {
    if(myAxes[j] != " ")
    {
        if(myAxes[j] == "X")
            meshGroup[j].rotation.x = data.Angles[angleIndex];
        else if(myAxes[j] == "Y")
            meshGroup[j].rotation.y = data.Angles[angleIndex];
        else
            meshGroup[j].rotation.z = data.Angles[angleIndex];
        angleIndex +=1;
    }
    }

    render();
}
