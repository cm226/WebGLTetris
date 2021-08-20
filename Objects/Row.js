function Row(width){

	var width = width;
	var occuped = 0;
	var blocks = new Array();
	for(col = 0; col <= width; col++)
	{
		blocks[col] = null;
	}

	this.move_down= function(count)
	{
		for(col = 0; col <= width; col++)
		{
			if(blocks[col] != null)
				blocks[col].translate(0,count*-1);
		}
	}

	this.delete = function()
	{
		for(col = 0; col <= width; col++)
		{
			block = blocks[col];
			if(block != null)
			{
				block.delete();
				blocks[col]  = null;
			}

		}
		occuped = 0;
	}

	this.is_free = function(x)
	{
		return blocks[x] == null;
	}

	this.add_block = function(block, column)
	{
		blocks[column] = block;
		occuped += 1;
	}

	this.is_empty = function()
	{
		return occuped == 0;
	}

	this.is_full = function()
	{
		return occuped == (width +1);
	}

	this.print_row = function()
	{
		line = "";
		for(col = width; col >= 0; col--)
		{
			line = (blocks[col] ? 1 : 0)+" " + line;
		}
		return line;
	}



}