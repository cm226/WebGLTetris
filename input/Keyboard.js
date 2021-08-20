function Keyboard(){

	var currently_pressed_keys = new Array();

	this.tick = function(deltaT)
	{

	}

	this.onKeyUp = function(event)
	{

		currently_pressed_keys[event.keyCode] = false;
	}


	this.onKeyDown = function(event)
	{
		currently_pressed_keys[event.keyCode] = true;
	}


	this.is_key_down = function(keyCode)
	{
		if( currently_pressed_keys[keyCode])
		{
			currently_pressed_keys[keyCode] = false;
			return true;
		}

		return false;
	}
}