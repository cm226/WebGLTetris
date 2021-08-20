
function Block(grid_Position, offset, color, position_resolver) {

	var grid_position = grid_Position;
	var offset = offset;
	var detatched = false;
	var tint = [1, 1, 1, 1];
	var position_resolver = position_resolver;

	switch(color){
	case(COLORS.BLUE):
		var myColor = Block.blueColorBuffer;

		break;
	case(COLORS.RED):
		var myColor = Block.redColorBuffer;
		break;
	case(COLORS.GREEN):
		var myColor = Block.greenColorBuffer;
		break;
	case(COLORS.ORENGE):
		var myColor = Block.orengeColorBuffer;
		break;
	case(COLORS.PURPLE):
		var myColor = Block.purpleColorBuffer;
		break;

	case(COLORS.YELLOW):
		var myColor = Block.yellowColorBuffer;
		break;
	case( COLORS.LIGHT_BLUE):
		var myColor = Block.lightblueColorBuffer;
		break;
	default:
		var myColor = Block.blueColorBuffer;
		break;

	}

	drawable_objects.add(this);

	this.delete = function()
	{
		drawable_objects.remove(this);	
	}
	
	this.draw = function(){

		 position = position_resolver.resolve_position(grid_position.x, grid_position.y);

		 gl.uniform4fv(shaderProgram.tintUniform, tint);

		gl.bindBuffer(gl.ARRAY_BUFFER, Block.textureCoords);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Block.textureCoords.itemSize, gl.FLOAT, false, 0, 0);

    	gl.activeTexture(gl.TEXTURE0);
    	gl.bindTexture(gl.TEXTURE_2D, Block.texture);
    	gl.uniform1i(shaderProgram.samplerUniform, 0);
    	 
		 gl.bindBuffer(gl.ARRAY_BUFFER, myColor);
         gl.vertexAttribPointer(shaderProgram.uColor, myColor.itemSize, gl.FLOAT, false, 0, 0);

         gl.bindBuffer(gl.ARRAY_BUFFER, Block.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Block.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);


		 mvPushMatrix()
		 mat4.translate(mvMatrix, position);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Block.buffer_vertex_positions.numItems);
	     mvPopMatrix();
	}

	this.overrideTint = function(new_tint)
	{
		tint = new_tint;
	}

	this.translate = function(x,y)
	{
		grid_position.x += x; 
		grid_position.y += y;
		this.move(grid_position);
	}

	this.move = function(position)
	{
		oldPositionx = grid_position.x;
		oldPositiony = grid_position.y;

		grid_position = offset.transform(position);
		if(detatched)
		{
			block_lookup.move(oldPositionx,oldPositiony,
								grid_position.x, grid_position.y);
		}
	}

	this.rotate_left = function()
	{
		offset.rotate_left();
	}

	this.rotate_right = function()
	{
		offset.rotate_right();
	}

	this.detatch = function()
	{
		block_lookup.put(this);
		offset.shift(0,0);
		detatched = true;
	}

	this.position = function() {return {x: grid_position.x, y: grid_position.y};}
	this.offset = function(){return offset;}
}

Block.buffer_vertex_positions = null;
Block.blueColorBuffer = null;
Block.gl = null;
Block.Position_resolver = null;
Block.init_buffers = function(){

		Block.buffer_vertex_positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Block.buffer_vertex_positions);
        vertices = [
             0.5,  0.5,  0.0,	
            -0.5,  0.5,  0.0,
             0.5, -0.5,  0.0,
            -0.5, -0.5,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        Block.buffer_vertex_positions.itemSize = 3;
        Block.buffer_vertex_positions.numItems = 4;


        // blue
        color = [0.0, 0.0, 0.8, 0.3,
					 0.0, 0.0, 0.8, 0.3,
					 0.0, 0.0, 0.8, 0.3,
					 0.0, 0.0, 0.8, 0.3
		];
		
		Block.blueColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.blueColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.blueColorBuffer.itemSize = 4;


		// light blue
        color = [0.4, 0.67, 1, 0.3,
				0.4, 0.67, 1, 0.3,
				0.4, 0.67, 1, 0.3,
				0.4, 0.67, 1, 0.3
		];
		
		Block.lightblueColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.lightblueColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.lightblueColorBuffer.itemSize = 4;



        // red
        color =  [0.8, 0.0, 0.0, 1.0,
					   0.8, 0.0, 0.0, 1.0,
					   0.8, 0.0, 0.0, 1.0,
					   0.8, 0.0, 0.0, 1.0];
		
		Block.redColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.redColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.redColorBuffer.itemSize = 4;


		 // green
        color =  [0.0, 0.8, 0.0, 1.0,
					   0.0, 0.8, 0.0, 1.0,
					   0.0, 0.8, 0.0, 1.0,
					   0.0, 0.8, 0.0, 1.0];
		
		Block.greenColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.greenColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.greenColorBuffer.itemSize = 4;

		// orenge
        color =   [1.0, 0.5, 0.0, 1.0,
					   1.0, 0.5, 0.0, 1.0,
					   1.0, 0.5, 0.0, 1.0,
					   1.0, 0.5, 0.0, 1.0];
		
		Block.orengeColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.orengeColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.orengeColorBuffer.itemSize = 4;


		// purple
        color =   [1.0, 0.0, 1.0, 1.0,
					   1.0, 0.0, 1.0, 1.0,
					   1.0, 0.0, 1.0, 1.0,
					   1.0, 0.0, 1.0, 1.0];

		Block.purpleColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.purpleColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.purpleColorBuffer.itemSize = 4;

				// yellow
        color =  [1.0, 1.0, 0.0, 1.0,
					1.0, 1.0, 0.0, 1.0,
					   1.0, 1.0, 0.0, 1.0,
					   1.0, 1.0, 0.0, 1.0];

		Block.yellowColorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Block.yellowColorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Block.yellowColorBuffer.itemSize = 4;

		Block.textureCoords = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, Block.textureCoords);
	    var textureCoords = [
	      // Front face
	      1.0, 0.0,
	      0.0, 0.0,
	      1.0, 1.0,
	      0.0, 1.0
	    ];
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	    Block.textureCoords.itemSize = 2;
	    Block.textureCoords.numItems = 4;

	}

Block.initTexture = function()
{
	Block.texture = gl.createTexture();
    Block.texture.image = new Image();
    Block.texture.image.onload = function() {
     		handleLoadedTexture(Block.texture)
   	}

   	Block.texture.image.crossOrigin = "Anonymous";
    Block.texture.image.src = "http://localhost:8000/resources/block_new.png";
}


