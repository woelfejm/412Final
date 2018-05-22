/**John Woelfel
 * This class keeps track of the physics of the car
 * 
*/

/**
 * Constructor for car. Sets all values to default
 * @param m - the vec4 to initialize car to (size and scale)
 */
var car = function(scale = 3){
    this.scale = scale;
    this.size = vec3.fromValues(scale, scale, scale);   //size of car
    
    //collision spheres for the car
    this.sphRad = 0.25;
    this.sphLF = vec3.create();
    this.sphRF = vec3.create();

    this.sphLR = vec3.fromValues(1,0,-1.5);
    this.sphRR = vec3.fromValues(-1,0,2);
    
    //physics fields for car
    this.speed = 0;                                     //speed that car is moving at
    this.pos = vec3.fromValues(0,0,0);                  //starting position of car
    this.lastpos = vec3.fromValues(0,0,0);             //last position of the car  
    this.direction = 0;                                 //rotation angle from y-axis

    this.friction = .03;                                //the rate to decrease speed by each frame (potentially make it depend on the map)
    this.accelerationRate = 1/(scale * 10);                        //the rate to increase speed by if gas 
    this.turnRate = 1/ (scale * 2.5);                   //how fast the car turns
    this.scale = scale;
    this.counter = 0;

    
    //initialize model
    let m = mat4.create();
    mat4.scale(m,m,this.size);      
    this.model = m;
}

/**
 * This method updates the model given the location, and the size
 */
car.prototype.updateModel  = function(){
    this.speed = this.speed * (1 - this.friction)                         //apply friction to decrease speed
    //used for collision and reaction
    
    //this.lastpos = this.pos; 
    vec3.copy(this.lastpos,this.pos);  
    //console.log(this.pos[0] +" "+ this.lastpos[0]);                                           //save position before update
    //calculate new position given speed
    this.pos[0] = this.pos[0] + (this.speed * Math.sin(this.direction));  //change in x position
    this.pos[2] = this.pos[2] + (this.speed * Math.cos(this.direction));  //change in z position
    
    mat4.fromTranslation(this.model, this.pos);                           //update model with position

   
    //update points in front and rear collision zones of car given direction
    this.sphLF = vec3.fromValues(this.pos[0] + Math.sin(this.direction + .3) * this.scale, 0 , this.pos[2] + Math.cos(this.direction + .3) * this.scale);
    this.sphRF = vec3.fromValues(this.pos[0] + Math.sin(this.direction - .3) * this.scale, 0 , this.pos[2] + Math.cos(this.direction - .3) * this.scale);
    
    mat4.rotateY(this.model, this.model, this.direction);                 //set direction car is facing

    mat4.scale(this.model,this.model, this.size);                         //update size
}

//returns array of two vec3, holding location of left headlight followed by right
car.prototype.getHeadLightLoc = function(){
    return [vec3.fromValues(this.pos[0] + Math.sin(this.direction + .3) * this.scale, this.pos[1] + this.scale/2, this.pos[2] + Math.cos(this.direction + .3) * this.scale),
                vec3.fromValues(this.pos[0] + Math.sin(this.direction - .3) * this.scale, this.pos[1] + this.scale/2, this.pos[2] + Math.cos(this.direction - .3) * this.scale)];
}

car.prototype.getTailLightLoc = function(){
    return [vec3.fromValues(this.pos[0] - Math.sin(this.direction + .3) * this.scale, this.pos[1] + this.scale/2, this.pos[2] - Math.cos(this.direction + .3) * this.scale),
                vec3.fromValues(this.pos[0] - Math.sin(this.direction - .3) * this.scale, this.pos[1] + this.scale/2, this.pos[2] - Math.cos(this.direction - .3) * this.scale)];

}

car.prototype.getHeadlightDir = function(){
    return vec3.fromValues( c.pos[0] + Math.sin(c.direction) * 5, c.pos[1] + 4, c.pos[2] + Math.cos(c.direction) * 5 )

}
car.prototype.gas = function(){
    //calculate new speed given acceleration rate
    this.speed += this.accelerationRate;
}

car.prototype.reverse = function(){
    //calculate new speed given acceleration rate
    this.speed -= this.accelerationRate / 2;
}

//dir is -1 if right turn, or +1 if left turn
car.prototype.turn = function(dir){
    this.direction += dir*this.turnRate* (this.speed/ 3);
    //console.log("direction = "+ this.direction);
}

car.prototype.checkCollision = function(spheres,rad){
    var colDir;
    var travelVec = vec3.create();
    var collisionVec = vec3.create();
    var uVec;
    var newTravelVec;
    var tempAngle;
    var angleOut;
    if(this.counter > 0){
        this.counter++;
    }
    if(this.counter >= 5){
        this.counter = 0;
    }
    for(var i = 0; i < spheres.length; i++){
        
        if(this.sphRad + rad > Math.sqrt(Math.pow(this.sphLF[0]-spheres[i][0],2) + Math.pow(this.sphLF[2]-spheres[i][2],2))
            && this.counter == 0){
        
            console.log("collision found! counter =" + this.counter);
            this.counter = 1;
            vec3.subtract(travelVec,this.pos,this.lastpos);
            vec3.subtract(collisionVec, this.pos, spheres[i]);
            tempAngle = vec3.angle( collisionVec, travelVec);
            angleOut = Math.PI/2 - tempAngle;
            this.speed = this.speed * (angleOut * .01);
            
            //here put if to check over 45 deg (Math.PI/4) if so dont turn reflect back
            
            this.direction += angleOut;
            console.log("collision LF");
        }else if(this.sphRad + rad > Math.sqrt(Math.pow(this.sphRF[0]-spheres[i][0],2) + Math.pow(this.sphRF[2]-spheres[i][2],2))
            && this.counter == 0){

            console.log("collision found! counter =" + this.counter);
            this.counter = 1;
            vec3.subtract(travelVec,this.pos,this.lastpos);
            vec3.subtract(collisionVec, this.pos, spheres[i]);
            tempAngle = vec3.angle( collisionVec, travelVec);
            angleOut = Math.PI/2 - tempAngle;
            
            //here put if to check over 45 deg (Math.PI/4) if so dont turn reflect back
            
            this.direction -= angleOut;
            console.log("collision RF");
        }
    }
}