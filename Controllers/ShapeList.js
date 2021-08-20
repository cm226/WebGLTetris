function ShapeList()
{
	var shapes = [];
	var listUpdateCallback = null;

	this.next_shape = function()
	{
		return shapes.shift();
	}


	this.generate_new_shape = function()
	{
		var shape = Math.floor((Math.random()* 10) % 7);

		if(shape == 0)
			shapes.push(Create_T_Shape);
		else if(shape == 1)
			shapes.push(Create_left_L_Shape);
		else if(shape == 2)
			shapes.push(Create_right_L_Shape);
		else if(shape == 3)
			shapes.push(Create_I_Shape);
		else if(shape == 4)
			shapes.push(Create_left_s_Shape);
		else if(shape == 5)
			shapes.push(Create_right_s_Shape);
		else if(shape == 6)
			shapes.push(Create_o_Shape);

		if(listUpdateCallback != null)
			listUpdateCallback();
	}

	this.get_shapes = function()
	{
		return shapes;
	}

	this.on_shapeListChange = function(callback)
	{
		listUpdateCallback = callback;
	}


    for (var i = 4- 1; i >= 0; i--) {
	 this.generate_new_shape();
	};


}