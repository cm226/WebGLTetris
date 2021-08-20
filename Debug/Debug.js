
function Debug(is_on)
{

	if (!is_on){
			this.write = function(){}
		}
	else{
		
		this.write = function(msg)
		{
			console.log(msg)
		}
	
	}
}