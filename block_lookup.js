function Block_lookup(grid_config)
{

	var mappings = [] 
	
	for(i = grid_config.Grid_Slot_size_x(); i >= 0; i--)
	{
		mappings[i] = new Array();
		for(j = grid_config.Grid_Slot_size_y(); j >= 0 ; j --)
		{
			mappings[i][j] = null;
		}
	}


	this.lookup = function(x,y)
	{
		return mappings[x][y];
	}

	this.move = function(old_x, old_y, new_x, new_y)
	{
		block = mappings[old_x][old_y];
		mappings[new_x][new_y] = block;
		mappings[old_x][old_y] = null;

	}

	this.put = function(block)
	{
		var block_position = block.position();
		mappings[block_position.x][block_position.y] = block;
	}


}