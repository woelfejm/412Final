/*
Name: David Stoppenbrink
Assignment: Pa6
Course/Semester: CS 412 - Spring 2018
Instructor: Dr. Wolff
Sources consulted: stackOverflow, example 08.texture (used as base)
Known Bugs: ****
Special instructions: ****
*/
var generateDiskData = function( radius, slices ) {
    var v = [], n = [], el = [], tc = [];

    var factor = 2.0 * Math.PI / slices;
    for( var i = 0; i < slices; i++ ) {
        var angle = factor * i;
        v.push(radius * Math.cos(angle));
        v.push(radius * Math.sin(angle));
        v.push(0);
        tc.push(Math.cos(angle)/2 + 0.5,Math.sin(angle)/2 + 0.5);
        n.push(0,0,1);
        el.push(i, (i + 1) % slices, slices);
    }

    // Add center point
    v.push(0,0,0);
    n.push(0,0,1);
    tc.push(0.5,0.5);

    return {
        index: el,
        position: v,
        normal: n,
        texCoord: tc
    };
};