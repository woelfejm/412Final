/**John Woelfel
 * This class keeps track of the physics of the car
 * 
*/

/**
 * Constructor for car. Sets all values to default
 * @param m - the vec4 to initialize car to (size and scale)
 */
var car = function(scale = 2){
    this.size = vec3.fromValues(scale, scale, scale);   //size of car
    
    //physics fields for car
    this.speed = 0;                                     //speed that car is moving at
    this.pos = vec3.fromValues(0,0,0);                  //starting position of car
    this.direction = 0;                                 //rotation angle from y-axis

    this.friction = .03;                                //the rate to decrease speed by each frame (potentially make it depend on the map)
    this.accelerationRate = 1/(scale * 10);                        //the rate to increase speed by if gas 
    this.turnRate = 1/ (scale * 4);                    //how fast the car turns

    
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
    
    //calculate new position given speed
    this.pos[0] = this.pos[0] + (this.speed * Math.sin(this.direction));  //change in x position
    this.pos[2] = this.pos[2] + (this.speed * Math.cos(this.direction));  //change in z position
    mat4.fromTranslation(this.model, this.pos);                           //update model with position

    
    mat4.rotateY(this.model, this.model, this.direction);                 //set direction car is facing

    mat4.scale(this.model,this.model, this.size);                         //update size
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
}