 /* JSON Objects for EmbArC */
 /* Measurements available
 * 	Type		Features			Result
 * =================================================================
 * MeasureACircle - 	Plane/Circle - 			Diameter 
 * MeasureASlot - 	Plane/Slot - 			Length/Width 
 * MeasureARectangle - 	Plane/Rectangle - 		Length/Width
 * MeasureAnExtCircle - Plane/Circle - 			Diameter 
 * MeasurePtToPt - 	Point1/Point2 - 		Distance 
 * MeasurePlnToPln- 	Plane1/Plane2 -			Distance 
 * MeasureCirtoCir - 	Plane1/Circle1/Plane2/Circle2 - Distance 
 * MeasurePtToLine - 	Plane1/Line/Plane2/Point -	Distance 
 * MeasurePtToPln - 	Plane1/Plane2/Point - 		Distance 
 * MeasureAngle2PLn - 	Plane1/Plane2 - 		Degrees 
 * MeasureAngle2Lines - Plane1/Line1/Plane2/Line2 - 	Degrees 
 * MeasureAngleLin2Pln -Plane1/Plane2/Line - 		Degrees
 * Arm Checkouts Available
 * Type			Result
 * ===========================================
 * ArmCheckoutSphere - 	Diameter,Mindev, Maxdev, Averagedev 
 * ArmCheckoutPoint - 	XRange/2, YRange/2, ZRange/2 
 * ArmCheckoutPlane - 	BestFit, StdDev
 * ArmCheckoutLength - 	Minimum,Maximum,Average,MinDev,MaxDev,Range/2,StdDev
 * 
 * Probe Calibrations Available
 * 
 * Type			Result
 * ===========================================
 * CalibrateSphere - 	ResDev 
 * CalibratePoint - 	ResDev 
 * CalibratePlane - 	ResDev
 * 
 */
//Enumerate the measurements for use in the JSON object definitions.
// This will be easier for the c++ code to parse.

var Measurements = {
		Circle: 0,
		MeasureACircle: 1,
		MeasureASlot: 2,
		MeasureARectangle: 3,
		MeasureAnExtCircle: 4,
		MeasurePtToPt: 5,
		MeasurePlnToPln: 6,
		MeasureCirtoCir: 7,
		MeasurePtToLine: 8,
		MeasurePtToPln: 9,
		MeasureAngle2PLn: 10,
		MeasureAngle2Lines: 11,
    	MeasureAngleLin2Pln: 12
};

var Checkouts = {
		Point: 1,
		Plane: 2,
		Sphere: 3,
		Length: 4
	};

var Calibrations = {
	Point: 1,
	Plane: 2,
	Sphere: 3
};

// //////////////////// Simple objects //////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////
/* Begin - HTML Commands to Dispatcher */
// Checkout object

var Checkout = {
    "Type" : "Checkout", // every JSON will have this field
    "Feature" : 0, // Checkouts.Point, Checkouts.Plane, Checkouts.Sphere, or Checkouts.Length
    "ProbeDiameter" : 0.0,
    "SphereDiameter" : 0.0,
    "BarLength" : 0.0,
    "Points1" : []
};

// Calibration Object


var Calibration = {
    "Type" : "Calibration", // every JSON will have this field
    "Feature" : 0, // Calibrations.Point, Calibrations.Plane, or Calibrations.Sphere
    "ProbeDiameter" : 0.0,
    "SphereDiameter" : 0.0,	// if sphere method.
    "PID" : 0,		// 64 bit probe id. Passed in by Probe Data.
    "Points1" : []
};


// Features Minimum/Maximum Points
 /*
 * Plane	3	10
 * Circle	3	10
 * Slot		6	6
 * Rect		4	4 Same direction
 * Line 	2	10
 * Point	1	1
 */

//Measure - Plane / Circle / etc.
var Measure = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.Circle,
    "ProbeDiameter" : 0.0,
    "Points" : []
};

var MeasureACircle = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureACircle,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Circle",
    "Points2" : []
};


var MeasureASlot = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureASlot,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Slot",
    "Points2" : []
};

var MeasureARectangle = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureARectangle,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Rectangle",
    "Points2" : []
};

var MeasureAnExtCircle = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureAnExtCircle,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Circle",
    "Points2" : []
};

var MeasurePtToPt = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasurePtToPt,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Point",
    "Points1" : [],
    "SubFeature2" : "Point",
    "Points2" : []
};

var MeasurePlnToPln = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasurePlnToPln,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Plane",
    "Points2" : []
};

var MeasureCirtoCir = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureCirtoCir,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Circle",
    "Points2" : [],
    "SubFeature3" : "Plane",
    "Points3" : [],
    "SubFeature4" : "Circle",
    "Points4" : []
};

var MeasurePtToLine = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasurePtToLine,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Line",
    "Points2" : [],
    "SubFeature3" : "Plane",
    "Points3" : [],
    "SubFeature4" : "Point",
    "Points4" : []
};

var MeasurePtToPln = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasurePtToPln,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Plane",
    "Points2" : [],
    "SubFeature3" : "Point",
    "Points3" : []
};

var MeasureAngle2PLn = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureAngle2PLn,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Plane",
    "Points2" : []
};

var MeasureAngle2Lines = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureAngle2Lines,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Line",
    "Points2" : [],
    "SubFeature3" : "Plane",
    "Points3" : [],
    "SubFeature4" : "Line",
    "Points4" : []
};

