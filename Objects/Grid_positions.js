function Grid_positions(Grid_config)
{

	var Grid_config = Grid_config

	var width_of_slot = (Grid_config.Grid_size_pixles_x() - 
							(Grid_config.Grid_slot_spaceing() * (Grid_config.Grid_Slot_size_x()-1))
							) / Grid_config.Grid_Slot_size_x();

	var height_of_slot = (Grid_config.Grid_size_pixles_y() - 
							(Grid_config.Grid_slot_spaceing() * (Grid_config.Grid_Slot_size_y()-1))
							) / Grid_config.Grid_Slot_size_y();


	this.resolve_position = function(x, y)
	{
		position = [0,0,0];
		position[0] = Grid_config.Grid_px_position_x() + ((width_of_slot + Grid_config.Grid_slot_spaceing()) * x);
		position[1] = Grid_config.Grid_px_position_y() + ((height_of_slot + Grid_config.Grid_slot_spaceing()) * y);
		return position;
	}

}