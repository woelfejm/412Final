

function scenery(m){
    this.m = m;
    this.colPoints = [];
    this.rad = 1;
    this.collisionAssigned = false;
    
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

scenery.prototype.getColPoints = function(){
    return this.colPoints;
};

scenery.prototype.getRad = function(){
    return this.rad;
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
        
    if(!this.collisionAssigned){
        var i;
        for(i = -65; i < 65 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(i,0,-5));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0, -5));
    mat4.scale(matCopy,matCopy,Float32Array.from([65,2,2]));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock2 = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -75; i < 75 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(66,0,-13+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(66, 0, -13));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([75,2,2]));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock3 = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -45; i < 45 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(-64,0,39+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(-64, 0, 39));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([45,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock4 = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -41; i < 41 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(-58.5,0,-46+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(-58.5, 0, -46));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([41,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock5 = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -38; i < 38 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(8.7,0,-82+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(8.7, 0, -82));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([38,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock6 = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -28; i < 28 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(20,0,90+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(20, 0, 90));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([28,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblock7 = function(m){
    let matCopy = mat4.clone(m);
    if(!this.collisionAssigned){
        var i;
        for(i = 0; i < 51.5 ; i += .25){
            
            this.colPoints.push(vec3.fromValues((Math.cos(Math.PI/4-.13)*i)-20.45,0,(Math.sin(Math.PI/4-.13)*i)+31.27));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(0, 0, 47));
    mat4.rotateY(matCopy,matCopy,3*Math.PI/4+.13);
    mat4.scale(matCopy,matCopy,Float32Array.from([25.8,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockE = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -119; i < 119 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(-108,0,-1+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(-108, 0, -1));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([119,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockW = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -119; i < 119 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(115,0,-1+i));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(115, 0, -1));
    mat4.rotateY(matCopy,matCopy,Math.PI/2);
    mat4.scale(matCopy,matCopy,Float32Array.from([119,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockN = function(m){
    let matCopy = mat4.clone(m);

    if(!this.collisionAssigned){
        var i;
        for(i = -112; i < 112 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(4+i,0,118));
        }
    }
    mat4.translate(matCopy, matCopy, vec3.fromValues(4, 0, 118));
    mat4.scale(matCopy,matCopy,Float32Array.from([112,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawRoadblockS = function(m){
    let matCopy = mat4.clone(m);
    if(!this.collisionAssigned){
        var i;
        for(i = -112; i < 112 ; i += .25){
            
            this.colPoints.push(vec3.fromValues(4+i,0,-119));
        }
    }
    this.collisionAssigned = true;
    mat4.translate(matCopy, matCopy, vec3.fromValues(4, 0, -119));
    mat4.scale(matCopy,matCopy,Float32Array.from([112,2,2]))
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.roadblock.render(gl,uni);
};

scenery.prototype.drawLamp = function( x, y, z, m, n, mater){
    let lightMaterial = new Material();
    let greenMaterial = new Material();
    greenMaterial.diffuse = vec3.fromValues(.1,.5,.1);
    let matCopy = mat4.clone(m);

    mat4.translate(matCopy, matCopy, vec3.fromValues(x, y, z));
    mat4.scale(matCopy, matCopy, vec3.fromValues(1,6,1));
    mat4.rotateX(matCopy, matCopy, -Math.PI/2);
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    Shapes.cylinder.render(gl,uni, mater);

    matCopy = mat4.create();
    mat4.translate(matCopy, matCopy, vec3.fromValues(x, y + 6.75, z));
    mat4.scale(matCopy, matCopy, vec3.fromValues(.15,.15,.15));
    gl.uniformMatrix4fv(uni.uModel, false, matCopy);
    if(nightMode == 1)
        lightMaterial.emissive = vec3.fromValues(1,1,1);
    Shapes.sphere.render(gl,uni, lightMaterial );

}

