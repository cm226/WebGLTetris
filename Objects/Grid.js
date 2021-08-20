function Grid(grid_config)
{

	var grid_config = grid_config;

	var rows = new Array(grid_config.Grid_Slot_size_y());

	for(i = grid_config.Grid_Slot_size_y(); i >= 0; i--)
	{
		rows[i] = new Row(grid_config.Grid_Slot_size_x());
	}


	this.print_grid = function()
	{
		for(i = grid_config.Grid_Slot_size_y(); i >= 0; i--)
		{
			console.log(i+" : "+rows[i].print_row(i));
		}
	}

	this.is_block_occupied = function(x,y)
	{
		return !rows[y].is_free(x);
	}

	this.move_row = function(y, count)
	{
		rows[y].move_down(count);
		rows[y-count] = rows[y];
		console.log("moveing_row :"+y);
	}

	this.collapse_rows = function()
	{
		var grid_height = grid_config.Grid_Slot_size_y();
		var row_shift_size = 0;

		for(y = 0; y < grid_height; y++)
		{
			
			if(row_shift_size > 0)
			{
				this.move_row(y, row_shift_size);
			}

			if( rows[y].is_empty() )
			{
				row_shift_size += 1;
				console.log("row: "+y+" is empty")
			}
		}

		console.log("shift size:"+row_shift_size)
		for(y = grid_height - row_shift_size; y < grid_height; y++ )
		{
			console.log("createing : "+y)
			rows[y] = new Row(grid_config.Grid_Slot_size_x());
		}
	}


	this.check_for_row_complete = function()
	{
		var row_count = 0;
		var deleted_rows = [];
		for(y = grid_config.Grid_Slot_size_y(); y >= 0 ; y --)
		{
			if( rows[y].is_full() )
			{
				row_count += 1;
				rows[y].delete();
			}
		}

		if(row_count > 0)
			this.collapse_rows();

		return row_count;
	}

	this.set_block = function(block, position)
	{
		rows[position.y].add_block(block, position.x)
	}

	this.tentative_move = function(blockList)
	{
		var moveOK = true;
		var num_of_blocks = blockList.length;

		var blockPosition = null;
		for(i = 0; i < num_of_blocks; i++)
		{

			blockPosition = blockList[i];
			if(blockPosition.x < 0  ||
			   blockPosition.x > grid_config.Grid_Slot_size_x())
			{
				moveOK = false;
				Debug.write("move rejected: index"+i+" x: "+blockPosition.x)
			}
			else if( blockPosition.y < 0)
			{
				moveOK = false;
				Debug.write("move rejected: index"+i+" y"+ blockPosition.y)
			}
			else if(!rows[blockPosition.y].is_free(blockPosition.x))
			{
				moveOK = false;
				Debug.write("move rejected: occupided ")	
			}
		}

		return moveOK;
	}




}