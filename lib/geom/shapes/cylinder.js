/*
Name: David Stoppenbrink
Assignment: Pa6
Course/Semester: CS 412 - Spring 2018
Instructor: Dr. Wolff
Sources consulted: stackOverflow, example 08.texture (used as base)
Known Bugs: ****
Special instructions: ****
*/
var generateCylinderData = function(radius, height, slices) {
    var nFaces = slices;  // Quadrilateral faces
    var nVerts = slices * 2;

    var verts = [], normals = [], el = [], tc = [];

    // Generate the points
    var x, y, z;
    var sliceFac = 2.0 * Math.PI / slices;
    var angle = 0.0;
    for( var i = 0; i <= 1 ; i++ ) {
        z = i * height;
        for( var j = 0; j < slices; j++ ) {
            angle = sliceFac * j;
            x = Math.cos(angle);
            y = Math.sin(angle);
            normals.push(x, y, 0);
            x *= radius;
            y *= radius;
            verts.push(x, y, z);
            tc.push(j/slices,i); 
        }
        x = Math.cos(0);
        y = Math.sin(0);
        normals.push(x, y, 0);
        x *= radius;
        y *= radius;
        verts.push(x, y, z);
        tc.push(1,i); 

    }

    // Generate the element indexes for triangles
    var topStart = slices+1;
    for( var j = 0; j < slices; j++ ) {
        // Triangle 1
        el.push(j);
        el.push(topStart + ((j+1)));
        el.push(topStart + j);
        // Triangle 2
        el.push(j);
        el.push((j+1));
        el.push(topStart + ((j+1)));
    }

    //generate the TC

    return {
        index: el,
        position: verts,
        normal: normals,
        texCoord: tc
    };
};