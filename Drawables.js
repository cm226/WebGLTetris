function Drawables()
{

	var drawables = new Array()

	this.add = function(drawable)
	{
		drawables.push(drawable);
	}

	this.remove = function (drawable) {
		index = drawables.indexOf(drawable)
		if (index != -1)	
			drawables.splice(index, 1)
	}

	this.draw = function(){

		drawables.forEach(function(element, index, array) 
		{
			element.draw();
		});
	}

}