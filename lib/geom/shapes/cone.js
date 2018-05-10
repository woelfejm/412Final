
var generateConeData = function( slices, radius, height ) {
    let verts = [], normals = [], el = [];

    // Generate the points
    var p = vec3.create(), n = vec3.create();
    var sliceFac = 2.0 * Math.PI / slices;
    var angle = 0.0;

    p[2] = 0.0;
    for( let j = 0; j < slices; j++ ) {
        angle = sliceFac * j;
        p[0] = radius * Math.cos(angle);
        p[1] = radius * Math.sin(angle);

        // Compute normal
        vec3.set(n, p[0], p[1], radius * radius / height );
        vec3.normalize(n,n);

        verts.push(p[0], p[1], p[2]);
        normals.push(n[0], n[1], n[2]);
    }

    // Top of cone - duplicate the vertex for each slice, and 
    // use the face normal.
    let a = vec3.create(), b = vec3.create(), 
        p1 = vec3.create(), p2 = vec3.create();
    for( let i = 0; i < slices; i++ ) {
        // Push the point
        verts.push(0,0,height);

        // calculate the face normal
        let idx = i*3;
        vec3.set(p1, verts[idx + 0], verts[idx + 1], verts[idx + 2] );
        idx = ((i+1) % slices) * 3;
        vec3.set(p2, verts[idx + 0], verts[idx + 1], verts[idx + 2] ); 
        vec3.subtract(a, p2, p1);
        vec3.set(b, -p1[0], -p1[1], height - p1[2] );
        vec3.cross(n, a, b);
        vec3.normalize(n,n);

        // Push the face normal
        normals.push(n[0], n[1], n[2]);
    }
    
    // Generate the element indexes for triangles
    for( let j = 0; j < slices; j++ ) {
        el.push(j, (j+1) % slices, slices + j );
    }

    return {
        index: el,
        normal: normals,
        position: verts
    };
};
