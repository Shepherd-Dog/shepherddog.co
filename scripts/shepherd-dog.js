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

		$("nav").find("li").off("click");

		$("nav").find("li").on("click", function ()
		{
			if(!$(this).hasClass("logo"))
			{
				$(this).closest("nav").find("li").removeClass("active");

				$(this).addClass("active");
			}
		});
	};
};

var shepherdDog = new ShepherdDog();

$(document).ready(function () 
{
	shepherdDog.init();
});