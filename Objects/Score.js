function Score(my_position){

	var positionS = my_position;
	var letter_spaceing = 0.47;
	var score = 0;
	var numberMap = [];

	drawable_objects.add(this);

	this.sum_score = function(value)
	{
		if(score < 999)
			score += value;
	}

	this.draw = function()
	{

		gl.bindBuffer(gl.ARRAY_BUFFER, Score.textureCoords_S);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Score.textureCoords_S.itemSize, gl.FLOAT, false, 0, 0);

    	gl.activeTexture(gl.TEXTURE0);
    	gl.bindTexture(gl.TEXTURE_2D, Score.texture);
    	gl.uniform1i(shaderProgram.samplerUniform, 0);

    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.colorBuffer);
         gl.vertexAttribPointer(shaderProgram.uColor, Score.colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		 gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);

		 mvPushMatrix()
		 mat4.translate(mvMatrix, positionS);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);


	     gl.bindBuffer(gl.ARRAY_BUFFER, Score.textureCoords_C);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Score.textureCoords_C.itemSize, gl.FLOAT, false, 0, 0);


    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);


	     mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);

         gl.bindBuffer(gl.ARRAY_BUFFER, Score.textureCoords_O);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Score.textureCoords_O.itemSize, gl.FLOAT, false, 0, 0);


    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);

         mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);

         gl.bindBuffer(gl.ARRAY_BUFFER, Score.textureCoords_R);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Score.textureCoords_R.itemSize, gl.FLOAT, false, 0, 0);


    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);

         

         mat4.translate(mvMatrix, [letter_spaceing-0.2, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);

         gl.bindBuffer(gl.ARRAY_BUFFER, Score.textureCoords_E);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, Score.textureCoords_E.itemSize, gl.FLOAT, false, 0, 0);


    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);

	     mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);


	     drawScore();

	     mvPopMatrix();
	}

	var drawScore = function()
	{
	    var digit = Math.floor(score/100);
	    gl.bindBuffer(gl.ARRAY_BUFFER, numberMap[digit]);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);
	     mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);

	     var temp_score = score - (digit * 100);
	     digit = Math.floor( temp_score /10);
	    gl.bindBuffer(gl.ARRAY_BUFFER, numberMap[digit]);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);
	     mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);

		temp_score = temp_score - (digit*10);
	    gl.bindBuffer(gl.ARRAY_BUFFER, numberMap[temp_score]);
    	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
    	gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
         gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, Score.buffer_vertex_positions.itemSize, gl.FLOAT, false, 0, 0);
	     mat4.translate(mvMatrix, [letter_spaceing, 0, 0]);
	     setMatrixUniforms();
	     gl.drawArrays(gl.TRIANGLE_STRIP, 0, Score.buffer_vertex_positions.numItems);
	}


	Score.initBuffers = function()
	{
		Score.buffer_vertex_positions = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Score.buffer_vertex_positions);
        vertices = [
             0.4,  0.4,  0.4,	
            -0.4,  0.4,  0.4,
             0.4, -0.4,  0.4,
            -0.4, -0.4,  0.4
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        Score.buffer_vertex_positions.itemSize = 3;
        Score.buffer_vertex_positions.numItems = 4;

        
       Score.textureCoords_S = gl.createBuffer();
	   Score.calcTextureCoords(12, 5, Score.textureCoords_S, 0.01);

	   Score.textureCoords_C = gl.createBuffer();
	   Score.calcTextureCoords(12, 6, Score.textureCoords_C, 0.012);

	   Score.textureCoords_O = gl.createBuffer();
	   Score.calcTextureCoords(0, 6, Score.textureCoords_O, 0.01);

	   Score.textureCoords_R = gl.createBuffer();
	   Score.calcTextureCoords(13, 7, Score.textureCoords_R, 0.02);

	   Score.textureCoords_E = gl.createBuffer();
	   Score.calcTextureCoords(10, 6, Score.textureCoords_E, 0.01);

	   Score.textureCoords_Col = gl.createBuffer();
	   Score.calcTextureCoords(5, 3, Score.textureCoords_Col, 0.01);

		Score.textureCoords_0 = gl.createBuffer();
	   Score.calcTextureCoords(15, 3, Score.textureCoords_0, 0.01);	   

	   Score.textureCoords_1 = gl.createBuffer();
	   Score.calcTextureCoords(14, 3, Score.textureCoords_1, 0.01);

	   Score.textureCoords_2 = gl.createBuffer();
	   Score.calcTextureCoords(13, 3, Score.textureCoords_2, 0.01);

	   Score.textureCoords_3 = gl.createBuffer();
	   Score.calcTextureCoords(12, 3, Score.textureCoords_3, 0.01);

	   Score.textureCoords_4 = gl.createBuffer();
	   Score.calcTextureCoords(11, 3, Score.textureCoords_4, 0.01);

	   	   Score.textureCoords_5 = gl.createBuffer();
	   Score.calcTextureCoords(10, 3, Score.textureCoords_5, 0.01);

	   	   Score.textureCoords_6 = gl.createBuffer();
	   Score.calcTextureCoords(9, 3, Score.textureCoords_6, 0.01);

	   	   Score.textureCoords_7 = gl.createBuffer();
	   Score.calcTextureCoords(8, 3, Score.textureCoords_7, 0.01);

	   	   Score.textureCoords_8 = gl.createBuffer();
	   Score.calcTextureCoords(7, 3, Score.textureCoords_8, 0.01);

	   	   Score.textureCoords_9 = gl.createBuffer();
	   Score.calcTextureCoords(6, 3, Score.textureCoords_9, 0.01);

	   numberMap[0] = Score.textureCoords_0;
	   numberMap[1] = Score.textureCoords_1;
	   numberMap[2] = Score.textureCoords_2;
	   numberMap[3] = Score.textureCoords_3;
	   numberMap[4] = Score.textureCoords_4;
	   numberMap[5] = Score.textureCoords_5;
	   numberMap[6] = Score.textureCoords_6;
	   numberMap[7] = Score.textureCoords_7;
	   numberMap[8] = Score.textureCoords_8;
	   numberMap[9] = Score.textureCoords_9;


	    // white
        color = [1, 1, 1, 1,
			     1, 1, 1, 1.0,
				 1, 1, 1, 1.0,
				 1, 1, 1, 1.0
		];
		
		Score.colorBuffer = gl.createBuffer();			 
		gl.bindBuffer(gl.ARRAY_BUFFER, Score.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
		Score.colorBuffer.itemSize = 4;
	}

	Score.calcTextureCoords = function(row, collumn, texture, rightCut)
	{
	    gl.bindBuffer(gl.ARRAY_BUFFER, texture);


		 collumn = (256.0/16.0) * collumn;
	    row = (256.0/16.0) * row;

	    // texture coords
	    collumn_coord = (collumn / 256.0) - (1.0/256.0);
	    row_coord = row / 256.0;

	    single_unit_coord = 16.0/256.0;
	    single_unit_coord_cut = single_unit_coord - rightCut;

	    var textureCoords_S = [
	      // Front face
	      collumn_coord + single_unit_coord_cut, row_coord + single_unit_coord,
	      collumn_coord, row_coord + single_unit_coord,
	      collumn_coord + single_unit_coord_cut, row_coord,
	      collumn_coord, row_coord
	    ];
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords_S), gl.STATIC_DRAW);
	    texture.itemSize = 2;
	    texture.numItems = 4;
	}

	Score.initTexture = function()
	{
		Score.texture = gl.createTexture();
	    Score.texture.image = new Image();
	    Score.texture.image.onload = function() {
	     		handleLoadedTexture(Score.texture)
	   	}

	   	Score.texture.image.crossOrigin = "Anonymous";
	    Score.texture.image.src = "http://localhost:8000/resources/text_sprite.png";
	}	
}