var MeasureAngleLin2Pln = {
    "Type" : "Measure", // every JSON will have this field
    "Feature" : Measurements.MeasureAngleLin2Pln,
    "ProbeDiameter" : 0.0,
    "SubFeature1" : "Plane",
    "Points1" : [],
    "SubFeature2" : "Plane",
    "Points2" : [],
    "SubFeature3" : "Line",
    "Points3" : []
};

// Update. HTML asks Dispatcher for info.
// Settings, Arm Data, Probe Data.
var Update = {
    "Type" : "Update", // every JSON will have this field
};

//Query for Bluetooth devices
var RequestBTInfo = {
    "Type" : "RequestBTInfo", // every JSON will have this field
};

var SelectBTDevice = {
	    "Type" : "SelectBTDevice", // every JSON will have this field
	    "Name" : "FriendlyBTName"	// Friendly name of device. Blank if none.
	};

var UpdateFW = {
	    "Type" : "UpdateFW", // every JSON will have this field
	    "Name" : "FWFileName"	// tar file with update archive
	};
/* End - HTML Commands to Dispatcher */

// ////////////////////////////////////////////////////////////////////////////////////////
/* Begin - Dispatcher Commands to HTML */

// Result Object - a Union of all result values
// The receiving side is responsible to determine which values are of interest.

var Result = {
    "Type" : "Result", // every JSON will have this field
    "Valid" : 0,	// 0 = not valid result.
    "Diameter" : 0.0,
    "Mindev" : 0.0,
    "Maxdev" : 0.0,
    "Averagedev" : 0.0,
    "XRange2" : 0.0,
    "YRange2" : 0.0,
    "ZRange2" : 0.0,
    "Minimum" : 0.0,
    "Maximum" : 0.0,
    "Average" : 0.0,
    "Range2" : 0.0,
    "Residual" : 0.0,
    "Length" : 0.0,
    "Width" : 0.0,
    "Distance" : 0.0,
    "Degrees" : 0.0,
    "BestFit" : 0.0,
    "StandardDeviation" : 0.0
};

var BTDeviceNames = {
	    "Type" : "BTDeviceNames", // every JSON will have this field
	    "Names" : []	// Friendly names of devices available.
	};
/* End - Dispatcher Commands to HTML */

// ////////////////////////////////////////////////////////////////////////////////////////
/* Begin - HTML Commands to RA7 */

// Sound
var sound = {
    "Type" : "Sound", // every JSON will have this field
    "Frequency" : 100,
    "Duration" : 100,
    "Volume" : 10,
    "Melody" : -1
// -1 means no canned melody.
};

/* End - HTML Commands to RA7 */

// ////////////////////////////////////////////////////////////////////////////////////////
/* Begin - RA7 Data for HTML */

// DRO
var DRO = {
    "Type" : "DRO",
    "X" : 0,
    "Y" : 0,
    "Z" : 0,
    "I" : 0, // approach vector
    "J" : 0, // approach vector
    "K" : 0, // approach vector
    "Angles" : [],	// 8 values
    "RawPositions" : [], // 8 values
    "Rate" : 0,
    "Button1" : 0,
    "Button2" : 0,
    "Button3" : 0
};

// ARM
var ARM = {
    "Type" : "ARM",
    "Axes" : 6,
    "ArmVolume" : 2500,
    "Version" : "3",
    "Ambient" : 128,
    "Battery" : 128,
    "HWVersion" : 0,
    "SWVersionHi" : 0,
    "SWVersionLo" : 0,
    "Headlights": 0, // 0= not available, 1 = available
    "Haptic": 0 // 0= not available, 1 = available
};

// PROBE
var PROBE = {
    "Type" : "PROBE",
    "Diameter" : 15.0,
    "PType" : "",
    "PName" : "",
    "PID" : 0		// 64 bit probe id.
};

// ProbeSpecs Save Confirm
var Saved = {
	"Type" : "PROBESPECS",
	"Saved" : 0	// 0 = not saved, 1 = saved
};
/* End - RA7 Data for HTML */

/* Begin - Dual Use Objects */

// Settings - HTML sends/receives settings to/from Dispatcher.
var Settings = {
    "Type" : "Settings", // every JSON will have this field
    "SSID" : "AMI1234",
    "PASSWORD" : "",
    "BT_NAME" : "",
    "BT_ID" : "",
    "COUNTRY" : "US",
    "CHANNEL" : 7, // Channel 1-11 (2.5GHZ), 36, 42, 44, etc(5GHZ).
    "HAPTIC" : 0, // 0 = off, 1 = on
    "VOLUME" : 100, // 0 to 100%
    "HEADLIGHT" : 0, // //0 = off, 1 = on
    "UNITS" : 0,	// 0 = mm, 1 = inches
    "BarLength"	: 0,	// Bar length for checkout
    "SphrereDiameter" : 0,	// Sphere diameter for checkout and probe cal
    "FwVersion" : 0	// Linux version.
};

// Multiuse
// 1. Provides updates from the service during probe calibration calculation phase
// 2. Allows the user to cancel the probe calibration calculation
// 3. Allows the user to save the results of a probe calibration
var YesNo = {
	"Type" : "YesNo", // every JSON will have this field
	"Response" : 0,	// 0 = no, 1 = yes 
					// During calculation, App can cancel by sending this object with a 0
					// After calculation is complete (ie. a Result object is received) Send back 1 to save result, 0 to discard
	"PID" : 0,		// 64 bit probe id. Passed in by Probe Data.
	"Name" : "ProbeName",	// new name for probe
	"Residual" : 0.0,	// Residual error. - passed by service during probe calibration
	"CurrentStep": 0,	// Current step in cal process - passed by service during probe calibration
	"MaxStep" : 0		// Max number of steps. - passed by service during probe calibration
};
/* End - Dual Use Objects */
