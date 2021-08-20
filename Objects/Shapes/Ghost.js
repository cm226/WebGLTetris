
function Ghost(game_grid, offsets, color, position_resolver){

	var my_position = {x: 5, y: 10};
	var blocks = new Array();
	var game_grid = game_grid;

	blocks[0] = new Block(my_position, offsets[0], color, position_resolver);
	blocks[1] = new Block(my_position, offsets[1], color, position_resolver);
	blocks[2] = new Block(my_position, offsets[2], color, position_resolver);
	blocks[3] = new Block(my_position, offsets[3], color, position_resolver);


	this.overrideTint = function(tint)
	{
		for (var i = blocks.length - 1; i >= 0; i--) {
			blocks[i].overrideTint(tint);
		};
	}

	this.position = function()
	{
		return {x : my_position.x, y :my_position.y} ;
	}


	this.move = function(position)
	{
		var block_positions = [blocks[0].offset().transform(position),
							   blocks[1].offset().transform(position),
							   blocks[2].offset().transform(position),
							   blocks[3].offset().transform(position)];

		
		my_position = position;
		blocks[0].move(my_position);
		blocks[1].move(my_position);
		blocks[2].move(my_position);
		blocks[3].move(my_position);

		if (game_grid.tentative_move(block_positions))
		{
			return true;
		}

		return false;

	}

	this.move_delta = function(delta)
	{
		return this.move({x : my_position.x + delta.x, y: my_position.y + delta.y});
	}

	this.detect_landing = function()
	{
		var highest;
		for(i =0; i < blocks.length; i++)
		{
			var position = blocks[i].position();
			if(position.y == 0 || game_grid.is_block_occupied(position.x,position.y-1))
				return true;
		}

		return false;
	}

	this.land = function()
	{
		blocks.forEach(function(block){
			game_grid.set_block(block, block.position());
			block.detatch();
		});
	}

	this.rotate_left = function()
	{
		for(i =0; i < blocks.length; i++)
		{
			blocks[i].rotate_left();
		}
		var success = this.move(my_position); // cacalculate positions

		return success;
	}

	this.rotate_right = function()
	{
		for(i =0; i < blocks.length; i++)
		{
			blocks[i].rotate_right();
		}

		var success = this.move(my_position); // cacalculate positions
		return success;
	}

	this.delete = function()
	{
		for (var i = blocks.length - 1; i >= 0; i--) {
			blocks[i].delete();
		};
	}

}