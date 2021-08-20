function Grid_config(Grid_size_px, Grid_slot_size, Grid_px_position, Grid_slot_spaceing)
{
	var Grid_size_px	= Grid_size_px;
	var Grid_slot_size  = Grid_slot_size;
	var Grid_px_position= Grid_px_position;
	var Grid_slot_spaceing = Grid_slot_spaceing;


	this.Grid_size_pixles_x = function(){ return Grid_size_px.x; }
	this.Grid_size_pixles_y = function(){ return Grid_size_px.y; }

	this.Grid_Slot_size_x = function(){ return Grid_slot_size.x; }
	this.Grid_Slot_size_y = function(){ return Grid_slot_size.y; }

	this.Grid_px_position_x = function(){ return Grid_px_position.x; }
	this.Grid_px_position_y = function(){ return Grid_px_position.y; }

	this.Grid_slot_spaceing = function(){ return Grid_slot_spaceing; }
}