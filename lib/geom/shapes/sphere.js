var generateSphereData = function(slices){
   var vertexPositionData = [];
   var indexData = [];
   var normalData = [];
   var textureCoordData = [];
   for (var latNumber = 0; latNumber <= slices; latNumber++) {
   var theta = latNumber * Math.PI / slices;
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);

       for (var longNumber = 0; longNumber <= slices; longNumber++) {
           var phi = longNumber * 2 * Math.PI / slices;
           var sinPhi = Math.sin(phi);
           var cosPhi = Math.cos(phi);

           var x = sinPhi * sinTheta;
           var y = cosTheta;
           var z = cosPhi * sinTheta;
           var u = 1 - (longNumber / slices);
           var v = 1 - (latNumber / slices);

           normalData.push(x);
           normalData.push(y);
           normalData.push(z);
           textureCoordData.push(u);
           textureCoordData.push(v);
           vertexPositionData.push(2* Math.PI * x);
           vertexPositionData.push(2* Math.PI * y);
           vertexPositionData.push(2* Math.PI * z);
       }
   }


   for (var latNumber = 0; latNumber < slices; latNumber++) {
       for (var longNumber = 0; longNumber < slices; longNumber++) {
           var first = (latNumber * (slices + 1)) + longNumber;
           var second = first + slices + 1;
           indexData.push(first);
           indexData.push(second);
           indexData.push(first + 1);

           indexData.push(second);
           indexData.push(second + 1);
           indexData.push(first + 1);
       }
   }

   return{
       index: indexData,
       position: vertexPositionData,
       normal: normalData,
       texCoord: textureCoordData
   };
};
