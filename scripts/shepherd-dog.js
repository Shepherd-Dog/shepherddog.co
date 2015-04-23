var ShepherdDog = function ()
{

	this.init = function ()
	{
		var self = this;

		self.setupEventHandlers();
	};

	this.setupEventHandlers = function ()
	{
		var self = this;

		$(".menu-button-container").find("a").on("click", function ()
		{
			$(".main-nav-list-container").slideToggle();
		});
	};
};

var shepherdDog = new ShepherdDog();

$(document).ready(function () 
{
	shepherdDog.init();
});