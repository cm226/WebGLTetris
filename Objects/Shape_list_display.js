function ShapeListDisplay(shapeList)
{
	var shapeList = shapeList;
	var displayed_shapes = [];


	var displayConfig = new Grid_config({x : 2.3, y : 30}, 
                                     {x : 3, y : 30},
                                     {x : 10, y : 0},
                                      1.0);
    var displayPositionResolver = new Grid_positions(displayConfig);
    var display_grid = new Grid(displayConfig);


	shapeList.on_shapeListChange(function(){
		var shapes = shapeList.get_shapes();

		var shape_pair;
		for (var i = shapes.length - 1; i >= 0; i--) {

			if(displayed_shapes[i] != null)
				displayed_shapes[i].delete();

			shape_pair = shapes[i]();
			displayed_shapes[i] = new Shape(display_grid, shape_pair.offsets, shape_pair.color, displayPositionResolver);
			displayed_shapes[i].move({x: 1, y: (i*5)+2});
		};

	});
}