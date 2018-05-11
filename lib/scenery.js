

function scenery(m){
    this.m = m;
};

/**
 * scenery scape for driving in
 */
scenery.prototype.drawScenery = function( m, mf, rt){
    let matCopy = mat4.clone(m);
     
    //ground with texture
    mat4.scale(matCopy,matCopy,vec3.fromValues(5,5,5));
    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0.001, 0));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.ground.render(gl,uni,mf);
    
    //track with texture
    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0.002, 0));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.track.render(gl,uni,rt); 
};

scenery.prototype.drawPalms = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0, 0));
    mat4.scale(matCopy,matCopy,Float32Array.from([5,5,5]));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.palm.render(gl,uni);
};

scenery.prototype.drawRoadblock1 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0, -5));
    mat4.scale(matCopy,matCopy,Float32Array.from([65,2,2]));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock2 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(66, 0, -13));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([75,2,2]));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock3 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(-64, 0, 39));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([45,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock4 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(-58.5, 0, -46));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([41,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock5 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(8.7, 0, -82));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([38,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock6 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(20, 0, 90));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([28,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock7 = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0, 47));
    mat4.rotateY(matCopy,matCopy,7*Math.PI/4+.13);
    mat4.scale(matCopy,matCopy,Float32Array.from([25.8,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockE = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(-108, 0, -1));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([119,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockW = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(115, 0, -1));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([119,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockN = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(4, 0, 118));
    mat4.scale(matCopy,matCopy,Float32Array.from([112,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockS = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(4, 0, -119));
    mat4.scale(matCopy,matCopy,Float32Array.from([112,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

