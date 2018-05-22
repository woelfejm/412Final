
/*
Name: David Stoppenbrink
Assignment: Pa6
Course/Semester: CS 412 - Spring 2018
Instructor: Dr. Wolff
Sources consulted: stackOverflow, example 08.texture (used as base)
Known Bugs: ****
Special instructions: ****
python -m http.server 8080
http://localhost:8080/race.html
*/
 //test line
// The WebGL object
var gl;

// The HTML canvas
var canvas;


var grid;     // The reference grid
var axes;     // The coordinate axes
var camera;   // The camera
var car;      // The car information john
var sunLoc; //light locations
var headlightLoc;


// Uniform variable locations
var uni = {
    uModel: null,
    uView: null,
    uProj: null,
    uEmissive: null, // Emitted intensity
    uAmbient: null,  // Ambient 
    uDiffuse: null,  // Diffuse reflectivity (Kd)
    uSpecular: null,  // Specular reflectivity (Ks)
    uShine: null,    // Specular exponent (f)
    uSunPos: null,        // Light position (camera coords)
    uSunIntensity: null,  // Light intensity
    uAmbientLight: null,
    uNightMode: null,    //whether scene is in night mode
    uHeadLightPos: null,  //headlight positions (camera coords)
    uHeadLightIntensity : null, //intensity of headlight
    uTailLightPos: null,  
    uTailLightIntensity : null, 
    uStreetLights: null,
    uStreetLightIntensity: null
};

// material/texture objects
var groundMaterial = new Material();
var racetrackMaterial = new Material();
var blockMaterial = new Material();
var bobMaterial = new Material();
var barrelMaterial = new Material();
var raftMaterial = new Material();
var checkMaterial = new Material();
var palmMaterial = new Material();
var lowAlphaMaterial = new Material();
var postMaterial = new Material();





/**
 * Initialize the WebGL context, load/compile shaders, and initialize our shapes.
 */
