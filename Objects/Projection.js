function projection(grid){

	var shape = null; 
	var grid = grid;


	this.set_shape = function(new_shape)
	{
		if(shape != null)
		{
			shape.delete();
		}
		shape = new_shape;
		shape.overrideTint([0.5, 0.5, 0.5, 0.5]);

		this.recalculate_height();
	}

	this.hide = function()
	{
		if(shape != null)
		{
			shape.delete();
			shape = null;
		}
	}

	this.recalculate_height = function()
	{

		var shape_x = shape.position().x;
		var shape_y = activeShape.position().y;

		var vertical_delta = {x: shape_x, y: shape_y};

		var criteria_pass = shape.move(vertical_delta);
		while (criteria_pass && shape_y >= -1 )
		{
			criteria_pass = shape.move(vertical_delta);
			shape_y --;
			vertical_delta.y = shape_y;
		}
		vertical_delta.y += 2;
		shape.move(vertical_delta); // move shape back to good config
	}



	this.rotate_left = function()
	{
		shape.rotate_left();
		this.recalculate_height();
	}

	this.rotate_right = function()
	{
		shape.rotate_right();
		this.recalculate_height();
	}

	this.move_delta = function(delta)
	{
		shape.move_delta(delta);
		this.recalculate_height();
	}

}