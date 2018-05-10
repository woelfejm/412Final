/*
Name: David Stoppenbrink
Assignment: Pa6
Course/Semester: CS 412 - Spring 2018
Instructor: Dr. Wolff
Sources consulted: stackOverflow, example 08.texture (used as base)
Known Bugs: ****
Special instructions: ****
*/
/**
 * This single object is designed to be a "library" of primitive shapes that we can use.
 * Initially, this object has only one property (the init function).  After the init
 * function is called, it will have a property for each of the primitive shapes.  The
 * init function should be called only once.
 */
var Shapes = {
    /**
     * This function initializes all primitive shapes and makes them available.
     * 
     * @param{WebGL2RenderingContext} gl
     */
    init: function(gl) {
        if( this.initialized ) return;

        this.cube = new TriangleMesh(gl, generateCubeData());
        this.ground = new TriangleMesh(gl, generateQuadData(100.0, 5));
        this.cylinder = new TriangleMesh(gl, generateCylinderData(0.5,1,10));
        this.disk = new TriangleMesh(gl, generateDiskData(1.0, 8));
        this.initialized = true;
    },
    initialized: false
};