var init = function() {
    
    // Set up WebGL
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }
    
    // Set the viewport transformation
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Set the background color
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    
    //enable blending
    gl.enable(gl.BLEND);

    // Enable the z-buffer
    gl.enable(gl.DEPTH_TEST);

    // Set the blending function
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Load and compile shaders
    program = Utils.loadShaderProgram(gl, "vertex-shader-p", "fragment-shader-p");
    gl.useProgram(program);

    // Find the uniform variable locations
    uni.uModel = gl.getUniformLocation(program, "uModel");
    uni.uView = gl.getUniformLocation(program, "uView");
    uni.uProj = gl.getUniformLocation(program, "uProj");
    uni.uEmissive = gl.getUniformLocation(program, "uEmissive"); 
    uni.uAmbient = gl.getUniformLocation(program, "uAmbient");  
    uni.uDiffuse = gl.getUniformLocation(program, "uDiffuse"); 
    uni.uSpecular = gl.getUniformLocation(program, "uSpecular"); 
    uni.uShine = gl.getUniformLocation(program, "uShine");   
    uni.uSunPos = gl.getUniformLocation(program, "uSunPos");     
    uni.uSunIntensity = gl.getUniformLocation(program, "uSunIntensity"); 
    uni.uAmbientLight = gl.getUniformLocation(program, "uAmbientLight");
    uni.uDiffuseTex = gl.getUniformLocation(program, "uDiffuseTex");
    uni.uHasDiffuseTex = gl.getUniformLocation(program, "uHasDiffuseTex");
    uni.uColor = gl.getUniformLocation(program, "uColor");
    uni.uHasColor = gl.getUniformLocation(program, "uHasColor");

    
    uni.uNightMode = gl.getUniformLocation(program, "uNightMode");
    //car properties
    uni.uHeadLightPos = gl.getUniformLocation(program, "uHeadLightPos");
    uni.uHeadLightIntensity = gl.getUniformLocation(program, "uHeadLightIntensity");
    uni.uTailLightPos = gl.getUniformLocation(program, "uTailLightPos");
    uni.uTailLightIntensity = gl.getUniformLocation(program, "uTailLightIntensity");

    //street light properties
    uni.uStreetLights = gl.getUniformLocation(program, "uStreetLights");
    uni.uStreetLightIntensity = gl.getUniformLocation(program, "uStreetLightIntensity");


    //set base values that do not change
    gl.uniform3fv(uni.uSunIntensity,vec3.fromValues(1,1,1));
    gl.uniform3fv(uni.uAmbientLight,vec3.fromValues(0.0,0.0,0.0));
    gl.uniform3fv(uni.uHeadLightIntensity,vec3.fromValues(.7,.7,.7));
    gl.uniform3fv(uni.uTailLightIntensity,vec3.fromValues(.2,0,0));
    gl.uniform3fv(uni.uStreetLightIntensity,vec3.fromValues(.7,.7,.7));

    gl.uniform1i(uni.uDiffuseTex, 0);
    gl.uniform1f(uni.uNightMode, 0); //default to day time
    //attach textures to material
    groundMaterial.diffuseTexture = "dirt.png";
    racetrackMaterial.diffuseTexture = "racetrack.png";
    blockMaterial.diffuseTexture = "crate.png";
    postMaterial.diffuseTexture = "post.png";
    lowAlphaMaterial.color = vec4.fromValues(0.5,1,1,0.5);
    //palmMaterial.diffuseTexture = "Bottom_Trunk.png";

    // Initialize our shapes
    Shapes.init(gl);
    grid = new Grid(gl, 20.0, 20, Float32Array.from([0.7,0.7,0.7]));
    axes = new Axes(gl, 2.5, 0.05);

    // Initialize the camera
    camera = new Camera( canvas.width / canvas.height );
    camera.fov = glMatrix.toRadian(60);
    camera.lookAt( vec3.fromValues(0,5,-20), vec3.fromValues(0,0,0), vec3.fromValues(0,1,0));

    //initialize sun location
    let cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(0, 100, 0), camera.viewMatrix()); 
    gl.uniform3fv(uni.uSunPos, cameraCoord);    
    
    //initialize the car
    car = new car();

    // Build a procedural texture
    Textures["check"] = testTexture(gl);

    setupEventHandlers();
    
    //get promises and assign objects 
    Promise.all( [
         Utils.loadTexture(gl, "media/dirt.png"),
         Utils.loadTexture(gl, "media/crate.png"),
         Obj.load(gl,"media/eclipse.obj"),
         Utils.loadTexture(gl, "media/racetrack.png"),
         Obj.load(gl,"media/roadblock_obj.obj"),
         Obj.load(gl,"media/Date_Palm.obj"),
         Utils.loadTexture(gl, "media/post.png")
         //Utils.loadTexture(gl, "media/Bottom_Trunk.png")
             ]).then( function(values) {
         Textures["dirt.png"] = values[0]
         Textures["crate.png"] = values[1];
         Shapes.car = values[2];
         Textures["racetrack.png"] = values[3];
         Shapes.roadblock = values[4];
         Shapes.palm = values[5];
         Textures["post.png"] = values[6];
         //Textures["Bottom_Trunk.png"] = values[6];
        render();
    });

};


// self created proceedural texture (blue/white checker)
var testTexture = function(gl){
    let pixData = Uint8Array.from([
        255,255,255,255,
        0,0,255,255,
        0,0,255,255,
        255,255,255,255
    ]);
    let width = 2, height = 2;
    const texture = gl.createTexture();

    // Bind to the texture and set texture parameters
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // Create storage and load the texture
    gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, width, height);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixData);

    return texture;
}


/**
 * Render the scene!
 */
var render = function() {
    // Request another draw
    window.requestAnimFrame(render, canvas);

    // Update camera when in fly mode
    updateCamera();
    
    //Update the car and headlights
    updateCar();

    // Clear the color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set projection and view matrices 
    gl.uniformMatrix4fv(uni.uView, false, camera.viewMatrix());
    gl.uniformMatrix4fv(uni.uProj, false, camera.projectionMatrix());

    drawAxesAndGrid();
    drawScene();
};


/**
 * Draw the objects in the scene.  
 */
