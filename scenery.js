

function scenery(m, matFloor){
    this.m = m;
};

/**
 * scenery scape for driving in
 */
scenery.prototype.drawScenery = function( m, mf){
    let matCopy = mat4.clone(m);
    
    //ground with texture
    mat4.scale(matCopy,matCopy,vec3.fromValues(5,5,5));
    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0.01, 0));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.ground.render(gl,uni,mf);  
};

scenery.prototype.drawRoadblock = function(m){
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(8, 0, 0));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};