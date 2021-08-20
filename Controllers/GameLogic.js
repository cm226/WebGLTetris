function GameLogic(game_grid, score)
{

	var game_grid = game_grid;
	var score = score;
	var game_over = false;
	var shape_list = new ShapeList();
	var listDisplay = new ShapeListDisplay(shape_list);

	this.set_game_over = function()
	{
		console.log("game over");
		game_over = true;
	}

	this.create_active_shape = function()
	{
			next_shape_factory = shape_list.next_shape();
			shape_list.generate_new_shape();

			shape_pair = next_shape_factory();
			activeShape = new Shape(game_grid, shape_pair.offsets, shape_pair.color, Block.Position_resolver);
			
			var firstMoveOk = activeShape.move({x: 5, y: 19});

			if(!firstMoveOk)
				this.set_game_over();

			shape_pair = next_shape_factory();
			projection.set_shape(new Ghost(game_grid, shape_pair.offsets, shape_pair.color, Block.Position_resolver));

	}

	/*
		Called every tick of the game ~10 sec
	*/
	this.cycle = function()
	{
		if(game_over)
			return;

		if( activeShape == null)
			this.create_active_shape();

		if( activeShape.detect_landing())
		{
			activeShape.land();
			activeShape = null;

			var num_rows_cleared = game_grid.check_for_row_complete();
			if(num_rows_cleared > 0)
			{
				this.update_score(num_rows_cleared * num_rows_cleared);
				projection.hide();
			}
		}
		else
		{
			new_pos = activeShape.position();
			new_pos.y = new_pos.y -1;
			activeShape.move(new_pos);
		}

		if( activeShape == null)
			this.create_active_shape();

	
	}


	this.update_score = function(rows_cleared)
	{
		score.sum_score(rows_cleared);
	}


}