var drawScene = function() {
    let model = mat4.create();
    var sc = new scenery(model);
    //render the ground with dirt texture
    mat4.identity(model);

    //draw road blocks
    sc.drawScenery(model,groundMaterial,racetrackMaterial);
    sc.drawRoadblock1(model);
    sc.drawRoadblock2(model);
    sc.drawRoadblock3(model);
    sc.drawRoadblock4(model);
    sc.drawRoadblock5(model);
    sc.drawRoadblock6(model);
    sc.drawRoadblock7(model);
    sc.drawRoadblockE(model);
    sc.drawRoadblockW(model);
    sc.drawRoadblockN(model);
    sc.drawRoadblockS(model);

    //draw lamps
    //this will set the uniform streetLights which holds the camera coordinates of each of the street lights
    let temp = [];
    let cameraCoord;

    //lamp1
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(-101, 2, 5), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(-101, 0, 5, model, nightMode, postMaterial);

    //lamp2
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(55, 2, 3), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(55, 0, 3, model, nightMode, postMaterial);

    //lamp3
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(-25, 2, 77), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(-25, 0, 77, model, nightMode, postMaterial);

    //lamp4
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(7, 2, -36), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(7, 0, -36, model, nightMode, postMaterial);

    //lamp5
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(-57, 2, -87), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(-57, 0, -87, model, nightMode, postMaterial);

    //lamp6
    cameraCoord = vec3.create();
    vec3.transformMat4(cameraCoord, vec3.fromValues(100, 2, -110), camera.viewMatrix()); //camera coordinate for 10 units above origin
    temp.push(cameraCoord[0])
    temp.push(cameraCoord[1])
    temp.push(cameraCoord[2])
    sc.drawLamp(100, 0, -110, model, nightMode, postMaterial);

    //the size of this is static and must be declared in shader
    gl.uniform3fv(uni.uStreetLights, Float32Array.from(temp)); 

    drawCar();
    
    car.checkCollision(sc.colPoints,sc.rad);
    //render a cube with box texture
    mat4.fromTranslation(model, vec3.fromValues(4.0,0.5,4.0));
    gl.uniformMatrix4fv(uni.uModel, false, model);
    Shapes.cube.render(gl, uni,blockMaterial);

};

/**
 * Draws the reference grid and coordinate axes.
 */
var drawAxesAndGrid = function() {
    // Set model matrix to identity
    gl.uniformMatrix4fv(uni.uModel, false, mat4.create());
    // Draw grid
    //grid.render(gl,uni);
    // Draw Axes
    axes.render(gl,uni);
};

var drawCar = function(){
    let model = mat4.create();
    gl.uniformMatrix4fv(uni.uModel,false, car.model);
    Shapes.car.render(gl,uni);
}
//////////////////////////////////////////////////
// Event handlers
//////////////////////////////////////////////////

/**
 * An object used to represent the current state of the mouse.
 */
