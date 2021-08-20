function Block_offset(x, y)
{

	var x = x;
	var y = y;

	this.rotate_left = function()
	{
		//y => -x
		//x > y
		var temp_x = x;
		x = y;
		y= temp_x*-1;

		return {x: x, y: y};
	}

	this.rotate_right = function()
	{
		//y => x
		//x > -y
		var temp_x = x;
		x = y*-1
		y= temp_x

		return {x: x, y: y};
	}

	this.transform = function(position)
	{
		transform = new Object();
		transform.x = position.x + x;
		transform.y = position.y + y;
		return transform;
	}

	this.shift = function(new_x,new_y)
	{
		x = new_x;
		y = new_y;
	}




}