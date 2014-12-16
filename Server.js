var sys = require("sys"), my_http = require("http"), path = require("path"), url = require("url"), filesys = require("fs");
var server;
net = require('net');
var tcpClient, ioClient;
var req = require("request");
var fs = require("fs");

// TCP side
var sockets = [];
// HTTP Server
server = my_http.createServer(function(request, response) {
    
    var my_path = url.parse(request.url).pathname;
//	process.chdir('/usr/htdocs');
//	process.stdout.write("path\n");

	var full_path = path.join(process.cwd(), my_path);
	console.log("Fullpath:" +full_path);
	path.exists(full_path, function(exists) {
		if (!exists) {
			console.log("Path not exists");
			response.writeHeader(404, {
				"Content-Type" : "text/plain"
			});
			response.write("404 Not Found\n");
			response.end();
		} else {
			console.log("Path exists");
			filesys.readFile(full_path, "binary", function(err, file) {
				if (err) {

					if(my_path == '/'){
						response.writeHead(303, {
 							 'Location': '/pages/home.html'
						});
						response.end();
					}
					response.writeHeader(500, {
						"Content-Type" : "text/plain"
					});
					response.write(err + "\n");
					response.end();

				} else {
					response.writeHeader(200);
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
}).listen(8001);
sys.puts("Server Running on 8001");

// end HTTP server



function ParseJSON(string) {

  
	
 var obj = JSON.parse(string);
	if (ioClient) {
	    ioClient.emit(obj.Type, obj);

	}

}

// Create a TCP socket listener
var s = net.Server(function(tcpSocket) {
	// Add the new client socket connection to the array of
	// sockets
	process.stdout.write("tcp client connected\n");
	sockets.push(tcpSocket);
	tcpClient = tcpSocket;

	// 'data' is an event that means that a message was just sent by the
	// tcp application (Dispatcher). These are in the form of JSON objects. They
	// can be parsed and sent to the HTML page(s).
	var chunk = "";
	tcpSocket.on('data', function(data) {
	chunk += data.toString(); // Add string on the end of the variable 'chunk'
    d_index = chunk.indexOf(';'); // Find the delimiter


	    // While loop to keep going until no delimiter can be found
	    while (d_index > -1) {         
	            string = chunk.substring(0,d_index); 
	            dataString = string;
	            // Create string up until the delimiter
	            ParseJSON(string); // Parse the current string
	        chunk = chunk.substring(d_index+1); // Cuts off the processed chunk
	        d_index = chunk.indexOf(';'); // Find the new delimiter
	    }		
		
	});
     
    
    


	// Use splice to get rid of the socket that is ending.
	// The 'end' event means tcp client has disconnected.
	tcpSocket.on('end', function() {
		var i = sockets.indexOf(tcpSocket);
		sockets.splice(i, 1);
	});
});
s.listen(1234);

// use socket.io
var io = require('socket.io').listen(server);

// define interactions with client (HTML page)
	io.sockets.on('connection', function(ioSocket) {
		ioClient = ioSocket;
		process.stdout.write("socketio client connected\n");
	    ioSocket.on('client_data', function(data) {
			if (tcpClient) {
				var str = JSON.stringify(data);
				var buf = new Buffer(2);
				buf.writeUInt16LE(str.length, 0);
				tcpClient.write(buf); // send length to Dispatcher
				tcpClient.write(str); // send command to Dispatcher
	         	// process.stdout.write(str);
			}
	});

    //Uncaught Exceptions handling
	process.on('uncaughtException', function (err) {
	  console.log('Caught exception: ' + err.toString());
	});
 
   ioSocket.on('readJsonObject', function() {

	    fs.readFile("Data.json", 'utf8', function (err,data) {

	    	if(err)
	    	{
	    		console.log("readJsonObject error:"+ err);
	    		throw err;
	    	}

             var jsonObject = JSON.parse(data);
             ioClient.emit('logsJsonData',jsonObject);
         });
		
		
	});
   
    ioSocket.on('readImageJson', function() {

	      fs.readFile("imagedata.json", 'utf8', function (err,data) {

	      	if(err)
	    	{
	    		console.log("readImageJson error:"+ err);
	    		throw err;
	    	}
              console.log("ServerJS@readImageJson:"+data);
              var jsonObject = JSON.parse(data);
              ioClient.emit('logsImgJsonData',jsonObject);
         });   
	});


    ioSocket.on('requestFileData', function(fileName) {

    	if (!fs.existsSync('./logs')){
    		console.log("Creating /logs directory @requestFileData");
    		fs.mkdirSync('./logs', 0775);
		}

         fs.readFile("logs/"+fileName, 'utf8', function (err,data) {
         	if(err)
	    	{
	    		console.log("requestFileData error:"+ err);
	    		throw err;
	    	}
	    	  console.log("ServerJS@requestFileData:"+data);
              ioClient.emit('fileContentDispatch',data);
         });     
    }); 


    ioSocket.on('writeJsonFile', function(myData,fileName,flag,type,value) {

    	if (!fs.existsSync('./logs')){
    		console.log("Creating /logs directory @writeJsonFile");
    		fs.mkdirSync('./logs', 0775);
		}

       //console.log(myData);
       console.log("ServerJS@writeJsonFile:"+myData);
       if(flag){
	       var outputFilename = 'Data.json';
	       fs.writeFile(outputFilename, '{"Data":'+JSON.stringify(myData, null, 4)+"}", function(err) {
	       	if(err)
	    	{
	    		console.log("writeJsonFile error:"+ err);
	    		throw err;
	    	}
	       });  
	    }   
            
        var logFileName = fileName;
        var str = "Type = "+type+", value ="+value
        fs.appendFile("logs/"+logFileName,"\n"+str, function(err) {
          ioClient.emit("writeDone","yes");
      });  
  	 });   
        
     ioSocket.on('saveImageFile', function(imgURL,fileName) {

     	if (!fs.existsSync('./cameraimages')){
     		console.log("Creating /cameraimages directory @saveImageFile");
    		fs.mkdirSync('./cameraimages');
		}
     	
     	 console.log("ServerJS@saveImageFile: FileName is "+fileName +", ImgaeUrl is "+imgURL);
          req(imgURL).pipe(fs.createWriteStream("cameraimages/"+fileName, function(err){
          	if(err)
	    	{
	    		console.log("saveImageFile error:"+ err);
	    		throw err;
	    	}
          	
          }));
          ioClient.emit("imageSaveComplete");
         
     });   

    ioSocket.on('saveImageJson', function(data) {
       var outputFilename = 'imagedata.json';
       console.log("ServerJS@saveImageJson:"+data);
	   fs.writeFile(outputFilename, '{"Data":'+JSON.stringify(data, null, 4)+"}", function(err) {
	   		if(err)
	    	{
	    		console.log("saveImageJson error:"+ err);
	    		throw err;
	    	}

	    }); 

  	 });

});