mouseState = {
    prevX: 0,     // position at the most recent previous mouse motion event
    prevY: 0, 
    x: 0,          // Current position
    y: 0,      
    button: 0,     // Left = 0, middle = 1, right = 2
    down: false,   // Whether or not a button is down
    wheelDelta: 0  // How much the mouse wheel was moved
};
var cameraMode = 0;          // Mouse = 0, Fly = 1
var numCameraModes = 3 - 1;  // How many different camera options there are
var downKeys = new Set();    // Keys currently pressed
var nightMode = 0;
var setupEventHandlers = function() {
    let modeSelect = document.getElementById("camera-mode-select");

    // Disable the context menu in the canvas in order to make use of
    // the right mouse button.
    canvas.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    modeSelect.addEventListener("change", 
        function(e) {
            let val = e.target.value;
            if( val === "0" )      //unlocked
                cameraMode = 0;
            else if( val === "1" ) //1st person
                cameraMode = 1;
            else if( val === "2" ) //3rd person
                cameraMode = 2;
        }
    );

    let lightSelect = document.getElementById("light-mode-select");
    lightSelect.addEventListener("change", 
        function(e) {
            let val = e.target.value;
            if( val === "0" ){
                nightMode = 0;
                gl.uniform1f(uni.uNightMode, 0); //set uniform in frag shader to day mode
            }
            else if( val === "1" ) {
                nightMode = 1;
                gl.uniform1f(uni.uNightMode, 1); //set uniform in frag shader to night mode
            }
        }
    );

    canvas.addEventListener("mousemove", 
        function(e) {
            if( mouseState.down ) {
                mouseState.x = e.pageX - this.offsetLeft;
                mouseState.y = e.pageY - this.offsetTop;
                mouseDrag();
                mouseState.prevX = mouseState.x;
                mouseState.prevY = mouseState.y;
            }
        });
    canvas.addEventListener("mousedown", function(e) {
        mouseState.x = e.pageX - this.offsetLeft;
        mouseState.y = e.pageY - this.offsetTop;    
        mouseState.down = true;
        mouseState.prevX = mouseState.x;
        mouseState.prevY = mouseState.y;
        mouseState.button = e.button;
    } );
    canvas.addEventListener("mouseup", function(e) {
        mouseState.x = e.pageX - this.offsetLeft;
        mouseState.y = e.pageY - this.offsetTop;
        mouseState.down = false;
        mouseState.prevX = 0;
        mouseState.prevY = 0;
    } );
    canvas.addEventListener("wheel", function(e) {
        e.preventDefault();
        mouseState.wheelDelta = e.deltaY * 0.1;
        if( cameraMode === 0 )
            camera.dolly(mouseState.wheelDelta);
    } );
    document.addEventListener("keydown", function(e) {
        downKeys.add(e.code);
        if( e.code === "Space" || e.code === "ArrowUp" || e.code === "ArrowDown" ) e.preventDefault();
    });
    document.addEventListener("keyup", function(e) {
        downKeys.delete(e.code);
        if( e.code === "Space" ) {
            camera.reset();
            e.preventDefault();
        }
        if(e.code == "KeyA"){
            if(cameraMode >= numCameraModes)  //this three
                cameraMode = 0;
            else
                cameraMode = cameraMode + 1;
        }
    });
};

/**
 * Check the list of keys that are currently pressed (downKeys) and
 * update the camera appropriately.  This function is called 
 * from render() every frame.
 */
var updateCamera = function() {
    if(cameraMode === 1){          //first person
        camera.firstPerson(car);
    }
    else if(cameraMode === 2){     //third person
        camera.thirdPerson(car);
    }
};

/**
 * Check the list of keys and update car appropriately. Called from render
 */
var updateCar = function(){
    //movement
    if( downKeys.has("ArrowUp"))   //forward 
        car.gas();
    if( downKeys.has("ArrowDown")) //reverse
        car.reverse();
    if(downKeys.has("ArrowRight")) //right turn
        car.turn(-1);
    if(downKeys.has("ArrowLeft"))  //left turn
        car.turn(1);
    car.updateModel();

    //camera
    if(downKeys.has("Space")){    //rear view
        camera.reverse(car);
    }

    
    if(nightMode == 1){
        //set location of headlights --should be camera coord
        let temp = [];
        let cameraCoord = vec3.create();
        vec3.transformMat4(cameraCoord, car.getHeadLightLoc()[0], camera.viewMatrix()); //left headlight
        temp.push(cameraCoord[0]);
        temp.push(cameraCoord[1]);
        temp.push(cameraCoord[2]);

        cameraCoord = vec3.create();
        vec3.transformMat4(cameraCoord, car.getHeadLightLoc()[1], camera.viewMatrix()); //right headlight
        temp.push(cameraCoord[0]);
        temp.push(cameraCoord[1]);
        temp.push(cameraCoord[2]);

        gl.uniform3fv(uni.uHeadLightPos, Float32Array.from(temp)); 

        //set location of taillights --also camera coordinates
    }
    

}

/**
 * Called when a mouse motion event occurs and a mouse button is 
 * currently down.
 */

var mouseDrag = function () {
    if( cameraMode === 0 ) {
        if( mouseState.down && mouseState.button === 0 ) {
            camera.orbit( mouseState.x - mouseState.prevX, mouseState.prevY - mouseState.y);
        }
        if( mouseState.down && mouseState.button === 2 ) {
            camera.track( mouseState.x - mouseState.prevX, mouseState.prevY - mouseState.y);
        }    
    }
    if( cameraMode === 1 ) {
        if( mouseState.down && mouseState.button === 0 ) {
            camera.turn( mouseState.x - mouseState.prevX, mouseState.prevY - mouseState.y);
        }
    }
};



// When the HTML document is loaded, call the init function.
window.addEventListener("load", init);